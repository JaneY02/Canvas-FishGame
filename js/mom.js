// 定义鱼麻麻的类
var momObj=function(){
	this.x;
	this.y;
	// 鱼麻麻的角度，后面要使得它趋向于鼠标的角度
	this.angle;
	// 定义鱼麻麻的眼睛身体和尾巴
	this.bigEye=new Image();
	this.bigBody=new Image();
	this.bigTail=new Image();

	// 鱼麻麻尾巴动画计数器
	this.momTailTimer=0;
	// 鱼麻麻尾巴动画当前帧序列号
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;

}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	// 初始化时定义鱼麻麻眼睛身体尾巴的图片地址
	// this.bigEye.src="./src/bigEye0.png";
	// this.bigBody.src="./src/bigSwim0.png";
}
momObj.prototype.draw=function(){

	// 鱼麻麻追随鼠标,lerpDistance是封装在commonFunction中的函数this.x随着mx动
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.98);

	// js的API，Math.atan2(y,x)计算正切值
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;

	// 让鱼麻麻的角度趋向于鼠标的角度
	this.angle=lerpAngle(beta,this.angle,0.6);

	// tail计数器计算
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}

	// eye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}

	ctx1.save();
	// 重新设置绘图原点translate
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	// 根据吃到的果实的不同绘制不同颜色的身体
	if(data.double==1){
		ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);	
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);	
	}
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}