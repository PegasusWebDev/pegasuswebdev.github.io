export default function confirmReset(world){
	world.cutscene = true;
	$('#current-cutscene').html('<use href="#resetconfirm">');
	$('#cutscene-overlay').show();
	world.cutsceneControls = function(control){
		if(control==4){
			world.cutscene = false;
			$('#cutscene-overlay').hide();
		} else if(control==15){
			world.reset();
		}
	}
}