const startBtn = document.querySelector('.start-btn');
const popupinfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.Continue-btn');
const quizeSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox= document.querySelector('.result-box');
const tryAgainBtn= document.querySelector('.tryAgain-btn');
const gohomeBtn= document.querySelector('.goHome-btn');
startBtn.addEventListener('click', () => {
    popupinfo.classList.add('active');
    main.classList.add('active');
});
exitBtn.addEventListener('click', () => {
    popupinfo.classList.remove('active');
    main.classList.remove('active');
});
continueBtn.addEventListener('click', () => {
    
    quizeSection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestions(0);
    questionCounter(1);
    headerScore();
});
tryAgainBtn.addEventListener('click', () => {
   quizBox.classList.add('active');
   nextBtn.classList.remove('active');
   resultBox.classList.remove('active');

   
 questionCount = 0;
 questionNumb =1;  
 userScore =0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();
});
gohomeBtn.addEventListener('click', () => {
   quizeSection.classList.remove('active');
   nextBtn.classList.remove('active');
   resultBox.classList.remove('active');

   
 questionCount = 0;
 questionNumb =1;  
 userScore =0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();
});


let questionCount = 0;
let questionNumb =1;  
let userScore =0;
const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => {
    if(questionCount < questions.length-1){
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);
     nextBtn.classList.remove('active');
    }
    else {
        // console.log('Question Completed');
        showResultBox();
    }
   
});

const optionList =document.querySelector('.option-list');
// getting questions and Option from array
function showQuestions(index){
    const qustionText = document.querySelector('.question-text');
    qustionText.textContent =`${questions[index].numb}. ${questions[index].question}`;
//     let optionTag =
//    `<div class="option"><span>${question[index].option[0]} </span></div>
//     <div class="option"><span>${question[index].option[1]} </span></div>
//     <div class="option"><span>${question[index].option[2]} </span></div>
//     <div class="option"><span>${question[index].option[3]} </span></div>`;
let optionTag = "";
questions[index].options.forEach(option => {
  optionTag += `<div class="option"><span>${option}</span></div>`;
});


    optionList.innerHTML =optionTag;

    const option =document.querySelectorAll('.option');
   for(let i=0; i< option.length;i++){
    option[i].setAttribute('onClick','optionSelected(this)');
   }
}
function optionSelected(answer){
    let userAnswer =answer.textContent;
    let correctAnswer =questions[questionCount].answer;
    let allOptions =optionList.children.length;
     if(userAnswer == correctAnswer){
    //    console.log('answer is correct');
     answer.classList.add('correct');
    userScore +=1;
    headerScore();
    }
    else {
        // console.log('answer is wrong');
        answer.classList.add('incorrect');
        // if answer is incorrect, auto selected correct answer
         for(let i=0; i<allOptions;i++){
       if(optionList.children[i].textContent == correctAnswer){
        optionList.children[i].setAttribute('class','option correct');
       }
     }
    }
    // if user has selected,disable all options
     for(let i=0; i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
     }
     nextBtn.classList.add('active');
}
function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent =`${index} of ${questions.length} Questions`;
}

function  headerScore(){
    const  headerScoreText = document.querySelector('.header-score');
     headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `your Score ${userScore} out of ${questions.length}`;

    const circularProgress= document.querySelector('.circular-progress');
      const ProgressVlaue= document.querySelector('.progress-value');
      let progressStartValue =-1;
      let progressEndValue = (userScore / questions.length)*100;
      let speed =20;

      let progress = setInterval(()=>{
        progressStartValue++;

       ProgressVlaue.textContent = `${progressStartValue}%`;
       circularProgress.style.background =`conic-gradient(#096c09 ${progressStartValue*3.6}deg,rgba(255,255,255,.1)0deg)`;
        // console.log(progressStartValue);
    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }
      },speed);
}