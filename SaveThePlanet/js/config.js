let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300,
                debug: false
            },
        }
    },
    
    // Scenes do Jogo
    scene: [ menu, level1, level2, level3, level4, level5, win, gameover, instructions, history,]


};

let game = new Phaser.Game(config);
