// Variable are selected from html clases and ids
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let hitPosition = null; // Var for random position of the mole

let timeMoveMole = 500; //Here you can set the time that the mole is gone to move

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
    });
    let randomPosition = square[Math.floor(Math.random() * 9)]; // random oposition
    randomPosition.classList.add('mole');
    //assign the id of the random position to hitposition for to use later
    hitPosition = randomPosition.id;
}
// if mouse is clicked over te mole square  add 1 to result
square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition){
            result += 1;
            score.textContent = result;
            hitPosition = null
        }
    });
});

// Change mole position
function moveTheMoleOfPosition(){
    let timerId = null;
    timerId = setInterval(randomSquare, timeMoveMole);
}
moveTheMoleOfPosition();

// Function to set time limit
function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    // if Time Left is equals to 0 just reload the game
    // interval
    if(currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER! Your Score is ' +  result);
        reload()
    }
}

// Reload page
//TODO ASK FOR GO BACK TO INDEX GAMES PAGE
function reload() {
    location.reload(true);
}


let timerId = setInterval(countDown, 1000); // Set intervale in one second
