const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let score=0
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
      score++
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
      question: 'What is the capital of France?',
      answers: [
        { text: 'Paris', correct: true },
        { text: 'Berlin', correct: false },
        { text: 'London', correct: false },
        { text: 'Rome', correct: false }
      ]
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: [
        { text: 'Earth', correct: false },
        { text: 'Mars', correct: true },
        { text: 'Venus', correct: false },
        { text: 'Jupiter', correct: false }
      ]
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      answers: [
        { text: 'William Shakespeare', correct: true },
        { text: 'Jane Austen', correct: false },
        { text: 'Charles Dickens', correct: false },
        { text: 'Mark Twain', correct: false }
      ]
    },
    {
      question: 'Which programming language is known for building dynamic and interactive web pages?',
      answers: [
        { text: 'Python', correct: false },
        { text: 'Java', correct: false },
        { text: 'JavaScript', correct: true },
        { text: 'C++', correct: false }
      ]
    }
  ];
  