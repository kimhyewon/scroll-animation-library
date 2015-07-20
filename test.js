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
		this.img.className = "rose";
		this.img.src = "rose.png";
		this.img.width = "60";
		this.img.height = "60";
		this.element.appendChild(this.img);
		// <img src="rose.png" height="50" width="50">

		// this.element = document.querySelector(".square");


		// size 버튼 생성 
		this.sizeBtn = document.createElement("img");
		this.sizeBtn.className = "size_btn";
		this.sizeBtn.src = "size3.png";
		this.sizeBtn.style.position = "absolute";
		this.sizeBtn.width = "28";
		this.sizeBtn.height = "28";
		this.sizeBtn.style.top = "-12px";
		this.sizeBtn.style.left = "-12px";
		this.sizeBtn.style.marginTop = "none";
		

		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);

		// this._onBtnMouseMove = this._onBtnMouseMove.bind(this);
		// this._onBtnMouseUp = this._onBtnMouseUp.bind(this);
	}

	Square.prototype.setPosition = function(e1, e2) {
		this.element.style.left = e1 +'px';
		this.element.style.top = e2 + 'px';

		return this;
	};

	Square.prototype.startDragging = function(e) {
		e.preventDefault();
		this._onDragStart();
		this.element.classList.add('dragging');

		this.element.appendChild(this.sizeBtn); // 이부분 중요. 다시 클릭했을 때 버튼 나타나도록 

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

		//더블클릭하면 테두리 제거되며 스티커 위치 고정되는 효과
		e.target.addEventListener('dblclick', this.positionEnd);

		//사이즈 버튼을 클릭하면 크기 조절할 수 있도록 하는 이벤트 호출 
		// e.target.parentNode.querySelector(".size_btn").addEventListener("mousedown", this.sizeControll.bind(this));

		//스티커를 다시 클릭하면 움직일 수 있도록 드래그 이벤트 실행시켜줌 
		e.target.addEventListener('mousedown', this.startDragging.bind(this));
	};

	// Square.prototype.sizeControll = function(e) {
	// 	this._startBtnX = event.pageX;
	// 	this._startBtnY = event.pageY;
	// 	this._startBtnTop = parseInt(this.element.style.top);
	// 	this._startBtnLeft = parseInt(this.element.style.left);

	// 	this._onBtnMouseMove = this._onBtnMouseMove.bind(this);
	// 	this._onBtnMouseUp = this._onBtnMouseUp.bind(this);

	// 	document.addEventListener('mousemove', this._onBtnMouseMove.bind(this));
	// 	document.addEventListener('mouseup', this._onBtnMouseUp.bind(this));
	// }

	// Square.prototype._onBtnMouseMove = function(e) {
	// 	console.log(e.target.parentNode);
	// 	var diffX = event.pageX - this._startBtnX, diffY = event.pageY - this._startBtnY;
	// 	e.target.parentNode.height = this._startBtnTop + diffY;
	// 	e.target.parentNode.width = this._startBtnLeft + diffX;
	// 	this.element.querySelector(".rose").height = this._startBtnTop + diffY;
	// 	this.element.querySelector(".rose").width = this._startBtnLeft + diffX;
	// };

	// Square.prototype._onBtnMouseUp = function(e) {
	// 	this._onBtnMouseMove = this._onBtnMouseMove.bind(this);
	// 	this._onBtnMouseUp = this._onBtnMouseUp.bind(this);

	// 	document.removeEventListener('mousemove', this._onBtnMouseMove.bind(this));
	// 	document.removeEventListener('mouseup', this._onBtnMouseUp.bind(this));
	// };


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




