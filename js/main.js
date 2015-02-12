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
<<<<<<< Updated upstream
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});
=======
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
>>>>>>> Stashed changes

    function preload() {

        game.load.image('redheart', 'assets/redheart.png');
        game.load.image('blackheart', 'assets/blackheart.png');
        game.load.image('cat', 'assets/black_cat.png');
        game.load.image('box', 'assets/box.png');
        game.load.image('sky', 'assets/sky.jpg');
<<<<<<< Updated upstream
=======
        game.load.image('grass', 'assets/grass.jpg');
        game.load.image('zdog', 'assets/zombiedog.jpg');
        game.load.spritesheet('dude', 'assets/guy running.png', 108, 140);

>>>>>>> Stashed changes
    }
    var player;
    var cats;
    var redhearts;
    var heartTime = 0;
    var cursors;
    var fireButton;
    var sky;
    var score = 0;
    var scoreString = '';
    var scoreText;
    var lives;
    var enemyHeart;
    var enemyHearts;
    var firingTimer = 0;
    var stateText;
    var livingEnemies = [];
    var live;
    var heart;
    var catscaught = 0;
    var catsText;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
<<<<<<< Updated upstream

        sky = game.add.tileSprite(0, 0, 800, 600, 'sky');

        redhearts = game.add.group();
        redhearts.enableBody = true;
        redhearts.physicsBodyType = Phaser.Physics.ARCADE;
        redhearts.createMultiple(30, 'redheart');
        redhearts.setAll('anchor.x', 0.5);
        redhearts.setAll('anchor.y', 1);
        redhearts.setAll('outOfBoundsKill', true);
        redhearts.setAll('checkWorldBounds', true);

        enemyHearts = game.add.group();
        enemyHearts.enableBody = true;
        enemyHearts.physicsBodyType = Phaser.Physics.ARCADE;
        enemyHearts.createMultiple(30, 'blackheart');
        enemyHearts.setAll('anchor.x', 0.5);
        enemyHearts.setAll('anchor.y', 1);
        enemyHearts.setAll('outOfBoundsKill', true);
        enemyHearts.setAll('checkWorldBounds', true);
    
        player = game.add.sprite(400, 500, 'box');
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);

        cats = game.add.group();
        cats.enableBody = true;
        cats.physicsBodyType = Phaser.Physics.ARCADE;

        createCats();

        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '20px Arial', fill: '#fff' });
        catsText = game.add.text(125, 10, 'Cats Caught: ' + catscaught, { font: '20px Arial', fill: '#fff' });
    
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

        stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        for (var i = 0; i < 3; i++) 
=======
        game.add.sprite(0, 0, 'sky');
        grass = game.add.group();
        grass.enableBody = true;
        var ground = grass.create(0, game.world.height - 64, 'grass');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var hill = grass.create(400, 385, 'grass');
        hill.body.immovable = true;
        player = game.add.sprite(103, game.world.height - 199, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        zdogs = game.add.group();
        zdogs.enableBody = true;
        for (var i = 0; i < 1; i++)
>>>>>>> Stashed changes
        {
            var box = lives.create(game.world.width - 100 + (30 * i), 60, 'box');
            box.anchor.setTo(0.5, 0.5);
            box.angle = 90;
            box.alpha = 0.4;
        }

        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.time.events.add(Phaser.Timer.SECOND * 60, gameover, this);
    }

    function createCats () {

        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 8; x++)
            {
                var cat = cats.create(x * 80, y * 50, 'cat');
                cat.anchor.setTo(0.5, 0.5);
                cat.play('fly');
                cat.body.gravity.y = 0;
            }
        }

        cats.x = 100;
        cats.y = 50;
    }

    function update() {

        sky.tilePosition.y += 2;

        if (player.alive)
        {
            player.body.velocity.setTo(0, 0);

            if (cursors.left.isDown)
            {
                player.body.velocity.x = -200;
            }
            else if (cursors.right.isDown)
            {
                player.body.velocity.x = 200;
            }

            if (fireButton.isDown)
            {
                fireBullet();
            }

            if (game.time.now > firingTimer)
            {
                catFires();
            }

            game.physics.arcade.overlap(redhearts, cats, collisionHandler, null, this);
            game.physics.arcade.overlap(enemyHearts, player, enemyHitsPlayer, null, this);
            game.physics.arcade.overlap(cats, player, playerhitscats, null, this);
        }

    }
    function collisionHandler (heart, cat) {

        heart.kill();
        cat.body.gravity.y = 50;

        score += 20;
        scoreText.text = scoreString + score;

        if (cats.countLiving() == 0)
        {
            score += 1000;
            scoreText.text = scoreString + score;
            var finalscore = score*catscaught;
            enemyHearts.callAll('kill',this);
            stateText.text = " You Won Final Score: " +  finalscore + "\n Click to restart";
            stateText.visible = true;

            game.input.onTap.addOnce(restart,this);
        }

    }

    function enemyHitsPlayer (player,heart) {
    
        heart.kill();

        live = lives.getFirstAlive();

        if (live)
        {
<<<<<<< Updated upstream
            live.kill();
=======
            player.animations.stop();
            player.frame = 0;
>>>>>>> Stashed changes
        }


        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyHearts.callAll('kill');
            var finalscore = score*catscaught;
            stateText.text="GAME OVER Final Score: " +finalscore+ "\n Click to restart";
            stateText.visible = true;
            score = 0; 
            catscaught =0;
            game.input.onTap.addOnce(restart,this);
        }

    }
    function gameover()
    {
        var finalscore = score*catscaught;
        stateText.text="GAME OVER Final Score: " +finalscore+ "\n Click to restart";
        stateText.visible = true;
        game.input.onTap.addOnce(restart,this);
    }
    function playerhitscats(player, cat)
    { 
        cat.kill(); 
        catscaught+=1;
        catsText.text = 'Cats Caught '+ catscaught;
    }

    function catFires () {

        enemyHeart = enemyHearts.getFirstExists(false);

        livingEnemies.length=0;

        cats.forEachAlive(function(cat){

            livingEnemies.push(cat);
        });


        if (enemyHeart && livingEnemies.length > 0)
        {
        
            var random=game.rnd.integerInRange(0,livingEnemies.length-1);

            var shooter=livingEnemies[random];
            enemyHeart.reset(shooter.body.x, shooter.body.y);

            game.physics.arcade.moveToObject(enemyHeart,player,120);
            firingTimer = game.time.now + 2000;
        }

    }

    function fireBullet () {

        if (game.time.now > heartTime)
        {
            heart = redhearts.getFirstExists(false);

            if (heart)
            {
                heart.reset(player.x, player.y + 8);
                heart.body.velocity.y = -400;
                heartTime = game.time.now + 200;
            }
        }

    }

    function resetBullet (heart) {
        heart.kill();
    }

    function restart () {

        lives.callAll('revive');
        cats.removeAll();
        createCats();

        player.revive();
        stateText.visible = false;

    }
};