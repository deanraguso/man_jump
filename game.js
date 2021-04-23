const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 600,
    backgroundColor: "aaffaa",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // debug: true
        }
    },
    scene: {
        preload,
        create, 
        update
    }
}

const gameState = {};

function preload(){
    this.load.image('player', 'assets/player.png');
}

function create(){
    gameState.player = this.physics.add.sprite(250,550, 'player');
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();
    
    gameState.platform = []
    gameState.p_inc = 70;
    gameState.platforms = this.physics.add.staticGroup();

    const createPlatform = (x,y) => {
        gameState.platform.push(this.add.rectangle(x,y,70,10,'0xFFaa10'));
        gameState.platforms.add(gameState.platform[gameState.platform.length-1]);
    }

    const displayHeight = 600;
    const displayWidth = 600;

    const buildPlatforms = () => {
        const p_max = displayHeight / gameState.p_inc;
        start_point = displayHeight - (gameState.platform.length + 1)*gameState.p_inc;

        // Build from there.
        for (let y = start_point; y > 0; y-= gameState.p_inc){
            createPlatform(Math.abs(Math.round(Math.random()*displayWidth/2 - displayWidth/3)), y);
        }
    }

    const lowerPlatforms = () => {
        
    }

    this.physics.add.collider(gameState.player, gameState.platforms);
    buildPlatforms();
}

function update(){
    const speed = 150;

    if(gameState.cursors.left.isDown){
        gameState.player.setVelocityX(-speed);
    } else if (gameState.cursors.right.isDown){
        gameState.player.setVelocityX(speed);
    } else {
        gameState.player.setVelocityX(0);
    }

    if (gameState.cursors.space.isDown && gameState.player.body.blocked.down){
        gameState.player.setVelocityY(-300);
    }

}



const game = new Phaser.Game(config);