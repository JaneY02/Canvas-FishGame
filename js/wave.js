// 将所有的圈圈放在一个池子里，每次要用的时候先看下它是不是空闲，如果空闲就拿来用
var waveObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
}
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;//所有圈圈都是死的，可以拿来用的
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="#fff";
	for(var i=0;i<this.num;i++){
		//当前可以用
		if(this.alive[i]){
			// 半径逐渐变大
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>50){
				this.alive[i]=false;
				// 跳出本次循环继续下一次i++，以免下面的alpha出现负数
				break;
			}
			// 颜色逐渐变淡
			var alpha=1-this.r[i]/50;
			// draw
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			// born
			return;//因为只需要一个，所以只要找到一个就跳出循环
		}
	}
}