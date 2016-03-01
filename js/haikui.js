// 定义海葵的类
var aneObj=function(){
	// 使用二次贝塞尔曲线画摆动的海葵start point,control point,end point(sin)
	// 海葵的位置x
	this.rootx=[];
	// end point
	this.headx=[];
	this.heady=[];
	// 摆动振幅
	this.amp=[];
	// 摇摆角度
	this.alpha=0;
}
aneObj.prototype.num=50;
// 定义海葵的初始化，即开始的位置以及海葵的高度
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	// 计算正弦值
	var l=Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		// 用canvas绘制海葵
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		// 正弦值*振幅=x轴上当前的移动量即左右摇摆做sin运动
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		//control point和end point
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}