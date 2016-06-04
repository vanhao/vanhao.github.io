var CELL_SIZE = 20;
var FPS = 10    ;
var WIDTH = 800;
var HEIGHT = 600;


function Game(canvas_id){
    var _pressedKey;
    var _cols = WIDTH/CELL_SIZE;
    var _rows = HEIGHT/CELL_SIZE;
	//create 1 snake
    var _snake = new Snake(_cols,_rows);
	var _score;
	
    var _canvas = document.getElementById(canvas_id);
    var _context = _canvas.getContext('2d');
    _context.fillStyle = "black";
 
    var _food = {};
    var _running = false;
    var _timer;
 
	// load the music
	var soundID1 = "music";
	createjs.Sound.registerSound("sounds/GameBG.ogg", soundID1);
	var soundID2 = "eatfood";
	createjs.Sound.registerSound("sounds/Spawn.ogg", soundID2);
	var soundID3 = "death";
	createjs.Sound.registerSound("sounds/Death.ogg", soundID3);
 
    this.init = function() {
        _canvas.width = WIDTH;
        _canvas.height = HEIGHT;
 
        _canvas.onkeydown = function(e) {
            e.preventDefault();
            if(e.keyCode == 13) // Enter key
            {
                if(!_running){
					createjs.Sound.stop();
                    startGame();
				}
            }
            else if(_running)
            {
                _pressedKey = e.keyCode;
            }
        };
		
        // draw the welcome screen
		painBKground(WIDTH, HEIGHT, _context, "src01");
		
        _context.textAlign = "center";
        _context.font = "20px Arial";
        _context.fillText("Press Enter to Start", WIDTH/2, HEIGHT/2);
		
    }
 
    function startGame() {
		// play sound background
		createjs.Sound.play(soundID1);
		_score = 0;
        _pressedKey = null;
        clearInterval(_timer);
        _snake.init();
        createFood();
        _running = true;
        _timer = setInterval(update,1000/FPS);
		
    }
 
    function update() {
        if(!_running)
            return;
 
        _snake.handleKey(_pressedKey);
        var ret = _snake.update(_food);
 
        if(ret==1){
			_score++;
			//play eatfood sound
			createjs.Sound.play(soundID2);
            createFood();
			
        }else if(ret==2) {
            // end game
            _running = false;
			
			//play death sound
			createjs.Sound.stop();
			createjs.Sound.play(soundID3);
			painBKground(WIDTH, HEIGHT, _context, "src02");
			
            _context.save();
            _context.fillStyle = "rgba(0,0,0,0.2)";
            _context.fillRect(0,0,WIDTH,HEIGHT);
            _context.restore();
			_context.fillText("NEW SCORE: " + _score, WIDTH/2, 50);
            _context.fillText("Press Enter to Restart", WIDTH/2, 80);
            return;
        }
 
        draw();
    }
    function draw(){
 
        _context.beginPath();
        _context.clearRect(0,0,WIDTH,HEIGHT);
        _context.fill();
		
		// draw snake
        _snake.draw(_context, _score, "src03");
		
        // draw food
        _context.beginPath();
        //_context.arc((_food.x*CELL_SIZE)+CELL_SIZE/2, (_food.y*CELL_SIZE)+CELL_SIZE/2, CELL_SIZE/2, 0, Math.PI*2, false);
		painCell(_food.x*CELL_SIZE, _food.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, _context, "src04");
        _context.fill();
    }
 
    function createFood() {
        var x = Math.floor(Math.random()*_cols);
        var y;
        do {
            y = Math.floor(Math.random()*_rows);
        } while(_snake.collide(x, y));
 
        _food = {x: x, y: y};
    }
}