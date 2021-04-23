const config = {
    type: Phaser.AUTO,
    height: 600,
    width: 600,
    backgroundColor: "aaffaa",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            enableBod: true
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
    gameState.player = this.physics.add.sprite(250,250, 'player');
    gameState.player.setCollideWorldBounds(true);
}

function update(){

}



const game = new Phaser.Game(config);