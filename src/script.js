import questions from './questions.js';
const quizArea = document.querySelector('.quiz');

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    quizArea.innerHTML = '';
    
    const questionData = questions[currentQuestionIndex];
    
    // Create Question Element
    const question = document.createElement('h1');
    question.classList.add('question');
    question.textContent = questionData.question;
    quizArea.appendChild(question); 

    // Create Answer Buttons
    questionData.answers.forEach((answer) => {
        const ansBtn = document.createElement('button');
        ansBtn.classList.add('ans-btn');
        ansBtn.textContent = answer.text;
        ansBtn.addEventListener('click', () => checkAnswer(questionData, ansBtn));
        quizArea.appendChild(ansBtn); 
    });

    // Create Next Button
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next-btn');
    nextBtn.textContent = 'Next';
    nextBtn.addEventListener('click', handleNextButton);
    quizArea.appendChild(nextBtn);
}

function checkAnswer(questionData, selectedBtn) {
    const correctAnswer = questionData.answers.find(answer => answer.correct);
    const allButtons = quizArea.querySelectorAll('.ans-btn');
    
    // Disable all buttons and highlight the correct one
    allButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer.text) {
            btn.classList.add('correct-answer');
        }
    });

    // Update score and highlight wrong answer if applicable
    if (selectedBtn.textContent === correctAnswer.text) {
        score++;     
    } else {
        selectedBtn.classList.add('wrong-answer');
    }
}

function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quizArea.innerHTML = '';
    
    const resultText = document.createElement('h1');
    resultText.classList.add('result-text');
    resultText.textContent = 'Quiz Completed!';
    quizArea.appendChild(resultText); 
    
    const resultScore = document.createElement('h1');
    resultScore.classList.add('score');
    resultScore.textContent = `Your score is ${score} out of ${questions.length}`;
    quizArea.appendChild(resultScore); 
    
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('restart-btn');
    restartBtn.textContent = 'Restart';
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    });
    quizArea.appendChild(restartBtn);
}

// Initialize the quiz
loadQuestion();