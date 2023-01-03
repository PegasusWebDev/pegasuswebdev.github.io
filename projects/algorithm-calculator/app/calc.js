$(document).ready(function(){
	$("#calc-canvas").attr("width",$(window.frameElement).width());
	$("#calc-type").change(function(){
		if($(this).val()=="sum-basic"){
			$("#params").show()
			$("#params").html("<legend>Addends:</legend><input type='text' id='addend1'> + <input type='text' id='addend2'> <button id='start' onclick='calcSumBasic();' class='button'>Calculate</button>");
			$("#addend1").focus();
			$("#addend1").on("keyup", function(e){if(e.code==="Enter"){$("#addend2").focus();}});
			$("#addend2").on("keyup", function(e){if(e.code==="Enter"){$("#start").click();$("#next").focus();}});
		}else if($(this).val()=="difference-basic"){
			$("#params").show();
			$("#params").html("<legend>Expression:</legend><input type='text' id='minuend'> - <input type='text' id='subtrahend'> <button id='start' onclick='calcDifferenceBasic();' class='button'>Calculate</button>");
			$("#minuend").focus();
			$("#minuend").on("keyup", function(e){if(e.code==="Enter"){$("#subtrahend").focus();}});
			$("#subtrahend").on("keyup", function(e){if(e.code==="Enter"){$("#start").click();$("#next").focus();}});
		}else if($(this).val()=="product-basic"){
			$("#params").show();
			$("#params").html("<legend>Factors:</legend><input type='text' id='factor1'> × <input type='text' id='factor2'> <button id='start' onclick='calcProductBasic();' class='button'>Calculate</button>");
			$("#factor1").focus();
			$("#factor1").on("keyup", function(e){if(e.code==="Enter"){$("#factor2").focus();}});
			$("#factor2").on("keyup", function(e){if(e.code==="Enter"){$("#start").click();$("#next").focus();}});
		}
		else{alert("Algorithm type "+$(this).val()+" is not yet supported.");}
	});
	$("#clear").click(function(){
		var c = jMath.canvas.get($("#calc-canvas"));
		c.clear();
		$("#next").html("Next &gt;");
		$("#button-div").hide()
	});
});

function calcSumBasic(index){
	if(!index){
		$("#next").off('click');
		$("#skip").off('click');
		$("#next").html("Next &gt;");
		window.x = jMath.algorithms.getAlg("addition", [parseInt($("#addend1").val()),parseInt($("#addend2").val())]);
		window.c = jMath.canvas.get($("#calc-canvas"));
		c.clear();
		let addend1 = parseInt($("#addend1").val());
		let addend2 = parseInt($("#addend2").val());
		let largerNumber = addend1>addend2?addend1:addend2;
		window.algX = 30*String(largerNumber).length;
		window.a = x.constructAdditionStandardAlgorithm(c);
		if(a == null){return;}
		if(a.length<2){a.push("");}
		a[a.length-1]+=`$("#button-div").hide();`;
		a[a.length-2]+=`$("#next").html("Finish &gt;");`;
		c.drawAdditionAlgorithm([parseInt($("#addend1").val()),parseInt($("#addend2").val()), " ", algX, 100]);
		window.algorithmCalculator___index = 0;
		$("#button-div").show();
		$("#next").click(function(){window.algorithmCalculator___index++;calcSumBasic(window.algorithmCalculator___index)});
		$("#skip").click(function(){
			c.clear();
			$("#button-div").hide();
			for(var i in a){
				x.runAlgorithm(a, i, algX, 100);
			}
		});
	}
	else{
		x.runAlgorithm(a, index-1, algX, 100);
	}
}
function calcDifferenceBasic(index){
	if(!index){
		$("#next").off('click');
		$("#skip").off('click');
		$("#next").html("Next &gt;");
		window.x = jMath.algorithms.getAlg("subtraction", [parseInt($("#minuend").val()),parseInt($("#subtrahend").val())]);
		window.c = jMath.canvas.get($("#calc-canvas"));
		c.clear();
		let minuend = parseInt($("#minuend").val());
		let subtrahend = parseInt($("#subtrahend").val());
		let largerNumber = minuend>subtrahend?minuend:subtrahend;
		window.algX = 30*String(largerNumber).length;
		window.a = x.constructSubtractionStandardAlgorithm(c);
		if(a == null){return;}
		if(a.length<2){a.push("");}
		a[a.length-1]+=`$("#button-div").hide();`;
		a[a.length-2]+=`$("#next").html("Finish &gt;");`;
		c.drawSubtractionAlgorithm([parseInt($("#minuend").val()),parseInt($("#subtrahend").val()), " ", algX, 100]);
		window.algorithmCalculator___index = 0;
		$("#button-div").show();
		$("#next").click(function(){window.algorithmCalculator___index++;calcSumBasic(window.algorithmCalculator___index)});
		$("#skip").click(function(){
			c.clear();
			$("#button-div").hide();
			for(var i in a){
				x.runAlgorithm(a, i, algX, 100);
			}
		});
	}
	else{
		x.runAlgorithm(a, index-1, algX, 100);
	}
}
function calcProductBasic(index){
	if(!index){
		$("#next").off('click');
		$("#skip").off('click');
		$("#next").html("Next &gt;");
		window.x = jMath.algorithms.getAlg("multiplication", [parseInt($("#factor1").val()),parseInt($("#factor2").val())]);
		window.c = jMath.canvas.get($("#calc-canvas"));
		c.clear();
		let factor1 = parseInt($("#factor1").val());
		let factor2 = parseInt($("#factor2").val());
		window.algX = 30*String(factor1*factor2).length;
		window.a = x.constructMultiplicationStandardAlgorithm(c);
		if(a == null){return;}
		if(a.length<2){a.push("");}
		a[a.length-1]+=`$("#button-div").hide();`;
		a[a.length-2]+=`$("#next").html("Finish &gt;");`;
		c.drawMultiplicationAlgorithm([parseInt($("#factor1").val()),parseInt($("#factor2").val()), " ", algX, 100, false]);
		window.algorithmCalculator___index = 0;
		$("#button-div").show();
		$("#next").click(function(){window.algorithmCalculator___index++;calcSumBasic(window.algorithmCalculator___index)});
		$("#skip").click(function(){
			c.clear();
			$("#button-div").hide();
			for(var i in a){
				x.runAlgorithm(a, i, algX, 100);
			}
		});
	}
	else{
		x.runAlgorithm(a, index-1, algX, 100);
	}
}