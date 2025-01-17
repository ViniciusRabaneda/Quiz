// Initial Data
let currentQuestion = 0; 
let correctAnswers = 0;

showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
//Functions
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length)*100);


        document.querySelector('.progress--bar').style.width = `${pct}%`
        document.querySelector('.scoreArea').style.display ='none'; // hide the score area
        document.querySelector('.questionArea').style.display ='block'; // how question area
        document.querySelector('.question').innerHTML = q.question; // Accesses the question array within the questions file, takes the current element and within it gets the value of the question 

        let optionsHtml = '';
        for (let i in q.options){
            optionsHtml += `<div data-op = "${i}" class ="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;
        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionClickEvent);
        })
    }else{
        // the questions are over
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption =  parseInt(e.target.getAttribute('data-op'));
    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers/questions.length)*100);
    if(points <30){
        document.querySelector('.scoreText1').innerHTML = 'Precisa Melhorar!'
        document.querySelector('.scorePct').style.color = '#FF0000';
    }else if(points >= 30 && points <70){
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!'
        document.querySelector('.scorePct').style.color = '#FFF000';
    }else if(points >=70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#0d630d';
    }
    
    document.querySelector('.scorePct').innerHTML =`Acertou ${points}% `;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;
    document.querySelector('.scoreArea').style.display ='block'; // show the score area
    document.querySelector('.questionArea').style.display ='none'; // hide question area
    document.querySelector('.progress--bar').style.width = '100%';

}

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}