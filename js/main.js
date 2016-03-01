var can1;
var can2;

var ctx1;
var ctx2;


// 定义canvas的宽高，并在init初始化中获得canvas的宽高值
var canWidth;
var canHeight;


// 上一帧执行的时间
var lastTime;
// 两帧之间间隔时间
var deltaTime;


// 定义背景图片同时在init初始化中给定背景图片地址,并在background.js中调用
var bgPic=new Image();

// 定义海葵
var ane;

// 定义果实
var fruit;

// 定义鱼
var mom;
var baby;

// 定义鼠标的位置
var mx;
var my;

// 小鱼尾巴动画的序列帧数组
var babyTail=[];
// 定义小鱼眨眼睛的动画序列数组
var babyEye=[];
// 定义小鱼身体慢慢变白动画序列帧数组
var babyBody=[];

// 鱼麻麻
var momTail=[];
var momEye=[];
var momBodyOrange=[];
var momBodyBlue=[];

var data;

// 大鱼吃果实特效白色圈圈
var wave;

// 大鱼喂小鱼特效
var halo;

// 漂浮物
var dust;
var dustPic=[];

// body加载完成之后将game作为函数入口
document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}


function init(){
	// 获得canvas绘图环境
	// canvas1绘制fishes，dust，UI，吃东西特效，果实
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext('2d');

	can2=document.getElementById("canvas2");
	ctx2=can2.getContext('2d');

	// 鼠标在canvas1上移动时鱼麻麻跟着动
	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	// 初始化海葵
	ane=new aneObj();
	ane.init();

	// 初始化果实
	fruit=new fruitObj();
	fruit.init();

	// 初始化鱼
	mom=new momObj();
	mom.init();
	baby=new babyObj();
	baby.init();

	// 鼠标初始化在canvas的中间
	mx=canWidth*0.5;
	my=canHeight*0.5;


	// 小鱼尾巴动画的序列帧数组初始化,即把小鱼尾巴动画的序列帧图片地址都放在数组中
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	// 小鱼眼睛的序列帧数组初始化,即把小鱼眼睛动画的序列帧图片地址都放在数组中
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	// 初始化小鱼身体变白过程序列帧数组图片地址
	for(var i=0;i<20; i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	// 鱼麻麻
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}

	data=new dataObj();

	for(var i=0;i<8;i++){
		momBodyOrange[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOrange[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}

	ctx1.font="30px Verdana";
	ctx1.textAlign="center";

	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();
}


// 动画效果
function gameloop(){
	// js的动的API，智能计算下一帧运动
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40) deltaTime=40;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	momFruitsCollision();
	momBabyCollision();
	baby.draw();

	data.draw();
	wave.draw();
	halo.draw();

	dust.draw();
}


// 定义移动的函数
function onMouseMove(e){
	if(!data.gameOver){//gameover了鼠标就不能控制了
		if(e.offsetX||e.layerX){
			mx=e.offsetX==undefined?e.layerX:e.offsetX;
			my=e.offsetY==undefined?e.layerY:e.offsetY;
		}
	}
}