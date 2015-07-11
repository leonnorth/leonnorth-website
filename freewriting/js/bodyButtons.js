
/*
Makes body buttons.
When a button is clicked, it transition, then calls the function in the button object
*/ 
function bodyButtons(buttons){
	var buttons = canvas.selectAll("bodyButtons")
		.data(buttons)
		.enter()
		.append("g")
		.on("click", function(d, i){transitionFade();d.func(d);})
    .attr("x",0)
    .attr("y",0)
		.attr("transform", function(d, i){return"translate("+(buffer + bodyButtonWidth * i + buffer * i)+","+bodyButtonY+")";})
		.attr("class", "bodyButtons")
    .style("opacity", 0.0);

	buttons.append("rect")
		.attr("width", bodyButtonWidth)
		.attr("height", bodyButtonHeight)
		.style("stroke", "black")
  	.style("stroke-width", 2)
    .style("opacity", 0.5)
  	.style("fill","white");

  buttons.append("text")
  	.text(function(d){return d.title;})
  	.attr("transform", "translate("+bodyButtonWidth / 2+",0)")
  	.attr("x", bodyButtonWidth / 2)
  	.attr("y", bodyButtonHeight / 3)
  	.attr("dy", 0)
  	.attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .style("font-family", "sans-serif")
  	.call(wrap, bodyButtonWidth);

  buttons.transition()
    .style("opacity", 1.0)
    .duration(450)
}

/*
Wraps text in the width given.
*/
function wrap(text, width) {
	text.each(function() {
	var text = d3.select(this),
		words = text.text().split(/\s+/).reverse(),
		word,
		line = [],
		lineNumber = 0,
     	lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
        	line.push(word);
        	tspan.text(line.join(" "));
        	if (tspan.node().getComputedTextLength() > width) {
        		line.pop();
        		tspan.text(line.join(" "));
        		line = [word];
        		tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        	}
        }
    });
}