class instructions extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instructions' });

        // Variaveis
        this.button;
        this.press;
    }

    preload() 
    {
        // Load das Imagens
        this.load.image('bgInstructions', 'assets/instructions/instruction.png');
        this.load.image('buttonback', 'assets/botaoback1.png');

        this.load.audio('buttonpress', [ 'assets/audio/buttonpress.mp3']);
        
    }

    create () 
    {
        // Imagens de background
        this.add.image(400, 300, 'bgInstructions');

        this.press = this.sound.add("buttonpress", {volume: 0.3});

        // Botão para voltar para o Menu
        this.button = this.add.image(730, 70, 'buttonback').setScale(0.5).setInteractive({ useHandCursor: true });

        // -- click no botao
        this.button.once('pointerdown', function (pointer)  { 
            
            this.scene.start('menu'); 
            this.press.play();
        
        }, this);


    }
}