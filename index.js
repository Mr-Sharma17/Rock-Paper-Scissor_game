//catching the containers
const userChoiceContainer = document.getElementById('user-choice');
const computerChoiceContainer = document.getElementById('computer-choice');
const resultContainer = document.getElementById('result');
const highScoreContainer = document.getElementById('highscore');
const userScoreContainer = document.getElementById('userscore');
const possibleChoices = document.querySelectorAll('button');

let userChoice, computerChoice, result, score = 0, HighScore = 0, lastHighScore = 0;

//grabing the buttons and assigning them onclick event
possibleChoices.forEach(choices => choices.addEventListener('click', (e) => {

    //generating the user choice on clicking the button by grabing its id and displaying it
    userChoice = e.target.id;
    userChoiceContainer.innerHTML = userChoice;

    //onclicking the buttons envoking the functions
    generateComputerChoice();
    getResult();

    //getting the highscore value from database
    HighScore = JSON.parse(localStorage.getItem('highscore'));

    //displaying the max value after comparing last value with latest value for real-time updation in DOM
    highScoreContainer.innerHTML = Math.max(HighScore, lastHighScore);
}));


//generating the computer choice
function generateComputerChoice() {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    if (randomNum === 1) {
        computerChoice = 'Rock';
    }
    if (randomNum === 2) {
        computerChoice = 'Paper';
    }
    if (randomNum === 3) {
        computerChoice = 'Scissor';
    }
    computerChoiceContainer.innerHTML = computerChoice;
};


//calculating the results
function getResult() {

    if (computerChoice === userChoice) {
        result = 'Its a DRAW!! Try again...';
        document.getElementById('result').style.color = 'orange';
    }
    if (computerChoice === 'Rock') {
        if (userChoice === 'Paper') {
            result = 'Hurray!! YOU WON';
        } else {
            if (userChoice === 'Scissor') {
                result = 'Oops!! YOU LOSE';
            }
        }
    }
    if (computerChoice === 'Paper') {
        if (userChoice === 'Scissor') {
            result = 'Hurray!! YOU WON';
        } else {
            if (userChoice === 'Rock') {
                result = 'Oops!! YOU LOSE';
            }
        }
    }
    if (computerChoice === 'Scissor') {
        if (userChoice === 'Rock') {
            result = 'Hurray!! YOU WON';
        } else {
            if (userChoice === 'Paper') {
                result = 'Oops!! YOU LOSE';
            }
        }
    }
    if (result === 'Hurray!! YOU WON') {
        document.getElementById('result').style.color = 'green';
        score++;

        //getting the last high scores
        lastHighScore = JSON.parse(localStorage.getItem('highscore'));

        //after getting the last high scores comparing them with latest score and setting the max value to database 
        (lastHighScore > score) ? localStorage.setItem('highscore', JSON.stringify(lastHighScore)) : localStorage.setItem('highscore', JSON.stringify(score));
    }
    if (result === 'Oops!! YOU LOSE') {
        document.getElementById('result').style.color = 'orangered';
        score = 0;
    }

    //displaying the result and score
    resultContainer.innerHTML = result;
    userScoreContainer.innerHTML = score;

};


