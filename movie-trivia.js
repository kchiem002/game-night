let moviesArray = []
let yearArray = ["1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"]
let answerArray = ["0% - 25%", "26% - 50%", "51% - 75%", "76% - 100%"]
let randomNumber
let randomYear
let randomMovie
let imageURL
let movieName
let movieDesc
let movieRating
let correctCount = 0
let wrongCount = 0

const createButtons = () => {
    document.querySelector('#answer-buttons').textContent = "What is the Rotten Tomatoes Score?"
    for (let i = 0; i < answerArray.length; i++) {
        answerButton = document.createElement('button')
        answerButton.textContent = answerArray[i]
        answerButton.className = "answer-button"
        answerButton.setAttribute("id", i)
        document.querySelector('#answer-buttons').append(answerButton)
    }
}

const getYear = () => {
    randomNumber = Math.floor(Math.random() * yearArray.length)
    randomYear = yearArray[randomNumber]
    fetch (`https://api.themoviedb.org/3/discover/movie?api_key=a40d25ac7676d4efb7023209fb38276f&primary_release_year=${randomYear}&sort_by=popularity.desc`)
            .then(r => r.json())
            .then(r => {
                randomNumber2 = Math.floor(Math.random() * r.results.length)
                randomMovie = r.results[randomNumber2].original_title
                console.log(randomMovie)
                getMovie()
                createButtons()
            })
}

const getMovie = () => {
    fetch (`http://www.omdbapi.com/?t=${randomMovie}&apikey=7be547a6&type=movie`)
            .then(r => r.json())
            .then(r => {
                imageURL = r.Poster
                movieName = r.Title
                movieDesc = r.Plot
                movieRating = parseInt(r.Ratings[1].Value)
                console.log(movieRating)
                document.querySelector('#movie-details').innerHTML = `
                <img src="${imageURL}" alt="movie poster">
                <h1>${movieName}</h1>
                <p>${movieDesc}</p>`
            })
}

document.addEventListener('click', event => {
    if (event.target.className === 'answer-button') {
        if (event.target.id == 0) {
            if (movieRating <= 25) {
                console.log("correct")
                correctCount++
            }
            else {
                console.log("incorrect")
                wrongCount++
            }
        }
        else if (event.target.id == 1) {
            if (movieRating > 25 && movieRating <= 50) {
                console.log("correct")
                correctCount++
            }
            else {
                console.log("incorrect")
                wrongCount++
            }
        }
        else if (event.target.id == 2) {
            if (movieRating > 50 && movieRating <= 75) {
                console.log("Correct")
                correctCount++
            }
            else {
                console.log("Incorrect")
                wrongCount++
            }
        }
        else if (event.target.id == 3) {
            if (movieRating > 75 && movieRating <= 100) {
                console.log("correct")
                correctCount++
            }
            else {
                console.log("incorrect")
                wrongCount++
            }
        }
    }
})

getYear()






