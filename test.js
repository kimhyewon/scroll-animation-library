document.addEventListener('DOMContentLoaded', function(){
	var sampleSquare = document.querySelector('.square');

	sampleSquare.addEventListener('mousedown', function(event){
		var tmp;
		event.preventDefault();
		(new shape.Square())
			.setPosition(event.pageX-30,event.pageY-30)
			.startDragging(event)
			.setParent(document.body)
	});
});


var shape = (function() {
	function Square() {
		this.element = document.createElement('div');
		this.element.classList.add("square");
		
		this.img = document.createElement("img");
		this.img.src = "rose.png";
		this.img.width = "60";
		this.img.height = "60";
		this.element.appendChild(this.img);
		// <img src="rose.png" height="50" width="50">

		// this.element = document.querySelector(".square");

		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
	}

	Square.prototype.setPosition = function(e1, e2) {
		this.element.style.left = e1 +'px';
		this.element.style.top = e2 + 'px';

		return this;
	};

	Square.prototype.startDragging = function(e) {
		this._onDragStart();
		this.element.classList.add('dragging');

		this.sizeBtn = document.createElement("img");
		this.sizeBtn.className = "size_btn";
		this.sizeBtn.src = "size3.png";
		this.sizeBtn.style.position = "absolute";
		this.sizeBtn.width = "28";
		this.sizeBtn.height = "28";

		this.sizeBtn.style.top = "-12px";
		this.sizeBtn.style.left = "-12px";
		this.sizeBtn.style.marginTop = "none";
		this.element.appendChild(this.sizeBtn);

		return this;
	};

	Square.prototype._onDragStart = function(e) {
		this._startX = event.pageX;
		this._startY = event.pageY;
		this._startTop = parseInt(this.element.style.top);
		this._startLeft = parseInt(this.element.style.left);

		document.addEventListener('mousemove', this._onMouseMove);
		document.addEventListener('mouseup', this._onMouseUp);
	};

	Square.prototype._onMouseMove = function(e) {
		var diffX = event.pageX - this._startX, diffY = event.pageY - this._startY;
		this.element.style.top = this._startTop + diffY + 'px';
		this.element.style.left = this._startLeft + diffX + 'px';
	};

	Square.prototype._onMouseUp = function(e) {
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);

		this.sizeControll();

		e.target.addEventListener('dblclick', this.positionEnd);


		// e.target.addEventListener('dblclick', this.startDragging(e));
	};

	Square.prototype.sizeControll = function(e) {

	}

	Square.prototype.positionEnd = function(e) {
		e.target.parentNode.classList.remove("dragging");
		e.target.parentNode.querySelector(".size_btn").remove("size_btn");
	}

	Square.prototype.setParent = function(parent) {
		parent.appendChild(this.element);
		
		return this;
	};

	return {
		Square : Square
	};

})();




