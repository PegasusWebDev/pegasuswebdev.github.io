function $ID(id){return document.getElementById(id);}
window.onload=function(){
	var accordions = document.getElementsByClassName("accordion");
	for(var i =0; i<accordions.length; i++){
		var a = accordions[i];
		var headings = a.getElementsByTagName("h3");
		for(var j=0; j<headings.length; j++){
			headings[j].addEventListener("click", function(evt){
				if(evt.preventDefault) evt.preventDefault();
				else evt.returnValue=false;

				if(this.firstChild.classList.contains("plus")){
					this.firstChild.setAttribute("class","minus icon");
          this.firstChild.textContent = 'expand_less'
					this.parentElement.nextElementSibling.setAttribute("class","");
				} else {
					this.firstChild.setAttribute("class","plus icon");
          this.firstChild.textContent = 'expand_more'
					this.parentElement.nextElementSibling.setAttribute("class","hidden")
				}
			});
		}
	}
}