let randomTrack = Math.floor(Math.random() * 100)
let correctSongName
let correctArtistName
let correctLyricAnswer
let trackId
let longLyricAnswerArray = []
let shortLyricAnswerArray = []

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

const getTopSongList = () => {
    fetch ('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=us&f_has_lyrics=1&apikey=b97562d1cb4613c6b54db276ba8591dc')
            .then(r => r.json())
            .then(r => {
                correctSongName = r.message.body.track_list[randomTrack].track.track_name
                correctArtistName = r.message.body.track_list[randomTrack].track.artist_name
                correctLyricAnswer = `${correctSongName} - ${correctArtistName}`
                trackId = r.message.body.track_list[randomTrack].track.track_id

                //create long answer array
                for (let i = 0; i < r.message.body.track_list.length; i++) {
                    longLyricAnswerArray.push(`${r.message.body.track_list[i].track.track_name} - ${r.message.body.track_list[i].track.artist_name}`)
                }
                createShortLyricAnswerArray()
                generateLyric()
                console.log(r)
    })
}

const generateLyric = () => {
    fetch (`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=b97562d1cb4613c6b54db276ba8591dc`)
    .then(r => r.json())
    .then(r => {
        console.log(r)
        fullLyric = r.message.body.lyrics.lyrics_body
        splitLyric = fullLyric.split("*")
        document.querySelector('#song-lyrics').innerHTML = splitLyric[0]
    })
}

const createShortLyricAnswerArray = () => {
    shuffle(longLyricAnswerArray)
    longLyricAnswerArray.unshift(correctLyricAnswer)
    for (let i = 0; i < 4; i++) {
        shortLyricAnswerArray.push(`${longLyricAnswerArray[i]}`)
    }
    appendLyricAnswerButtons()
}

const appendLyricAnswerButtons = () => {
    shuffle(shortLyricAnswerArray)
    for (let i = 0; i < shortLyricAnswerArray.length; i++) {
        lyricAnswerButton = document.createElement('button')
        lyricAnswerButton.textContent = shortLyricAnswerArray[i]
        lyricAnswerButton.className = 'lyric-answer-button'
        document.querySelector('#song-lyric-answers').append(lyricAnswerButton)
    }
}

const resetLyricGame = () => {
    longLyricAnswerArray = []
    shortLyricAnswerArray = []
}

document.addEventListener('click', event => {
    if (event.target.className = 'lyric-answer-button' && event.target.textContent === correctLyricAnswer) {
        console.log("correct")
        resetLyricGame()
    }
    else {
        console.log("incorrect")
        resetLyricGame()
    }
})

getTopSongList()