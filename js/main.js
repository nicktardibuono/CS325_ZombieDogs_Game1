window.onload = function () {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    'use strict';
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {

        game.load.image('sky', 'assets/sky.jpg');
        game.load.image('grass', 'assets/grass.jpg');
        game.load.image('zdog', 'assets/zombiedog.jpg');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    }

    var player;
    var grass;
    var cursors;
    var zdogs;
    var score = 0;
    var scoretext;
    var gameovertext;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        grass = game.add.group();
        grass.enableBody = true;
        var ground = grass.create(0, game.world.height - 64, 'grass');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var hill = grass.create(400, 385, 'grass');
        hill.body.immovable = true;
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        zdogs = game.add.group();
        zdogs.enableBody = true;
        for (var i = 0; i < 1; i++)
        {
            var zdog = zdogs.create(Math.random()*500, 0, 'zdog');
            zdog.body.gravity.y = 300;
        }
        scoretext = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        game.time.events.add(Phaser.Timer.SECOND * 40, gameover, this);
    
    }

    function update() {
        game.physics.arcade.collide(player, grass);
        game.physics.arcade.collide(zdogs, grass);
        game.physics.arcade.overlap(player, zdogs, collectZombieDogs, null, this);
        player.body.velocity.x = 0;
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else
        {
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -300;
        }
    }
    
    function collectZombieDogs (player, zdog) {
        zdog.kill();
        score += 10;
        scoretext.text = 'Score: ' + score;
        for (var i = 0; i < 2; i++){
            var zdog = zdogs.create(Math.random()*799, 0, 'zdog');
            zdog.body.gravity.y = Math.random()*100;
            }
    }
    
    function gameover(){
            gameovertext = game.add.text(200, 300, 'GAME OVER Your Score is '+score, { fontSize: '400px', fill: '#000' });
        }
    
    };