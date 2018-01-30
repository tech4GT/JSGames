    //this is my script for using phaser and making games on top of it

    //Phaser has a Game class and we use it to make noew Games

    //every game state object msut have one of these 3 methods : preload , create , update
    
    //intel xdk is important for making these games into mobile

    //phaser has 3 types of physics systems  : 1: arcade (here averything is a rectange and we can simulate coolisons, v ,acc , gravity etc. can be simulated)
//p2 : rotation motion laws are obeyed and torque etc. will act, they also have mass and we can simulate collisoins with large collisions etc, it is a standalone physics engine which is kind of advance 

//


    var game = new Phaser.Game(800,600,Phaser.CANVAS,'MyGame');


    //Before preload there is init function which is optional


    //here update gets called automatically


    var GameState = {

        init : function(someParameter){
            //intialize the settings for the whole game
            //this method is optional
            //if we need to pass some info b/w 2 levels then init is mandatory
            console.log("in init");
            
            //create input from keys
            
            
            //cursor keys for keyboard input are left, right , up , down
            
            this.keys = this.game.input.keyboard.createCursorKeys();
            
            //for adding jump button as spacebar
            this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            
            //this game will use arcade physics and this will allow us to use gravity in this mario style game
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 1000;

            
            
            
            
        },

        preload : function(){
            //loads all the assets for the game
            
            console.log("in preload");
            
            this.load.image('player','./pika.png');
            this.load.image('ground','./ground.png');
            this.load.image('tree','./tree.png');
        },

        create : function(){
            
            
            //Add trees
            
            
            for(var i =0;i<5;i++){
                this.add.sprite(150*i,this.game.height - 300,'tree').scale.setTo(0.3,0.4);
                
            }
            //To create the Objects in the game like player and enemy
            console.log("in create");
            
//            player = this.add.sprite(x,y,'key')
            this.player = this.add.sprite(100,100,'player');
            this.physics.arcade.enable(this.player);
            this.player.body.bounce.y = 0.5;
            this.player.inputEnabled = true;
            
            //we have to enable physics on the sprite to make it work
            
//            this.player.anchor.setTo(0.5,0.5);
            this.player.scale.setTo(0.2,0.2);
            
            this.player.inputpixelPerfectClick = true;
            this.player.events.onInputDown.add(this.jump,this);
//            player = this.add.Image(100,100,'player');
            
            //we can give some background colour
             this.stage.backgroundColor = "#7ec8ee";
            
            this.ground = this.add.tileSprite(0,this.game.height - 82,this.game.width,82,'ground');
            
            this.physics.arcade.enable(this.ground);
            
            this.ground.body.immovable = true;
            this.ground.body.allowGravity = false;
            //there is a tilesprite method which is used to make repeating stuff like making 
            //ground from a repeating unit
            
            //body.setSize(1,2,3,4) is used to change effective area of the image
            
            //pixel perfect collision is in phaser documentation
            
            
            //Create platform
            
            
            this.platform = this.add.sprite(400,350,'ground');
            this.physics.arcade.enable(this.platform);
            this.platform.scale.setTo(0.1,0.01);
            this.platform.body.allowGravity = false;
            this.platform.body.immovable = true;

            
            
            
        },
        update : function(){
            //this will update the objects
            console.log("in update");
            this.player.body.velocity.x = 0;
            
//            console.log(this.player.angle);
            
            this.physics.arcade.collide(this.player,this.ground);
            this.physics.arcade.collide(this.player,this.platform); 
            
            if(this.jumpButton.isDown)
                this.jump();
            
            if(this.keys.up.isDown){
                this.jump();
            }
            if(this.keys.left.isDown){
                this.player.body.velocity.x = -800;
            }
            
            if(this.keys.right.isDown){
                this.player.body.velocity.x = 800;
            }
            
            
            
//            player.angle+=0.5;
//            this.player.scale.setTo(this.player.scale.x*0.999,this.player.scale.y*0.999);
            
            
//            if(this.player.alpha < 0.1)
//                this.player.alpha*=10
//            else
//                this.player.alpha *=0.99;
        },
        
        jump : function (v){
            console.log("IN JUMP");
            if(!this.player.body.touching.down) return;
            if(v && v.isInteger) this.player.body.velocity.y = v;
            else this.player.body.velocity.y = -1000;
        },
        createPlatforms : function(){
            
            this.platforms = this.add.group();
            //First enable body on the group and then create
            this.platforms.enableBody = true;
            
            for(var i=0;i<5;i++){
                
                //calculate x
                
                //calculate y
                
//                this.platforms.create(x,y,'platform');
            }
            
            // this.platforms.setAll('immovable',true)
            // this.platforms.setAll('allowGravity',false)
            
            
        }
    }
    
    //We are yet to tell sate manager to start our game 
    
    
    //add state to manager
    game.state.add("lvl1",GameState);

//    game.state.add("lvl2",GameState);
    
    
    //Start the game by telling the state manager which state(level) to start
    
    game.state.start('lvl1');