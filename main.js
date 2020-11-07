
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
  populatePlayerArea(newPlayer);
  newPlayer.saveToStorage();
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
    createNewPlayer();
  } else if(target.classList.contains("choose-existing-player")){
    var playerKey = existingPlayerSelection.value;
    var existingPlayer = createPlayerFromStorage(playerKey);
    populatePlayerArea(existingPlayer);
  }
}

function populatePlayerArea(playerData){
  if(parseInt(playerSelectStatus.id) === 0){
    playerOneNameDisplay.innerText = `${playerData.name} ${playerData.token}`;
    playerOneScoreDisplay.innerText = `${playerData.wins} wins`;
    playerSelectStatus.innerText = "Player Two: Create new player or select from saved";
    playerSelectStatus.id = 1;
  } else {
    playerTwoNameDisplay.innerText = `${playerData.name} ${playerData.token}`;
    playerTwoScoreDisplay.innerText = `${playerData.wins} wins`;
    playerSelectStatus.innerText = "Player One: Create new player or select from saved";
    playerSelectStatus.id = 0;
    clearStartPage();
  }
}

function clearStartPage(event){
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
}
