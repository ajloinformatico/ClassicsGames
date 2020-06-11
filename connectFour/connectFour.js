document.addEventListener('DOMContentLoaded', () => {
   //We used it when we want run javascript just when the page is loaded
    const squares = document.querySelectorAll('.grid div'); //All the divs inside grid
    const result = document.querySelector('#result'); // Result of a player
    const displayCurrentUser = document.querySelector('#current-player'); // Player who is playing it will take
    // style from player-one and player-two class from style.css
    let currentPlayer = 1; // The current player begin at 1

    // Loop for play
    for (var i = 1, len = squares.length; i < len;i ++) {

        (function (index) {
            //TODO CHECK FOR CHANGE COLOR WHEN SQUARE HAVE A CLASS PLAYER

            // its and an onlick to each square in your grid
            squares[i].onclick = function () {
                // if the square below your current square is occupied, you can move it up one position
                // cganging colors by css class
                if (squares[index].classList.contains('player-one') || (squares[index].classList.contains('player-two'))) {
                    alert("Sorry. This position is occupied")
                }else {
                    if (squares[index + 7].classList.contains('taken')) {
                        if (currentPlayer === 1) {
                            squares[index].classList.add('taken');
                            squares[index].classList.add('player-one');
                            // now change the player
                            currentPlayer = 2; //Now player two
                            displayCurrentUser.innerHTML = currentPlayer; //Show player twho
                        } else if (currentPlayer === 2) {
                            //The same but with player two
                            squares[index].classList.add('taken');
                            squares[index].classList.add('player-two');
                            //Change player to player two
                            currentPlayer = 1;
                            displayCurrentUser.innerHTML = currentPlayer;
                        }
                        // if the square bellow is not occupied or taken

                    } else {
                        alert("Sorry you cant go here")
                    }
                }
            }
        })(i);
    }

    //check win or lose
    function winOrLose() {
        // Make an Array with all the winners arrays
        const winingArrays = [
            [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
            [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
            [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
            [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
            [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
            [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
            [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
            [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
            [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
            [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];
        // Now take the 4 values from the arrays of winning arrays and plug it them into the squares
        for(let y = 0; y < winingArrays.length; y++){
            const square1 = squares[winingArrays[y][0]];
            const square2 = squares[winingArrays[y][1]];
            const square3 = squares[winingArrays[y][2]];
            const square4 = squares[winingArrays[y][3]];
            // check if those array to check if they have player-one css class . In this case payer one wings
            // if those array have player-two class player two wing
            if(square1.classList.contains('player-one') && square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') && square4.classList.contains('player-one')){
                // Player one WINNER
                alert('Congratulations Player One. You are the Winner!!!');
                reload();
            }else if(square1.classList.contains('player-two') && square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') && square4.classList.contains('player-two')){
                // Player two WINNER
                alert('Congratulations Player Two. You are the Winner!!!');
                reload();
            }
        }
    }


    //ListenEvent to check winner
    squares.forEach(square => square.addEventListener('click', winOrLose));


    //Chech if there is a winner




    // Reload page
    //TODO ASK FOR GO BACK TO INDEX GAMES PAGE
    function reload() {
        setTimeout(location.reload(true), 5000);
    }

});