var dataObj=function(){
	this.fruitNum=0;
	// 蓝色果实会使值翻倍
	this.double=1;
	this.score=0;
	this.gameOver=false;
	// 游戏结束时出现gameover的透明度
	this.alpha=0;
}
dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
}
dataObj.prototype.draw=function(){
	var w=can1.width;
	var h=can1.height;

	ctx1.save();
	ctx1.shadowBlur=10;
	ctx1.shadowColor="#fff";
	ctx1.fillStyle="#fff";
	ctx1.fillText("SCORE:"+this.score,w*0.5,h-20);

	// gameover了在画布上绘制字样
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha +")";
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	ctx1.restore();
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}