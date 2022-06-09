class menu extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'menu' });

        this.press;
        this.game;
    }

    preload() 
    {
         // Load das Imagens
        this.load.image('main','assets/backgroundmenu.png');
        this.load.image('buttonjogar', 'assets/botaojogar.png');
        this.load.image('buttoninfo', 'assets/botaoinfo.png');
        this.load.image('buttonquestao', 'assets/botaoquestao.png');
        
        this.load.audio('buttonpress', [ 'assets/audio/buttonpress.mp3']);
        this.load.audio('game', [ 'assets/audio/sound_game.mp3']);
    }

    create () 
    {
        // Imagens de background
        this.add.image(400, 300, 'main');

        this.press = this.sound.add("buttonpress", {volume: 0.3});
        this.game = this.sound.add("game", {volume: 0.05, loop: false});
        this.game.play();

        // Botoes
        this.button1 = this.add.image(400, 400, 'buttonjogar').setScale(0.5).setInteractive({ useHandCursor: true });
        this.button2 = this.add.image(50, 555, 'buttoninfo').setScale(0.5).setInteractive({ useHandCursor: true });
        this.button3 = this.add.image(180, 540, 'buttonquestao').setScale(0.5).setInteractive({ useHandCursor: true });

        // -- click nos botoes
        this.button1.once('pointerdown', function (pointer) {
            
            this.scene.start('level1');
            this.press.play();

        }, this);

        this.button2.once('pointerdown', function (pointer) {
            
            this.scene.start('instructions');
            this.press.play();

        }, this);

        this.button3.once('pointerdown', function (pointer) {
            
            this.scene.start('history');
            this.press.play();

        }, this);


    }
}