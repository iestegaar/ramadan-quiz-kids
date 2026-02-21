const questions = [
    {
        question: "Wat is het belangrijkste doel van het vasten volgens de Koran?",
        answers: [
            { text: "Alleen maar honger lijden", correct: false },
            { text: "Godvruchtigheid (Taqwa) verkrijgen", correct: true },
            { text: "Afvallen", correct: false },
            { text: "Langer slapen", correct: false }
        ]
    },
    {
        question: "In welke maand van de Islamitische kalender valt de Ramadan?",
        answers: [
            { text: "7e maand", correct: false },
            { text: "8e maand", correct: false },
            { text: "9e maand", correct: true },
            { text: "10e maand", correct: false }
        ]
    },
    {
        question: "Wat vieren we aan het einde van de maand Ramadan?",
        answers: [
            { text: "Offerfeest", correct: false },
            { text: "Mevlid", correct: false },
            { text: "Eid al-Fitr (Suikerfeest)", correct: true },
            { text: "Nieuwjaar", correct: false }
        ]
    },
    {
        question: "Welke bijzondere nacht valt in de laatste 10 dagen van de Ramadan?",
        answers: [
            { text: "Laylat al-Qadr", correct: true },
            { text: "Isra en Mi'raj", correct: false },
            { text: "De nacht van de maan", correct: false },
            { text: "Vrijdagnacht", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choiceButtons = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    // Update voortgangsbalk
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) { button.dataset.correct = answer.correct; }
        button.addEventListener("click", selectAnswer);
        choiceButtons.appendChild(button);
    });
}

function resetState() {
    while (choiceButtons.firstChild) {
        choiceButtons.removeChild(choiceButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "#2ecc71";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "#e74c3c";
        selectedBtn.classList.add("shake"); // Voegt een fout-animatie toe
    }

    scoreElement.innerText = `Score: ${score}`;
    
    // Wacht 1 seconde en ga naar de volgende vraag
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1000);
}

function showScore() {
    resetState();
    progressBar.style.width = "100%";
    questionElement.innerText = `Klaar! Je hebt ${score} van de ${questions.length} punten gehaald. Moge Allah je kennis vermeerderen!`;
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Opnieuw Spelen";
    restartBtn.onclick = () => location.reload();
    choiceButtons.appendChild(restartBtn);
}

startQuiz();