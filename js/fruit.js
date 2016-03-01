// 定义果实的类
var fruitObj=function(){
	this.alive=[];//布尔值
	// 定义橙色和蓝色的果实
	this.x=[];
	this.y=[];

	this.aneNum=[];
	// 果实的变化，长度
	this.l=[];
	// 定义果实上升的速度
	this.spd=[];
	// 区别果实的类型，橙色还是蓝的，得分是不一样的
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		// 初始化时每个果实状态
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNum[i]=0;
		// 初始化随机速度
		this.spd[i]=Math.random()*0.017+0.003;
		// 初始化时类型为空，出生时具体给定类型
		this.fruitType[i]="";
	}
	// 初始化时定义果实的图片地址
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			// 根据不同的果实类型绘制不同的果实图片
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			// 画果实(先找到一个海葵，然后长大，然后往上飘)
			// 果实在海葵顶端随着帧变化慢慢变大直至无穷
			if(this.l[i]<=14){
				var Num=this.aneNum[i];
				this.x[i]=ane.headx[Num];
				this.y[i]=ane.heady[Num];
				this.l[i]+=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}else{
				// 大于14时，果实成熟开始往上飘
				this.y[i]-=this.spd[i]*7*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}	
	}
}
// 随机找一个海葵来出生果实(有可能出现重复的情况,这里没考虑)
fruitObj.prototype.born=function(i){
	this.aneNum[i]=Math.floor(Math.random()*ane.num);
	// 每次出生时l都被重置
	this.l[i]=0;
	this.alive[i]=true;
	// 随机给定果实类型
	var ran=Math.random();
	if(ran<0.2){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}


// 果实被吃掉时果实消失了
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}


// 监控果实的数量为15个
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		// 让果实出生
		sendFruit();
		return;
	}
}


// 判断果实池里面哪些果实是活着的
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		// 休眠的果实让它出生
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}