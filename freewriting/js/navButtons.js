 
function navButtons(buttons){
	var buttonWidth = 90,
    	buttonHeight = 18,
    	buttonY = 260;

  var buttons = canvas.selectAll("navButtons")
 		.data(buttons)
 		.enter()
 		.append("g")
 		.on("click", function(d){ (d.name!="pause"&d.name!="+"&d.name!="-")? transitionFade():1 ;d.func();})
 		.attr("calss", "navButtons")
 		.attr("transform", function(d){return "translate("+d.x+", 260)"});

 	buttons.append("rect")
 		.attr("width", buttonWidth)
 		.attr("height", buttonHeight)
    .style("opacity", 0.5)
 		.style("stroke", "black")
  	.style("stroke-width", 2)
  	.style("fill","white");

  buttons.append("text")
    .text(function(d){return d.name})
    .attr("x", buttonWidth/2)
    .attr("y", buttonHeight - 4)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .attr("font-size", "13px");

}

function back(){
	transitionFade();
  backScreen();
}