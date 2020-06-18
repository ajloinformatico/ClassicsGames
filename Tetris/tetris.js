document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start-tetris');
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.score-display');
    const linesDisplay = document.querySelector('.lines-display');
    let squares = Array.from(grid.querySelectorAll('div')); //array formed by grid var and inside it select all the divs

    const width = 10;
    const height = 20;
    let timerId;
    let score = 0;
    let lines = 0;
    let currentIndex = 0;



    //keyCodes to control figures
    function controllers(e){
        if(e.keyCode === 39 || e.keyCode === 68){ // if we press right arrow or D on the keyboard
            moveRight(); //move Right rhe figure
        }else if (e.keyCode === 38 || e.keyCode === 87){ // if we press up arrow or W on the keyboard
            rotate(); // Rotate the figure
        }else if(e.keyCode === 37 || e.keyCode === 65) { // if we press left arrow or S on the keyboard
            moveLeft(); //move Left the figure
        }else if(e.keyCode === 40 || e.keyCode === 83){ // if we press down arrow or S on the keyboard move down the figure
            moveDown()
        }
    }
    // adding listener event for controllers
    document.addEventListener('keyup', controllers);

    //Figures of tetris
    //The Figures will be saves on Arrays
    // Each array saves a type of figure and the elements of each array will be its rotation
    const lFigures = [
        [1, width + 1, width * 2 + 1, 2],                  //   1           2           3           4
        [width, width + 1, width + 2, width * 2 + 2],      //   ||          ||                      ||
        [1, width + 1, width * 2 + 1, width * 2],          // ======        ||==      ======    ====||
        [width, width * 2, width * 2 + 1, width * 2 + 2]   //               ||          ||          ||
    ];

    const zFigures = [
        [0, width, width + 1, width * 2 + 1],              //   1           2           3           4
        [width + 1, width + 2, width * 2, width * 2 + 1],  // ||||        ||||        ||||        ||||
        [0, width, width + 1, width * 2 + 1],              // ||||        ||||        ||||        ||||
        [width + 1, width + 2, width * 2, width * 2 + 1]   // ||||        ||||        ||||        ||||
    ];

    const tFigures = [
        [1, width, width + 1, width + 2],                  //   1           2           3           4
        [1, width + 1, width + 2, width * 2 + 1],          //  ||==                     ||
        [width, width + 1, width + 2, width * 2 + 1],      //  ||         ======        ||        ||
        [1, width, width + 1, width * 2 + 1]               //  ||             ||      ====        ||====
    ];

    const oFigures = [
        [0, 1, width, width + 1],                          //   1          2           3            4
        [0, 1, width, width + 1],                          //             ||                      ||
        [0, 1, width, width + 1],                          //   ||==      ====          ||==      ====
        [0, 1, width, width + 1]                           // ====          ||        ====          ||
    ];

    const iFigures = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],      //   1           2           3           4
        [width, width + 1, width + 2, width + 3],          //   ||                      ||
        [1, width + 1, width * 2 + 1, width * 3 + 1],      //   ||        ======        ||        ======
        [width, width + 1, width + 2, width + 3]           //   ||                      ||
    ];
    //Finally save the arrays of figures on another array
    const theFigures = [lFigures, zFigures, tFigures, oFigures, iFigures];


    // Figure random select
    let random = Math.floor(Math.random()*theFigures.length); //Select a random Array
    let currentRotation = 0; //Index for figure in all arrays
    let current = theFigures[random][currentRotation]; // finally catch from the random array the figure of currentRotation index

    let currentPosition = 4;
    // Draw the figure
    function draw(){
        current.forEach( index => (
            squares[currentPosition + index].classList.add('block')
        ));
    }

    // Blur the figure ('desdibuja la forma')
    function blur(){
        current.forEach( index => (
            squares[currentPosition + index].classList.remove('block')
        ));
    }

    // Move down the figure
    function moveDown(){
        blur(); //first remove the class
        currentPosition = currentPosition += width; //add the new position to the position
        draw(); //and draw
        freeze()
    }

    // Move Right the figure == moveDown but changing to right the position
    function moveRight(){
        blur();
        const isAtRightEdge = current.some( index => ( // like forEach but working with  condition
        currentPosition + index) % width === width -1 );
        if(!isAtRightEdge){ //if is not at right edge
            currentPosition += 1;
        }
        if( current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition -= 1;
        }
        draw();
    }
    // Move Left the figure
    function moveLeft(){
        blur();
        const isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge){ // if is not at left edge
            currentPosition -= 1;
        }
        if( current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition += 1;
        }
        draw();
    }

    // Rotate Figures
    function rotate() {
        blur();
        currentRotation ++;
        if(currentRotation === current.length){ //if current Rotation is completed currentRotation = 0
            currentRotation = 0;
        } // else set new position
        current = theFigures[random][currentRotation];
        draw();
    }
    // todo Revisar desde aquí
    // Show previous Figures ↓
    //
    const displaySquares = document.querySelectorAll('.previous-grid div'); //Select all divs of second display to show previous figure
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallFigures = [
        [1, displayWidth+1, displayWidth*2+1, 2], // lFigures
        [0, displayWidth, displayWidth+1, displayWidth*2+1], // zFigures
        [1, displayWidth, displayWidth+1, displayWidth+2], // tFigures
        [0, 1, displayWidth, displayWidth+1], //oFigures
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iFigures
    ];

    //Show previous figure on previous grid
    function displayFigure(){
        displaySquares.forEach(square => { //on lop remove all block classes
            square.classList.remove('block');
        });
        smallFigures[nextRandom].forEach( index => { // loop on smallFigure and catch random figure to show
           displaySquares[displayIndex + index].classList.add('block');
        });
    }


    //Frezze the figure
    //Principal function its repeat all the time to move down cath keys add score remove lines game over..
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('block3')
        || squares[currentPosition + index + width].classList.contains('block2'))){ //if Figure is on the floor
            current.forEach(index => squares[index + currentPosition].classList.add('block2'));
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*theFigures.length); //todo common function for the nextRandom
            current = theFigures[random][currentRotation];
            currentPosition = 4;
            draw();
            displayFigure();
            gameOver();
            addScore();
        }
    }
    //Start the Game
    startBtn.addEventListener('click', () => {
       if(timerId) {
           clearInterval(timerId);
           timerId = null
       } else{
           draw();
           timerId = setInterval(moveDown, 1000); //1 second
           nextRandom = Math.floor(Math.random()*theFigures.length); //todo common function for the nextRandom
           displayFigure();
        }
    });

    // Game Over
    // Show points an reload the game
    function gameOver(){
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){//if figure is on the top
            scoreDisplay.innerHTML = "end";
            clearInterval(timerId);
            alert("Game Over\n You have "+score+ " points\nyou have made " + lines + " lines ");
            reload();

        }
    }

    // function to add score and clear lines
    function addScore() {
        for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, // line
                currentIndex + 6, +currentIndex + 7, currentIndex + 8, currentIndex + 9];

            if (row.every(index => squares[index].classList.contains('block2'))) { //if all the line has class two (is locked)
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block');
                });
                //splice the array
                const squaresRemoved = squares.splice(currentIndex, width); //array with the squares removed
                squares = squaresRemoved.concat(squares);  // concat the old array with the array removed (the classes of the two arrays)
                squares.forEach(cell => grid.appendChild(cell)); // set the new array into the grid
            }
        }
    }
    //reload the page
    function reload() {
        location.reload(true);
    }


});