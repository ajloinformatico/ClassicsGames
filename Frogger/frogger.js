//TODO make different responses depending on whether it falls into the water, is hit by a shell or time is running out
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div'); //All squares of the grif
    const timeLeft = document.querySelector('#time-left');
    const result = document.querySelector('#result');
    const start_btn = document.querySelector('#button');
    const restart_btn = document.querySelector('#restart');
    //Select squares with obstacle car class
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');
    //Select squares with obstacle car class
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');



    const width = 9;
    let currentIndex = 76; //Starting block
    let currentTime = 25;
    let TimerId;


    //display frog on starting block
    squares[currentIndex].classList.add('frog');

    //keyCodes to move frog around grid
    function moveFrog(e){
        //Begging remove frog class
        squares[currentIndex].classList.remove('frog');
        //If we press right arrow or D on the keeboard frog moves to right on the grid
        if(e.keyCode === 39 || e.keyCode === 68){
            //sure that cannot moves out of the grid, hits with right wall
            if(currentIndex % width < width -1) {
                currentIndex += 1;
            }
            // if we press up arrow or W on the keyboard frog moves to up on our grid
        }else if(e.keyCode === 38|| e.keyCode === 87){
            //sure that cannot moves out of the grid, hits with top of grid
            if(currentIndex - width >= 0) {
                currentIndex -= width;
            }
            // if we press left arrow or A on the keyboard frog moves to left on our grid
        }else if(e.keyCode === 37 || e.keyCode === 65){
            //sure that cannot moves out of the grid, hits with left wall
            if(currentIndex % width !== 0) {
                currentIndex -= 1;
            }
            // if we press down arrow or S on the keyboard snake moves to down on our grid
        }else if(e.keyCode === 40 || e.keyCode === 83){
            //sure that cannot moves out of the grid, hits with left wall
            if(currentIndex + width < width * width){
                currentIndex += width;
            }
        }
        // after moves add to the new square index the frogg class
        squares[currentIndex].classList.add('frog');
        lose(); //function to check if frog death
        win(); // function to check if you got to the top of the screen
    }

    //move cars use functions moveCarLeft and moveCarRight on loop over his squares
    function autoMoveCars() {
        //loop through all the squares with the class carsLeft or the class carsRight and catch it into moveCar functions
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }


    //move cars obstacle's to left on a time loop
    function moveCarLeft(carLeft) {
        // On our div we have classes of cars on diferents divs so just remove class before div class and add after div class
        switch (true) {
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1'); //remove before class div
                carLeft.classList.add('c2'); // add after class div
                break;

            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2'); //remove before class div
                carLeft.classList.add('c3'); // add after class div
                break;

            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3'); //remove before class div
                carLeft.classList.add('c1'); // add after class div
                break;
        }
    }

    //move cars obstacle's to right on a time loop THE SAME THAT CarLeft
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1'); //remove before class div
                carRight.classList.add('c3'); // add after class div
                break;

            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2'); //remove before class div
                carRight.classList.add('c1'); // add after class div
                break;

            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3'); //remove before class div
                carRight.classList.add('c2'); // add after class div
                break;
        }
    }

    //moves logs THE SAME THAT FOR THE CARS
    //loop through all the squares with the class logsLeft or the class logsRight and catch it into moveLog functions
    function autoMoveLogs(){
        logsLeft.forEach(logLeft => moveLogLeft(logLeft));
        logsRight.forEach(logRight => moveLogRight(logRight));
    }



    //move log obstacle's to left on a time loop

    function moveLogLeft(logLeft) {
        // On our div we have classes of cars on different divs so just remove class before div class and add after div class
        switch (true) {
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1'); //remove before class div
                logLeft.classList.add('l2'); // add after class div
                break;

            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2'); //remove before class div
                logLeft.classList.add('l3'); // add after class div
                break;

            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3'); //remove before class div
                logLeft.classList.add('l4'); // add after class div
                break;

            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4'); //remove before class div
                logLeft.classList.add('l5'); // add after class div
                break;

                case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5'); //remove before class div
                logLeft.classList.add('l1'); // add after class div
                break;
        }
    }

    //move log obstacle's to right on a time loop THE SAME THAT CARSRIGHT
    function moveLogRight(logRight) {

        switch (true) {
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1'); //remove before class div
                logRight.classList.add('l5'); // add after class div
                break;

            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2'); //remove before class div
                logRight.classList.add('l1'); // add after class div
                break;

            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3'); //remove before class div
                logRight.classList.add('l2'); // add after class div
                break;


            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4'); //remove before class div
                logRight.classList.add('l3'); // add after class div
                break;


            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5'); //remove before class div
                logRight.classList.add('l4'); // add after class div
                break;
        }
    }

    //Condition to win
    function win() {
        // remember     <div class="ending-block"></div><!--line 4-->
        // so if frog comes to the top level of the display
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = "Congratulations!! YOU WIN";
            squares[currentIndex].classList.remove('frog'); // delete frog class from the top
            clearInterval(TimerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }
    //Condition to lose
    function lose() {
        // if finish your time or if the square with the frog class hits with and obstacle square on the grid
        if (currentTime === 0 || squares[currentIndex].classList.contains('c1') || squares[currentIndex].classList.contains('l5') || squares[currentIndex].classList.contains('l4')){
            result.innerHTML = "Sorry. You lose :(";
            squares[currentIndex].classList.remove('frog');
            squares[currentIndex].classList.add('crash');
            clearInterval(TimerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }

    // move frog when its on the log and the log is moving to
    function moveWithLogLeft(){
        if(currentIndex >= 27 && currentIndex < 35){ // if currentIndex (frog) is on the possibilities position of logsLeft
            squares[currentIndex].classList.remove('frog');
            currentIndex += 1; // move currentIndex to next position
            squares[currentIndex].classList.add('frog')
        }
    }

    function moveWithLogRight(){
        if(currentIndex >= 18 && currentIndex <= 26){ // if currentIndex (frog) is on the possibilities position of logsRight
            squares[currentIndex].classList.remove('frog');
            currentIndex -= 1; // move currentIndex to next position
            squares[currentIndex].classList.add('frog')
        }
    }

    //Run all the functions that moves pieces on the grid
    function moveAll() {
        currentTime --;
        timeLeft.textContent = currentTime ;
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
    }

    //btn Start and Pause
    start_btn.addEventListener('click', () => {
        if(TimerId){
          clearInterval(TimerId);
        }else {
            TimerId = setInterval(moveAll, 1000); // run function moveAll every 1 seconds
            document.addEventListener('keyup', moveFrog); //run move frog function and the keyup
        }

    });


    restart_btn.addEventListener('click', () =>{
        reload();
    });

    function reload() {
        setTimeout(location.reload(true), 5000);
    }
});