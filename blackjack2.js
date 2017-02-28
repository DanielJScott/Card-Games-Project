const blackjack = {

    deck: generateDeck(),


      player: {
        cards: [],
        points: []
      },

      dealer:{
        cards: [],
        points: []
      },

      hit: function( person) {

        if (person !== 'dealer' && person !== 'player') {
            throw new Error('Invalid value passed to blackjack.hit()!')
        }

        this._deal(person);

      },


        _deal: function(person) {
            const card = Math.floor(Math.random() * this.deck.length);
            this[person].cards.push(this.deck[card].name);
            this[person].points.push(this.deck[card].value);
            this.deck.splice(card, 1);
        },

        deal: function() {
            for (let i = 0 ; i < 2 ; i++) {
                this._deal("player");
                this._deal("dealer");
            }
        },





       scoreChecker: function () {

         const add = function (a, b) {
             return a + b;
         };

         let dealerScore = blackjack.dealer.points.reduce(add);
         let playerScore = blackjack.player.points.reduce(add);

         if (playerScore > 21) {
           for (let n = 0 ; n < this.player.points.length ; n ++) {
             if (this.player.points[n] === 11) {
               return this.player.points[n] = 1
             }
           }
             return "Player score was over 21.  Bust.";

         } else if (dealerScore > 21) {
           for (let n = 0 ; n < this.dealer.points.length ; n ++) {
             if (this.dealer.points[n] === 11) {
               return this.dealer.points[n] = 1
             }
         }
         return "Dealer score was over 21.  Player wins.";
       } else {
           return "Both under 21.  Keep playing.";
       }
     }

}


blackjack.deal();
console.log("Player has " + blackjack.player.cards);
console.log("Dealer has " + blackjack.dealer.cards);
blackjack.scoreChecker();
blackjack.hit("player");
console.log("Player has " + blackjack.player.cards);
blackjack.scoreChecker();

console.log(blackjack.scoreChecker());


function generateDeck() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const broadway = ["Ace", "King", "Queen", "Jack"];
    const deck = [];

    for (let i=2; i < 11; i++) {
        for (let n = 0 ; n < 4 ; n++) {

            const card = {
                name: i + " of " + suits[n],
                value: i
            };

            deck.push(card);
        }
    }
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
