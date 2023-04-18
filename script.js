const suits = ["hearts", "clubs", "diamonds", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

document.querySelector('.restart-button').addEventListener('click', startTrick);

function getDeck() {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { value: values[j], suit: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

function dealByColumns(deck) {
  let row3 = deck.splice(14, 7);
  let row2 = deck.splice(7, 7);
  let row1 = deck.splice(0, 7);
  deck = row1.concat(row2, row3);
  return deck;
}

function renderDeck(deck) {
  document.getElementById("deck").innerHTML = "";

	for(let i = 0; i < deck.length; i++) {
		let card = document.createElement("div");
		let value = document.createElement("div");
		let suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].suit;

		value.innerHTML = deck[i].value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("deck").appendChild(card);
	}
}

function loadDeck() {
  let deck = getDeck();
  deck = shuffleDeck(deck);
  renderDeck(deck);
}

window.onload = startTrick;

function get21cards () {
    let deck = getDeck();
    deck = shuffleDeck(deck);
    let cards = deck.splice(0, 21);
    return cards;
}



function startTrick () {
    document.getElementById('board').style.display = 'flex';
    document.getElementById('reveal').style.display = 'none';
    document.getElementById("instructions").innerHTML = "In your mind, pick any of these cards.<br/> Click on the row your card is in.";
    let clicks = 0;
    let deck = get21cards();
    renderDeck(deck);
      document.querySelector('.row1').addEventListener('click', () => rearrangeDeck(1));
      document.querySelector('.row2').addEventListener('click', () => rearrangeDeck(2));
      document.querySelector('.row3').addEventListener('click', () => rearrangeDeck(3));

      document.querySelector('.row1').addEventListener('click', () => checkIfThreeClicks ());
      document.querySelector('.row2').addEventListener('click', () => checkIfThreeClicks ());
      document.querySelector('.row3').addEventListener('click', () => checkIfThreeClicks ());
      
      function checkIfThreeClicks () {
        clicks++;
        if (clicks === 1) {
          document.getElementById("instructions").innerHTML = "Keep finding your card and <br/>clicking on the row it is in.";
        }
        if (clicks === 3) {
          endTrick(deck);
        }
      }

      function rearrangeDeck(selectedRow) {
        let row3 = deck.splice(14, 7);
        let row2 = deck.splice(7, 7);
        let row1 = deck.splice(0, 7);
        console.log(deck)
        if (selectedRow === 1) {
          deck = row2.concat(row1, row3);
          console.log('row1');
        } else if (selectedRow === 2) {
          deck = row1.concat(row2, row3);
          console.log('row2');
        } else if (selectedRow === 3) {
          deck = row1.concat(row3, row2);
          console.log('row3');
        }
        row1 = [];
        row2 = [];
        row3 = [];

        for (let i = 0; i < deck.length; i++) {
          if (i % 3 === 0) { 
            row1.push(deck[i]);
          } else if (i % 3 === 1) {
            row2.push(deck[i]);
          } else if (i % 3 === 2) {
            row3.push(deck[i]);
          }
        } 
        deck = row1.concat(row2, row3);
        renderDeck(deck);
      }
   
}

function endTrick(deck) {
  document.getElementById('board').style.display = 'none';
  document.getElementById('reveal').style.display = 'block';
  console.log(deck[10]);
  document.getElementById("reveal-card").innerHTML = "";

  let card = document.createElement("div");
  let value = document.createElement("div");
  let suit = document.createElement("div");
  card.className = "card";
  value.className = "value";
  suit.className = "suit " + deck[10].suit;

  value.innerHTML = deck[10].value;
  card.appendChild(value);
  card.appendChild(suit);

  if (deck[10].value === "A") {
    deck[10].value = "Ace";
  } else if (deck[10].value === "J") {
    deck[10].value = "Jack";
  } else if (deck[10].value === "Q") {
    deck[10].value = "Queen";
  } else if (deck[10].value === "K") {
    deck[10].value = "King";
  }

  document.getElementById("reveal-card").appendChild(card);
  document.getElementById("reveal-text").innerHTML = `Was your card the ${deck[10].value} of ${deck[10].suit}?`
}

