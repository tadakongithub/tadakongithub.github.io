
const cards = ['AC', 'AD', 'AH', 'AS',
'2C', '2D', '2H', '2S',
'3C', '3D', '3H', '3S',
'4C', '4D', '4H', '4S',
'5C', '5D', '5H', '5S',
'6C', '6D', '6H', '6S',
'7C', '7D', '7H', '7S',
'8C', '8D', '8H', '8S',
'9C', '9D', '9H', '9S',
'10C', '10D', '10H', '10S',
'JC', 'JD', 'JH', 'JS',
'QC', 'QD', 'QH', 'QS',
'KC', 'KD', 'KH', 'KS'
];

//shuffling array of cards
    for(var i = cards.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = cards[i];
        cards[i] = cards[r];
        cards[r] = tmp;
    }

const cardNodes = document.querySelectorAll('.card');

let currentPlayer = 1;
let pickedSingle;
let pickedArray = [];
let score1 = [];
let score2 = [];
let prevCard;
let currentCard;
let winner;


    cardNodes.forEach((card) => {
        card.addEventListener('click', () => {

            if(pickedArray.length < 2){
                //
                currentCard = card;

                //flipping clicked card
                pickedSingle = cards[card.id.substr(1) - 1];
                card.firstChild.src = 'img/cards/' + pickedSingle + '.jpg';

                //put the picked card into array
                if(pickedArray[0] !== pickedSingle){
                    pickedArray.push(pickedSingle);
                }
            }

            //checking if the current player has clicked two cards
            if(pickedArray.length === 2){

                //if number matched
                if(pickedArray[0].substr(0, 1) === pickedArray[1].substr(0, 1)){

                    //show modal
                    $('#matchedModal').modal({
                        backdrop: 'static'
                    });

                    //after clicking 'Continue' button
                    $('.btn-primary').on('click', function(){

                        //delete the two cards so that the players cannot click them
                        currentCard.removeChild(currentCard.firstElementChild);
                        prevCard.removeChild(prevCard.firstElementChild);
                        
                        //hide modal
                        $('#matchedModal').modal('hide');

                        //push the two cards into current player's score bucket
                        let [a, b] = pickedArray;
                        if(currentPlayer === 1){
                            score1.push(a);
                            score1.push(b);
                        } else if(currentPlayer === 2){
                            score2.push(a);
                            score2.push(b);
                        }

                        //emptying current array
                        pickedArray.length = 0;

                        if((score1.length + score2.length) === 52){
                            document.querySelector('.allCards').style.display = 'none';
                            document.querySelector('.switchPlayer').style.display = 'none';
                            document.querySelector('.winner').style.display = 'block';
                            document.querySelector('.score1-div').classList.remove('active');
                            document.querySelector('.score2-div').classList.remove('active');

                            if(score1.length > score2.length){
                                document.querySelector('.winner').textContent = 'Winner : Player 1';
                            } else if (score1.length < score2.length){
                                document.querySelector('.winner').textContent = 'Winner : Player 2';
                            }
                        }

                        document.querySelector('.score1').textContent = score1.length;
                        document.querySelector('.score2').textContent = score2.length;
            
                    });

                } else {
                    //enabling switch player button
                    document.querySelector('.switchPlayer').disabled = false;

                    document.querySelector('.switchPlayer').onclick = function(){

                        //switch current player
                        currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;

                        //highlighting the current player
                        document.querySelector('.score1-div').classList.toggle('active');
                        document.querySelector('.score2-div').classList.toggle('active');
                    
                        //flipping the two cards back
                        currentCard.firstChild.src = 'img/cards/blue_back.jpg';
                        prevCard.firstChild.src = 'img/cards/blue_back.jpg';
                    
                        //emptying previous card, current card, current array
                        pickedArray.length = 0;
                    
                        //disable 'Switch Player' button
                        document.querySelector('.switchPlayer').disabled = true;
                    
                    };

                }
            } else if(pickedArray.length === 1){

                //if this is the first pick, store the card in variable so that I can delete it in case
                //matched with the next card. If not, just empty it.
                prevCard = currentCard;
            }
            
        });
    });








