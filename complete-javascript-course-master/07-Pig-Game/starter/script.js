'use strict';

const querySelecting = x => document.querySelector(x),

    // Selecting elements
    player0El = querySelecting('.player--0'),
    player1El = querySelecting('.player--1'),
    score0El = querySelecting('#score--0'),
    score1El = querySelecting('#score--1'),
    current0El = querySelecting('#current--0'),
    current1El = querySelecting('#current--1'),

    diceEl = querySelecting('.dice'),
    btnNew = querySelecting('.btn--new'),
    btnRoll = querySelecting('.btn--roll'),
    btnHold = querySelecting('.btn--hold');

// Starting conditions
let currrentScore, activePlayer, playing, scores;

const holyHandGrenade = () => {
    currrentScore = 0,
        activePlayer = 0,
        playing = true,
        scores = [0, 0];

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

holyHandGrenade();

const switchPlayer = function () {
    querySelecting(`#current--${activePlayer}`).textContent = 0;
    currrentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {

        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currrentScore += dice;
            querySelecting(`#current--${activePlayer}`).textContent = currrentScore;

            // current0El.textContent = currrentScore; // CHANGE LATER
        } else {
            // Switch to next player
            switchPlayer();
        }

    }
});

btnHold.addEventListener('click', function () {
    if (playing) {

        // 1. Add current score to active player's score
        scores[activePlayer] += currrentScore;
        // scores[1] = scores[1] + currrentScore
        querySelecting(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            querySelecting(`.player--${activePlayer}`).classList.add('player--winner');
            querySelecting(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }

    }
})

btnNew.addEventListener('click', holyHandGrenade)