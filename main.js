
var pageWindow = document.querySelector(".full-page");
var startPage = document.querySelector(".start-page");
var gamePage = document.querySelector(".game-page");
var newPlayerName = document.querySelector("#player-name");
var newPlayerSymbol = document.querySelector("#player-token");
var existingPlayerSelection = document.querySelector(".select-existing-player");

pageWindow.addEventListener("click", eventTargetIdentifier);
document.onload = onLoad();

function onLoad(){
  for(var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);
    var playerData = JSON.parse(localStorage.getItem(key));
    var id = playerData.id;
    var name = playerData.name;
    var token = playerData.token;
    var wins = playerData.wins;
    var existingPlayer = new Player(id, name, token, wins);
    var newOption = savedPlayerOption(id, name);
    existingPlayerSelection.appendChild(newOption);
    console.log(existingPlayer);
    console.log(existingPlayerSelection.InnerHTML);
  }
}
function savedPlayerOption(id, name){
  var newOption = document.createElement("option");
  var optionName = document.createTextNode(name);
  newOption.setAttribute("value", id);
  newOption.appendChild(optionName);
  return newOption;
}


function eventTargetIdentifier(event){
  var target = event.target.classList;
  if(target.contains("create-new-player")){
    debugger;
    createNewPlayer(event);
    clearStartPage(event);
  } else if(target.contains("choose-existing-player")){
    selectExistingPlayer();
    clearStartPage(event);
  }
}

function createNewPlayer(event){
  event.preventDefault();
  var playerName = newPlayerName.value;
  var playerSymbol = newPlayerSymbol.value;
  var newPlayer = new Player(Date.now(), playerName, playerSymbol, 0);
  newPlayer.saveToStorage();


}

function selectExistingPlayer(){

}

function clearStartPage(event){
  event.preventDefault();
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
}
