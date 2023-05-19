// Trivia object array
var trivia = [
    {
        question: "This is question 1?",
        answer: "This is the correct answer for Q1.",
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 2?",
        answer: "This is the correct answer for Q2.",
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 3?",
        answer: "This is the correct answer for Q3.",
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    },
    {
        question: "This is question 4?",
        answer: "This is the correct answer for Q4.",
        decoys: ["decoy 1", "decoy 2", "decoy 3"]
    }
];

var startEl = document.getElementById('start');
var quizEl = document.getElementById('quiz');
var startBttn = document.getElementById('start-bttn');

startBttn.addEventListener("click", function (event) {
    // Prevents the page from refreshing
    event.preventDefault();
    // Makes the quiz visible
    quizEl.dataset.state = 'visible';
    quizEl.setAttribute("style", "display: block");
    // Makes the start screen hidden
    startEl.dataset.state = 'hidden';
    startEl.setAttribute("style", "display: none");
});