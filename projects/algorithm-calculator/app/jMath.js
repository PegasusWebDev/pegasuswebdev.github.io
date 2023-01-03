//Define jMath
window.jMath = window.jMath||{};
//Define the jMath.add(String name, value[, Boolean hid][, Boolean imm]) method.
Object.defineProperty(jMath,'add',{value:function(name, value, hid, imm){Object.defineProperty(jMath,name,{value:value, configurable:true, enumerable:!hid, writable:!imm});},enumerable:false});
//Define the jMath.config(String name, value) method.
jMath.add('config', function(name, value){Object.defineProperty(jMath,name,{value:value});}, true);
//Define the jMath.remove([String name]) method.
jMath.add('remove', function(name){delete jMath[name];}, true);
//Define jMath.Library ([Array methods]) constructor.
jMath.add('Library', function(methods){
	Object.defineProperty(this, 'remove', {value:function(name){delete this[name]},enumerable:false});
	for(var i in methods){Object.defineProperty(this, methods[i][0], {value:methods[i][1],enumerable:true,configurable:true,writable:true})};
}, true);

/** jMath Version 0.0.1 added:
 *  Canvas Library
**/
//Define canvas library.
jMath.add("canvas", new jMath.Library(), false);
//Define jMath.canvas.jMathCanvasRepresentation (String id) constructor.
jMath.canvas.jMathCanvasRepresentation = function (selector) {
	this.vanillaDOMObject = $(selector).get(0);
	this.canvasDrawContext = this.vanillaDOMObject.getContext("2d");
}
//Define jMath.canvas.get(String id) method.
jMath.canvas.get = function(id){return new jMath.canvas.jMathCanvasRepresentation(id);}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.clear([Array from, Array to]);
jMath.canvas.jMathCanvasRepresentation.prototype.clear = function(from, to){
	from = from||[0, 0];
	to = to||[this.vanillaDOMObject.width, this.vanillaDOMObject.height];
	this.canvasDrawContext.clearRect(from[0], from[1], to[0]-from[0], to[1]-from[1]);
}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawAdditionExpression(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawAdditionExpression = function(elements){
	var addend1 = elements[0];
	var addend2 = elements[1];
	var sum = elements[2]||"?";
	var x = elements[3]||0;
	var y = elements[4]||0;
	this.canvasDrawContext.font="bold 20px monospace";
	this.canvasDrawContext.textBaseline="top";
	this.canvasDrawContext.fillText(addend1+" + "+addend2+" = "+sum, x+5, y+5);
}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawAdditionAlgorithm(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawAdditionAlgorithm = function(elements){
	var addend1 = elements[0];
	var addend2 = elements[1];
	var sum = elements[2]||"?";
	var x = elements[3]||0;
	var y = elements[4]||0;
	this.canvasDrawContext.font="bold 50px monospace";
	this.canvasDrawContext.fillStyle="Black";
	this.canvasDrawContext.strokeStyle="Black"
	this.canvasDrawContext.textBaseline = "top";
	this.canvasDrawContext.textAlign = "end";
	var line1Coords = [x+75,y+5];
	var line2Coords = [x+75,y+55];
	var lineCoords = [[x-25*String(addend2).length,y+103],[x+75,y+103]];
	var sumCoords = [x+75,y+105];
	this.canvasDrawContext.fillText(addend1, line1Coords[0], line1Coords[1]);
	this.canvasDrawContext.fillText("+ "+addend2, line2Coords[0], line2Coords[1]);
	this.canvasDrawContext.beginPath();
	this.canvasDrawContext.moveTo(lineCoords[0][0], lineCoords[0][1]);
	this.canvasDrawContext.lineTo(lineCoords[1][0], lineCoords[1][1]);
	this.canvasDrawContext.stroke();
	this.canvasDrawContext.fillText(sum, sumCoords[0], sumCoords[1]);
	return new jMath.canvas.AdditionAlgorithm([x, y], addend1, addend2, sum, this);
}
//Define jMath.canvas.AdditionAlgorithm (Array coordmap, Number addend1, Number addend2, Number sum, jMathCanvasRepresentation jcr) constructor.
jMath.canvas.AdditionAlgorithm = function(coordmap, addend1, addend2, sum, jcr){
		Object.defineProperty(this, 'addend1', {get:function(){return this._addend1;}, set:function(value){this._addend1 = value; this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}});
		Object.defineProperty(this, 'addend2', {get:function(){return this._addend2;}, set:function(value){this._addend2 = value; this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}});
		Object.defineProperty(this, 'sum', {get:function(){return this._sum;}, set:function(value){this._sum = value; this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}});
		Object.defineProperty(this, 'x', {get:function(){return this._x;}, set:function(value){this._x = value; this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}});
		Object.defineProperty(this, 'y', {get:function(){return this._y;}, set:function(value){this._y = value; this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}});
		this._addend1 = addend1;
		this._addend2 = addend2;
		this._sum = sum;
		this._jcr = jcr;
		this._x = coordmap[0];
		this._y = coordmap[1];
		this.redraw = function(){this._jcr.clear(); this._jcr.drawAdditionAlgorithm([this._addend1, this._addend2, this._sum, this._x, this._y]);}
}
//Define jMath.canvas.AdditionAlgorithm.prototype.drawRegroupMarks(Array regroups) method.
jMath.canvas.AdditionAlgorithm.prototype.drawRegroupMarks = function(regroups){
	regroups.reverse();
	for(var i in regroups){
		this._jcr.canvasDrawContext.font = "30px monospace";
		var coords = [this.x+75-(30*i), this.y-25];
		this._jcr.canvasDrawContext.fillStyle="Gray";
		this._jcr.canvasDrawContext.fillText(regroups[i], coords[0], coords[1]);
	}
}

//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawSubtractionExpression(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawSubtractionExpression = function(elements){
	var minuend = elements[0];
	var subtrahend = elements[1];
	var difference = elements[2]||"?";
	var x = elements[3]||0;
	var y = elements[4]||0;
	this.canvasDrawContext.font="bold 20px monospace";
	this.canvasDrawContext.textBaseline="top";
	this.canvasDrawContext.fillText(minuend+" - "+subtrahend+" = "+difference, x+5, y+5);
}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawSubtractionAlgorithm(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawSubtractionAlgorithm = function(elements){
	var minuend = elements[0];
	var subtrahend = elements[1];
	var difference = elements[2]||"?";
	var x = elements[3]||0;
	var y = elements[4]||0;
	this.canvasDrawContext.font="bold 50px monospace";
	this.canvasDrawContext.fillStyle="Black";
	this.canvasDrawContext.strokeStyle="Black"
	this.canvasDrawContext.textBaseline = "top";
	this.canvasDrawContext.textAlign = "end";
	var line1Coords = [x+75,y+5];
	var line2Coords = [x+75,y+55];
	var lineCoords = [[x-25*String(subtrahend).length,y+103],[x+75,y+103]];
	var differenceCoords = [x+75,y+105];
	this.canvasDrawContext.fillText(minuend, line1Coords[0], line1Coords[1]);
	this.canvasDrawContext.fillText("- "+subtrahend, line2Coords[0], line2Coords[1]);
	this.canvasDrawContext.beginPath();
	this.canvasDrawContext.moveTo(lineCoords[0][0], lineCoords[0][1]);
	this.canvasDrawContext.lineTo(lineCoords[1][0], lineCoords[1][1]);
	this.canvasDrawContext.stroke();
	this.canvasDrawContext.fillText(difference, differenceCoords[0], differenceCoords[1]);
	return new jMath.canvas.SubtractionAlgorithm([x, y], minuend, subtrahend, difference, this);
}
//Define jMath.canvas.SubtractionAlgorithm (Array coordmap, Number minuend, Number subtrahend, Number difference, jMathCanvasRepresentation jcr) constructor.
jMath.canvas.SubtractionAlgorithm = function(coordmap, minuend, subtrahend, difference, jcr){
		Object.defineProperty(this, 'minuend', {get:function(){return this._minuend;}, set:function(value){this._minuend = value; this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}});
		Object.defineProperty(this, 'subtrahend', {get:function(){return this._subtrahend;}, set:function(value){this.subtrahend = value; this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}});
		Object.defineProperty(this, 'difference', {get:function(){return this._difference;}, set:function(value){this._difference = value; this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}});
		Object.defineProperty(this, 'x', {get:function(){return this._x;}, set:function(value){this._x = value; this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}});
		Object.defineProperty(this, 'y', {get:function(){return this._y;}, set:function(value){this._y = value; this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}});
		this._minuend = minuend;
		this._subtrahend = subtrahend;
		this._difference = difference;
		this._jcr = jcr;
		this._x = coordmap[0];
		this._y = coordmap[1];
		this.redraw = function(){this._jcr.clear(); this._jcr.drawSubtractionAlgorithm([this._minuend, this._subtrahend, this._difference, this._x, this._y]);}
}
//Define jMath.canvas.SubtractionAlgorithm.prototype.drawRegroupMarks(Array regroups) method.
jMath.canvas.SubtractionAlgorithm.prototype.drawRegroupMarks=function(regroups){
	regroups.reverse();
	for(var i in regroups){
		var coords = [this.x+75-(30*i), this.y-25];
		this._jcr.canvasDrawContext.font = "25px monospace";
		this._jcr.canvasDrawContext.fillStyle="Gray";
		this._jcr.canvasDrawContext.strokeStyle="Gray";
		this._jcr.canvasDrawContext.fillText(regroups[i], coords[0], coords[1]);
		if(regroups[i][1]==true){
			this._jcr.canvasDrawContext.beginPath();
			this._jcr.canvasDrawContext.moveTo(coords[0]-10, coords[1]);
			this._jcr.canvasDrawContext.lineTo(coords[0], coords[1]+15);
			this._jcr.canvasDrawContext.stroke();
		}
	}
	return this;
}
//Define jMath.canvas.SubtractionAlgorithm.prototype.strikeMinuendDigit(Number index) method.
jMath.canvas.SubtractionAlgorithm.prototype.strikeMinuendDigit=function(index){
	var coords = [this.x+75-(30*index), this.y+5];
	this._jcr.canvasDrawContext.strokeStyle="DarkGray";
	this._jcr.canvasDrawContext.lineWidth=3;
	this._jcr.canvasDrawContext.beginPath();
	this._jcr.canvasDrawContext.moveTo(coords[0]-25, coords[1]);
	this._jcr.canvasDrawContext.lineTo(coords[0], coords[1]+45);
	this._jcr.canvasDrawContext.stroke();
	return this;
}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawMultiplicationExpression(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawMultiplicationExpression = function(elements){
	var factor1 = elements[0];
	var factor2 = elements[1];
	var product = elements[2] || '?';
	var x = elements[3] || 0;
	var y = elements[4] || 0;
	this.canvasDrawContext.font="bold 20px monospace";
	this.canvasDrawContext.textBaseline="top";
	this.canvasDrawContext.fillText(factor1+" × "+factor2+" = "+product, x+5, y+5);
}
//Define jMath.canvas.jMathCanvasRepresentation.prototype.drawMultiplicationAlgorithm(Array elements) method.
jMath.canvas.jMathCanvasRepresentation.prototype.drawMultiplicationAlgorithm = function(elements){
	var factor1 = elements[0];
	var factor2 = elements[1];
	var product = elements[2]||['?'];
	var x = elements[3]||0;
	var y = elements[4]||0;
	var drawProductSum = elements[5];
	this.canvasDrawContext.font="bold 50px monospace";
	this.canvasDrawContext.fillStyle="Black";
	this.canvasDrawContext.strokeStyle="Black"
	this.canvasDrawContext.textBaseline = "top";
	this.canvasDrawContext.textAlign = "end";
	var line1Coords = [x+75,y+5];
	var line2Coords = [x+75,y+55];
	var lineCoords = [[x-25*String(factor2).length,y+103],[x+75,y+103]];
	var productLinesCoords = [];
	var lineY = y+105;
	for(var i in product){
		productLinesCoords.push([x+75, lineY]);
		lineY += 50;
	}
	var secondLineCoords = [[x-25*String(product[product.length-1]).length,lineY+3],[x+75,lineY+3]]
	var productSum = 0;
	for(var i in product){
		productSum += product[i];
	}
	var productSumCoords = [x+75, lineY+5];
	this.canvasDrawContext.fillText(factor1, line1Coords[0], line1Coords[1]);
	this.canvasDrawContext.fillText("× "+factor2, line2Coords[0], line2Coords[1]);
	this.canvasDrawContext.beginPath();
	this.canvasDrawContext.moveTo(lineCoords[0][0], lineCoords[0][1]);
	this.canvasDrawContext.lineTo(lineCoords[1][0], lineCoords[1][1]);
	this.canvasDrawContext.stroke();
	for(var i in product){
		var drawAddSign = (i==product.length-1) && drawProductSum
		this.canvasDrawContext.fillText((drawAddSign?"+ ":"")+product[i], productLinesCoords[i][0], productLinesCoords[i][1]);
	}
	if(drawProductSum){
		this.canvasDrawContext.beginPath();
		this.canvasDrawContext.moveTo(secondLineCoords[0][0], secondLineCoords[0][1]);
		this.canvasDrawContext.lineTo(secondLineCoords[1][0], secondLineCoords[1][1]);
		this.canvasDrawContext.stroke();
		this.canvasDrawContext.fillText(productSum, productSumCoords[0], productSumCoords[1]);
	}
	return new jMath.canvas.MultiplicationAlgorithm([x, y], factor1, factor2, product, drawProductSum, this);
}
//Define jMath.canvas.MultiplicationAlgorithm(Array coordmap, Number factor1, Number factor2, Array product, Boolean drawProductSum, jMathCanvasRepresentation jcr)
jMath.canvas.MultiplicationAlgorithm = function(coordmap, factor1, factor2, product, drawProductSum, jcr){
	Object.defineProperty(this, 'factor1', {get:function(){return this._factor1;}, set:function(value){this._factor1 = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	Object.defineProperty(this, 'factor2', {get:function(){return this._factor2;}, set:function(value){this._factor2 = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	Object.defineProperty(this, 'product', {get:function(){return this._product;}, set:function(value){this._product = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	Object.defineProperty(this, 'x', {get:function(){return this._x;}, set:function(value){this._x = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	Object.defineProperty(this, 'y', {get:function(){return this._y;}, set:function(value){this._y = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	Object.defineProperty(this, 'drawProductSum', {get:function(){return this._drawProductSum;}, set:function(value){this._drawProductSum = value; this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}});
	this._factor1 = factor1;
	this._factor2 = factor2;
	this._product = product;
	this._jcr = jcr;
	this._x = coordmap[0];
	this._y = coordmap[1];
	this._drawProductSum = drawProductSum;
	this.redraw = function(){this._jcr.clear(); this._jcr.drawMultiplicationAlgorithm([this._factor1, this._factor2, this._product, this._x, this._y, this._drawProductSum]);}
}
//Define jMath.canvas.MultiplicationAlgorithm.prototype.drawRegroupMarks(Array regroups) method.
jMath.canvas.MultiplicationAlgorithm.prototype.drawRegroupMarks=function(regroups){
	regroups.reverse();
	for(var i in regroups){
		var coords = [this.x+75-(30*i), this.y-25];
		this._jcr.canvasDrawContext.font = "25px monospace";
		this._jcr.canvasDrawContext.fillStyle="Gray";
		this._jcr.canvasDrawContext.strokeStyle="Gray";
		this._jcr.canvasDrawContext.fillText(regroups[i], coords[0], coords[1]);
	}
	return this;
}
/** jMath version 0.0.1 added:
 *  Algorithm Library
**/
jMath.add('algorithms', new jMath.Library(), false);
//Define jMath.algorithms.getAlg(String type, Array elements) method.
jMath.algorithms.getAlg = function(type, elements){
	if(type=="addition"){return new jMath.algorithms.AdditionAlgorithm(elements);}
	else if(type=="subtraction"){return new jMath.algorithms.SubtractionAlgorithm(elements);}
	else if(type=="multiplication"){return new jMath.algorithms.MultiplicationAlgorithm(elements);}
	else{console.error("jMath Error: Algorithm type "+type+" is not defined.\nAcceptable types are:\n - \"addition\"\n - \"subtraction\"\n - \"multiplication\"");}
}
//Define jMath.algorithms.AdditionAlgorithm (Array elements) constructor.
jMath.algorithms.AdditionAlgorithm = function(elements){
	var addend1 = elements[0], addend2 = elements[1], algType = elements[2]||"standard";
	if(algType=="standard"){this.algType=algType;this.addend1=addend1;this.addend2=addend2;this.methodWhitelist=["constructAdditionStandardAlgorithm","runAlgorithm"]}
	else{console.error("jMath Error: No such algorithm "+algType+" for type addition.\nAcceptable types are:\n - \"standard\"");}
}
//Define jMath.algorithms.AdditionAlgorithm.prototype.constructAdditionStandardAlgorithm(jMathCanvasRepresentation ctx) method (whitelisted for algorithm "standard").
jMath.algorithms.AdditionAlgorithm.prototype.constructAdditionStandardAlgorithm = function(ctx){
	if(this.methodWhitelist.indexOf("constructAdditionStandardAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.")}
	else{
		var algorithm=[];
		var reversedAddend1 = String(Math.floor(this.addend1)).split("").reverse(), reversedAddend2 = String(Math.floor(this.addend2)).split("").reverse();
		if(!this.addend1||!this.addend2){console.error("jMath Error: The addends must be numbers and must exist.");alert("Invalid expression:\nThe addends must be numbers.");return null;}
		if((this.addend1<0)||(this.addend2<0)){console.error("jMath Error: The addends must be positive.");alert("Invalid expression:\nThe addends must be positive.");return null;}
		if(!Number.isSafeInteger(this.addend1)||!Number.isSafeInteger(this.addend2)){console.error("jMath Error: The numbers are not safe integers.");alert("Overload Error:\n\nThe program cannot handle a number higher than:\n"+Number.MAX_SAFE_INTEGER+".\nUsing numbers this high will result in error.");return null;}
		var by2 = !(reversedAddend1.length>=reversedAddend2.length);
		for(var i in (by2?reversedAddend2:reversedAddend1)){
			algorithm.push(`
				var ps = Number(this.algAddend1[${i}]||0)+Number(this.algAddend2[${i}]||0)+this._regroup;
				this._sum.unshift(String(ps).split("").reverse()[0]);
				this._regroup=Number(String(ps).split("").reverse()[1])||0;
				this._ctx.drawAdditionAlgorithm([this.addend1, this.addend2, this._sum.join(""), <x>, <y>]).drawRegroupMarks(stringifyRegroup(${i}+1, this._regroup));
			`);
		}
		algorithm.push(`this._ctx.drawAdditionAlgorithm([this.addend1, this.addend2, Number(this.addend1)+Number(this.addend2), <x>, <y>]);`);
		this.algAddend1=reversedAddend1;
		this.algAddend2=reversedAddend2;
		this._regroup=0;
		this._sum=[];
		this._ctx=ctx;
		return algorithm;
	}
}
//Define jMath.algorithms.AdditionAlgorithm.prototype.runAlgorithm() method (whitelisted for algorithm "standard").
jMath.algorithms.AdditionAlgorithm.prototype.runAlgorithm = function(algorithm, index, x, y){
	if(this.methodWhitelist.indexOf("runAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.")}
	else{
		function stringifyRegroup(index, num){
			var r = [(num==0?"":num)];
			for(var i = 0; i<index; i++){
				r.push("");
			}
			return r;
		}
		if(algorithm[index]){
			eval(algorithm[index].replace("<x>",x||50).replace("<y>",y||50));
		}
	}	
}
//Define jMath.algorithms.SubtractionAlgorithm (Array elements) constructor.
jMath.algorithms.SubtractionAlgorithm = function(elements){
	var minuend = elements[0], subtrahend = elements[1], algType = elements[2]||"standard";
	if(algType=="standard"){this.algType=algType;this.minuend=minuend;this.subtrahend=subtrahend;this.methodWhitelist=["constructSubtractionStandardAlgorithm", "runAlgorithm"]}
	else{console.error("jMath Error: No such algorithm "+algType+" for type subtraction.\nAcceptable types are:\n - \"standard\"");}
}
//Define jMath.algorithms.SubtractionAlgorithm.prototype.constructSubtractionStandardAlgorithm(jMathCanvasRepresentation ctx) method (whitelisted for algorithm "standard").
jMath.algorithms.SubtractionAlgorithm.prototype.constructSubtractionStandardAlgorithm = function(ctx){
	if(this.methodWhitelist.indexOf("constructSubtractionStandardAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.")}
	else{
		var algorithm = [];
		var reversedMinuend = String(Math.floor(this.minuend)).split("").reverse(), reversedSubtrahend = String(Math.floor(this.subtrahend)).split("").reverse();
		if(!this.minuend||!this.subtrahend){console.error("jMath Error: The minuend and subtrahend must be numbers and must exist.");alert("Invalid expression:\nThe minuend and subtrahend must be numbers.");return null;}
		if(this.minuend<this.subtrahend){console.error("jMath Error: The subtrahend cannot be larger than the minuend in a subtraction algorithm.");alert("Invalid expression:\nThe minuend must be larger than the subtrahend.");return null;}
		if((this.minuend<0)||(this.subtrahend<0)){console.error("jMath Error: The minuend and subtrahend must be positive.");alert("Invalid expression:\nThe minuend and subtrahend must be positive.");return null;}
		if(!Number.isSafeInteger(this.minuend)||!Number.isSafeInteger(this.subtrahend)){console.error("jMath Error: The numbers are not safe integers.");alert("Overload Error:\n\nThe program cannot handle a number higher than:\n"+Number.MAX_SAFE_INTEGER+".\nUsing numbers this high will result in error.");return null;}
		for(var i in reversedMinuend){
			algorithm.push(`
				if(this.algMinuend[${i}]<this.algSubtrahend[${i}]){this._ctx.clear(); this.algMinuend=regroup(this.algMinuend, ${i}); this._difference.unshift(Number(this.algMinuend[${i}])+10-Number(this.algSubtrahend[${i}]));this._strikes.push("this._ctx.drawSubtractionAlgorithm([this.algMinuend.slice().reverse().join(''),this.subtrahend, this._difference.join(''), <x>, <y>]).strikeMinuendDigit(${i}).drawRegroupMarks(stringifyRegroup(${i}, Number(this.algMinuend[${i}])+10));");}
				else{
					this._ctx.clear();
					var pd = Number(this.algMinuend[${i}])-(Number(this.algSubtrahend[${i}])||0);
					this._difference.unshift(String(pd));
					this._ctx.drawSubtractionAlgorithm([this.algMinuend.slice().reverse().join(""), this.subtrahend, this._difference.join(""), <x>, <y>]);
				}
				for(var i in this._strikes){eval(this._strikes[i]);}
			`);
		}
		algorithm.push("this._ctx.clear(); this._ctx.drawSubtractionAlgorithm([this.minuend, this.subtrahend, this.minuend-this.subtrahend, <x>, <y>]);");
		this.algMinuend=reversedMinuend;
		this.algSubtrahend=reversedSubtrahend;
		this._regroup=0;
		this._difference=[];
		this._ctx=ctx;
		this._strikes=[]
		return algorithm;
	}	
}
//Define jMath.algorithms.SubtractionAlgorithm.prototype.runAlgorithm() method (whitelisted for algorithm "standard").
jMath.algorithms.SubtractionAlgorithm.prototype.runAlgorithm = function(algorithm, index, x, y){
	if(this.methodWhitelist.indexOf("runAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.");}
	else{
		function stringifyRegroup(index, num){
			var r = [(num==0?"":num)];
			for(var i = 0; i<index; i++){
				r.push("");
			}
			return r;
		}
		function regroup(minuend, index){
			do{
				if(minuend[index+1]==0){
					minuend[index+1]="9";
					index++;
					var complete = false;
				} else {
					var newDig = minuend[index+1];
					newDig = Number(newDig)-1;
					newDig = String(newDig);
					minuend[index+1]=newDig;

					var complete=true;

				}
			}
			while(!complete);
			return minuend;
		}
		if(algorithm[index]){
			eval(algorithm[index].replace(new RegExp("<x>", "g"), x).replace(new RegExp("<y>", "g"), y))
		}
	}
}
//Define jMath.algorithms.MultiplicationAlgorithm(Array elements) constructor.
jMath.algorithms.MultiplicationAlgorithm = function(elements){
	var factor1 = elements[0], factor2 = elements[1], algType = elements[2]||"standard";
	if(algType=="standard"){this.algType=algType;this.factor1=factor1;this.factor2=factor2;this.methodWhitelist=["constructMultiplicationStandardAlgorithm","runAlgorithm"]}
	else{console.error("jMath Error: No such algorithm "+algType+" for type multiplication.\nAcceptable types are:\n - \"standard\"");}
}
//Define jMath.algorithms.MultiplicationAlgorithm.prototype.constructMultiplicationStandardAlgorithm(jMathCanvasRepresentation ctx) method.
jMath.algorithms.MultiplicationAlgorithm.prototype.constructMultiplicationStandardAlgorithm= function(ctx){
	if(this.methodWhitelist.indexOf("constructMultiplicationStandardAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.")}
	else{
		var algorithm=[];
		var reversedFactor2 = String(Math.floor(this.factor2)).split("").reverse(), reversedFactor1 = String(Math.floor(this.factor1)).split("").reverse();
		if(!this.factor1||!this.factor2){console.error("jMath Error: The factors must be numbers and must exist.");alert("Invalid expression:\nThe factors must be numbers.");return null;}
		if((this.factor2<0)||(this.factor2<0)){console.error("jMath Error: The factors must be positive.");alert("Invalid expression:\nThe factors must be positive.");return null;}
		if(!Number.isSafeInteger(this.factor1)||!Number.isSafeInteger(this.factor2)){console.error("jMath Error: The numbers are not safe integers.");alert("Overload Error:\n\nThe program cannot handle a number higher than:\n"+Number.MAX_SAFE_INTEGER+".\nUsing numbers this high will result in error.");return null;}
		for(var i in reversedFactor2){
			for(var j in reversedFactor1){
				algorithm.push(`
					var pp = Number(this.algFactor1[${j}]||0)*Number(this.algFactor2[${i}]||0)+this._regroup;
					this._product[${i}].unshift(String(pp).split("").reverse()[0]);
					this._regroup=Number(String(pp).split("").reverse()[1])||0;
					this._ctx.clear();
					var drawnProduct = [];
					for(var k in this._product){
						drawnProduct.push(this._product[k].join(""));
					}
					this._ctx.drawMultiplicationAlgorithm([this.factor1, this.factor2, drawnProduct, <x>, <y>, false]).drawRegroupMarks(stringifyRegroup(${j}+1, this._regroup));
				`);
			}
			if(String(this.factor1*this.factor2).length>reversedFactor1.length){
				algorithm.push(`
					this._product[${i}].unshift(String(this._regroup)); this._regroup = 0;
					var drawnProduct = [];
					for(var k in this._product){
						drawnProduct.push(this._product[k].join(""));
					}
					this._ctx.drawMultiplicationAlgorithm([this.factor1, this.factor2, drawnProduct, <x>, <y>, false]).drawRegroupMarks(stringifyRegroup(${j}+1, this._regroup));
				`)
			}
		}
		algorithm.push(`
			this._ctx.clear();
			var drawnProduct = [];
			for(var k in this._product){
				drawnProduct.push(Number(this._product[k].join("")));
			}
			this._ctx.drawMultiplicationAlgorithm([this.factor1, this.factor2, drawnProduct, <x>, <y>, true]);
		`);
		this.algFactor1=reversedFactor1;
		this.algFactor2=reversedFactor2;
		this._regroup=0;
		this._product=[];
		for(var i in reversedFactor2){
			this._product.push([]);
			for(var j = 0; j<i; j++){
				this._product[i].push('0');
			}
		}
		this._ctx=ctx;
		return algorithm;
	}
}
//Define jMath.algorithms.MultiplicationAlgorithm.prototype.runAlgorithm(algorithm, index, x, y) method.
jMath.algorithms.MultiplicationAlgorithm.prototype.runAlgorithm = function(algorithm, index, x, y){
	if(this.methodWhitelist.indexOf("runAlgorithm")==-1){console.error("jMath Error: Algorithm \""+this.algType+"\" does not support this method.")}
	else{
		function stringifyRegroup(index, num){
			var r = [(num==0?"":num)];
			for(var i = 0; i<index; i++){
				r.push("");
			}
			return r;
		}
		if(algorithm[index]){
			eval(algorithm[index].replace("<x>",x||50).replace("<y>",y||50));
		}
	}
}