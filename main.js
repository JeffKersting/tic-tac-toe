var startPage = document.querySelector(".start-page");
var gamePage = document.querySelector(".game-page");
var startButton = document.querySelector(".start-button");

startButton.addEventListener("click", clearStartPage);

function clearStartPage(event){
  event.preventDefault();
  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");
}
