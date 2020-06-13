// TODO add function.removeListenerEvent('keyup', function) to snake and to alien invaders
//TODO VIEW WHEN SNAKE HITS WITH WALLS DONT STOP THE GAME

document.addEventListener('DOMContentLoaded', () => {
   const squares = document.querySelectorAll('.grid div');
   const scoreDisplay = document.querySelector('span');
   const startRestart = document.querySelector('.start');

   // Variables for the game
    const width = 10;
    let currentIndex = 0; //First div of our grid
    let appleIndex = 0; //First div of our grid

    //Body of the snake => in our grid begin at 2(Head), and 0 the end (Tail), 1 is the rest of his body
    let currentSnake = [2,1,0];
    let direction = 1; //Direction of the snake default right keyCode 39
    let score = 0;
    let speed = 0.9; //Speed added to intervalTime when snake catch an apple
    let intevalTime = 0;
    let interval = 0;


    //Start or restart the game
    function starRestartGame() {
        // Index from list of Snake body loop into divs by remove snake class from css to simulate movement of the snake
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1; //default right direction for snake
        scoreDisplay.innerHTML = score;

        //When snake moves after remove class we need to add class snake to the new square on the grid
        intevalTime = 1000; // movemente of snake
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutC, intevalTime);
    }




    // function for all snake results its the principal function
    function moveOutC() {
        //deals with snake hitting border and snake hitting his own self
        if (   //Remember that its his Head
            (currentSnake[0] + width >= (width * width) && direction === width) || // if Sna. hits with the bottom of the grid
            (currentSnake[0] % width === width -1 && direction === 1) || // if Sna. hits with right wall of the grid
            (currentSnake[0] % width === 0 && direction === -1) || // if Sna. hits with left wall of the grid
            (currentSnake[0] - width < 0 && direction === -width) || // if Sna.hits with the top of the grid
            (squares[currentSnake[0] + direction].classList.contains('snake')) //finally if snake hits with his own self
        ) {
            finishInform(); //GAME OVER
            return clearInterval(interval); //Its will clear interval if any condition append
        }

        // if nothing of all before conditions append his tail must be remove by remove snake class
        // remove class snake from square and save it to const var tail
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake'); // remove class of sanke from TAIL
        currentSnake.unshift(currentSnake[0] + direction); // give direction to the head of the array

        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){ // if the snake head is on apple square
            squares[currentSnake[0]].classList.remove('apple'); // remove apple class from the square
            // add snake class to another square
            squares[tail].classList.add('snake');
            currentSnake.push(tail); // add to snake array the tail
            randomApple();
            score ++;
            scoreDisplay.textContent = score; //Just show score
            clearInterval(interval);
            intevalTime = intevalTime * speed; // snake runs more
            interval = setInterval(moveOutC, intevalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    // Generate a new random position for apple class on the grid after snake eaten it
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length); //add the new apple position from random position
            // on the grid
        } while(squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
        squares[appleIndex].classList.add('apple') // finally set new position
    }

    //INFORM ABOUT POINTS IN ALERT
    function finishInform(){
        alert("GAME OVER\nYou have "+result+ " points");
    }


    // KeyCodes For Snake movement
    function controlers(e) {
        squares[currentIndex].classList.remove('snake'); // remove the class when snake moves

        //If we press right arrow or D on the keeboard snake moves to right on the grid
        if(e.keyCode === 39 || e.keyCode === 68){
            direction = 1;
        // if we press up arrow or W on the keyboard snake moves to up on our grid
        }else if(e.keyCode === 38|| e.keyCode === 87){
            direction = -width;
        // if we press left arrow or A on the keyboard snake moves to left on our grid
        }else if(e.keyCode === 37 || e.keyCode === 65){
            direction = -1;
        // if we press down arrow or S on the keyboard snake moves to down on our grid
        }else if(e.keyCode === 40 || e.keyCode === 83){
            direction = +width;
        }
    }

    document.addEventListener('keyup', controlers);
    startRestart.addEventListener( 'click', starRestartGame);






});