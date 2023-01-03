import render from './render.mjs'
import util from './commonfunctions.mjs'

function startCombat(world, settings){
	var playerHealth = world.player.health || 10;
	var playerDmg = world.player.dmg || 1;
	var enemyHealth = settings.enemyHealth;
	var enemyDmg = settings.enemyDamage;
  var enemySpeed = settings.enemySpeed || 1500;
  var canAttack = true;
  var canHeal = true;
  var canDodge = true;
  var isDodging = false;
	rerender(playerHealth, playerDmg, enemyHealth, enemyDmg, world);
	$('#current-cutscene').html('<use href="#combat">');
	$('#cutscene-overlay').show();
	util.animateAttr($("#player_in_combat"), "x", 50, 500);
	util.animateAttr($("#combat_player_health"), "x", 50, 500);
	util.animateAttr($("#combat_player_dmg"), "x", 50, 500);
	util.animateAttr($("#combat_player_heal"), "x", 50, 500);
  util.animateAttr($("#combat_player_dodge"), "x", 50, 500);
	world.cutscene=true;
	world.cutsceneControls = function(control){
		if(control==5){
      if(!canAttack){return;}
      canAttack = false;
			util.animateAttr($("#player_in_combat"), "x", 150, 500, function(){
				util.animateAttr($("#player_in_combat"), "x", 50, 500, function(){
          canAttack = true;
					if(settings.winAtHealth?(enemyHealth<=settings.winAtHealth):(enemyHealth == 0)){
            canAttack = false;
            canHeal = false;
            canDodge = false;
            util.animateAttr($("#enemy_in_combat"), "opacity", settings.winAtHealth?1:0, 500, function(){
              if(settings.loot ?? true){ //We use the brand new nullish coalescing operator because "|| true" would return true every time
                var loot = doLoot(world, settings);
                $("#combat_loot").text(loot.join(""));
              }
              util.animateAttr($("#combat_loot"), "x", 50, 500, function(){resetRender();settings.win(world, playerHealth);});
            });
          }
				});
				enemyHealth = (enemyHealth-playerDmg)<0 ? 0 : (enemyHealth-playerDmg);
				rerender(playerHealth, playerDmg, enemyHealth, enemyDmg, world);
				if(settings.winAtHealth?(enemyHealth<=settings.winAtHealth):(enemyHealth == 0)){
					clearInterval(enemyAttack);
					return;
				}
			});
		} else if(control==6){
      if(!canHeal){return;}
			if(world.player.inventory['▴'].quantity==0){
				return;
			}
      canHeal = false;
      setTimeout(()=>{canHeal=true;}, 5000);
			world.player.inventory['▴'].quantity--;
			playerHealth += 4;
			playerHealth = (playerHealth>world.player.maxHealth)?world.player.maxHealth:playerHealth; //cap at max health
			rerender(playerHealth, playerDmg, enemyHealth, enemyDmg, world);
		} else if(control==7){
      if(!canDodge){return;}
      canDodge = false;
      isDodging=true;
      util.animateAttr($("#player_in_combat"), "y", 60, 250, function(){
				util.animateAttr($("#player_in_combat"), "y", 75, 250, function(){
          isDodging = false;
          setTimeout(()=>{canDodge=true;}, 1000);
				});
			});
    }
	}
	var enemyAttack = setInterval(function(){
		util.animateAttr($("#enemy_in_combat"), "x", 50, ((enemySpeed-500)==0?500:(enemySpeed-500))/2, function(){
			util.animateAttr($("#enemy_in_combat"), "x", 150, ((enemySpeed-500)==0?500:(enemySpeed-500))/2, function(){
				if(playerHealth == 0){
          util.animateAttr($("#player_in_combat"), "opacity", 0, 500, resetRender);
          settings.lose(world);
        }
			});
      var calculatedDamage = enemyDmg;
      if(isDodging) calculatedDamage *= 0;
			playerHealth = (playerHealth-calculatedDamage)<0 ? 0 : (playerHealth-calculatedDamage);
			rerender(playerHealth, playerDmg, enemyHealth, enemyDmg, world);
			if(playerHealth == 0){
				clearInterval(enemyAttack);
				return;
			}
		});
	}, enemySpeed);
}

function rerender(ph, pd, eh, ed, world){
	$("#combat_player_health").text(util.numberToCircles(ph));
	$("#combat_enemy_health").text(util.numberToCircles(eh));
	$("#combat_player_dmg").text('0: '+util.numberToTriangles(pd));
	$("#combat_player_heal").text((world.player.inventory['▴'].quantity>0)?'1: ▴ ('+util.numberToCircles(world.player.inventory['▴'].quantity)+')':"");
	$("#combat_enemy_dmg").text(util.numberToTriangles(ed));
  $("#combat_player_dodge").text('2: ◮');
}
function resetRender(){
  world.cutscene = false;
  $('#cutscene-overlay').hide();
  $('#player_in_combat').attr('x', '-20');
	$('#player_in_combat').attr('opacity', '1');
	$('#enemy_in_combat').attr('x', '150');
	$('#enemy_in_combat').attr('opacity', '1');
	$('#combat_player_health').attr('x', '-20');
	$('#combat_player_dmg').attr('x', '-20');
	$("#combat_loot").attr('x', '150');
	$("#combat_loot").text("");
}
function doLoot(world, settings){
	var loot = util.loot(settings.lootTable, settings.lootRolls);
	for(var i in loot){
    if(!(settings.handleLoot || function(){})(loot[i])){
      world.player.inventory[loot[i]].discovered = true;
		  world.player.inventory[loot[i]].quantity++;
    }
	}
	render(world);
	return loot;
}

export default startCombat;