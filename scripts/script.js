function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;

  humanChoice = yourChoice.id;

  botChoice = [
    'rock',
    'paper',
    'scissor',
  ][Math.floor(Math.random() * 3)];
  console.log(botChoice);

  var results = decideWinner(humanChoice, botChoice);
  console.log(results);

  var message = finalMessage(results);
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function decideWinner(hChoice, bChoice) {
  var db = {
    'rock': {
      'rock': 0.5,
      'paper': 0,
      'scissor': 1,
    },
    'paper': {
      'rock': 1,
      'paper': 0.5,
      'scissor': 0,
    },
    'scissor': {
      'rock': 0,
      'paper': 1,
      'scissor': 0.5,
    },
  }

  var result = [db[hChoice][bChoice], db[bChoice][hChoice]];
  return result;
}

function finalMessage(result) {
  var hScore = result[0];
  var message = {
    'message': 'You tied',
    'color': 'yellow'
  }
  if (hScore === 0) {
    message['message'] = "You Loser!";
    message['color'] = 'red';
  } else
  if (hScore === 1) {
    message['message'] = "You Winner!";
    message['color'] = 'blue';
  }

  return message;
}

function rpsFrontEnd(yChoice, bChoice, message) {
  var assets = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissor': document.getElementById('scissor').src,
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  console.log(assets[yChoice]);
  console.log(message);

  humanDiv.innerHTML = "<img src='" + assets[yChoice] + "'height= 150, width= 150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML = "<h1 style='color: " + message['color'] + ";font-size: 60px; padding: 30px'>" + message['message'] + "<\h1>";
  botDiv.innerHTML = "<img src='" + assets[bChoice] + "'height=150, width= 150 style='box-shadow: 0px 10px 50px rgba(255, 50, 37, 1);'>";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);

}



var allButtons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
  copyAllButtons.push(allButtons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red')
    buttonRed();
  else
  if (buttonThingy.value === 'green')
    buttonGreen();
  else
  if (buttonThingy.value === 'reset')
    buttonReset();
  else
  if (buttonThingy.value === 'random')
    randomColors();
}

function buttonRed() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-danger');
  }
}

function buttonGreen() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-success');
  }
}

function randomColors() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(['btn-success', 'btn-warning', 'btn-danger', 'btn-primary', ][Math.floor(Math.random() * 4)]);
  }
}

function buttonReset() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copyAllButtons[i]);
  }
}

//blackjack stuff

let blackjackGame = {
  'you': {
    'scoreSpan': '#your-blackjack-result',
    'div': '#your-box',
    'score': 0,
  },
  'dealer': {
    'scoreSpan': '#dealer-blackjack-result',
    'div': '#dealer-box',
    'score': 0,
  },
  'cards': [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'K',
    'Q',
    'J',
    'A',
  ],
  'cardMaps': {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'K': 10,
    'Q': 10,
    'J': 10,
    'A': [1, 11],
  },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isHit': false,
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const cards = blackjackGame['cards'];
const cardMap = blackjackGame['cardMaps'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('blackjack_assets/sounds/cash.mp3');
const lossSound = new Audio('blackjack_assets/sounds/aww.mp3');

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let cardNumber = cards[randomCard()];
    console.log('hit');
    showCard(cardNumber, YOU)
    console.log(YOU['score']);
    showScore(YOU);
    blackjackGame['isHit'] = true;
  }
}

function randomCard() {
  return Math.floor(Math.random() * 13);
}

function showCard(cardNumber, activePlayer) {
  if (activePlayer['score'] < 21) {
    updateScore(cardNumber, activePlayer);
    //console.log('After updateScore', activePlayer['score'])
    let cardImage = document.createElement('img');
    //console.log(cardNumber);
    cardImage.src = `blackjack_assets/images/${cardNumber}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {
    // showWinner(computeWinner());
    let your_images = document.querySelector('#your-box').querySelectorAll('img');
    let dealer_images = document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i = 0; i < your_images.length; i++) {
      console.log('yo rem');
      your_images[i].remove();
    }
    YOU['score'] = 0;
    showScore(YOU);
    document.querySelector(YOU['scoreSpan']).style.color = 'white';

    for (let i = 0; i < dealer_images.length; i++) {
      dealer_images[i].remove();
    }
    DEALER['score'] = 0;
    showScore(DEALER);

    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['isStand'] = false;
    blackjackGame['turnsOver'] = false;
    blackjackGame['isHit'] = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    if (activePlayer['score'] + cardMap[card][1] <= 21) {
      activePlayer['score'] += cardMap[card][1];
    } else {
      activePlayer['score'] += cardMap[card][0];
    }
  } else {
    activePlayer['score'] += cardMap[card];
  }
}

function showScore(activePlayer) {
  
    if (activePlayer['score'] <= 21) {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } else {
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    }
  
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
  if (blackjackGame['turnsOver'] === false && blackjackGame['isHit'] === true) {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
      let cardNumber = cards[randomCard()];
      //console.log(DEALER['score']);
      showCard(cardNumber, DEALER);
      //console.log(DEALER['score']);
      //updateScore(cardNumber, DEALER);
      //console.log(DEALER['score']);
      showScore(DEALER);
      await sleep(1000);
    }
    //console.log(DEALER['score']);

    blackjackGame['turnsOver'] = true;
    showWinner(computeWinner());

  }
}

function computeWinner() {
  let yScore = YOU['score'];
  let dScore = DEALER['score'];
  let winner;
  //if your score <21 but dealer >you but also >21 you win
  if (yScore < 21) {
    if (dScore > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else if (yScore < dScore) {
      blackjackGame['losses']++;
      winner = DEALER;
    } else if (yScore == dScore) {
      blackjackGame['draws']++;
      winner = undefined;
    } else {
      blackjackGame['wins']++;
      winner = YOU;
    }

  } else if (yScore > 21) {
    if (dScore <= 21) {
      blackjackGame['losses']++;
      winner = DEALER;
    } else {
      blackjackGame['draws']++;
      winner = undefined;
    }
  } else {
    if (dScore != 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else {
      blackjackGame['draws']++;
      winner = undefined;
    }
  }

  console.log('Winner is', winner);
  return winner;
}

function showWinner(winner) {

  let message, color;

  if (winner === YOU) {
    document.querySelector('#wins').textContent = blackjackGame['wins'];
    message = 'You Won!';
    color = 'blue';
    winSound.play();
  } else if (winner === DEALER) {
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    message = 'You Lost!';
    color = 'red';
    lossSound.play();
  } else {
    document.querySelector('#draws').textContent = blackjackGame['draws'];
    message = 'You drew!!';
    color = 'yellow';
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = color;

}