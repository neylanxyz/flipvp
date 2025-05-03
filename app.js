const CONTRACT_ADDRESS = '0x6d86DFEF6431D4d54636a72DaCC1c1df15eA1E44'; // ✅ Replace with your actual contract address
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			}
		],
		"name": "claimRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "refunded",
				"type": "address"
			}
		],
		"name": "GameRefunded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum CoinFlip1v1.Choice",
				"name": "result",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "GameResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"name": "GameStatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum CoinFlip1v1.Choice",
				"name": "_choice",
				"type": "uint8"
			}
		],
		"name": "joinQueue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "leaveQueue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "heads",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tails",
				"type": "address"
			}
		],
		"name": "MatchCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gameId",
				"type": "uint256"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newBaseBet",
				"type": "uint256"
			}
		],
		"name": "setBaseBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setGameStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "activeGameOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BASE_BET",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "games",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "enum CoinFlip1v1.Choice",
						"name": "choice",
						"type": "uint8"
					}
				],
				"internalType": "struct CoinFlip1v1.Player",
				"name": "headsPlayer",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "enum CoinFlip1v1.Choice",
						"name": "choice",
						"type": "uint8"
					}
				],
				"internalType": "struct CoinFlip1v1.Player",
				"name": "tailsPlayer",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "betAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum CoinFlip1v1.GameStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "result",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getActiveGameId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasPaid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasPendingGame",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "inQueue",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TIMEOUT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "waitingHeads",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "waitingTails",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider, signer, contract, userAddress;
let currentAccount;
let lastGameId = -1;

const connectButton = document.getElementById("connectButton");

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    connectButton.innerText = shortenAddress(currentAccount);
    
    initContract();
  } else {
    //alert("MetaMask not found. Please install it.");
	//showNotification("❗ MetaMask not found. Please instal it.")
  }
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

async function initContract() {
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  await checkStatus();
}

connectButton.addEventListener("click", connectWallet);


let hasBet = false;

// HTML refs
const statusLeft = document.getElementById("statusLeft");
const statusRight = document.getElementById("statusRight");
const actionBtn = document.getElementById("actionBtn");
const walletDisplay = document.getElementById("walletAddress");
const coinImage = document.getElementById("coinImage");
const joinHeads = document.getElementById("joinHeads");
const joinTails = document.getElementById("joinTails");
const gameResult = document.getElementById("gameResult");
const leaveQueueButton = document.getElementById("leaveQueue");
const claimRefundButton = document.getElementById("claimRefund"); 

async function init() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    currentAccount = await signer.getAddress();
    // walletDisplay.innerText = currentAccount.slice(0, 6) + "..." + currentAccount.slice(-3);
	connectButton.innerText = shortenAddress(currentAccount);
    
    console.log("Connected:", currentAccount);
    checkStatus();
  } else {
    //showNotification("❗ MetaMask not found. Please instal it.")
  }
}

async function join(choice) {
	lastGameId = -1;
	try {
		const tx = await contract.joinQueue(choice === "heads" ? 0 : 1);
		await tx.wait();
		await checkStatus();
		const hasPendingGame = await contract.hasPendingGame(currentAccount);
		if (!hasPendingGame) {
			showLeaveQueueButton();
		}
		gameResult.content = "";
	} catch (err) {
		showNotification("❌ Join failed: " + err.message);
	}
}

async function leaveQueue() {
	try {
		const tx = await contract.leaveQueue();
		await tx.wait();
		await checkStatus();
		hideLeaveQueueButton();
		statusLeft.innerText = "";
		statusRight.innerText = "";
		changeStatus(0);
		showNotification("✅ Left queue");
	} catch (err) {
		showNotification("❌ Leave queue failed: " + err.message);
	}
}

async function placeBet() {
	try {
		const gameId = await contract.getActiveGameId(currentAccount);
		const BASE_BET = await contract.BASE_BET();
		const tx = await contract.placeBet(gameId, {value: BASE_BET});
		await tx.wait();
		await checkStatus();
		showPopup("✅ Bet placed!\nWaiting for the other player!");

		setInterval(showRefundButton(), 180000);
	} catch (err) {
		showNotification("❌ Place Bet failed: "+err.message);
		console.log(err);
	}
}

async function claimRefund() {
	try {
		const gameId = await contract.getActiveGameId(currentAccount);
		const tx = await contract.claimRefund(gameId);
		await tx.wait();
		showNotification("✅ Refund claimed!");
		await checkStatus();
	} catch (err) {
		console.log(err);
		showNotification("❌ Could not claim refund: " + err);
	}
}

async function checkStatus() {
  try {
	const inQueue = await contract.inQueue(currentAccount);
	if (inQueue) {
		changeStatus(1);

		statusLeft.innerText = shortenAddress(currentAccount)+": in queue";
		statusRight.innerText = "Waiting for players...";
		showLeaveQueueButton();
		
		return;
	}

	const hasPendingGame = await contract.hasPendingGame(currentAccount);
	if (!hasPendingGame && lastGameId == -1){
		return;
	}

	changeStatus(1);


	if (lastGameId > -1) {
		hideLeaveQueueButton();
		
		const game = await contract.games(lastGameId);
		const headsPlaced = await contract.hasPaid(lastGameId, game.headsPlayer.addr); //game.headsPlayer.addr !== ethers.constants.AddressZero && game.headsPlayer.bet > 0;
		const tailsPlaced = await contract.hasPaid(lastGameId, game.tailsPlayer.addr); //game.tailsPlayer.addr !== ethers.constants.AddressZero && game.tailsPlayer.bet > 0;

		statusLeft.innerText = headsPlaced ? shortenAddress(game.headsPlayer.addr)+": bet placed" : shortenAddress(game.headsPlayer.addr)+": waiting...";
		statusRight.innerText = tailsPlaced ? shortenAddress(game.tailsPlayer.addr)+": bet placed" : shortenAddress(game.tailsPlayer.addr)+": waiting...";

		
		if (game.result == 3) {
			if (await contract.hasPaid(lastGameId, currentAccount)){
				showRefundButton();
			}
			return;
		} else {
			hideRefundButton();
		}

		if (game.winner == currentAccount) {
			showPopup("You won! :)\nPrize: "+game.betAmount*2/(10**18)+" ETH")
		} else {
			showPopup("You lost! :(");
		}

		if (game.result == 0){
			gameResult.content = "Heads Won! The winner is "+shortenAddress(game.winner);
		} else if (game.result == 1){
			gameResult.content = "Tails Won! The winner is "+shortenAddress(game.winner);
		}

		changeStatus(0)
		lastGameId = -1;

		return;
	}

    const gameId = await contract.getActiveGameId(currentAccount);
	lastGameId = gameId;
    const game = await contract.games(lastGameId);
	
	showPopup("Match Found!")
	showNotification("✅ Match found!")

    const headsPlaced = await contract.hasPaid(lastGameId, game.headsPlayer.addr); //game.headsPlayer.addr !== ethers.constants.AddressZero && game.headsPlayer.bet > 0;
    const tailsPlaced = await contract.hasPaid(lastGameId, game.tailsPlayer.addr); //game.tailsPlayer.addr !== ethers.constants.AddressZero && game.tailsPlayer.bet > 0;

    statusLeft.innerText = headsPlaced ? shortenAddress(game.headsPlayer.addr)+": bet placed" : shortenAddress(game.headsPlayer.addr)+": waiting...";
    statusRight.innerText = tailsPlaced ? shortenAddress(game.tailsPlayer.addr)+": bet placed" : shortenAddress(game.tailsPlayer.addr)+": waiting...";

	
	if (game.result == 3) {
		return;
	} else {
		hideRefundButton();
	}

	if (game.winner == currentAccount) {
		showPopup("You won! :)\nPrize: "+game.betAmount*2/(10**18)+" ETH")
	} else {
		showPopup("You lost! :(");
	}

	if (game.result == 0){
		gameResult.content = "Heads Won! The winner is "+game.winner;
	} else if (game.result == 1){
		gameResult.content = "Tails Won! The winner is "+game.winner;
	}

	//lastGameId = -1;
	
	/*
    if (game.result !== 2) {
      const result = game.result === 0 ? "heads" : "tails";
      coinImage.src = `assets/${result}.png`;
    } else {
      coinImage.src = `assets/question.png`;
    }*/
  } catch (err) {
    console.error("Status error:", err);
  }
}

function changeStatus(new_status) {
	if (new_status == 0) {
		joinHeads.style.display = "inline";
		joinTails.style.display = "inline";
		actionBtn.style.display = "none";
	} else {
		joinHeads.style.display = "none";
		joinTails.style.display = "none";
		actionBtn.style.display = "inline";
	}
}

function showPopup(text) {
    const popup = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    content.textContent = text;
    popup.style.display = 'flex';
    
    // Optional: Auto-hide after 3 seconds
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
}

function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    container.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
      notification.remove();
    }, 4000);
}

function showLeaveQueueButton() {
	leaveQueueButton.style.display = "inline";
}

function hideLeaveQueueButton() {
	leaveQueueButton.style.display = "none";
}

function showRefundButton() {
	claimRefundButton.style.display = "inline";
}

function hideRefundButton() {
	claimRefundButton.style.display = "none";
}
//showPopup("MATCH FOUND")

setInterval(checkStatus, 5000);


// Trigger connection on load
window.addEventListener("load", init);
