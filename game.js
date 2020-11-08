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
    }
    if(this.currentTurn === 0){
      this.playerOneSections.push(target);
      this.gameBoard[target].innerHTML = `<div class = token>${this.playerOne.token}</div>`;
      this.updateGameStatus(this.playerTwo, false);
      this.currentTurn = 1;
      this.checkGameConditions();
    } else {
      this.playerTwoSections.push(target);
      this.gameBoard[target].innerHTML = `<div class = token>${this.playerTwo.token}</div>`;
      this.updateGameStatus(this.playerOne, false);
      this.currentTurn = 0;
      this.checkGameConditions();
    }
  }
  updateGameStatus(player, winCheck) {
    if(winCheck === true){
      gameStateDisplay.innerText = `${player.name} wins!`
    } else {
      gameStateDisplay.innerText = `It is ${player.name}'s turn!`
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
    this.updateGameStatus(winningPlayer, true);
    this.playerOneSections = [];
    this.playerTwoSections = [];
    setTimeout(currentGame.clearGameBoard, 1500);
    setTimeout(populatePlayerArea(currentGame.playerOne), 1500);
    setTimeout(populatePlayerArea(currentGame.playerTwo), 1500);
    this.currentTurn = 0;
  }

}
