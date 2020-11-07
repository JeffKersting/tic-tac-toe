class Game{
  constructor(){
    this.currentTurn = 0;
    this.winConditions = [];
    this.gameBoard = document.querySelectorAll(game-section)
  }

  addPlayer(playerData){
    if(this.currentTurn === 0){
      this.playerOne = playerData;
    } else {
      this.playerTwo = playerData;
    }
  }

  playerTurn(){
    if(this.currentTurn === 0){

    }
  }
  checkGameConditions(){

  }
  endGame(){

  }
}
