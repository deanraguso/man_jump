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
    }
}

const game = new Phaser.Game(config);