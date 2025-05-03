// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

contract CoinFlip1v1 {
    enum Choice { Heads, Tails }
    enum GameStatus { Waiting, Ready, Finished, Cancelled }

    struct Player {
        address addr;
        Choice choice;
    }

    struct Game {
        Player headsPlayer;
        Player tailsPlayer;
        uint256 betAmount;
        GameStatus status;
        address winner;
        uint8 result;
        uint256 createdAt;
    }

    address public owner;
    uint256 public gameCounter;
    bool public gameActive = true; 

    uint256 public BASE_BET = 0.001 ether;
    uint256 public feePercent = 7;
    uint256 public constant TIMEOUT = 3 minutes;

    mapping(uint256 => Game) public games;
    mapping(uint256 => mapping(address => bool)) public hasPaid;
    mapping(address => bool) public hasPendingGame;
    mapping(address => uint256) public activeGameOf;

    address[] public waitingHeads;
    address[] public waitingTails;

    event MatchCreated(uint256 gameId, address heads, address tails);
    event BetPlaced(uint256 gameId, address player);
    event GameResult(uint256 gameId, address winner, Choice result, uint256 reward);
    event GameRefunded(uint256 gameId, address refunded);
    event GameStatusUpdated(bool active);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function joinQueue(Choice _choice) external {
        require(!hasPendingGame[msg.sender], "You have already joined a game");
        require(_choice == Choice.Heads || _choice == Choice.Tails, "Invalid choice");
        require(gameActive, "Sorry, game is not active");
        
        if (_choice == Choice.Heads) {
            waitingHeads.push(msg.sender);
        } else {
            waitingTails.push(msg.sender);
        }

        matchPlayers();
    }

    function leaveQueue() external {
        bool removed = false;

        for (uint256 i = 0; i < waitingHeads.length; i++) {
            if (waitingHeads[i] == msg.sender) {
                waitingHeads[i] = waitingHeads[waitingHeads.length - 1];
                waitingHeads.pop();
                removed = true;
                break;
            }
        }

        for (uint256 i = 0; i < waitingTails.length; i++) {
            if (waitingTails[i] == msg.sender) {
                waitingTails[i] = waitingTails[waitingTails.length - 1];
                waitingTails.pop();
                removed = true;
                break;
            }
        }

        require(removed, "Player not in queue");
    }


    function matchPlayers() internal {
        if (waitingHeads.length == 0 || waitingTails.length == 0) return;

        address headPlayer = waitingHeads[0];
        address tailPlayer = waitingTails[0];
        
        removeFirst(waitingHeads);
        removeFirst(waitingTails);

        Game storage newGame = games[gameCounter];
        newGame.headsPlayer = Player(headPlayer, Choice.Heads);
        newGame.tailsPlayer = Player(tailPlayer, Choice.Tails);
        newGame.betAmount = BASE_BET;
        newGame.status = GameStatus.Waiting;
        newGame.createdAt = block.timestamp;
        newGame.result = 3;

        hasPendingGame[headPlayer] = true;
        hasPendingGame[tailPlayer] = true;

        activeGameOf[headPlayer] = gameCounter;
        activeGameOf[tailPlayer] = gameCounter;

        emit MatchCreated(gameCounter, headPlayer, tailPlayer);
        gameCounter++;
    }

    function placeBet(uint256 _gameId) external payable {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Waiting, "Invalid game state");
        require(msg.value == BASE_BET, "Must send 1");
        require(msg.sender == game.headsPlayer.addr || msg.sender == game.tailsPlayer.addr, "Not in this game");
        require(!hasPaid[_gameId][msg.sender], "Already payed");

        hasPaid[_gameId][msg.sender] = true;
        emit BetPlaced(_gameId, msg.sender);

        if (hasPaid[_gameId][game.headsPlayer.addr] && hasPaid[_gameId][game.tailsPlayer.addr]) {
            finalizeGame(_gameId);
        }
    }

    function finalizeGame(uint256 _gameId) internal {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Waiting, "Game not active");

        bytes32 hash = keccak256(
            abi.encodePacked(
                game.headsPlayer.addr,
                game.tailsPlayer.addr,
                block.timestamp,
                blockhash(block.number - 1)
            )
        );

        Choice result = Choice(uint8(uint256(hash) % 2));
        address winner = result == Choice.Heads ? game.headsPlayer.addr : game.tailsPlayer.addr;

        uint256 totalPot = 2 * BASE_BET;
        uint256 feeAmount = (totalPot * feePercent) / 100;
        uint256 rewardAmount = totalPot - feeAmount;

        (bool successWinner, ) = winner.call{value: rewardAmount}("");
        require(successWinner, "Winner payment failed");

        (bool successOwner, ) = owner.call{value: feeAmount}("");
        require(successOwner, "Owner fee failed");

        game.status = GameStatus.Finished;
        game.winner = winner;
        game.result = uint8(result);

        hasPendingGame[game.headsPlayer.addr] = false;
        hasPendingGame[game.tailsPlayer.addr] = false;

        delete activeGameOf[game.headsPlayer.addr];
        delete activeGameOf[game.tailsPlayer.addr];
        
        emit GameResult(_gameId, winner, result, rewardAmount);
    }

    function claimRefund(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Waiting, "Game not refundable");
        require(hasPaid[_gameId][msg.sender], "You haven't paid");
        require(
            !hasPaid[_gameId][game.headsPlayer.addr] || !hasPaid[_gameId][game.tailsPlayer.addr],
            "Both players paid, can't refund"
        );
        require(block.timestamp >= game.createdAt + TIMEOUT, "Timeout not reached (3min)");

        game.status = GameStatus.Cancelled;

        hasPendingGame[game.headsPlayer.addr] = false;
        hasPendingGame[game.tailsPlayer.addr] = false;

        hasPaid[_gameId][msg.sender] = false;

        (bool refundSuccess, ) = msg.sender.call{value: BASE_BET}("");
        require(refundSuccess, "Refund failed");

        emit GameRefunded(_gameId, msg.sender);
    }

    function getActiveGameId(address player) public view returns (uint256 gameId) {
        require(hasPendingGame[player], "Player is not in an active game");
        return activeGameOf[player];
    }

    function setGameStatus(bool _status) public onlyOwner {
        require(gameActive != _status, "GameStatus is already this");
        gameActive = _status;
        emit GameStatusUpdated(_status);
    }

    function setBaseBet(uint256 _newBaseBet) public onlyOwner {
        require(_newBaseBet > 0, "Invalid base bet");
        BASE_BET = _newBaseBet;
    }

    function setFeePercent(uint256 _fee) public onlyOwner {
        require(_fee < 100 && _fee > 7, "Invalid fee percent");
        feePercent = _fee;
    }

    function inQueue(address player) public view returns (bool) {
        for (uint256 i = 0; i < waitingHeads.length; i++) {
            if (waitingHeads[i] == player) return true;
        }
        for (uint256 i = 0; i < waitingTails.length; i++) {
            if (waitingTails[i] == player) return true;
        }
        return false;
    }


    function removeFirst(address[] storage arr) internal {
        require(arr.length > 0, "Array is empty");

        for (uint i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr.pop();
    }
}