class Player{
  constructor(id, name, token, wins){
    this.id = id;
    this.name = name;
    this.token = token;
    this.wins = 0;
  }
  saveToStorage(){
    localStorage.setItem(this.id, JSON.stringify(this));
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
