function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}
  
document.getElementById("clear").onclick = clearHighscores;
  
// when the page loads, run the function to show high scores
printHighscores();
}