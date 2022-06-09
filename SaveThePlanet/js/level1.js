class level1 extends Phaser.Scene {

    constructor ()
  {
    super({ key: 'level1' });

    // Variáveis
    this.platform;
    this.player;
    this.cursors;
    this.coins;
    this.score = 0;
    this.scoreText;
    this.levelText;
    this.button;
    this.gameOver = false;
    this.isDead = false;
    this.explode;
    this.press;
    this.levelup;
    this.collect;
  }

  preload()
  {
    // Load das Imagens
    this.load.image('buttonback', 'assets/botaoback.png');
    this.load.image('bgl1', 'assets/level1/bg.png');
    this.load.image('chao', 'assets/level1/platform.png');
    this.load.image('coin','assets/coin.png');
    this.load.image('cloud', 'assets/level1/clouds.png');
    this.load.image('chao2', 'assets/level1/platform2.png');
    this.load.image('spike', 'assets/spikes.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('bglife', 'assets/bg_life.png');
    this.load.image('bgcoin', 'assets/bg_coin.png');
    this.load.image('bglevel', 'assets/bg_level.png');

    // Load da Sprite do Player
    this.load.spritesheet('boy', 'assets/boy1.png', {frameWidth: 47, frameHeight: 47});

    // Load do Audio
    this.load.audio('explode', [ 'assets/audio/explode.mp3']);
    this.load.audio('buttonpress', [ 'assets/audio/buttonpress.mp3']);
    this.load.audio('levelup', [ 'assets/audio/levelup.mp3']);
    this.load.audio('collect', [ 'assets/audio/coin.mp3']);
  }

  create() 
  {
    // Imagens de background da pontuação, vidas e nivel e do fundo do nivel
    this.add.image(400, 300, 'bgl1');
    this.add.image(678, 33, 'bglife');
    this.add.image(100, 33, 'bgcoin');
    this.add.image(370, 35, 'bglevel');

    // Adicionado o som com o volume
    this.explode = this.sound.add("explode", {volume: 0.3});
    this.press = this.sound.add("buttonpress", {volume: 0.3});
    this.levelup = this.sound.add("levelup", {volume: 0.3});
    this.collect = this.sound.add("collect", {volume: 0.3});

    // Botão para voltar para o Menu
    this.button1 = this.add.image(770, 70, 'buttonback').setScale(0.5).setInteractive({ useHandCursor: true });

    // -- click no button
    this.button1.once('pointerdown', function (pointer)  { 
      
      this.scene.start('menu'); 
      this.press.play();
    
    }, this);

    // adicionar as plataformas do jogo com físicas
    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();

    // Criação das plataformas
    this.platforms.create(200, 350, 'chao2');
    this.platforms.create(500, 200, 'cloud');
    this.spikes.create(470, 582, 'spike');
    this.platforms.create(760, 568, 'chao').setScale(2).refreshBody();
    this.platforms.create(195, 568, 'chao').setScale(2).refreshBody();

    // adicionar o player
    this.player = this.physics.add.sprite(200, 350, 'boy');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // criar animaçoes
    this.anims.create ({
        key: 'left',
        frames: this.anims.generateFrameNumbers('boy', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1

    });

    this.anims.create ({
        key: 'right',
        frames: this.anims.generateFrameNumbers('boy', {start: 6, end: 8}),
        frameRate: 10,
        repeat: -1

    });

    this.anims.create ({
        key: 'turn',
        frames: [{ key: 'boy', frame: 1}],
        frameRate: 20

    });
    

    // colisao do player com as plataformas
    this.physics.add.collider(this.player, this.platforms);

    // adicionar interação com as teclas do cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // criar as estrelas
    this.coins = this.physics.add.group( {
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70},
    });

    // animar as estrelas
    this.coins.children.iterate(function(child) 
    {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
    });

    // colisao do player com as plataformas
    this.physics.add.collider(this.coins, this.platforms);

    // Texto para a pontuação e para o Nivel
    this.scoreText = this.add.text(10, 20, '', {fontSize: 'bold 32px', fill: '#000'});
    this.levelText = this.add.text(310, 20, 'LEVEL 1', { font: 'bold 30px Arial', fill: '#000'});

    // recolha das estrelas
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this );

    // Colisao dos spikes com o player e executa a função hitSpike
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);

     // Adicionar as vidas
    this.life1 = this.add.image(650 , 35, 'heart').setScrollFactor(0);
    this.life2 = this.add.image(700 , 35, 'heart').setScrollFactor(0);
    this.life3 = this.add.image(750 , 35, 'heart').setScrollFactor(0);
    

  }
  
  // Função para recolha das estrelas
  collectCoin(player, coins)
  {
    this.score += 1;
    this.scoreText.setText('     ' + this.score);
    this.collect.play();

    coins.disableBody(true, true);

    // verificar se ainda há estrelas ativas
    if (this.coins.countActive(true) == 0)
    {
        // re-ativar o conjunto das 12 estrelas
        this.coins.children.iterate(function(child)
        {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
  }


  // hitSpike
  hitSpike(player, spikes)
  {
    // Definido um delay apos a colisao
    this.time.delayedCall(200,function() 
      {
        this.explode.play();
        this.isDead = false;
        this.lifeCount = 3;
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.score = 0;
        this.scene.start('gameover');
      
      },[], this);  
  }

  update()
  {
    if (this.gameOver)
    {
        return;
    }
    // Definido a animação ao premir a tecla SETA ESQUERDA
    if ( this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    }
    // Definido a animação ao premir a tecla SETA DIREITA
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    // Definido a animação ao premir a tecla SETA CIMA
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-350);
    }

    // Definido o score necessario para passar para o nivel seguinte
    if ( this.score == 12 ) 
    {
      this.scene.start("level2");
      this.levelup.play();
    }
    

  }
  

}
