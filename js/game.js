(function () {
    var keysDown = [],
        gameRunning = false,
        keyDownListener,
        keyUpListener,
        canvas,
        context,
        paddle;
    
    
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.msRequestAnimationFrame     ||
              window.oRequestAnimationFrame      ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
        
    
    var animLoop = function(){
        if (gameRunning) {
            requestAnimFrame(animLoop);
            handleInput();
            render();
        }
    }
    
    var init = function() {
        console.log("init");
        var keyDownListener = addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);

        var keyUpListener = addEventListener("keyup", function (e) {
            delete keysDown[e.keyCode];
        }, false);
        
        canvas = document.getElementById("gameCanvas");
        canvas.setAttribute("width", 800);
        canvas.setAttribute("height", 600);
        
        console.log("Canvas: " + canvas.width + ", " + canvas.height);
        context = canvas.getContext('2d');
        
        paddle = new Paddle();
        
        gameRunning = true;
        animLoop();
    }
    
    var stop = function() {
        gameRunning = false;
        removeEventListener("keydown", keyDownListener);
        removeEventListener("keyup", keyUpListener);
    }
    
    var handleInput = function() {
        if (38 in keysDown) { // Player holding up
            //player.y -= player.speed;
        }
        if (40 in keysDown) { // Player holding down
            //player.y += player.speed;
        }
        if (37 in keysDown) { // Player holding left
            paddle.moveLeft();
            //player.x -= player.speed;
        }
        if (39 in keysDown) { // Player holding right
            paddle.moveRight();
            //player.x += player.speed;
        }
    }
    
    var render = function(){
        context.clearRect(0,0,canvas.width, canvas.height);
        paddle.draw(context);
    }

    init();
}());