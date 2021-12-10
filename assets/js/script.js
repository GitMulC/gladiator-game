/**
 * Eventlisteners
 */
let startGame = document.getElementById('button-start');
let tutorialArea = document.getElementById('intro-tutorial');
let enemyOpponent = document.getElementById('opponent-area');
let bossOpponent = document.getElementById('opponent-area-2');
let leftSwing = document.getElementById('left-attack');
let rightSwing = document.getElementById('right-attack');
let lifeTotals = document.getElementById('lifetotals');

startGame.addEventListener('click', function () {
    battleStart();
});
leftSwing.addEventListener('click', function () {
    swing(0);
});
rightSwing.addEventListener('click', function () {
    swing(1);
});

/**
 * Mute/unmute button event listeners
 */

let mute;
const muteBtn = document.getElementById('button-mute');
const unmuteBtn = document.getElementById('button-unmute');
muteBtn.addEventListener('click', function () {
    mute = true;
    muteBtn.classList.add('hidden');
    unmuteBtn.classList.remove('hidden');
});
unmuteBtn.addEventListener('click', function () {
    mute = false;
    unmuteBtn.classList.add('hidden');
    muteBtn.classList.remove('hidden');
});

/**
 * Game Reset function & event listener
 */

let restart = document.getElementById('button-reset');
restart.addEventListener('click', function () {
    location.reload();
});

/**
 * Functions
 */

// Fight button function
function battleStart() {
    startGame.classList.add('hidden');
    restart.classList.remove('hidden');
    enemyOpponent.classList.remove('hidden');
    leftSwing.classList.remove('hidden');
    rightSwing.classList.remove('hidden');
    tutorialArea.classList.add('hidden');
    lifeTotals.classList.remove('hidden');
    let backgroundMusic = document.getElementById('ambient-crowd');
    if (!mute) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
    }
}

/**
 * Core Game mechanic
 * Main gameplay will use boolean logic in functions to run
 * Any attack will trigger sword swing audio
 * A hit will trigger sword hit audio
 * A block will trigger sword block audio
 */

// Global variable used to check if the player is facing the boss
let isBossBattle = false;

//Generate opponents side attack left(0) or right(1)
function gladiatorBlock() {
    return Math.floor(Math.random() * 2);
}

// Determines the outcome of each swing
function swing(swingSide) {
    let result = gladiatorBlock();
    let blockedAttack = result === swingSide;
    playAudio(blockedAttack);
    let hitGladiator = result !== swingSide;
    if (hitGladiator) {
        hitPoints();
    } else if (isBossBattle) {
        let playerLife = document.getElementById('player-life');
        let damage = parseInt(playerLife.innerText);
        playerLife.innerText = ++damage;
        if (damage === 5) {
            let lose = document.getElementById('loser');
            lose.classList.remove('hidden');
            bossOpponent.classList.add('hidden');
            leftSwing.classList.add('hidden');
            rightSwing.classList.add('hidden');
        }
    }
}

/**
 * Enemy Hit points function & transition to the boss
 */

function hitPoints() {
    if (isBossBattle) {
        let bossLife = document.getElementById('boss-life');
        let damage = parseInt(bossLife.innerText);
        bossLife.innerText = ++damage;
        if (damage === 5) {
            let win = document.getElementById('winner');
            win.classList.remove('hidden');
            bossOpponent.classList.add('hidden');
            leftSwing.classList.add('hidden');
            rightSwing.classList.add('hidden');
            if (!mute) {
                let cheer = document.getElementById('win-cheer');
                cheer.currentTime = 0;
                cheer.volume = 0.4;
                cheer.play();
            }
        }
    } else {
        let enemyLife = document.getElementById('enemy-life');
        let damage = parseInt(enemyLife.innerText);
        enemyLife.innerText = ++damage;
        if (damage === 5) {
            transitionToBoss();
        }
    }
}

function transitionToBoss() {
    isBossBattle = true;
    let boss = document.getElementById('opponent-area-2');
    boss.classList.remove('hidden');
    enemyOpponent.classList.add('hidden');
    lifeTotals.classList.add('hidden');
    let playerLife = document.getElementById('lifetotals-player');
    let bossLife = document.getElementById('lifetotals-boss');
    playerLife.classList.remove('hidden');
    bossLife.classList.remove('hidden');
    if (!mute) {
        let cheer = document.getElementById('win-cheer');
        cheer.currentTime = 0;
        cheer.volume = 0.4;
        cheer.play();
    }
}


/**
 * Sounds for gameplay
 * Functions determine what sounds will be played 
 * Based on what the result of gladiatorBlock or "computer" will get vs what player chooses
 */

function playAudio(blockedAttack) {
    if (!mute) {
        let audio = document.getElementById('sword-swing');
        audio.currentTime = 0;
        audio.volume = 0.15;
        audio.play();
        if (isBossBattle) {
            if (blockedAttack) {
                let bossAttack = document.getElementById('boss-attack');
                bossAttack.currentTime = 0;
                bossAttack.volume = 0.15;
                bossAttack.play();
            } else {
                let hit = document.getElementById('sword-hit');
                console.log('Hit');
                hit.currentTime = 0;
                hit.volume = 0.15;
                hit.play();
            }
        } else {
            if (blockedAttack) {
                let block = document.getElementById('sword-block');
                console.log('Block');
                block.currentTime = 0;
                block.volume = 0.15;
                block.play();
            } else {
                let hit = document.getElementById('sword-hit');
                console.log('Hit');
                hit.currentTime = 0;
                hit.volume = 0.15;
                hit.play();
            }
        }
    }
}