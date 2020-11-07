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
      // debugger;
      this.playerOneSections.push(target);
      console.log(this.playerOneSections);
      this.checkGameConditions();
      this.gameBoard[target].innerText = this.playerOne.token;
      this.updateGameStatus(this.playerTwo);
      this.currentTurn = 1;
    } else {
      this.playerTwoSections.push(target);
      this.checkGameConditions();
      this.gameBoard[target].innerText = this.playerTwo.token;
      this.updateGameStatus(this.playerOne);
      this.currentTurn = 0;
    }
  }
  updateGameStatus(nextPlayer){
    gameStateDisplay.innerText = `It is ${nextPlayer.name}'s turn!`
  }


  checkGameConditions(){
    for(var i = 0; i < this.winConditions.length; i++){
      if(this.winConditions[i].every(index => this.playerOneSections.includes(index))){
        console.log("Player one wins");
      } else if (this.winConditions[i].every(index => this.playerTwoSections.includes(index))){
        console.log("Player two wins");
      }
    }
  }

  endGame(){

  }
}
