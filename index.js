const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
    question: `What type of animal was Dumbo?`,
    choice1: `: Girrafe`,
    choice2: `: Meercat`,
    choice3: `: Elephant`,
    choice4: `: A Flying Pig`,
    answer: 3,
},
{
    question: 'The Statue of Liberty was originally supposed to function as what?',
    choice1: `: A port of entry`,
    choice2: `: A border marker`,
    choice3: `: A gift shop`,
    choice4: `: A lighthouse`,
    answer: 4,
},
{
    question: `When playing Blackjack, how many points would be considered a bust?`,
    choice1: `: 22`,
    choice2: `: 21`,
    choice3: `: 15`,
    choice4: `: 19`,
    answer: 1,
},
{
    question: `Oysters can change something most other animals cannot. What is it?`,
    choice1: `: Their size`,
    choice2: `: The thickness of their shell`,
    choice3: `: Their gender`,
    choice4: `: Their color`,
    answer: 3,
},
{
    question: `What was Will Ferrell's character's name in the 2003 hit movie "Elf"?`,
    choice1: `: Elf`,
    choice2: `: Buddy`,
    choice3: `: Sam`,
    choice4: `: Billy`,
    answer: 2,
},
{
    question: `Which of these lazy animals sleeps up to 22 hours a day?`,
    choice1: `: Koala`,
    choice2: `: Lion`,
    choice3: `: Copperhead`,
    choice4: `: Beagle`,
    answer: 1,
},
{
    question: `Where did Noah's Ark come to rest after the flood?`,
    choice1: `: Mount Everest`,
    choice2: `: Mount Fuji`,
    choice3: `: K2`,
    choice4: `: Mount Ararat`,
    answer: 4,
},
{
    question: `How many years are there in an eon`,
    choice1: `: 35 years`,
    choice2: `: 1 billion years`,
    choice3: `: 100,000 years`,
    choice4: `: 25,000 years`,
    answer: 2,
},
{
    question: `Out of these European countries, which has the smallest population density?`,
    choice1: `: Bulgaria`,
    choice2: `: Norway`,
    choice3: `: Iceland`,
    choice4: `: France`,
    answer: 3,
},
{
    question: `According to Albert Einstein, what is the "hardest thing in the world to understand"?`,
    choice1: `: Astronomy`,
    choice2: `: Income taxes`,
    choice3: `: Physics`,
    choice4: `: Sewing`,
    answer: 2,
},

]

const SCORE_POINTS  = 100000;
const MAX_QUESTIONS = 10;

startGame = ()=>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = ()=>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }
    questionCounter++
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)
    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers)return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selecetedAnswer = selectedChoice.dataset['number']

        let classToApply = selecetedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
          selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion()
        },1000)
    })
})

incrementScore = num => {
score+=num
scoreText.innerHTML = score
}

startGame()
