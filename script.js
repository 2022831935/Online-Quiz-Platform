const quizData = [
    {
        question: "What is the output of the following code snippet? \n\n```javascript\nconsole.log(1 + '2' + '2');\n```",
        options: ["122", "5", "124", "SyntaxError"],
        correct: "122"
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        options: ["myVar", "_myVar", "2myVar", "$myVar"],
        correct: "2myVar"
    },
    {
        question: "What is the output of the following code snippet? \n\n```javascript\nconsole.log(typeof null);\n```",
        options: ["null", "object", "undefined", "number"],
        correct: "object"
    },
    {
        question: "What does the acronym 'JSON' stand for?",
        options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "JavaScript Ordered Notation", "Java Standard Output Network"],
        correct: "JavaScript Object Notation"
    },
    {
        question: "Which keyword is used to declare a block scope variable in JavaScript?",
        options: ["var", "let", "const", "block"],
        correct: "let"
    },
    {
        question: "What will the following code output?\n\n```javascript\nconsole.log('5' - 3);\n```",
        options: ["2", "53", "'2'", "TypeError"],
        correct: "2"
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        options: ["push()", "append()", "addToEnd()", "concat()"],
        correct: "push()"
    },
    {
        question: "What is the correct way to check if a variable 'x' is not equal to 10 in JavaScript?",
        options: ["if (x != 10)", "if (x <> 10)", "if (x !== 10)", "if (x not 10)"],
        correct: "if (x != 10)"
    },
    {
        question: "Which method is used to start a timer that calls a function or evaluates an expression at specified intervals (in milliseconds)?",
        options: ["setInterval()", "setTimeout()", "startTimer()", "setTime()"],
        correct: "setInterval()"
    },
    {
        question: "What will be the output of the following code snippet?\n\n```javascript\nconsole.log('hello'.charAt(0));\n```",
        options: ["undefined", "h", "o", "e"],
        correct: "h"
    },
    {
        question: "In JavaScript, what does the 'NaN' stand for?",
        options: ["Not a Null", "Not a Negative", "Not a Number", "Not a Node"],
        correct: "Not a Number"
    },
    {
        question: "Which method returns the characters in a string beginning at the specified location through the specified number of characters?",
        options: ["slice()", "substring()", "substr()", "splice()"],
        correct: "substr()"
    },
    {
        question: "What is the output of the following code snippet?\n\n```javascript\nconsole.log(typeof undefined);\n```",
        options: ["undefined", "null", "object", "undefined"],
        correct: "undefined"
    },
    {
        question: "What is the result of the expression `2 + '2'` in JavaScript?",
        options: ["4", "22", "'22'", "TypeError"],
        correct: "'22'"
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["pop()", "shift()", "slice()", "splice()"],
        correct: "pop()"
    },
    {
        question: "What is the output of the following code snippet? \n\n```javascript\nconsole.log(1 + 1);\n```",
        options: ["2", "'2'", "11", "SyntaxError"],
        correct: "2"
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        correct: "const"
    },
    {
        question: "What will be the result of the following expression? \n\n```javascript\nfalse == '0'\n```",
        options: ["true", "false", "undefined", "SyntaxError"],
        correct: "true"
    },
    {
        question: "What will the following code output?\n\n```javascript\nconsole.log(+'3' - 1);\n```",
        options: ["32", "4", "2", "SyntaxError"],
        correct: "2"
    },
    {
        question: "Which operator is used to check the type and value of a variable in JavaScript?",
        options: ["===", "==", "=", "!=="],
        correct: "==="
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('time');
const progressBar = document.getElementById('progress-bar');

let currentQuiz = 0;
let score = 0;
let timeLeft = 10;
let timer;

loadQuiz();

function loadQuiz() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = timeLeft;
    timer = setInterval(updateTimer, 1000);

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${option}" class="answer">
            <label for="option${index}">${option}</label>
        `;
        optionsEl.appendChild(optionElement);
    });

    progressBar.style.width = `${(currentQuiz / quizData.length) * 100}%`;
}

function updateTimer() {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft === 0) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }
}

function getSelected() {
    let selectedOption;
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        if (answer.checked) {
            selectedOption = answer.value;
        }
    });
    return selectedOption;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }
});

function showResults() {
    clearInterval(timer);
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
    `;
}
