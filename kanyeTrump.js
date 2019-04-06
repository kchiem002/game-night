//kanye vs trump 
let apiList = ['https://cors-anywhere.herokuapp.com/https://api.kanye.rest', 'https://cors-anywhere.herokuapp.com/https://api.tronalddump.io/random/quote']
let randomApi
let numCorrect
let numWrong
let newDiv
let newContent
let quoteDiv
let score = 0;
let lives = 3;
let isAlive; 
let giphySelection;

//if Trump, grab value; Kanye, grab quote
const getQuote = () => {
    randomApi = Math.floor(Math.random() * apiList.length)
    fetch (apiList[randomApi])
        .then(r => r.json())
        .then(r => {
            if (randomApi === 0) {
                console.log(r.quote)
                console.log("Kanye WEST")

                let kanyeQuote = document.getElementById('quote-div');
                kanyeQuote.innerHTML = r.quote;
            }
            else {
                console.log(r.value)
                console.log("Trump")

                let trumpQuote = document.getElementById('quote-div');
                trumpQuote.innerHTML = r.value;
            }
        })
        .catch ( e => {
            })
        
}

getQuote()
console.log(randomApi)


const createButton = () => {
        
    kanyeButton = document.createElement('button')
    kanyeButton.textContent = "Kanye"
    kanyeButton.className = "kanye-button"
    let kanyeContainer = document.getElementById('answer-div');
    kanyeContainer.append(kanyeButton); 

    trumpButton = document.createElement('button')
    trumpButton.textContent = "Donald Trump"
    trumpButton.className = "trump-button"
    let trumpContainer = document.getElementById('answer-div');
    trumpContainer.append(trumpButton);
}
createButton()

const checkLives = () => {
    if(lives >= 1)
    {
        isAlive = true;
        console.log("Checking answer")
        checkAnswer()

    }
    else {
        console.log("game over")
        isAlive = false;
        document.querySelector("#gameOver-div").innerHTML = "game over";
        //you die
    }
  

}
             const checkAnswer = () => {
            
            if (event.target.className === 'kanye-button' && randomApi === 0) {
                console.log("correct answer: Kanye")
                //increment score
                score++;
                console.log(score);
                //gihpy goes here
                giphySelection = "Kanye"
                getGiphy()
            
            }
            else if (event.target.className === 'trump-button' && randomApi !== 0) {
                console.log("correct answer: Trump")
                //increment score
                score++;
                console.log(score);
                giphySelection = "Trump"
                getGiphy()
                
            }
            else if (event.target.className === 'kanye-button' && randomApi !== 0) {
                console.log("incorrect")
                //decrement score
                score--;
                lives--;
                console.log(score);
                giphySelection = "Kanye"
                getGiphy()
            
            }
            else if (event.target.className === 'trump-button' && randomApi === 0)
            {
                console.log("incorrect")
                //decrement score
                score--;
                lives--;
                console.log(score);
                giphySelection = "Trump"
                getGiphy()
            
            }
            document.querySelector("#score").innerHTML = score;
            document.querySelector("#lives").innerHTML = lives;
            getQuote()
        }


const getGiphy = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=CUKJmcJMux05tWZr0IFYGFlN37Z3N3op&q=${giphySelection}&limit=25&offset=0&rating=PG&lang=en`)
        .then(r=> r.json())
        .then(r=> {
            console.log(r)
            randomGif = Math.floor(Math.random() * r.data.length)
            giphyImage = r.data[randomGif].images.fixed_height.url
            document.querySelector("#giphy-div").innerHTML = `<img src ="${giphyImage}">`
        })
}
//checking if the use got the right answer
document.addEventListener('click', event => {
    checkLives()
})







