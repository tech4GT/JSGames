function init(){
    GAME_OVER = false;
    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    score = 0;
    H = canvas.height;
    W = canvas.width;
    
    hd = new Image();
    hd.src = "./snkhd.png";
    bd = new Image();
    bd.src = "./bd.png";
    fd = new Image();
    fd.src = "./fd.png";
    
    snake = {
        length : 5,
        color : "black",
        cells : [],
        direction : "right",
        createSnake : function(){
            for(let i=this.length-1;i>=0;i--){
                this.cells.push({x : i,y : 0});
            }
        },
        draw : function(){
            pen.fillStyle = this.color;
            this.cells.forEach(function(cell){
                if(cell === snake.cells[0])
                    return;
                pen.drawImage(bd,cell.x*20,cell.y*20,20,20);
                pen.lineWidth = "2";
//                pen.strokeStyle = "black";
//                pen.strokeRect(cell.x*20,cell.y*20,20,20);
            })
        },
        update : function(){
            //arr.unshift for begining
            //arr.shift for removing from begining
            if(this.direction==="right"){
            this.cells[this.cells.length - 1].x = this.cells[0].x + 1;
            this.cells[this.cells.length - 1].y = this.cells[0].y;
            }
                if(this.direction==="left"){
                this.cells[this.cells.length - 1].x = this.cells[0].x - 1;
                this.cells[this.cells.length - 1].y = this.cells[0].y;
        }
            
            if(this.direction==="up"){
                this.cells[this.cells.length - 1].x = this.cells[0].x;
                this.cells[this.cells.length - 1].y = this.cells[0].y - 1;
            }
            
            if(this.direction==="down"){
                this.cells[this.cells.length - 1].x = this.cells[0].x;
                this.cells[this.cells.length - 1].y = this.cells[0].y + 1;
            }
            
            
            this.cells.unshift(this.cells.pop());

        },
        foodEat : function(){
            if(snake.direction == "up"){
                this.cells.push({x : this.cells[this.length -1].x, y : this.cells[this.length-1].y + 1});
                
            }
            if(snake.direction == "down"){
                this.cells.push({x : this.cells[this.length -1].x, y : this.cells[this.length-1].y - 1});
            }
            if(snake.direction == "right"){
                this.cells.push({x : this.cells[this.length -1].x - 1 , y : this.cells[this.length-1].y});
                
            }
            if(snake.direction == "left"){
                this.cells.push({x : this.cells[this.length -1].x + 1, y : this.cells[this.length-1].y});
            }
            
            this.length++;
            food = getRandomFood();
                            
        },
        checkOver(){
            for(var i =1;i<this.cells.length;i++){
                if(this.cells[0].x == this.cells[i].x && this.cells[0].y == this.cells[i].y){
                    return true;
                }
            }
            return false;
        }
    }
    snake.createSnake();
    food = getRandomFood();
    document.addEventListener('keydown',function(someInfo){
        
        if(someInfo.keyCode == 37&&snake.direction != "right")
            snake.direction = "left";
        if(someInfo.keyCode == 38&&snake.direction != "down")
            snake.direction = "up";
        if(someInfo.keyCode == 39&&snake.direction != "left")
            snake.direction = "right";
        if(someInfo.keyCode == 40&&snake.direction != "up")
            snake.direction = "down";
        

    })
    
}
function getRandomFood(){
    return { X : Math.round(Math.random()*(W-20)/20) * 20, Y : Math.round(Math.random()*(H-20)/20) * 20}
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.draw();
    pen.drawImage(hd,snake.cells[0].x * 20,snake.cells[0].y * 20,20,20);
    pen.fillStyle = "blue";
    pen.font = "20px Aerial";
    pen.fillText("Score : " + score,20,20)
    
    

    pen.drawImage(fd,food.X,food.Y,20,20);
    
    
    
}
function update(){

    
    if(snake.cells[0].x * 20 == food.X&& snake.cells[0].y * 20 == food.Y){
        score++;
    
        snake.foodEat();
        snake.update();
    }
    else
     snake.update();
    
    
    if(snake.cells[0].x * 20 > W-20 || snake.cells[0].y * 20 > H-20  || snake.cells[0].x * 20 < 0 || snake.cells[0].y * 20 < 0 || snake.checkOver()){
        clearInterval(f);
        alert("Game Over\nYour Score : " + score);
        GAME_OVER = true;
        x = confirm("Wanna Play Again");
        if(x)
            start();
        else
            alert("Thanks for Playing");
    }
    
    
}
function gameloop(){

    update();
    draw();
    
}
function start(){
    init();
    f = window.setInterval(gameloop,100);    
}

start();




//keyboard events are very important

/*document.addEventListener('keydown',keypressed);
function keypressed(someInfo){
    if(someInfo.keyCode == 39)
    console.log("moving right");
    
    if(someInfo.keyCode == 37)
        console.log("moving left");
}
    */