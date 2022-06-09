class gameover extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameover' });

        this.press;
    }

    preload() 
    {
        // Load das Imagens
        this.load.image('buttongameover', 'assets/gameover/button_gameover.png');
        this.load.image('gameOver', 'assets/gameover/bg_gameover.png');

        // Load do audio
        this.load.audio('soundGameOver', [ 'assets/audio/sound_gameover.mp3']);
        this.load.audio('buttonpress', [ 'assets/audio/buttonpress.mp3']);
        
    }

    create () 
    {
        // Adicionado o som com o volume
        this.soundGameOver = this.sound.add("soundGameOver");
        this.soundGameOver.play();
        this.press = this.sound.add("buttonpress", {volume: 0.3});

        // Imagens de background
        this.add.image(400, 300,'gameOver');

        // Botão para voltar para o Menu
        this.button1 = this.add.image(400, 450, 'buttongameover').setScale(0.5).setInteractive({ useHandCursor: true });

        // -- click no botao
        this.button1.once('pointerdown', function (pointer) 
        {
            this.scene.start('level1');
            this.press.play();

        }, this);
    }
}