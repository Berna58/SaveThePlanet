class win extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'win' });

        this.press;
    }

    preload() 
    {
        // Load das Imagens
        this.load.image('bgWin', 'assets/win/bgWin.png');
        this.load.image('botaoback', 'assets/win/botaoback2.png');    
        
        this.load.audio('buttonpress', [ 'assets/audio/buttonpress.mp3']);
    }

    create () 
    {
        // Imagens de background
        this.add.image(400, 300, 'bgWin');

        this.press = this.sound.add("buttonpress", {volume: 0.3});
        

        // Botão para voltar para o Menu
        this.button = this.add.image(730, 70, 'botaoback').setScale(0.5).setInteractive({ useHandCursor: true });

        // -- click no botao
        this.button.once('pointerdown', function (pointer)  { 
            
            this.scene.start('menu'); 
            this.press.play();
        
        }, this);


    }
}