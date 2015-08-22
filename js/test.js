$(document).ready(function(){
	$('.square').mousedown(function(event){ 
		console.log($('.square'));
		var i = $('.square').index(this);
		console.log(i);

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
		this.container = document.getElementById('area');
		
		console.log(this);
		var i = 2;
		console.log(i);
		
		switch (i) {
  			case 0 : 
  				this.img = document.createElement("img");
				this.img.className = "rose";
				this.img.src = "img/dragndrop/rose.png";
				this.img.width = "60";
				this.img.height = "60";
				this.element.appendChild(this.img);
  			break;
  			case 1 : 
  				this.img = document.createElement("img");
				this.img.className = "yellow";
				this.img.src = "img/dragndrop/yellow.png";
				this.img.width = "60";
				this.img.height = "60";
				this.element.appendChild(this.img);
  			break;
  			case 2 : 
  				this.img = document.createElement("img");
				this.img.className = "pink";
				this.img.src = "img/dragndrop/pink.png";
				this.img.width = "60";
				this.img.height = "60";
				this.element.appendChild(this.img);
  			break;
		}


		

		
		// <img src="rose.png" height="50" width="50">

		// this.element = document.querySelector(".square");


		// size 버튼 생성 
		this.sizeBtn = document.createElement("img");
		this.sizeBtn.className = "size_btn";
		this.sizeBtn.src = "img/dragndrop/size3.png";
		this.sizeBtn.style.position = "absolute";
		this.sizeBtn.width = "28";
		this.sizeBtn.height = "28";
		this.sizeBtn.style.top = "44px";
		this.sizeBtn.style.left = "44px";
		this.sizeBtn.style.marginTop = "none";

		// ratate 버튼 생성
		this.rotateBtn = document.createElement("img");
		this.rotateBtn.className = "rotate_btn";
		this.rotateBtn.src = "img/dragndrop/rotate2.png";
		this.rotateBtn.style.position = "absolute";
		this.rotateBtn.width = "28";
		this.rotateBtn.height = "28";
		this.rotateBtn.style.top = "-13px";
		this.rotateBtn.style.left = "-13px";
		this.rotateBtn.style.marginTop = "none";

		this._onMouseMove = this._onMouseMove.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);

		this._onBtnMouseMove = this._onBtnMouseMove.bind(this);
		this._onBtnMouseUp = this._onBtnMouseUp.bind(this);

		// Square.p = Square.prototype;
	}


Square.prototype = {
	setPosition : function(e1, e2) {
		this.element.style.left = e1 +'px';
		this.element.style.top = e2 + 'px';

		return this;
	},
	startDragging : function(e) {
		e.preventDefault();
		this._onDragStart();
		this.element.classList.add('dragging');

		this.element.appendChild(this.sizeBtn); // 이부분 중요. 다시 클릭했을 때 버튼 나타나도록 
		this.element.appendChild(this.rotateBtn);

		return this;
	},
	_onDragStart : function(e) {
		this._startX = event.pageX;
		this._startY = event.pageY;
		this._startTop = parseInt(this.element.style.top);
		this._startLeft = parseInt(this.element.style.left);

		// $(document).on('mousemove', this._onMouseMove);
		// $(document).on('mouseup', this._onMouseUp);
		document.addEventListener('mousemove', this._onMouseMove);
		document.addEventListener('mouseup', this._onMouseUp);
	},
	_onMouseMove : function(e) {
		var diffX = event.pageX - this._startX, diffY = event.pageY - this._startY;
		this.element.style.top = this._startTop + diffY + 'px';
		this.element.style.left = this._startLeft + diffX + 'px';
	},
	_onMouseUp : function(e) {
		var top = this.element.offsetTop;
		var bottom = this.element.offsetTop + this.element.offsetHeight; 
		var left = this.element.offsetLeft; 
		var right = this.element.offsetLeft + this.element.offsetWidth;

		var bTop = this.container.offsetTop;
		var bBottom = this.container.offsetTop + this.container.offsetHeight;
		var bLeft = this.container.offsetLeft;
		var bRight = this.container.offsetLeft + this.container.offsetWidth;


		if(top >= bTop && bottom <= bBottom && left >= bLeft && right <= bRight) {
		document.removeEventListener('mousemove', this._onMouseMove);
		document.removeEventListener('mouseup', this._onMouseUp);
		}
		else {
		alert("영역을 벗어났습니다");
		this.element.style.display="none";
		}


		//더블클릭하면 테두리 제거되며 스티커 위치 고정되는 효과
		e.target.addEventListener('dblclick', this.positionEnd);

		//스티커를 다시 클릭하면 움직일 수 있도록 드래그 이벤트 실행시켜줌 
		e.target.addEventListener('mousedown', this.startDragging.bind(this));

		//사이즈 버튼을 클릭하면 크기 조절할 수 있도록 하는 이벤트 호출 
		e.target.parentNode.querySelector(".size_btn").addEventListener("mousedown", this.sizeControll.bind(this));
		//rotate 버튼 클릭하면 rotate 이벤트 호출 
		e.target.parentNode.querySelector(".rotate_btn").addEventListener("mousedown", this.rotateControll.bind(this));
	},
	rotateControll : function(e) {
		e.preventDefault();

		this._onRotateBtnMouseMove = this._onRotateBtnMouseMove.bind(this);
		this._onRotateBtnMouseUp = this._onRotateBtnMouseUp.bind(this);
		     
		document.addEventListener('mousemove', this._onRotateBtnMouseMove);
		document.addEventListener('mouseup', this._onRotateBtnMouseUp);
	},
	_onRotateBtnMouseMove : function(e) {
		this.mouse_x = event.pageX;
		     	this.mouse_y = event.pageY;
		this._startRotateBtnTop = parseInt(this.element.style.top);
		this._startRotateBtnLeft = parseInt(this.element.style.left);
		this.center_x = this._startRotateBtnLeft + (this.element.offsetWidth / 2);
		     	this.center_y = this._startRotateBtnTop + (this.element.offsetHeight / 2);
		     	this.radians = Math.atan2(this.mouse_x - this.center_x, this.mouse_y - this.center_y);
		     	this.degree = (this.radians * (180 / Math.PI) * -1) + 230;

		this.element.style.WebkitTransform = 'rotate(' + this.degree + 'deg)';
	},
	_onRotateBtnMouseUp : function(e) {
		document.removeEventListener('mousemove', this._onRotateBtnMouseMove);
		document.removeEventListener('mouseup', this._onRotateBtnMouseUp);
	},
	sizeControll : function(e) {
		e.preventDefault();

		this._startBtnX = event.pageX;
		this._startBtnY = event.pageY;

		this._imgHeight = parseInt(e.target.parentElement.firstChild.height);
		this._imgWidth = parseInt(e.target.parentElement.firstChild.width);
		this._conHeight = this.element.offsetHeight;
		this._conWidth = this.element.offsetWidth;
		this._btnTop = parseInt(e.target.style.top) + 4;
		this._btnLeft = parseInt(e.target.style.left) + 4;

		this._onBtnMouseMove = this._onBtnMouseMove.bind(this);
		this._onBtnMouseUp = this._onBtnMouseUp.bind(this);

		document.addEventListener('mousemove', this._onBtnMouseMove);
		document.addEventListener('mouseup', this._onBtnMouseUp);
	},
	_onBtnMouseMove : function(e) {
		var diffX = event.pageX - this._startBtnX, diffY = event.pageY - this._startBtnY;
		// 스티커 크기 조절  
		e.target.parentElement.firstChild.width = this._imgWidth + diffX;
		e.target.parentElement.firstChild.height = this._imgHeight + diffY;
		// 스티커 테두리 크기 조절 
		this.element.style.width = (this._conWidth + diffX) +'px';
		this.element.style.height = (this._conHeight + diffY) +'px';
		// 사이즈 조절 버튼 위치 조절 
		e.target.style.left = this._btnLeft + diffX + 'px';
		e.target.style.top = this._btnTop + diffY + 'px';
	},
	_onBtnMouseUp : function(e) {
		document.removeEventListener('mousemove', this._onBtnMouseMove);
		document.removeEventListener('mouseup', this._onBtnMouseUp);
	},
	positionEnd : function(e) {
		e.target.parentNode.classList.remove("dragging");
		e.target.parentNode.querySelector(".size_btn").remove("size_btn");
		e.target.parentNode.querySelector(".rotate_btn").remove("rotate_btn");
	},
	setParent : function(parent) {
		parent.appendChild(this.element);
		return this;
		}
	}
	// Square.prototype.setPosition = function(e1, e2) {
	// };

	// Square.prototype.startDragging = function(e) {
	// };

	// Square.prototype._onDragStart = function(e) {
	// };

	// Square.prototype._onMouseMove = function(e) {
	// };

	// Square.prototype._onMouseUp = function(e) {
	// };

	// Square.prototype.rotateControll = function(e) {
	// }

	// Square.prototype._onRotateBtnMouseMove = function(e) {
	// }

	// Square.prototype._onRotateBtnMouseUp = function(e) {
	// }

	// Square.prototype.sizeControll = function(e) {
	// }

	// Square.prototype._onBtnMouseMove = function(e) {
	// };

	// Square.prototype._onBtnMouseUp = function(e) {
	// };

	// Square.prototype.positionEnd = function(e) {
	// }

	// Square.prototype.setParent = function(parent) {
	// };

	return {
		Square : Square
	};

})();


