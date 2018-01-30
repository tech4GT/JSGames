function init(){
    GAME_OVER = false;
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    
    W = canvas.width;
    H = canvas.height;
    score = 0;
    
    
    player = {
        x : W/2,
        y : H-100,
        w : 100,
        h : 100,
        speedX : 0,
        movePlayer : function(e){
        if(e.keyCode == 39)
            player.speedX = 10;
        if(e.keyCode == 37)
            player.speedX = -10;
        if(e.keyCode == 32 ){
            this.shoot();
        }

        
    },
        bullets : [],
        shoot : function(){
            var b= new bullet(this.x + this.w/2,player.y - 20,10);
            this.bullets.push(b);
        }
    };
    enemey = {
        x : W/2,
        y : 0,
        w : player.w,
        h : player.h,
        
    };
    
    document.addEventListener('keydown',function(si){
        player.movePlayer(si);
    });
    document.addEventListener('keyup',function(si){
        player.speedX = 0;
    });
    
}

function bullet(x,y,speed){
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 20;
    this.speedY = speed;
    this.color = "green";
    this.draw = function(){
        pen.fillStyle = this.color;
        pen.fillRect(this.x,this.y,this.w,this.h);
        
    };
    this.update = function(){
        this.y = this.y - this.speedY;
    }
}

function isColliding(arr,obj){
    for(el in arr){
        if(Math.abs(arr[el].y - obj.y) < obj.h && Math.abs(arr[el].x - obj.x) < )
            return true;
        return false;
    }
}


function draw(){
    pen.clearRect(0,0,W,H);
    
    pen.drawImage(playerImage,player.x,player.y,player.w,player.h);
    pen.drawImage(enemeyImage,enemey.x,enemey.y,enemey.w,enemey.h);
    
    player.bullets.forEach(function(bul){
        bul.draw();
    })
    
}
function loadImages(){
    playerImage = new Image();
    playerImage.src = "./pl.png";
    enemeyImage = new Image();
    enemeyImage.src = "./en.png";  
}
loadImages();
function update(){
    
    player.x+= player.speedX;
    player.bullets.forEach(function(bul){
        bul.update();
    });
    
    if(isColliding(player.bullets,enemey))
        

    
}
function gameloop(){
    draw();
    update();
    if(!GAME_OVER)
        window.requestAnimationFrame(gameloop);
}
function startgame(){
    init();
    gameloop();
}

startgame();