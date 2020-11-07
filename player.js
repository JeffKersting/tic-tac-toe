class Player{
  constructor(id, name, symbol){
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.wins = 0;
  }
  saveToStorage(){
    localStorage.setItem(JSON.stringify(this.id, JSON.stringify(this);
  }
  deleteFromStorage(){
    localStorage.removeItem(this.id);
  }
  updateStats(){
    var player = JSON.parse(localStorage.getItem(this.id));
    player.wins ++;
    player.saveToStorage();
  }
}
