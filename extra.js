
function painCell(dx, dy, width, height, _ctx, _srcImage){
	var _image = document.getElementById(_srcImage);
	_ctx.drawImage(_image, dx, dy, width, height);
}

function painBKground(_width, _height, _ctx, _srcImage){
	var _image = document.getElementById(_srcImage);
	_ctx.drawImage(_image, 0, 0, _width, _height);
}

function painScore(_ctx, score){
	var score_text = "Score: " + score;
    _ctx.font = "16px Arial";
	_ctx.fillText(score_text, 50, 25);
}