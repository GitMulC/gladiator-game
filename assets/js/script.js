/**
 * Eventlisteners
 */
let startGame = document.getElementById('button-start');
let tutorialArea = document.getElementById('intro-tutorial');
let enemyOpponent = document.getElementById('opponent-area');
let leftSwing = document.getElementById('left-attack');
let rightSwing = document.getElementById('right-attack');

startGame.addEventListener('click', function(){
    battleStart();
});
leftSwing.addEventListener('click', function(){
    swing(0);
});
rightSwing.addEventListener('click', function(){
    swing(1);
});

/**
 * Mute/unmute button event listeners
 */

 let mute;
 const muteBtn = document.getElementById('button-mute');
 const unmuteBtn = document.getElementById('button-unmute');
 muteBtn.addEventListener('click', function(){
     mute = true;
     muteBtn.classList.add('hidden');
     unmuteBtn.classList.remove('hidden');
 });
 unmuteBtn.addEventListener('click', function(){
     mute = false;
     unmuteBtn.classList.add('hidden');
     muteBtn.classList.remove('hidden');
 });

 /**
  * Game Reset function & event listener
  */

let restart = document.getElementById('button-reset');
restart.addEventListener('click', function(){
    location.reload();
});

/**
 * Functions
 */


function battleStart(){
    enemyOpponent.classList.remove('hidden');
    leftSwing.classList.remove('hidden');
    rightSwing.classList.remove('hidden');
    tutorialArea.classList.add('hidden');
}

/**
 * Core Game mechanic
 * Main gameplay will use boolean logic in functions to run
 * Any attack will trigger sword swing audio
 * A hit will trigger sword hit audio
 * A block will trigger sword block audio
 */

function gladiatorBlock(){
    return Math.floor(Math.random()*2);
}

function swing(swingSide){
    let result = gladiatorBlock();
    let blockedAttack = result === swingSide;
    playAudio(blockedAttack);
    let hitGladiator = result !== swingSide;
    if(hitGladiator){
        hitPoints();
    }
}

/**
 * Enemy Hit points function
 */

function hitPoints(){
    let enemyLife = document.getElementById('enemy-life');
    let damage = parseInt(enemyLife.innerText);
    enemyLife.innerText = ++damage;
}


/**
 * Sounds for gameplay
 * Functions determine what sound will be played 
 * Based on what the result of gladiatorBlock or "computer" will get vs what player chooses
 */

function playAudio(blockedAttack){
    if (!mute){
        let audio = document.getElementById('sword-swing');
        audio.currentTime = 0;
        audio.volume = 0.1;
        audio.play();
        if(blockedAttack){
           let block = document.getElementById('sword-block');
           console.log('Block');
           block.currentTime = 0;
           block.volume = 0.1;
           block.play(); 
        } else{
            let hit = document.getElementById('sword-hit');
            console.log('Hit');
            hit.currentTime = 0;
            hit.volume = 0.1;
            hit.play();
        }
    }
}