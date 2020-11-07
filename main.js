
var pageWindow = document.querySelector(".full-page");
var startPage = document.querySelector(".start-page");
var gamePage = document.querySelector(".game-page");
var newPlayerName = document.querySelector("#player-name");
var newPlayerSymbol = document.querySelector("#player-token");
var existingPlayerSelection = document.querySelector(".select-existing-player");
var playerSelectStatus = document.querySelector(".player-select-status");
var playerOneNameDisplay = document.querySelector(".player-one");
var playerOneScoreDisplay = document.querySelector(".player-one-score");
var playerTwoNameDisplay = document.querySelector(".player-two");
var playerTwoScoreDisplay = document.querySelector(".player-two-score");
var gameStateDisplay = document.querySelector(".game-state");
var currentGame = new Game();

pageWindow.addEventListener("click", eventTargetIdentifier);
document.onload = onLoad();

function onLoad(){
  for(var i = 0; i < localStorage.length; i++){
    var playerKey = localStorage.key(i);
    var existingPlayer = createPlayerFromStorage(playerKey);
    var newOption = createPlayerOption(existingPlayer);
    existingPlayerSelection.appendChild(newOption);
  }
}

function createPlayerFromStorage(playerKey){
  var playerData = JSON.parse(localStorage.getItem(playerKey));
  var id = playerData.id;
  var name = playerData.name;
  var token = playerData.token;
  var wins = playerData.wins;
  var existingPlayer = new Player(id, name, token, wins);
  return existingPlayer;
}

function createNewPlayer(){
  var playerName = newPlayerName.value;
  var playerSymbol = newPlayerSymbol.value;
  var newPlayer = new Player(Date.now(), playerName, playerSymbol, 0);
  currentGame.addPlayer(newPlayer);
  populatePlayerArea(newPlayer);
  newPlayer.saveToStorage();
  return newPlayer;
}

function createPlayerOption(existingPlayer){
  var name = existingPlayer.name;
  var id = existingPlayer.id;
  var newOption = document.createElement("option");
  var optionName = document.createTextNode(name);
  newOption.setAttribute("value", id);
  newOption.appendChild(optionName);
  return newOption;
}


function eventTargetIdentifier(event){
  event.preventDefault();
  var target = event.target;
  if(target.classList.contains("create-new-player")){
    currentGame.addPlayer(createNewPlayer())
  } else if(target.classList.contains("choose-existing-player")){
    var playerKey = existingPlayerSelection.value;
    var existingPlayer = createPlayerFromStorage(playerKey);
    currentGame.addPlayer(existingPlayer);
    populatePlayerArea(existingPlayer);
  } else if(target.classList.contains("game-section")){
    currentGame.playerTurn(parseInt(target.id));

  }
}

function populatePlayerArea(playerData){
    if(currentGame.currentTurn === 0){
    playerOneNameDisplay.innerText = `${currentGame.playerOne.name} ${currentGame.playerOne.token}`;
    playerOneScoreDisplay.innerText = `${currentGame.playerOne.wins} wins`;
    playerSelectStatus.innerText = "Player Two: Create new player or select from saved";
    currentGame.currentTurn = 1;
    gameStateDisplay.innerText = `${currentGame.playerOne.name}'s Turn!`
  } else {
    playerTwoNameDisplay.innerText = `${currentGame.playerTwo.name} ${currentGame.playerTwo.token}`;
    playerTwoScoreDisplay.innerText = `${currentGame.playerTwo.wins} wins`;
    playerSelectStatus.innerText = "Player One: Create new player or select from saved";
    currentGame.currentTurn = 0;
    clearStartPage();
  }
}

function clearStartPage(event){
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
}
