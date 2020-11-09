var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var newPlayerName = document.querySelector('#player-name');
var newPlayerSymbol = document.querySelector('#player-token');
var createNewButton = document.querySelector('.create-new-player');
var existingPlayerSelection = document.querySelector('.select-existing-player');
var chooseExistingButton = document.querySelector('.choose-existing-player');
var deleteExistingButton = document.querySelector('.delete-player');
var playerSelectStatus = document.querySelector('.player-select-status');
var playerOneNameDisplay = document.querySelector('.player-one');
var playerOneScoreDisplay = document.querySelector('.player-one-score');
var playerTwoNameDisplay = document.querySelector('.player-two');
var playerTwoScoreDisplay = document.querySelector('.player-two-score');
var playerOneDisplay = document.querySelector('.player-one-info');
var playerTwoDisplay = document.querySelector('.player-two-info');
var gamePageGrid = document.querySelector('.game-board');
var gameStateDisplay = document.querySelector('.game-state');
var optionsButton = document.querySelector('.options-button');
var optionsMenu = document.querySelector('.options-menu');
var exitMenuButton = document.querySelector('.exit-menu');
var selectPlayerButton = document.querySelector('.select-players');
var restartGameButton = document.querySelector('.restart-game');
var gameBoardSection = document.querySelectorAll('.game-section');
var currentGame = '';


createNewButton.addEventListener('click', createNewPlayer);
chooseExistingButton.addEventListener('click', chooseExisting);
deleteExistingButton.addEventListener('click', deleteExisting);
optionsButton.addEventListener('click', openOptionsMenu);
exitMenuButton.addEventListener('click', exitMenu);
selectPlayerButton.addEventListener('click', selectPlayer);
restartGameButton.addEventListener('click', restartGame);

gameBoardSection.forEach(section => {
  section.addEventListener('mouseenter', previewToken);
});

gameBoardSection.forEach(section => {
  section.addEventListener('mouseleave', removePreviewToken);
});

gameBoardSection.forEach(section => {
  section.addEventListener('click', gameBoardEvent);
});



document.onload = onLoad();

function onLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var playerKey = localStorage.key(i);
    var existingPlayer = createPlayerFromStorage(playerKey);
    var newOption = createPlayerOption(existingPlayer);
    existingPlayerSelection.appendChild(newOption);
  }
  currentGame = new Game();
}

function createPlayerFromStorage(playerKey) {
  var player = JSON.parse(localStorage.getItem(playerKey));
  var existingPlayer = new Player(player.id, player.name, player.token, player.wins);
  return existingPlayer;
}

function createNewPlayer(event) {
  event.preventDefault();
  if (newPlayerInputCheck()) {
    return;
  }
  var newPlayer = new Player(Date.now(), newPlayerName.value, newPlayerSymbol.value, 0);
  var newOption = createPlayerOption(newPlayer);
  currentGame.addPlayer(newPlayer);
  newPlayer.saveToStorage();
  existingPlayerSelection.appendChild(newOption);
  populatePlayerArea(newPlayer);
  updateNewPlayerDisplay();
  return newPlayer;
}

function newPlayerInputCheck() {
  if (newPlayerName.value.length === 0 || newPlayerSymbol.value === 'Choose your token') {
    return true;
  }
}

function createPlayerOption(existingPlayer) {
  var name = existingPlayer.name;
  var id = existingPlayer.id;
  var newOption = document.createElement('option');
  var optionName = document.createTextNode(name);
  newOption.setAttribute('id', id);
  newOption.setAttribute('value', id);
  newOption.appendChild(optionName);
  return newOption;
}

function deletePlayer(playerKey) {
  var player = JSON.parse(localStorage.getItem(playerKey));
  var optionToDelete = document.getElementById(playerKey);
  var existingPlayer = new Player(player.id, player.name, player.token, player.wins);
  existingPlayer.deleteFromStorage();
  existingPlayerSelection.removeChild(optionToDelete);
}

function chooseExisting(event) {
  event.preventDefault();
  var existingPlayer = createPlayerFromStorage(existingPlayerSelection.value);
  currentGame.addPlayer(existingPlayer);
  populatePlayerArea(existingPlayer);
  updateExistingPlayerDisplay();
}

function gameBoardEvent(event) {
  event.preventDefault();
  var targetParent = event.target.parentNode;
  var gameBoardSection = parseInt(event.target.parentNode.id);
  targetParent.removeEventListener('mouseenter', previewToken);
  targetParent.removeEventListener('mouseleave', removePreviewToken);
  currentGame.playerTurn(gameBoardSection);
}

function deleteExisting(event) {
  event.preventDefault();
  updateExistingPlayerDisplay();
  deletePlayer(existingPlayerSelection.value);
}

function openOptionsMenu(event) {
  event.preventDefault();
  removeAllPreviewEvent();
  menuBlur();
}

function exitMenu(event) {
  event.preventDefault();
  restoreUnusedPreviewToken();
  menuBlur();
}

function selectPlayer(event) {
  event.preventDefault();
  currentGame.restartGame();
  menuBlur();
  restorePreviewTokenEvent();
  changePage();
  updateExistingPlayerDisplay();
  updateNewPlayerDisplay();
}

function restartGame(event) {
  event.preventDefault();
  currentGame.restartGame();
  menuBlur();
  restorePreviewTokenEvent();
}

function clearGameBoard() {
  for (var i = 0; i < currentGame.gameBoard.length; i++) {
    currentGame.gameBoard[i].innerHTML = '';
  }
}

function populatePlayerArea(playerData) {
  if (currentGame.currentTurn === 0) {
    updatePlayerDisplay(playerData);
    updateSelectStatus('Player Two');
    changeCurrentTurn();
    updateGameStatus(currentGame.playerOne, 2);
  } else {
    updatePlayerDisplay(playerData);
    updateSelectStatus('Player One');
    changeCurrentTurn();
    changePage();
  }
}

function updatePlayerDisplay(playerData) {
  if (currentGame.playerOne === playerData) {
    playerOneNameDisplay.innerText = `${currentGame.playerOne.name} ${currentGame.playerOne.token}`;
    playerOneScoreDisplay.innerText = `${currentGame.playerOne.wins} wins`;
  } else {
    playerTwoNameDisplay.innerText = `${currentGame.playerTwo.name} ${currentGame.playerTwo.token}`;
    playerTwoScoreDisplay.innerText = `${currentGame.playerTwo.wins} wins`;
  }
}

function updateGameStatus(player, winCheck) {
  if (winCheck === 0) {
    gameStateDisplay.innerText = `It's a draw! ${player.name}, pick a square to start a new game!`;
  } else if (winCheck === 1) {
    var losingPlayer = currentGame.checkLosingPlayer(player);
    gameStateDisplay.innerText = `${player.name} wins! ${losingPlayer.name}, pick a square to start a new game!`;
  } else {
    gameStateDisplay.innerText = `It's ${player.name}'s turn!`;
  }
}

function updateSelectStatus(playerSelecting) {
  playerSelectStatus.innerText = `${playerSelecting}: Create new player or select from saved`;
}

function updateExistingPlayerDisplay() {
  existingPlayerSelection.value = 'Select a player!';
}

function updateNewPlayerDisplay() {
  newPlayerName.value = '';
  newPlayerSymbol.value = 'Choose your token';
}

function changePage(event) {
  startPage.classList.toggle('hidden');
  gamePage.classList.toggle('hidden');
}

function changeCurrentTurn() {
  if (currentGame.currentTurn === 0) {
    currentGame.currentTurn = 1;
  } else {
    currentGame.currentTurn = 0;
  }
}

function menuBlur() {
  optionsMenu.classList.toggle('hidden');
  gamePageGrid.classList.toggle('blur');
  playerOneDisplay.classList.toggle('blur');
  playerTwoDisplay.classList.toggle('blur');
  optionsButton.classList.toggle('hidden');
}

function winAnimation(winningSections) {
  for (var i = 0; i < winningSections.length; i++) {
    var toAnimate = winningSections[i];
    currentGame.gameBoard[toAnimate].childNodes[0].classList.add('token-spin');
  }
}

function tokenColorCheck(playerToken) {
  if (playerToken === '♠' || playerToken === '♣') {
    return 'black';
  } else {
    return 'red';
  }
}

function previewToken(event) {
  event.preventDefault();
  var target = event.target.id;
  if (currentGame.currentTurn === 0) {
    var tokenColor = tokenColorCheck(currentGame.playerOne.token);
    var player = currentGame.playerOne;
  } else {
    var tokenColor = tokenColorCheck(currentGame.playerTwo.token);
    var player = currentGame.playerTwo;
  }
  currentGame.gameBoard[target].innerHTML += `<div class='token ${tokenColor}'>${player.token}</div>`;
}

function removePreviewToken(event) {
  event.preventDefault();
  var target = event.target;
  if (currentGame.gameBoard[target.id].childNodes.length > 0) {
    currentGame.gameBoard[target.id].childNodes[0].remove();
  }
}

function removeAllPreviewEvent() {
  gameBoardSection.forEach(section => {
    section.removeEventListener('mouseenter', previewToken);
  });
  gameBoardSection.forEach(section => {
    section.removeEventListener('mouseleave', removePreviewToken);
  });
}

function restorePreviewTokenEvent() {
  gameBoardSection.forEach(section => {
    section.addEventListener('mouseenter', previewToken);
  });
  gameBoardSection.forEach(section => {
    section.addEventListener('mouseleave', removePreviewToken);
  });
}

function restoreUnusedPreviewToken() {
  gameBoardSection.forEach(section => {
    if (section.childNodes.length > 0) {
      return;
    } else {
      section.addEventListener('mouseenter', previewToken);
    }
  })
  gameBoardSection.forEach(section => {
    if (section.childNodes.length > 0) {
      return;
    } else {
      section.addEventListener('mouseleave', removePreviewToken);
    }
  })
}
