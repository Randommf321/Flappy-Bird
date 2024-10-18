document.addEventListener('DOMContentLoaded', () => {
    let bird = document.querySelector('.bird');
    let gameDisplay = document.querySelector('.game-container');
    let ground = document.querySelector('.ground');
    let birdLeft = 220;
    let birdBottom = 500;
    let gravity = 2;
    let isGameOver = false;
    function startGame(){
        birdBottom -= gravity;
        if (birdBottom > 0) {
            bird.style.left = birdLeft + "px";
            bird.style.bottom = birdBottom + "px";
        } else {
            birdBottom = 0;
            gameOver();
        }
    }
    let gameTime = setInterval(startGame, 20);
    function control(e) {
        if (e.keyCode === 32){
            jump();
        }
    }
    function jump() {
        if (birdBottom < 500){
            birdBottom += 50;
        }
        bird.style.bottom = birdBottom + 'px';
    }
    document.addEventListener('keydown', control);

    function createBlock() {
        let block = document.createElement('div');
        if (!isGameOver) {
            block.classList.add('block');
            gameDisplay.appendChild(block);
        }
        let blockLeft = 500;
        let blockBottom = Math.random() * 100;
        block.style.left = blockLeft + 'px';
        block.style.bottom = blockBottom + 'px';
        function moveBlock(){
            blockLeft -= 2;
            block.style.left = blockLeft + 'px';

            if (blockLeft === -60) {
                clearInterval(blockTime);
                gameDisplay.removeChild(block);
            }
            if (birdBottom === 0 || birdLeft === 220 && blockLeft > 200 && blockLeft < 260 && birdBottom < blockBottom+135) {
                gameOver();
                clearInterval(blockTime);
            }
        }
        let blockTime = setInterval(moveBlock, 20);
        if (!isGameOver){
            setTimeout(createBlock, 2000);
        }
    }
    createBlock();
    function gameOver() {
        clearInterval(gameTime);
        isGameOver = true;
        document.removeEventListener('keydown', control);
    }
});
