class Game{
  constructor(){
    this.currentTurn = 0;
    this.gameBoard = Array.from(document.querySelectorAll(".game-section"));
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

  addPlayer(playerData){
    if(this.currentTurn === 0){
      this.playerOne = playerData;
    } else {
      this.playerTwo = playerData;
    }
  }

  playerTurn(target){
    if(this.playerOneSections.includes(target) || this.playerTwoSections.includes(target)){
      return;
    } else if((this.playerOneSections.length + this.playerTwoSections.length) === 8){
      this.updateGameStatus(this.playerOne, 0)
    } else if(this.currentTurn === 0){
      this.playerOneSections.push(target);
      this.gameBoard[target].innerHTML = `<div class = token>${this.playerOne.token}</div>`;
      this.updateGameStatus(this.playerTwo, 2);
      this.currentTurn = 1;
      this.checkGameConditions();
    } else {
      this.playerTwoSections.push(target);
      this.gameBoard[target].innerHTML = `<div class = token>${this.playerTwo.token}</div>`;
      this.updateGameStatus(this.playerOne, 2);
      this.currentTurn = 0;
      this.checkGameConditions();
    }
  }
  updateGameStatus(player, winCheck) {
    if(winCheck === 0){
      gameStateDisplay.innerText = `It's a draw! ${player.name}, pick a square to start a new game!`;
    }else if(winCheck === 1){
      gameStateDisplay.innerText = `${player.name} wins! ${player.name}, pick a square to start a new game!`
    } else {
      gameStateDisplay.innerText = `It's ${player.name}'s turn!`;
    }
  }


  checkGameConditions(){
    for(var i = 0; i < this.winConditions.length; i++){
      if(this.winConditions[i].every(index => this.playerOneSections.includes(index))){
        this.playerOne.updateStats();
        this.winAnimation(this.winConditions[i], this.playerOne);
      } else if (this.winConditions[i].every(index => this.playerTwoSections.includes(index))){
        this.playerTwo.updateStats();
        this.winAnimation(this.winConditions[i], this.playerTwo);
      }
    }
  }

  winAnimation(winningSections, winningPlayer){
    for(var i =0; i < winningSections.length; i++){
      var toAnimate = winningSections[i];
      this.gameBoard[toAnimate].childNodes[0].classList.add("token-spin");
    }
    success.play();
    this.endGame(winningPlayer);
  }

  clearGameBoard(){
    for(var i = 0; i < currentGame.gameBoard.length; i++){
      currentGame.gameBoard[i].innerHTML = "";
    }
  }


  endGame(winningPlayer){
    this.updateGameStatus(winningPlayer, 1);
    this.playerOneSections = [];
    this.playerTwoSections = [];
    setTimeout(currentGame.clearGameBoard, 1500);
    this.currentTurn = 0;
  }

  restartGame(){
    this.clearGameBoard();
    this.playerOneSections = [];
    this.playerTwoSections = [];
    this.currentTurn = 0;
  }

}
