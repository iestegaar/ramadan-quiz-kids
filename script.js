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
    },
    { 
        question: "Wat moet je in je hart aanwezig hebben voordat je begint met vasten?", 
        answers: [{text: "Een volle maag", correct: false}, {text: "De intentie (Niyyah)", correct: true}, {text: "Nieuwe kleren", correct: false}] 
    },
    { 
        question: "Wat is de Sunnah manier om het vasten te verbreken?", 
        answers: [{text: "Met een glas melk", correct: false}, {text: "Met dadels en water", correct: true}, {text: "Met een uitgebreide maaltijd", correct: false}] 
    },
    { 
        question: "Welke handeling maakt het vasten NIET ongeldig?", 
        answers: [{text: "Vergeten dat je vast en per ongeluk drinken", correct: true}, {text: "Expres een snoepje eten", correct: false}, {text: "Een slok water nemen tijdens woedoe", correct: false}] 
    },
    { 
        question: "Waarom vasten moslims tijdens de Ramadan?", 
        answers: [{text: "Om te voelen hoe het is voor arme mensen en Taqwa te krijgen", correct: true}, {text: "Omdat we overdag niet mogen koken", correct: false}, {text: "Alleen om fit te blijven", correct: false}] 
    },
    { 
        question: "Welk gebed wordt er specifiek in de avonden van de Ramadan gebeden?", 
        answers: [{text: "Het Witr gebed", correct: false}, {text: "Het Tarawih gebed", correct: true}, {text: "Het Eid gebed", correct: false}] 
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