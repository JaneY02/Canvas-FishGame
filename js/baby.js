// 定义小鱼的类
var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye=new Image();
	this.babyBody=new Image();
	this.babyTail=new Image();

	// 小鱼尾巴动画计时器
	this.babyTailTimer=0;
	// 小鱼尾巴当前动画序列帧号
	this.babyTailCount=0;

	// 定义小鱼眼睛动画计数器
	this.babyEyeTimer=0;
	// 小鱼眼睛当前动画序列帧号
	this.babyEyeCount=0;
	// 时间间隔,即当前图片持续的时间（注意：眯眼睛很短，睁眼睛较长）
	this.babyEyeInterval=1000;

	// 定义小鱼身体变化的计数器
	this.babyBodyTimer=0;
	// 存储当前执行的序列帧
	this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	this.babyBody.src="./src/babyFade0.png";
}
babyObj.prototype.draw=function(){

	// 小鱼跟随大鱼运动的x,y
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);

	// 小鱼跟随大鱼运动的angle
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);

	// babyTail的计数工作
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1) % 8;
		this.babyTailTimer%=50;
	}

	// babyEye的计数工作
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0){// 此时小鱼是眯眼睛的
			// 让小鱼睁眼睛
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else{
			// 如果是眯眼睛就让小鱼眯眼睛200ms
			this.babyEyeInterval = 200;
		}
	}

	// babyBody的计数工作
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			// gameover
			data.gameOver=true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	// 注意画鱼的顺序
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}