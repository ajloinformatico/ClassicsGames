document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    const displaySquares = document.querySelectorAll('.previous-grid div'); //Select all divs of second display to show previous figure


    let squares = Array.from(grid.querySelectorAll('div')); //array formed by grid var and inside it select all the divs

    const width = 10;
    const height = 20;
    let currentPosition = 4;



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

    // Show previous Figures ↓
    //
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

    function displayFigure(){
        displaySquares.forEach(figure => { //on lop remove all block classes
            figure.classList.remove('block');
        });
        smallFigures[nextRandom].forEach( index => { // loop on smallFigure and catch random figure to show
           displaySquares[displayIndex + index].classList.add('block');
        });
    }

    //Frezze the figure
    function freeze() {
        
    }


});