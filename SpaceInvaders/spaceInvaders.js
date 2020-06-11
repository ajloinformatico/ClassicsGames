document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15;
    let currentShooterIndex = 202; //Index of our space Ship
    let currentInvaderIndex = 0; // Index of invaders spaces ships
    let alienInvadersTakenDown = []; // Array to Save invaders down
    let result = 0;
    let direction = 1; //default direction right
    let invaderId;

    // Defining the Alien invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ];

    // Display Aliens invaders
    // loop on all the squares and take index from alienInvaders Array + before index setting at this index class invader from styleSheet
    alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    // Display the shooter our space ship
    squares[currentShooterIndex].classList.add('shooter');

    //Move our shooter space shit to left and right only
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter'); // When shooter is moved his class must be removed
        if (e.keyCode === 37 || e.keyCode === 65) { // if we press left arrow or A on the keyboard
            if (currentShooterIndex % width !== 0) {  //while not hits to the left whall shoter index = -1 position
                currentShooterIndex -= 1;
            }
        } else if (e.keyCode === 39 || e.keyCode === 68) {  // if we press right arrow or D on the keyboard
            if (currentShooterIndex % width < width - 1) { // the same for the right wall
                currentShooterIndex += 1;
            }
        }
        squares[currentShooterIndex].classList.add('shooter');  //set shooter class to the new position after move
    }
    //finally added an Listener event for the keyboard press
    document.addEventListener('keydown',moveShooter);

    //Move of aliens spaces ships
    function moveInvaders(){
       const leftEdge = alienInvaders[0] % width === 0;
       const rightEdge = alienInvaders[alienInvaders.length -1] % width ===  width -1;

       // Conditions for assignments aliens invaders movement
       if( (leftEdge && direction === -1) || (rightEdge && direction === 1)){
           direction = width;
       } else if (direction === width){
           if (leftEdge){
               direction = 1;
           } else{
               direction = -1;
           }
       }
       for (let i = 0; i<= alienInvaders.length -1; i ++) {
           //First start removing aliens class
           squares[alienInvaders[i]].classList.remove('invader');
       }
       for (let x = 0; x <= alienInvaders.length -1; x ++) {
            // Set new location
           alienInvaders[x] += direction;
       }
       for (let x = 0; x <= alienInvaders.length -1; x ++) {
           // display by adding class to squares
           if (!alienInvadersTakenDown.includes(x)) {
               squares[alienInvaders[x]].classList.add('invader');
           }
       }

       //GAME OVER
        if (squares[currentShooterIndex].classList.contains('invaders', 'shooter')){ // if shooter index have classes of invader and shooter so invader has hidden shooter
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].add('boom'); // our shooter space Ship explodes
            clearInterval(invaderId)
        }

        // if there isnt any alien space ship
        for (let i = 0; i <= alienInvaders.length -1; i++){
            if(alienInvaders[i] > (squares.length - (width -1))) {
                resultDisplay.textContent = 'Game Over';
                clearInterval(invaderId);
            }
        }

        // Decide a win
        if (alienInvadersTakenDown.length === alienInvaders.length){ // If there isent aliens you win
            resultDisplay.textContent = 'Congratulations You Win';
            clearInterval(invaderId);
        }
    }
    //Interval of movement for aliensships
    invaderId = setInterval(moveInvaders, 500); // 0.5 seconds


    //Shoots to aliens
    function shootsToAliens(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex; //Laser begin at our spaceChip

        // move laser from the shooter to the aliens chips
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser'); //like all movements first remove the class from the square
            currentLaserIndex -= width; // Laser index changed //POR AQUI
            squares[currentLaserIndex].classList.add('laser'); //after laser index changed add laser class to the square
            if (squares[currentLaserIndex].classList.contains('invader')){ // when laser hits an space ship
                // remove laser and invader class and add to square boom class for explodes
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                // Interval for show explodes
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                // Get index of  alien taken down and push tu the alienInvadersTakenDown Array
                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result ++; // add one point for alien taken down and show it by resultDisplay var
                resultDisplay.textContent = result;
            }
            if(currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            }
        }

        // add listener Events to shoot key
        switch(e.keyCode) {
        //Shoots when you press space bar, w or up arrow on your keyboard //TODO ADD w and up arrow
            case 32:
                laserId = setInterval(moveLaser, 100); // 0,1 seconds for shoot
                break
        }

    }


    document.addEventListener('keyup', shootsToAliens)




});