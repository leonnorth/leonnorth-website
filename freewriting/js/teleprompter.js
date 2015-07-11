 
function teleprompter(){
	document.body.style.backgroundImage = "url('images/auditorium.jpg')";

	backScreen = appSelect;

	//change the heading
	newHeading("Teleprompter");

	//define body buttons
	var bodybuttons = [
  		{"title":speeches[selection].title, "func":readSpeech, "speech":speeches[selection].speech},
  		{"title":speeches[(selection+1)%speeches.length].title, "func":readSpeech, "speech":speeches[(selection+1)%speeches.length].speech}];
	bodyButtons(bodybuttons);

	var navbuttons = [
	{"name":"back", "func":back, "x":20},
	{"name":"<<" , "x":140, "func":(function(){selection = (selection+speeches.length-1)%speeches.length; teleprompter();})}, 
	{"name":">>", "x":270, "func":(function(){selection = (selection + 1)%speeches.length; teleprompter();})}];
	
	navButtons(navbuttons);
}

function readSpeech(speechObj){
	backScreen = teleprompter;

	var target = canvas.append("g")
	
	target.append("rect")
		.attr("x",0)
		.attr("y",0)
		.attr("width",width)
		.attr("height",height)
		.attr("fill","white")
		.attr("opacity", 0.0)
		.on("click", function(){target.remove();scrollingText(speechObj.speech);})

	target.append("text")
		.text("Click to start...")
		.attr("x",50)
		.attr("y",100)
      	.style("font-size","60px")
      	.style("font-family", "sans-serif")
      	.attr("text-anchor", "start")
      	.attr("dy", ".71em");

	var navbuttons = [
		{"name":"back", "func":back, "x":20},
		{"name":"-" , "x":140, "func":(function(){speed--;})}, 
		{"name":"+", "x":270, "func":(function(){speed++;})},
		{"name":"pause" , "x":390, "func":(function(){(speed==0)? speed=10: speed=0;})}];
	navButtons(navbuttons);
}