// Jouw vragenblok met consistente namen: 'question' en 'answers'
const questions = [
    {
        question: "In welke maand van de islamitische kalender valt de Ramadan?",
        answers: [
            { text: "8e maand", correct: false },
            { text: "9e maand", correct: true },
            { text: "10e maand", correct: false }
        ]
    },
    {
        question: "Wat is het belangrijkste doel van het vasten volgens de Koran?",
        answers: [
            { text: "Honger lijden uit medelijden met arme mensen", correct: false },
            { text: "Godvruchtigheid (taqwa) verkrijgen", correct: true },
            { text: "Afvallen om gezond te blijven", correct: false },
        ]
    },
    { 
        question: "Wat moet je in je hart aanwezig hebben voordat je begint met vasten?", 
        answers: [{text: "Spijt", correct: false}, {text: "De intentie (niyyah)", correct: true}, {text: "Hoop", correct: false}] 
    },
    { 
        question: "Hoe noemen we de maaltijd vlak vóór het begin van de vastendag?", 
        answers: [{text: "Iftar", correct: false}, {text: "Suhoor", correct: true}, {text: "Fajr", correct: false}] 
    },
    { 
        question: "Wat is de soenna manier om het vasten te verbreken?", 
        answers: [{text: "Met een glas melk", correct: false}, {text: "Met dadels en water", correct: true}, {text: "Met een uitgebreide maaltijd", correct: false}] 
    },
    { 
        question: "Welke handeling maakt het vasten NIET ongeldig?", 
        answers: [{text: "Vergeten dat je vast en per ongeluk drinken", correct: true}, {text: "Expres een snoepje eten", correct: false}, {text: "Een slok water nemen tijdens de woedoe", correct: false}] 
    },
         {
        question: "Welke bijzondere nacht valt in de laatste 10 dagen van de Ramadan?",
        answers: [
            { text: "Laylat al-Qadr", correct: true },
            { text: "Isra en Mi'raj (de Hemelreis)", correct: false },
            { text: "De nacht van de maan", correct: false }        
        ]
    },
    { 
        question: "Welk gebed wordt er specifiek in de avonden van de Ramadan gebeden?", 
        answers: [{text: "Het Witr-gebed", correct: false}, {text: "Het Tarawih-gebed", correct: true}, {text: "Het Eid-gebed", correct: false}] 
    },
   {
        question: "Wat vieren we aan het einde van de maand Ramadan?",
        answers: [
            { text: "Offerfeest", correct: false },
            { text: "Eid al-Fitr", correct: true },
            { text: "Islamitische Nieuwjaar", correct: false }
        ]
    },
    { 
        question: "Wat is de naam van de poort in het Paradijs speciaal voor vastenden?", 
        answers: [{text: "Ar-Rayyaan", correct: true}, {text: "Al-Firdaws", correct: false}, {text: "As-Salaam", correct: false}] 
    },
    
];

let currentIdx = 0;
let score = 0;
let firstTry = true;

document.addEventListener('DOMContentLoaded', () => {
    const qTextElement = document.getElementById('question-text');
    const btnContainer = document.getElementById('answer-buttons');
    const scoreText = document.getElementById('score-display');
    const progressBar = document.getElementById('progress-bar');
    const correctSound = document.getElementById('correct-sound');

    function showQuestion() {
        resetState();
        firstTry = true;
        let currentQuestion = questions[currentIdx];
        
        // CORRIGEER HIER: .question moet overeenkomen met de tag in je lijst
        qTextElement.innerText = currentQuestion.question;
        
        progressBar.style.width = (currentIdx / questions.length) * 100 + "%";

        // CORRIGEER HIER: .answers moet overeenkomen met de tag in je lijst
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.onclick = () => selectAnswer(button, answer.correct);
            btnContainer.appendChild(button);
        });
    }

    function resetState() {
        while (btnContainer.firstChild) {
            btnContainer.removeChild(btnContainer.firstChild);
        }
    }

    function selectAnswer(btn, isCorrect) {
        if (isCorrect) {
            btn.classList.add('correct');
            
            // Audio trigger
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log("Audio play error"));
            }

            if (firstTry) {
                score++;
                scoreText.innerText = `Score: ${score}`;
            }

            setTimeout(() => {
                currentIdx++;
                if (currentIdx < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 1000);
        } else {
            btn.classList.add('wrong');
            btn.disabled = true;
            firstTry = false;
        }
    }

    function showResult() {
        resetState();
        progressBar.style.width = "100%";
        qTextElement.innerText = "Māshā Allāh! Je hebt de Ramadan Kennis Quiz afgerond.";
        scoreText.innerText = `Eindscore: ${score} van de ${questions.length}`;
        
        const rb = document.createElement('button');
        rb.innerText = "Opnieuw spelen";
        rb.classList.add('btn');
        rb.onclick = () => location.reload();
        btnContainer.appendChild(rb);
    }

    showQuestion();
});