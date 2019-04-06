let triviaCategory = [ 
    {name: "General",
    value: 9},
    {name: "Books",
    value: 10},
    {name: "Film",
    value: 11},
    {name: "Music",
    value: 12},
    {name: "Musicals & Theatres",
    value: 13},
    {name: "Television",
    value: 14},
    {name: "Video Games",
    value: 15},
    {name: "Board Games",
    value: 16},
    {name: "Science & Nature",
    value: 17},
    {name: "Computers",
    value: 18},
    {name: "Mathematics",
    value: 19},
    {name: "Mythology",
    value: 20},
    {name: "Sports",
    value: 21},
    {name: "Geography",
    value: 22},
    {name: "History",
    value: 23},
    {name: "Politics",
    value: 24},
    {name: "Art",
    value: 25},
    {name: "Celebrities",
    value: 26},
    {name: "Animals",
    value: 27},
    {name: "Vehicle",
    value: 28},
    {name: "Comics",
    value: 29},
    {name: "Gadgets",
    value: 30},
    {name: "Anime & Manga",
    value: 31},
    {name: "Cartoon & Animations",
    value: 32}]

let triviaDifficulty = ["easy", "medium", "hard"]
let selectedCategory
let selectedDifficulty
let correctAnswerText
let answerArray = []
let correctCount = 0
let wrongCount = 0

const shuffle = (a) => {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
}

const empty = () => {
    answerArray = []
}

const appendCategoryButtons = () => {
    for (let i = 0; i < triviaCategory.length; i++) {
        categoryButton = document.createElement('button')
        categoryButton.textContent = triviaCategory[i].name
        categoryButton.className = 'category-button'
        categoryButton.setAttribute("id", triviaCategory[i].value)
        document.querySelector('#select-category').append(categoryButton)
    }
}

const appendDifficultyButtons = () => {
    for (let i = 0; i < triviaDifficulty.length; i++) {
        difficultyButton = document.createElement('button')
        difficultyButton.textContent = triviaDifficulty[i]
        difficultyButton.className = 'difficulty-button'
        document.querySelector('#select-difficulty').append(difficultyButton)
    }
}

const appendAnswerButtons = () => {
    shuffle(answerArray)
    for (let i = 0; i < answerArray.length; i++) {
        answerButton = document.createElement('button')
        answerButton.textContent = answerArray[i]
        answerButton.className = 'answer-button'
        document.querySelector('#trivia-answer-choices').append(answerButton)
    }
}

const startTrivia = () => {
    fetch (`https://opentdb.com/api.php?amount=15&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            questionNum = 0
            
            //show trivia question in HTML
            document.querySelector('#trivia-question').innerHTML = r.results[questionNum].question
            
            //push incorrect answers to answerArray
            for (let i = 0; i < r.results[questionNum].incorrect_answers.length; i++) {
                answerArray.push(r.results[questionNum].incorrect_answers[i])
            }

            //push correct answer to answerArray
            answerArray.push(r.results[questionNum].correct_answer)

            //declare correct answer text for validation
            correctAnswerText = r.results[questionNum].correct_answer

            appendAnswerButtons()

        })
}

//event listener for selecting category
document.addEventListener('click', event => {
    if (event.target.className === 'category-button') {
        selectedCategory = event.target.id
        console.log(selectedCategory)
        appendDifficultyButtons()
    }
})

//event listener for selecting difficulty
document.addEventListener('click', event => {
    if (event.target.className === 'difficulty-button') {
        selectedDifficulty = event.target.textContent
        console.log(selectedDifficulty)
        startTrivia()
    }
})

//event listener to check user guess
document.addEventListener('click', event => {
    if (event.target.className === 'answer-button') {
        selectedAnswer = event.target.textContent
        if (selectedAnswer === correctAnswerText) {
            console.log("correct")
            correctCount++
            empty()
        }
        else if (selectedAnswer !== correctAnswerText) {
            console.log("incorrect")
            wrongCount--
            empty()
        }
    }
})

appendCategoryButtons()
