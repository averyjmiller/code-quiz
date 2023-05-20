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
var timerEl = document.getElementById('timer');

// Declaring global variables
var triviaIndex;
var time;
var currentAnswer;

// Initializes the code quiz
function init() {
    triviaIndex = -1;
    time = 10;
    setTime();
    currentAnswer = renderTrivia();
    return currentAnswer;
}

// Returns the next trivia object in the trivia array
// Returns null if there is no more trivia
function nextTrivia() {
    ++triviaIndex;

    if(triviaIndex < trivia.length) {
        return trivia[triviaIndex];
    } else {
        console.log('Finished');
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
    }
}

function checkAnswer(userInput, answer) {
    if(userInput.textContent == answer) {
        console.log("CORRECT!");
    } else {
        console.log("WRONG!");
    }
}

// Starts the timer and displays the seconds left
function setTime() {
    var timerInterval = setInterval(function() {
        timerEl.textContent = "Time: " + time;
        time--;

        if(time < 0) {
            clearInterval(timerInterval);
            console.log("TIME IS UP");
        }

    }, 1000);
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
    var element = event.target;

    if(element.matches('button')) {
        checkAnswer(element, currentAnswer);
        currentAnswer = renderTrivia();
    }
});