let questions = [
	{
		question: 'Commonly used data types in Javascript DO NOT include _______.',
		choices: ['strings', 'booleans', 'alerts', 'numbers'],
		answer: 'alerts',
	},
	{
		question:
			'The condition in an if/else statement is enclosed within _______.',
		choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
		answer: 'curly brackets',
	},
	{
		question: 'Arrays in Javascript can be used to store _______.',
		choices: [
			'numbers and strings',
			'other arrays',
			'booleans',
			'all of the above',
		],
		answer: 'all of the above',
	},
	{
		question:
			'String values must be enclosed within _______ when being assigned to variables.',
		choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
		answer: 'quotes',
	},
	{
		question:
			'A very useful tool used during development and debugging for printing content to the debugger is:',
		choices: ['Javascript', 'terminal / bash', 'for loops', 'console.log'],
		answer: 'console.log',
	},
]

const startBtn = document.getElementById('start')

const timer = document.getElementById('timer')

const submitBtn = document.getElementById('submit-btn')

const questionDiv = document.querySelector('.question-div')

const choicesDiv = document.querySelector('.choices')

const scoreDiv = document.querySelector('.score-div')

let intervalId

let timeRemaining = 30

let index = 0

let score = 0

let topScore = questions.length

let currentQuestion
let currentChoices
let currentAnswer

timer.innerHTML = timeRemaining

function startTimer() {
	intervalId = setInterval(timeHandler, 1000)
}

function stopTimer() {
	clearInterval(intervalId)
}

function submitHandler(e) {
	e.preventDefault()

	stopTimer()

	const userAnswer = e.target.value
	const correctAnswer = questions[index].answer

	console.log('current answer: ' + userAnswer)
	console.log('answer: ' + correctAnswer)

	if (correctAnswer === userAnswer) {
		console.log('current answer: ' + userAnswer)
		console.log('answer: ' + correctAnswer)

		score++
		console.log(score)
	}

	if (index === questions.length - 1) {
		stopTimer()

		timer.style.display = 'none'

		const numQuestions = questions.length

		const scorePercentage = (score / numQuestions) * 100

		questionDiv.style.display = 'none'

		scoreDiv.style.display = 'block'

		const h1 = document.createElement('h1')
		const h2 = document.createElement('h2')
		const congrats = document.createElement('h1')
		const tryAgain = document.createElement('h1')
		const topScoreMsg = document.createElement('h1')

		congrats.textContent = 'Congratulations, you passed!'
		tryAgain.textContent = 'Sorry, you scored less than 80%. Please try again.'
		topScoreMsg.textContent = 'Outstanding! You must be an expert.'

		if (scorePercentage === 100) {
			scoreDiv.appendChild(topScoreMsg)
		} else if (scorePercentage >= 80) {
			scoreDiv.appendChild(congrats)
		} else {
			scoreDiv.appendChild(tryAgain)
		}

		h2.textContent = `You answered ${score} out of ${numQuestions} questions correctly.`

		h1.textContent = `Score: ${scorePercentage}%`

		scoreDiv.appendChild(h2)
		scoreDiv.appendChild(h1)
	} else {
		index++
		timeRemaining = 30
		timer.innerHTML = timeRemaining
		questionHandler()
		startTimer()
	}
}

function choicesHandler() {
	let div = document.createElement('div')
	let ul = document.createElement('ul')

	questionDiv.appendChild(div)
	div.appendChild(ul)

	currentChoices = questions[index].choices

	currentChoices.forEach(function (choice) {
		let li = document.createElement('li')
		let button = document.createElement('button')

		button.value = choice

		button.addEventListener('click', submitHandler)

		button.textContent = choice

		ul.appendChild(li)
		li.appendChild(button)
	})
}

function questionHandler() {
	if (index === questions.length) {
		questionDiv.style.display = 'none'

		console.log('score: ' + score)
	} else {
		currentQuestion = questions[index].question

		questionDiv.innerHTML = `<p>${currentQuestion}</p>`

		choicesHandler()
	}
}

function timeHandler() {
	if (timeRemaining > 0) {
		timeRemaining--

		timer.innerHTML = timeRemaining
	} else {
		clearInterval(intervalId)
		index++
		timeRemaining = 30
		timer.innerHTML = timeRemaining
		questionHandler()
		startTimer()
	}
}

function startGame() {
	questionHandler()
	startBtn.style.display = 'none'
	questionDiv.style.display = 'flex'

	intervalId = setInterval(timeHandler, 1000)
}

startBtn.addEventListener('click', startGame)
