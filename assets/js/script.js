// Trivia object array
var trivia = [
    {
        question: "This is question 1?",
        answer: ["This is the correct answer for Q1."],
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 2?",
        answer: ["This is the correct answer for Q2."],
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 3?",
        answer: ["This is the correct answer for Q3."],
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 4?",
        answer: ["This is the correct answer for Q4."],
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    }
];

// HTML element variables
var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var startBttn = document.getElementById('start-bttn');
var choicesEl = document.getElementById('choices');
var questionEl = document.getElementById('question');
var bttnChoices = choicesEl.querySelectorAll('button');
var answerResultEl = document.getElementById('answer-result');
var timerEl = document.getElementById('timer');
var saveScoreEl = document.getElementById('save-score');
var userScoreEl = document.getElementById('score');
var submitBttn = document.getElementById('submit');
var initialsEl = document.getElementById('initials');
var highScoresEl = document.getElementById('high-scores');
var scoreListEl = document.getElementById('score-list');
var backBttn = document.getElementById('go-back');
var clearScoresBttn = document.getElementById('clear-scores');
var viewScoresEl = document.getElementById('view-scores');

// Declaring global variables
var triviaIndex;
var time;
var currentAnswer;
var score;

// Initializes the code quiz
function init() {
    triviaIndex = -1;
    time = 59;
    score = 0;
    setTime();
    currentAnswer = renderTrivia();
    return currentAnswer;
}

// Starts the timer and displays the seconds left
function setTime() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = "Time: " + time;
        time--;

        if(time < 0) {
            clearInterval(timerInterval);
            endOfQuiz();
        }

    }, 1000);
}

// Returns the next trivia object in the trivia array
// Returns null if there is no more trivia
function nextTrivia() {
    ++triviaIndex;

    if(triviaIndex < trivia.length) {
        return trivia[triviaIndex];
    } else {
        return null;
    }
}

// Initiates and generates a new trivia question
// Displays the corrosponding choices randomly
function renderTrivia() {
    var next = nextTrivia();
    if(next !== null) {
        var question = next.question;
        var answer = next.answer;
        var decoys = next.decoys;
        var possibleChoices = answer.concat(decoys);
        var randomIndex;
    
        questionEl.textContent = question;
    
        for(i = 0; i < 4; i++){
            randomIndex = Math.floor(Math.random() * possibleChoices.length);
            bttnChoices[i].textContent = possibleChoices[randomIndex];
            possibleChoices.splice(randomIndex, 1);
        }
        return answer
    } else {
        time = -1;
        
    }
}

function checkAnswer(userInput, answer) {
    if(userInput.textContent == answer) {
        score++;
        answerResultEl.textContent = "Correct!";
    } else {
        time = time - 10;
        answerResultEl.textContent = "Wrong!";
    }
}

function endOfQuiz() {
    // Hides the code quiz and the timer
    if(quizEl.dataset.state == 'visible') {
        quizEl.dataset.state = 'hidden';
        quizEl.setAttribute("style", "display: none");
    }

    if(timerEl.dataset.state == 'visible') {
        timerEl.dataset.state = 'hidden';
        timerEl.setAttribute("style", "visibility: hidden");
    }
    
    if(saveScoreEl.dataset.state == 'hidden') {
        saveScoreEl.dataset.state = 'visible';
        saveScoreEl.setAttribute("style", "display: block");
        userScoreEl.textContent = "Your final score is " + score;    
    }
}

function saveInitials() {
    var userInitials;

    if(initialsEl.value) {
        userInitials = initialsEl.value.trim();
    } else {
        userInitials = "Anonymous";
    }

    var scores = {
        initials: userInitials,
        score: score
    };

    localStorage.setItem("scores", JSON.stringify(scores));
}

function renderHighScoresElement() {
    if(quizEl.dataset.state == 'visible') {
        quizEl.dataset.state = 'hidden';
        quizEl.setAttribute("style", "display: none");
    }

    if(saveScoreEl.dataset.state == 'visible') {
        saveScoreEl.dataset.state = 'hidden';
        saveScoreEl.setAttribute("style", "display none");
    }

    if(timerEl.dataset.state == 'visible') {
        timerEl.dataset.state = 'hidden';
        timerEl.setAttribute("style", "visibility: hidden");
    }

    if(startEl.dataset.state == 'visible') {
        startEl.dataset.state = 'hidden';
        startEl.setAttribute("style", "display: none");
    }

    if(highScoresEl.dataset.state == 'hidden') {
        highScoresEl.dataset.state = 'visible';
        highScoresEl.setAttribute("style", "display: block");
    }
}

function renderHighScores() {
    var highScore = JSON.parse(localStorage.getItem("scores"));

    if(highScore != null) {
        var newScore = document.createElement('li');
        newScore.textContent = highScore.initials + " - " + highScore.score;
        scoreListEl.appendChild(newScore);
    }
}

// Method provided by https://www.w3schools.com/jsref/met_node_removechild.asp
function clearHighScores() {
    while(scoreListEl.hasChildNodes()) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }

    localStorage.removeItem("scores");
}

function renderStartScreen() {
    if(quizEl.dataset.state == 'visible') {
        quizEl.dataset.state = 'hidden';
        quizEl.setAttribute("style", "display: none");
    }

    if(saveScoreEl.dataset.state == 'visible') {
        saveScoreEl.dataset.state = 'hidden';
        saveScoreEl.setAttribute("style", "display none");
    }

    if(highScoresEl.dataset.state == 'visible') {
        highScoresEl.dataset.state = 'hidden';
        highScoresEl.setAttribute("style", "display: none");
    }

    if(timerEl.dataset.state == 'hidden') {
        timerEl.dataset.state = 'visible';
        timerEl.setAttribute("style", "visibility: visible");
    }

    if(startEl.dataset.state == 'hidden') {
        startEl.dataset.state = 'visible';
        startEl.setAttribute("style", "display: block");
    }

    timerEl.textContent = "Time: 60";
}

// When the user clicks the 'Start Quiz' button, initiates the quiz
startBttn.addEventListener("click", function (event) {
    // Prevents the page from refreshing
    event.preventDefault();
    // Makes the quiz visible
    quizEl.dataset.state = 'visible';
    quizEl.setAttribute("style", "display: block");
    // Makes the start screen hidden
    startEl.dataset.state = 'hidden';
    startEl.setAttribute("style", "display: none");

    currentAnswer = init();
});

// When the user clicks one of the trivia answers, renders the next trivia object in the trivia array
choicesEl.addEventListener("click", function(event) {
    event.preventDefault();

    var element = event.target;

    if(element.matches('button')) {
        checkAnswer(element, currentAnswer);
        currentAnswer = renderTrivia();
    }
});

// Event listener for when the user submits their initials to save their score
submitBttn.addEventListener("click", function(event) {
    event.preventDefault();
    
    saveInitials();
    renderHighScoresElement();
    renderHighScores();
});

viewScoresEl.addEventListener("click", function(event) {
    event.preventDefault();

    renderHighScoresElement();
});

backBttn.addEventListener("click", function(event) {
    event.preventDefault();

    renderStartScreen();
});

clearScoresBttn.addEventListener("click", function(event) {
    event.preventDefault();

    clearHighScores();
});