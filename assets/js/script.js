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
var saveScoreHeader = document.getElementById('save-score-header');
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
    renderQuizElement();
    setTime();
    currentAnswer = renderTrivia();
    return currentAnswer;
}

function renderQuizElement() {
    if(viewScoresEl.dataset.state == 'visible') {
        changeVisibility(viewScoresEl, 'hidden');
    }

    if(startEl.dataset.state == 'visible') {
        changeVisibility(startEl, 'hidden');
    }

    if(quizEl.dataset.state == 'hidden') {
        changeVisibility(quizEl, 'visible');
    }
}

// Starts the timer and displays the seconds left
function setTime() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = "Time: " + time;
        time--;

        if(time < 0) {
            clearInterval(timerInterval);
            renderSaveScoreElement();
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
        answerResultEl.setAttribute("style", "border-top: solid 1px grey; margin-top: 10px; padding: 10px");
    } else {
        time = time - 10;
        answerResultEl.textContent = "Wrong!";
        answerResultEl.setAttribute("style", "border-top: solid 1px grey; margin-top: 10px; padding: 10px");
    }
}

function renderSaveScoreElement() {
    // Hides the code quiz and the timer
    if(quizEl.dataset.state == 'visible') {
        changeVisibility(quizEl, 'hidden');
    }

    if(timerEl.dataset.state == 'visible') {
        changeVisibility(timerEl, 'hidden');
    }
    
    if(saveScoreEl.dataset.state == 'hidden') {
        changeVisibility(saveScoreEl, 'visible');
        userScoreEl.textContent = "Your final score is " + score;    
    }

    if(viewScoresEl.dataset.state == 'hidden') {
        changeVisibility(viewScoresEl, 'visible');
    }

    generateEndMessage();

    answerResultEl.textContent = "";

    // Method provided by https://stackoverflow.com/questions/1870441/remove-all-attributes
    while(answerResultEl.attributes.length > 0) {
        answerResultEl.removeAttribute(answerResultEl.attributes[0].name);
    }
}

function generateEndMessage() {
    var resultPercentage = (score / trivia.length) * 100;

    if(resultPercentage < 50) {
        saveScoreHeader.textContent = 'Yikes! Maybe study a bit more and try again.';
    } else if(resultPercentage < 80) {
        saveScoreHeader.textContent = "You're getting the hang of it! Study a little more and try again.";
    } else if(resultPercentage < 100) {
        saveScoreHeader.textContent = "Great job!";
    } else {
        saveScoreHeader.textContent = "Perfect score!";
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

    initialsEl.value = "";
}

function renderHighScoresElement() {
    if(quizEl.dataset.state == 'visible') {
        changeVisibility(quizEl, 'hidden');
    }

    if(saveScoreEl.dataset.state == 'visible') {
        changeVisibility(saveScoreEl, 'hidden');
    }

    if(timerEl.dataset.state == 'visible') {
        changeVisibility(timerEl, 'hidden');
    }

    if(startEl.dataset.state == 'visible') {
        changeVisibility(startEl, 'hidden');
    }

    if(viewScoresEl.dataset.state == 'visible') {
        changeVisibility(viewScoresEl, 'hidden');
    }

    if(highScoresEl.dataset.state == 'hidden') {
        changeVisibility(highScoresEl, 'visible');
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

function renderStartElement() {
    if(quizEl.dataset.state == 'visible') {
        changeVisibility(quizEl, 'hidden');
    }

    if(saveScoreEl.dataset.state == 'visible') {
        changeVisibility(saveScoreEl, 'hidden');
    }

    if(highScoresEl.dataset.state == 'visible') {
        changeVisibility(highScoresEl, 'hidden');
    }

    if(viewScoresEl.dataset.state == 'hidden') {
        changeVisibility(viewScoresEl, 'visible');
    }

    if(timerEl.dataset.state == 'hidden') {
        changeVisibility(timerEl, 'visible');
    }

    if(startEl.dataset.state == 'hidden') {
        changeVisibility(startEl, 'visible');
    }

    timerEl.textContent = "Time: 60";
}

function changeVisibility(element, visibility) {
    element.dataset.state = visibility;
    if(element.id == 'view-scores' || element.id == 'timer') {
        if(visibility === 'visible') {
            element.setAttribute("style", "visibility: visible");
        } else {
            element.setAttribute("style", "visibility: hidden");
        }
    } else {
        if(visibility === 'visible') {
            element.setAttribute("style", "display: block");
        } else {
            element.setAttribute("style", "display: none");
        }
    }
}

// When the user clicks the 'Start Quiz' button, initiates the quiz
startBttn.addEventListener("click", function (event) {
    // Prevents the page from refreshing
    event.preventDefault();

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

    renderStartElement();
});

clearScoresBttn.addEventListener("click", function(event) {
    event.preventDefault();

    clearHighScores();
});