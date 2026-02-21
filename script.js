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
        question: "Welk gebed wordt er specifiek in de avonden van de Ramadan gebeden?", 
        answers: [{text: "Het Witr gebed", correct: false}, {text: "Het Tarawih gebed", correct: true}, {text: "Het Eid gebed", correct: false}] 
    },
    { 
        question: "Wat is de naam van de poort in het Paradijs speciaal voor vastenden?", 
        answers: [{text: "Ar-Rayyaan", correct: true}, {text: "Al-Firdaws", correct: false}, {text: "As-Salaam", correct: false}] 
    },
        { question: "Hoe noemen we de maaltijd vlak vóór het begin van de vastendag?", answers: [{text: "Iftar", correct: false}, {text: "Suhoor", correct: true}, {text: "Maghrib", correct: false}] },
        // Voeg hier meer vragen toe...
    ];

let currentIdx = 0;
let score = 0;
let firstTry = true;

// Wacht tot de HTML elementen geladen zijn
document.addEventListener('DOMContentLoaded', () => {
    const qText = document.getElementById('question-text');
    const btnContainer = document.getElementById('answer-buttons');
    const scoreText = document.getElementById('score-display');
    const progressBar = document.getElementById('progress-bar');
    const correctSound = document.getElementById('correct-sound');

    function showQuestion() {
        resetState();
        firstTry = true;
        let q = questions[currentIdx];
        
        // Hier veranderen we de "Laden..." tekst naar de vraag
        qText.innerText = q.q;
        
        // Update voortgangsbalk
        progressBar.style.width = (currentIdx / questions.length) * 100 + "%";

        q.a.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.t;
            button.classList.add('btn');
            button.onclick = () => selectAnswer(button, answer.c);
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
            
            // Probeer geluid af te spelen (als het bestand bestaat)
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log("Geluid kon niet spelen"));
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
        qText.innerText = "Masha'Allah! Je bent klaar.";
        scoreText.innerText = `Eindscore: ${score} van de ${questions.length}`;
        
        const rb = document.createElement('button');
        rb.innerText = "Opnieuw Spelen";
        rb.classList.add('btn');
        rb.onclick = () => location.reload();
        btnContainer.appendChild(rb);
    }

    // Start de quiz voor de eerste keer
    showQuestion();
});