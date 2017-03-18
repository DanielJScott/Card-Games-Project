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

function Player (name) {
    this.name=name;
    this.cards = [];
    this.points = [];
    this.score = 0
    this.hit = function () {
        blackjack.hit(blackjack.table.indexOf(this));
    }
    this.joinTable = function (){
        blackjack.table.push(this);
    }

}

function addPlayers (num) {
    if (isNaN(num)) {
        throw new Error("Invalid value passed to addPlayer()!  Must be a number.")
    }

    const players = [];

    for (let i = 0 ; i <= num ; i ++) {
        if (i === 0 ) {
            players.push(new Player("Dealer"));

        } else {
            players.push(new Player("Player " + i));
        }
    }
    return players;
}


let playerNum = 3;
const blackjack = {
    //This is the array containing the cards in the deck.
    deck: generateDeck(),
    //These are the player and dealer objects cards can be dealt to
    //These will be replaced with a constructor which allows any number of players to join in.
    table: addPlayers(playerNum),
      //This will tackle additional cards being dealt to the players.
    hit: function(seat) {

        if (isNaN(seat)) {
            throw new Error('Invalid value passed to blackjack.hit()!')
        } else if (seat >= this.table.length) {
            throw new Error('Value was greater than number of players!')
        }


        this._deal(seat);
        this._scoreCalculator(seat);
        this._scoreChecker(seat);

    },


    _deal: function(seat) {
        const card = Math.floor(Math.random() * this.deck.length);
        this.table[seat].cards.push(this.deck[card].name);
        this.table[seat].points.push(this.deck[card].value);
        this.deck.splice(card, 1);
        this._scoreCalculator(seat);
    },

    deal: function() {
        for (let i = 0 ; i < this.table.length ; i ++) {
            for (let n = 0 ; n < 2 ; n ++) {
                this._deal(i);
            }
        }
    },
        //this will tally up the player's points
    _scoreCalculator: function(seat) {
        const add = function (a, b) {
            return a + b;
        };
        this.table[seat].score = this.table[seat].points.reduce(add);
        if (this.table[seat].score > 21) {
            for (let i = 0; i < this.table[seat].points.length ; i ++) {
                if (this.table[seat].points[i] === 11) {
                    return this.table[seat].points[i] = 1
                }
            }
            return this.table[seat].score = this.table[seat].points.reduce(add);
        }

    },
        //This checks the players scores.  If someone has exceeded the score,
        //the player will lose the game.
        _scoreChecker: function (seat) {
            if (this.table[seat].score > 21) {
                return "Player" + seat + " score was over 21.  Bust.";
            } else if (this.table[seat].score === 21) {
                return this.finale(seat);
            } else {
                return "Player" + seat + " score is " + this.table[seat].score + ".";
            }
        },
         //when both players have settled on their hand, this will run.
         finale: function () {
             let winner;
             let lead;
             let multi = [];
             let base = 0;
             if (this.table[0].score <= 21) {
                 lead = 0;
                 base = this.table[0].score;
             }
             for (let i = 1 ; i < this.table.length ; i ++) {
                 if (this.table[i].score > base && this.table[i].score <= 21) {
                     lead = i;
                     base = this.table[i].score;
                 } else if (this.table[i].score >= base && this.table[i].score <= 21 && lead === 0) {
                     lead = 0;
                 } else if (this.table[i].score === base && lead != 0) {
                     multi.push(i);
                     if (multi.indexOf(lead) === -1) {
                         multi.push(lead);
                     }
                 }
             }
             if (multi.length > 0 && this.table[lead].score > this.table[multi[0]].score){
                 winner = this.table[lead].name;
             } else if (multi.length > 0 && this.table[multi[0]].score >= this.table[lead].score){
                 winner = "Players " + multi.join(", ");
             } else {
                 winner = this.table[lead].name;
             }
             return winner + " has won this hand.";
         }
    //need to write additional statements determining which player has the highest
    //score under 21
}


playerNum = 3;
blackjack.deal();
