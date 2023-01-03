import World from './modules/world.mjs'
import render from './modules/render.mjs'

$(function(){
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.replace('/projects/micro/app');
  }
	var world = new World();
  $('#up').click(function(e){
    e.preventDefault();
    if(!world.cutscene){
      world.move(2);
    }
  });
  $('#down').click(function(e){
    e.preventDefault();
    if(!world.cutscene){
      world.move(3);
    }
  });
  $('#left').click(function(e){
    e.preventDefault();
    if(!world.cutscene){
      world.move(0);
    }
  });
  $('#right').click(function(e){
    e.preventDefault();
    if(!world.cutscene){
      world.move(1);
    }
  });
	$(document).keydown(function(e){
		if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey){return;} //Stops app from preventing keyboard shortcuts
		e.preventDefault(); //This is to stop the page from scrolling when your stuff overflows it
		if(e.keyCode==37){
			if(world.cutscene){world.cutsceneControls(0);}
			else{world.move(0);}
		} else if (e.keyCode==39){
			if(world.cutscene){world.cutsceneControls(1);}
			else{world.move(1);}
		} else if (e.keyCode==38){
			if(world.cutscene){world.cutsceneControls(2);}
			else{world.move(2);}
		} else if (e.keyCode==40){
			if(world.cutscene){world.cutsceneControls(3);}
			else{world.move(3);}
		} else if (e.keyCode==32){
			if(world.cutscene){world.cutsceneControls(4);}
			else{world.spaceAction(world.player.pos[0], world.player.pos[1]);}
		} else if (e.keyCode==48){
			if(world.cutscene){world.cutsceneControls(5);}
			else{world.doMarketTrade(0);}
		} else if (e.keyCode==49){
			if(world.cutscene){world.cutsceneControls(6);}
			else{world.doMarketTrade(1);}
		} else if (e.keyCode==50){
			if(world.cutscene){world.cutsceneControls(7);}
			else{world.doMarketTrade(2);}
		} else if (e.keyCode==51){
			if(world.cutscene){world.cutsceneControls(8);}
			else{world.doMarketTrade(3);}
		} else if (e.keyCode==52){
			if(world.cutscene){world.cutsceneControls(9);}
		} else if (e.keyCode==53){
			if(world.cutscene){world.cutsceneControls(10);}
		} else if (e.keyCode==54){
			if(world.cutscene){world.cutsceneControls(11);}
		} else if (e.keyCode==55){
			if(world.cutscene){world.cutsceneControls(12);}
		} else if (e.keyCode==56){
			if(world.cutscene){world.cutsceneControls(13);}
		} else if (e.keyCode==57){
			if(world.cutscene){world.cutsceneControls(14);}
		} else if (e.keyCode==82){
			if(world.cutscene){world.cutsceneControls(15);}
			else{world.confirmReset();}
		}
	});
  var time = 0;
  setInterval(()=>{
    time = time==10?0:time+1;
    $('#gametime').text(
      time==0?'□□□□□□□□□□':
      time==1?'■□□□□□□□□□':
      time==2?'■■□□□□□□□□':
      time==3?'■■■□□□□□□□':
      time==4?'■■■■□□□□□□':
      time==5?'■■■■■□□□□□':
      time==6?'■■■■■■□□□□':
      time==7?'■■■■■■■□□□':
      time==8?'■■■■■■■■□□':
      time==9?'■■■■■■■■■□':
      time==10?'■■■■■■■■■■ saved':"Darn it. If you're seeing this, it's a bug."
    );
    if(time==10){
      world.applyIncome();
		  world.saveGame();
    }
  }, 1000);
	function spawnWanderer(){
		if(world.world.completedWallQuest){
			var randomY = Math.floor(Math.random()*((world.gameworld.length>4)?4:world.gameworld.length));
			var randomX = Math.floor(Math.random()*((world.gameworld[randomY].length>42)?42:world.gameworld[randomY].length));
		}else{
			var randomY = Math.floor(Math.random()*world.gameworld.length);
			var randomX = Math.floor(Math.random()*world.gameworld[randomY].length);
		}
		if(world.gameworld[randomY][randomX] != '□' && world.gameworld[randomY][randomX] != '■'){ //Standing in the way, try again
			spawnWanderer();
			return;
		}
		world.wanderer.pos=[randomX,randomY];
		world.wanderer.exists=true;
		setTimeout(spawnWanderer, Math.floor(Math.random()*10000+60000));
		setTimeout(killWanderer, Math.floor(Math.random()*5000+20000));
		render(world);
	}
	function killWanderer(){
		world.wanderer.exists=false;
		render(world);
	}
	if(world.wanderer.exists){
		setTimeout(killWanderer, Math.floor(Math.random()*5000+20000));
	}
	setTimeout(spawnWanderer, Math.floor(Math.random()*10000+60000));
	window.world=world//for debug
});


// 0 is left
// 1 is right
// 2 is up
// 3 is down