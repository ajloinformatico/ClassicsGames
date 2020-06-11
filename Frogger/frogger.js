document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div'); //All squares of the grif
    const timeLeft = document.querySelector('#time-left');
    const result = document.querySelector('#result');
    const start_btn = document.querySelector('#button');
    const width = 9;
    let currentIndex = 76; //Starting block
    let TimerId; // id for time limit


    //display frog on starting block
    squares[currentIndex].classList.add('frog');

    //keyCodes to move frog around grid
    function moveFrog(e){
        //Begging remove frog class
        squares[currentIndex].classList.remove('.frog');
        if(e.keyCode === 37 || e.keyCode === 65 ) { // left case when you press left arrow or A on the keyboard
            if(currentIndex % width !== 0){ // if not hits with left wall
                currentIndex = -1;

            }
        } else if(e.keyCode === 39 || e.keyCode === 68) { // TODO FINISH RIGHT MOVEMENT
            //1 : 07 : 09
        }
    }


});