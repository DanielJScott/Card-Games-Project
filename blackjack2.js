
function generateDeck() {
    //These are the presets for cards that can be dealt
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const broadway = ["Ace", "King", "Queen", "Jack"];
    const deck = [];
    //This will assign a number value to cards in the deck
    for (let i=2; i < 11; i++) {
        for (let n = 0 ; n < 4 ; n++) {
            const card = {
                name: i + " of " + suits[n],
                value: i
            };
            deck.push(card);
        }
    }
    //This generates the broadway cards
    for (var i=0; i<broadway.length; i++){
        for (var j=0; j<4; j++){
            const card = {
                name: broadway[i] + " of " + suits[j],
                value: 10
            }
            if (broadway[i] === "Ace") {
                card.value = 11;
            }
            deck.push(card);
        }
    }
    return deck;
}


const blackjack = {
    //This is the array containing the cards in the deck.
    deck: generateDeck(),
    //These are the player and dealer objects cards can be dealt to
    //These will be replaced with a constructor which allows any number of players to join in.
    player: {
        cards: [],
        points: [],
        score: 0
    },

    dealer:{
        cards: [],
        points: [],
        score: 0
    },
      //This will tackle additional cards being dealt to the players.
    hit: function( person) {

        if (person !== 'dealer' && person !== 'player') {
            throw new Error('Invalid value passed to blackjack.hit()!')
        }

        this._deal(person);
        this._scoreCalculator(person);
        this._scoreChecker(person);

    },


    _deal: function(person) {
        const card = Math.floor(Math.random() * this.deck.length);
        this[person].cards.push(this.deck[card].name);
        this[person].points.push(this.deck[card].value);
        this.deck.splice(card, 1);
        this._scoreCalculator(person);
    },

    deal: function() {
        for (let i = 0 ; i < 2 ; i++) {
            this._deal("dealer");
            this._scoreCalculator("dealer");
            this._scoreChecker("dealer");
            this._deal("player");
            this._scoreCalculator("player");
            this._scoreChecker("player");


        }
    },
        //this will tally up the player's points
    _scoreCalculator: function(person) {
        const add = function (a, b) {
            return a + b;
        };
        this[person].score = this[person].points.reduce(add);
        if (this[person].score > 21) {
            for (let i = 0; i < this[person].points.length ; i ++) {
                if (this[person].points[i] === 11) {
                    return this[person].points[i] = 1
                }
            }
            return this[person].score = this[person].points.reduce(add);
        }

    },
        //This checks the players scores.  If someone has exceeded the score,
        //the player will lose the game.
    _scoreChecker: function (person) {
        if (this[person].score > 21) {
            return "The " + person + " score was over 21.  Bust.";
        } else if (this[person].score === 21) {
            return this.finale(person);
        }
    },
     //when both players have settled on their hand, this will run.
     finale: function (person) {

         if (person === "dealer")

         if (this[person].score > this.dealer.score && this[person].score <= 21) {
             return "Player wins!";
         } else {
             return "Dealer wins";
         }
     }
//need to write additional statements determining which player has the highest
//score under 21
}


blackjack.deal();
console.log("Player has " + blackjack.player.cards);
console.log("Dealer has " + blackjack.dealer.cards);
blackjack.hit("player");
console.log("Player has " + blackjack.player.cards);
console.log(blackjack._scoreChecker("player"));
console.log(blackjack.finale("player"));
