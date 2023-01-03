import render from './render.mjs'
import initCombat from './combat.mjs'

function startCombat(world){
	var difficulty = getEnemyDifficulty(world);
	var enemyHealth = difficulty.health;
	var enemyDmg = difficulty.dmg;
  initCombat(world, {
    enemyHealth: enemyHealth,
    enemyDamage: enemyDmg,
    enemySpeed: difficulty.speed,
    win: function(world, playerHealth){
      world.player.health = playerHealth;
      if(!world.world.discoveredEnemies){
        world.world.discoveredEnemies = true;
        world.startQuest("wall");
      }
    },
    lose: function(world){
      for(var i in world.player.inventory){
        world.player.inventory[i].quantity = 0;
      }
      world.player.pos = [0, 0];
      render(world);
    },
    loot: true,
    lootTable: [
      {item:"◒", weight:20}, 
      {item:"◊", weight:40}, 
      {item:"▢", weight:50}, 
      {item:"◩", weight:40}, 
      {item:"▴", weight:30}, 
      {item:null, weight:30}
    ],
    lootRolls: difficulty.points
  });
}
function getEnemyDifficulty(world){
	var posX = world.player.pos[0];
	var posY = world.player.pos[1];
	var difficultySeed = Math.floor(Math.random()*10);
	var difficultyPoints = 0;
	if(posX > 42){difficultyPoints += 2;}
	if(posX > 50){difficultyPoints += 1;}
	if(posX > 60){difficultyPoints += 1;}
	if(posY > 4){difficultyPoints += 1;}
	if(posY > 6){difficultyPoints += 1;}
	difficultyPoints += Math.floor(difficultySeed / 3);
	return {
		health: difficultyPoints * 2,
		dmg: difficultyPoints<3?1:Math.floor(difficultyPoints / 3),
    speed: 2000 - difficultyPoints*100,
		points: difficultyPoints
	};
}

export default startCombat;