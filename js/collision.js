// 判断鱼麻麻和果实的距离，足够近的时候表示吃掉果实
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				// 判断距离
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					// 果实被吃掉
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){//blue果实
						data.double=2;
					}
					// 大鱼和食物碰撞就产生圈圈
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}else{

	}
}


// 大鱼和小鱼的喂食，距离足够近时表示大鱼喂食小鱼
function momBabyCollision(){
	if(data.fruitNum>0&& !data.gameOver){
		// 判断距离
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			// 小鱼复活,身体颜色变化
			baby.babyBodyCount = 0;
			// data归零(因为把果实喂了小鱼)
			// data.reset();
			mom.momBodyCount=0;
			// 计算score
			data.addScore();
			halo.born(baby.x,baby.y);
		}
	}
}