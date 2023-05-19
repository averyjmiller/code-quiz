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

var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var startBttn = document.getElementById('start-bttn');
var choicesEl = document.getElementById('choices');
var questionEl = document.getElementById('question');
var bttnChoices = choicesEl.querySelectorAll('button');

// Randomly chooses the trivia
function chooseRandomTrivia() {
    var index = Math.floor(Math.random() * trivia.length);

    return trivia[index];
}

// Initiates and generates a new trivia question and displays the corrosponding choices randomly
function nextTrivia() {
    var nextTrivia = chooseRandomTrivia();
    var question = nextTrivia.question;
    var answer = nextTrivia.answer;
    var decoys = nextTrivia.decoys;
    var possibleChoices = answer.concat(decoys);
    var randomIndex;

    questionEl.textContent = question;

    for(i = 0; i < 4; i++){
        randomIndex = Math.floor(Math.random() * possibleChoices.length);
        bttnChoices[i].textContent = possibleChoices[randomIndex];
        possibleChoices.splice(randomIndex, 1);
    }
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

    nextTrivia();
});