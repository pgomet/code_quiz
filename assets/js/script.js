var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var mainEl = document.getElementById('main');

var currentQuestionIndex = 0;
var time = questions.length;
var timerId;

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var questionEl = document.getElementById("question-title");
  questionEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function countdown() {
    var timeLeft = 60;
  
    // Sets the time every thousand milliseconds which is 1 second**
    var timeInterval = setInterval(function () {
  
      // If the time is longer than 1, it'll tell the time left along with the seconds remaining
      // Checks to see if the time left is greater than 1, if it is, it sets the timer to show the remaining seconds**
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      }
      // If the time is not greater or less of 1, it'll it'll show a new time if the first
      else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      }
      // if the condition is not true, the function will be given a different time
      // if it hits 0, it causes to display a message function. The clear interval stops the timer**
      else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }
  
// count down function starts
countdown();

function questionClick() {
// check if answer is wrong
if (this.value !== questions[currentQuestionIndex].correct) {
    // user loses time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    
    // display new time on top corner
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.fontSize = "150%";
    } 
    
    else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.fontSize = "150%";
    }

// display right/wrong feedback
feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
}, 1000);

// next question
currentQuestionIndex++;

if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // go to next page
    window.location.href = "score.html";
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// enter user initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;