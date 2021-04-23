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
    gameState.p_inc = 80;
    gameState.platforms = this.physics.add.staticGroup();

    const createPlatform = (x,y) => {
        gameState.platform.push(this.add.rectangle(x,y,70,10,'0xFFaa10'));
        gameState.platforms.add(gameState.platform[gameState.platform.length-1]);
    }

    const removeBottomPlatform = () => {
        let oldStart = gameState.platform[0];
        // let oldEnd = gameState.platform[gameState.platform.length-1];
        // Must also remove the lowest platform from physical memory!
        gameState.platform.shift();

        // oldStart.destroy();
        oldStart.destroy();
        // console.log(gameState.platform.length);
    }

    gameState.displayHeight = game.config.height;
    gameState.displayWidth = game.config.width; 

    gameState.buildPlatforms = () => {
        if (gameState.platform.length > 0){
            start_point = gameState.displayHeight - gameState.platform.length* gameState.p_inc;
        } else {
            start_point = gameState.displayHeight - (gameState.platform.length + 1)*gameState.p_inc;
        }

        // Build from there.
        for (let y = start_point; y > 0; y-= gameState.p_inc){
            createPlatform(gameState.displayWidth/3 + Math.abs(Math.round(Math.random()*gameState.displayWidth/1.5 - gameState.displayWidth/2)), y);
        }
    }

    gameState.lowerPlatforms = () => {
        removeBottomPlatform();
        // You can now lose
        gameState.player.setCollideWorldBounds(false);

        // Loop lower each existing platform (must destroy and recreate)
        gameState.platform.forEach((p) => {
            p.y += gameState.p_inc;
        });

        // Static groups must be refreshed after moving.
        gameState.platforms.refresh();
    }

    this.physics.add.collider(gameState.player, gameState.platforms);
    createPlatform(gameState.displayWidth/3 + Math.abs(Math.round(Math.random()*gameState.displayWidth/1.5 - gameState.displayWidth/2)), gameState.displayHeight-gameState.p_inc/2);
    gameState.buildPlatforms();
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

    if((gameState.player.body.y <= game.config.height - gameState.p_inc/1.5) && (gameState.cursors.space.isDown && gameState.player.body.blocked.down)){
        gameState.lowerPlatforms();
        gameState.buildPlatforms();
    }

}



const game = new Phaser.Game(config);