Square.p = Square.prototype;

Square.p = {
	onMouseMove : function (){},
	onMouseUp: function(){}
}
var hello = {
	onMouseDown : function (){}
}

jquery extend;		
$.extend(Square.p,hello);

*****************************************************

$.on('mousemove', this.onMouseMove);
$.on('mouseup', this.onMouseUp);
$.on('mousedown', this.onMouseDown);


var handler = {
	mousemove ; this.onMouseMove,
	mouseup: this.onMouseUp,
	mousedown : this.onMouseDown,
}

$.on(handler);

*****************************************************

div.className = "red";
div.className += ' ' + 'blue';
div.className === "red blue";  //true

// 최신 버전 만 가능
classList.remove("black")
classList.add("red")

// jqeury 구버전 호환
$.addClass('red');

*****************************************************
git submodule


