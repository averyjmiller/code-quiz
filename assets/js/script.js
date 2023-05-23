// Trivia object array
var trivia = [
    {
        question: "Commonly used data types DO not include:",
        answer: ["alerts"],
        decoys: ["strings", "booleans", "numbers"]
    },
    {
        question: "The condition in an if / else statement is enclosed with ______.",
        answer: ["parenthesis"],
        decoys: ["quotes", "curly brackets", "square brackets"]
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answer: ["all of the above"],
        decoys: ["numbers and strings", "other arrays", "booleans"]
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer: ["quotes"],
        decoys: ["commas", "curly brackets", "parenthesis"]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: ["console.log"],
        decoys: ["JavaScript", "terminal/bash", "for loops"]
    },
    {
        question: "What does HTML stand for?",
        answer: ["Hyper Text Markup Language"],
        decoys: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: ["<script>"],
        decoys: ["<js>", "<scripting>", "<javascript>"]
    },
    {
        question: "How do you write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answer: ["if (i != 5) {code;}"],
        decoys: ["if i =! 5 then {code;}", "if i <> 5", "if (i <> 5)"]
    },
    {
        question: "CSS stands for ______ Style Sheets.",
        answer: ["Cascading"],
        decoys: ["Creative", "Content", "Cartographic"]
    },
    {
        question: "Below are examples of comparison operators except for which of the following?",
        answer: ["&&"],
        decoys: ["===", ">", "!="]
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
    timerEl.dataset.finalCount = 'false';
    score = 0;
    renderQuizElement();
    setTime();
    currentAnswer = renderTrivia();
    return currentAnswer;
}

// Makes the quiz element visible and the view-scores and start elements hidden
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

        if(time < 10 && timerEl.dataset.finalCount == 'false') {
            timerEl.setAttribute("style", "color: red; font-weight: bolder;");
            timerEl.dataset.finalCount = 'true';
        }

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
            bttnChoices[i].textContent = (i+1) + '. ' + possibleChoices[randomIndex];
            possibleChoices.splice(randomIndex, 1);
        }
        return answer
    } else {
        time = -1;
        
    }
}

// Takes in the user's answer and the correct answer and compares them
function checkAnswer(userInput, answer) {
    userInput = userInput.textContent.slice(3);
    if(userInput == answer) {
        score++;
        answerResultEl.textContent = "Correct!";
        answerResultEl.setAttribute("style", "color: grey; border-top: solid 1px grey; margin-top: 10px; padding: 10px");
    } else {
        time = time - 10;
        answerResultEl.textContent = "Wrong!";
        answerResultEl.setAttribute("style", "color: grey; border-top: solid 1px grey; margin-top: 10px; padding: 10px");
    }
}

// Makes the save-score element visible and all the other screens hidden
function renderSaveScoreElement() {
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

    // Clears the textContent of the answer result element
    answerResultEl.textContent = "";

    // Method provided by https://stackoverflow.com/questions/1870441/remove-all-attributes
    // removes all the attributes of the answer result element
    while(answerResultEl.attributes.length > 0) {
        answerResultEl.removeAttribute(answerResultEl.attributes[0].name);
    }
}

// Generates the end message based on the user's quiz result
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

// Takes in the user's input in the form and assigns it to the scores object variable
// Uses local storage to save the scores object variable
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

// Makes the high scores element visible and all other screens hidden
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

// Renders the saved score from the local storage and displays it in a list in the high scores element
function renderHighScores() {
    var highScore = JSON.parse(localStorage.getItem("scores"));

    if(highScore != null) {
        var newScore = document.createElement('li');
        newScore.textContent = highScore.initials + " - " + highScore.score;
        scoreListEl.appendChild(newScore);
        newScore.setAttribute("style", "margin: 5px 0; background-color: #faebd7;")
    }
}

// Method provided by https://www.w3schools.com/jsref/met_node_removechild.asp
// Removes all of the child nodes in the high scores list and removes the item from local storage
function clearHighScores() {
    while(scoreListEl.hasChildNodes()) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }

    localStorage.removeItem("scores");
}

// Makes the start screen element visible and all other screens hidden
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

// Changes the visibility of the desired element
// visibility parameter accepts the following inputs: 'visible', 'hidden'
// 'view-scores' and 'timer' elements are given different attributes for styling purposes
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

// When the user submits, their initials and score is saved and displayed
submitBttn.addEventListener("click", function(event) {
    event.preventDefault();
    
    saveInitials();
    renderHighScoresElement();
    renderHighScores();
});

// When the user clicks the view scores element, the high scores are rendered
viewScoresEl.addEventListener("click", function(event) {
    event.preventDefault();

    renderHighScoresElement();
});

// When the user clicks the back button in the high scores screen, the start screen element is rendered
backBttn.addEventListener("click", function(event) {
    event.preventDefault();

    renderStartElement();
});

// When the user clicks the clear scores button, the high scores are deleted
clearScoresBttn.addEventListener("click", function(event) {
    event.preventDefault();

    clearHighScores();
});