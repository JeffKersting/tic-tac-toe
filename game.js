class Game{
  constructor(){
    this.currentTurn = 0;
    this.gameBoard = Array.from(document.querySelectorAll('.game-section'));
    this.winConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [6,4,2]
    ];
    this.playerOneSections = [];
    this.playerTwoSections = [];
  }

  addPlayer(playerData) {
    if (this.currentTurn === 0) {
      this.playerOne = playerData;
    } else if (this.currentTurn === 1) {
      this.playerTwo = playerData;
    }
  }

  playerTurn(target) {
    if (this.playerOneSections.includes(target) || this.playerTwoSections.includes(target)) {
      return;
    } else if ((this.playerOneSections.length + this.playerTwoSections.length) === 8) {
      updateGameStatus(this.playerOne, 0);
    } else if (this.currentTurn === 0) {
      this.playerOneSections.push(target);
      updateGameStatus(this.playerTwo, 2);
      changeCurrentTurn();
      this.checkGameConditions();
    } else {
      this.playerTwoSections.push(target);
      updateGameStatus(this.playerOne, 2);
      changeCurrentTurn();
      this.checkGameConditions();
    }
  }

  checkGameConditions() {
    for(var i = 0; i < this.winConditions.length; i++) {
      if (this.winConditions[i].every(index => this.playerOneSections.includes(index))) {
        this.playerOne.updateStats();
        this.winState(this.winConditions[i], this.playerOne);
      } else if (this.winConditions[i].every(index => this.playerTwoSections.includes(index))) {
        this.playerTwo.updateStats();
        this.winState(this.winConditions[i], this.playerTwo);
      }
    }
  }

  checkLosingPlayer(player) {
    if (this.playerOne === player) {
      return this.playerTwo;
    } else {
      return this.playerOne;
    }
  }

  winState(winningSections, winningPlayer) {
    removeAllPreviewEvent();
    for(var i = 0; i < winningSections.length; i++) {
      var toAnimate = winningSections[i];
      this.gameBoard[toAnimate].childNodes[0].classList.add('token-spin');
    }
    success.play();
    this.endGame(winningPlayer);
  }

  clearGameBoard() {
    for(var i = 0; i < currentGame.gameBoard.length; i++) {
      currentGame.gameBoard[i].innerHTML = '';
    }
  }

  endGame(winningPlayer) {
    updateGameStatus(winningPlayer, 1);
    this.playerOneSections = [];
    this.playerTwoSections = [];
    setTimeout(currentGame.clearGameBoard, 1500);
    updatePlayerDisplay(winningPlayer);
    setTimeout(restorePreviewTokenEvent, 1500);
  }

  restartGame() {
    this.clearGameBoard();
    updateGameStatus(this.playerOne, 2);
    this.playerOneSections = [];
    this.playerTwoSections = [];
    this.currentTurn = 0;
  }
}
