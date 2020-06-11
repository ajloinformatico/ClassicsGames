document.addEventListener('DOMContentLoaded', () => {
    // Card option
    //constant variable Never change
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img : 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img : 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img : 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img : 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ];

    //Sort cards
    cardArray.sort(() => 0.5 - Math.random());


    const grid = document.querySelector('.grid');
    var resultDisplay = document.querySelector('#result'); //Var for display results it will be the length of
        // the cardsWonArray
    var cardsChosen = []; //Array for the cards that are chosen
    var cardsIdChossen = []; //Array for the id of the cards that are chosen
    var cardsWon = []; //Array for the found matches cards

    // Create the board
    // goes through the list and creates img tags with the src attribute pointing to the blank image and an id of the
    // position, finally append the cards to the grid
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png'); //blank image is the colors image
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipYourCard);
            grid.appendChild(card);
        }
    }

    // Load the board
    createBoard();

    // check the matches
    function checkForMatches(){
        var cards = document.querySelectorAll('img');
        const option1id = cardsIdChossen[0];
        const option2id = cardsIdChossen[1];

        // If the id of the clicked cards is the same alert its the same cards
        // So recharge img to div
        if(option1id === option2id) {
            // two position
            cards[option1id].setAttribute('src', 'images/blank.png');
            cards[option2id].setAttribute('src', 'images/blank.png');
            alert('You cannot click in the same image');

        // If cards are the same but ids are diferent set white and add card to Won Array
        }else if (cardsChosen[0] === cardsChosen[1]){ //Cehck if can use cardsIdChossen run here
            alert('Congratulations. You have found a math!!!');
            cards[option1id].setAttribute('src', 'images/white.png');
            cards[option2id].setAttribute('src', 'images/white.png');
            cards[option1id].removeEventListener('click', flipYourCard);
            cards[option2id].removeEventListener('click', flipYourCard)
            cardsWon.push(cardsChosen)
        } else { // if not the same
            cards[option1id].setAttribute('src','images/blank.png');
            cards[option2id].setAttribute('src','images/blank.png');
            alert("Sorry you failed. Try again");
        }
        //Finally let two Arrays empty
        cardsChosen = [];
        cardsIdChossen = [];
        // Set result of the lenght of cardas
        resultDisplay.textContent = cardsWon.length;
        //Check if lengt of wonCard Array is equal to cardArray / 2
        if(cardsWon.length === cardArray.length/2) {
            alert('congratulations!! Yo won Memory Game!');
            actualizar();
        }
    }

    //flip your card
    function flipYourCard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name); //card into the Array Of cards chosen
        cardsIdChossen.push(cardId); //car cardId of the card chosen into the Array of cards chosen
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsIdChossen.length === 2){
            setTimeout(checkForMatches, 500); //0,5 seconds
        }
    }

    //Funcion ti reload page
    //TODO ASK to reload or go back ti index of all the games
    function actualizar(){
        location.reload(true);
    }

});