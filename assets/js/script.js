/**
 * Eventlisteners
 */
let leftSwing = document.getElementById('left-attack');
let rightSwing = document.getElementById('right-attack');

leftSwing.addEventListener('click', function(){
    swing(0);
});
rightSwing.addEventListener('click', function(){
    swing(1);
});

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
}


/**
 * Sounds for gameplay
 * Functions determine what sound will be played 
 * Based on what the result of gladiatorBlock or "computer" will get vs what player chooses
 */

function playAudio(blockedAttack){
    let audio = document.getElementById('sword-swing');
    audio.currentTime = 0;
    audio.play();
    if(blockedAttack){
       let block = document.getElementById('sword-block');
       console.log('Block');
       block.play(); 
    } else{
        let hit = document.getElementById('sword-hit');
        console.log('Hit');
        hit.play();
    }
}