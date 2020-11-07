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
      this.updateGameStatus(this.playerTwo);
      this.currentTurn = 1;
      this.checkGameConditions();
    } else {
      this.playerTwoSections.push(target);
      this.gameBoard[target].innerHTML = `<div class = token>${this.playerTwo.token}</div>`;
      this.updateGameStatus(this.playerOne);
      this.currentTurn = 0;
      this.checkGameConditions();
    }
  }
  updateGameStatus(nextPlayer){
    gameStateDisplay.innerText = `It is ${nextPlayer.name}'s turn!`
  }


  checkGameConditions(){
    for(var i = 0; i < this.winConditions.length; i++){
      if(this.winConditions[i].every(index => this.playerOneSections.includes(index))){
        console.log(this.winConditions[i]);
        this.winAnimation(this.winConditions[i]);
        console.log("Player one wins");

      } else if (this.winConditions[i].every(index => this.playerTwoSections.includes(index))){
        this.winAnimation(this.winConditions[i]);
        console.log("Player two wins");
      }
    }
  }
  winAnimation(winningSections){
    for(var i =0; i < winningSections.length; i++){
      var toAnimate = winningSections[i];
      this.gameBoard[toAnimate].childNodes[0].classList.add("token-spin");
    }
    success.play();
  }

  endGame(){

  }
}
