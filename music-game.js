let musicAnswerArray = []
let musicAnswerArray2 = []

let songNumber
let songTrack
let correctAnswer
let correctCount
let wrongCount

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

const clear = () => {
    musicAnswerArray = []
    musicAnswerArray2 = []
}

const getSong = () => {
    fetch ('http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4')
        .then(r => r.json())
        .then(r => {
        //grab random song from array list and play
            songNumber = Math.floor(Math.random() * r.tracks.length)
            songTrack = r.tracks[songNumber].previewURL
            correctAnswer = `${r.tracks[songNumber].name} - ${r.tracks[songNumber].artistName}`
            correctAnswer.className = 'answer-button'
            musicAnswerArray2.push(`${r.tracks[songNumber].name} - ${r.tracks[songNumber].artistName}`)
            document.querySelector('#play-music').innerHTML = `<iframe src="${songTrack}" allow="autoplay" id="audio"></iframe>`
            generateAnswerArray()          
        })
}

//event listener to check user answer
document.addEventListener('click', event => {
    if (event.target.className === 'answer-button' && event.target.innerHTML === correctAnswer) {
        console.log("correct")
        correctCount++
        songNumber++
        clear()
    }

    else if (event.target.className === 'answer-button') {
        console.log("incorrect")
        wrongCount++
        songNumber++
        clear()
    }
}) 

const generateAnswerArray = () => {
    fetch ('http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4')
        .then(r => r.json())
        .then(r => {
            for (let i = 0; i < r.tracks.length; i++) {
                allAnswers = `${r.tracks[i].name} - ${r.tracks[i].artistName}`
                musicAnswerArray.push(`${r.tracks[i].name} - ${r.tracks[i].artistName}`)
            }
        createAnswerArray2()
        })
}

const appendAnswerButtons = () => {
    shuffle(musicAnswerArray2)
    for (let i = 0; i < musicAnswerArray2.length; i++) {
        answerButton = document.createElement('button')
        answerButton.textContent = musicAnswerArray2[i]
        answerButton.className = 'answer-button'
        document.querySelector('#answer-choices').append(answerButton)
    }
}

const createAnswerArray2 = () => {
    shuffle(musicAnswerArray)
    for (let i = 0; i < 3; i++) {
        musicAnswerArray2.push(musicAnswerArray[i])
    }
    appendAnswerButtons()
}

//function calls on page onload
getSong()
