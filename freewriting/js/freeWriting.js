var started = false,
	story,
	wordGoal = 60,
	seconds = 1,
	timeLimit = 100;

var countArcData = [{name: "count", value: 0, size: wordGoal}],
	timeArcData = [{name: "count", value: 0, size: timeLimit}];

var arc = d3.svg.arc()
    .innerRadius(50)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(function(d) { return (d.value / d.size) * 2 * Math.PI; });

/*
The homepage for the free writing application
*/
function freeWriting(){
	document.body.style.backgroundImage = "url('images/my-kaokao-wellington-panorama.jpg')";
	backScreen = appSelect;

	//change the heading
	newHeading("Free Writing");

	//define body buttons
	var bodybuttons = [
  		{"title":"Write A New Story", "func":writeStory},
  		{"title":"Read Previous Stories", "func":readPrev}];
	//draw body buttons
	bodyButtons(bodybuttons);

	var navbuttons = [
	{"name":"back", "func":back, "x":20}];
	navButtons(navbuttons);

	clearInput();
}

/*
The heart and soul of the application, this function
initialises the timer arc, the word count arc, the 
input text area, and the area to display input
*/
function writeStory(){
	backScreen = freeWriting;
	var navbuttons = [{"name":"back", "func":back, "x":20}];
	navButtons(navbuttons);	

	//make svg element for the timer arc
	var timeArc = canvas
        .append("g")
        .attr("transform", "translate(0," + (height / 2) + ")")

    //make svg element for the word count arc
	var wordCountArc = canvas
        .append("g")
        .attr("transform", "translate("+(width / 3)+"," + (height / 2) + ")")

    //make input area for simulated voice recognition
    makeInputBox(timeArc, wordCountArc)

    //make a text area for printing the input
	var textArea = canvas.append("g")
		.attr("transform", "translate(10," + (height / 2) + ")");

	textArea.append("story:text")
		.attr("class", "story")
		.attr("font-size", "60px")
		.text("Start Writing...")
		.style("opacity", 0.0)
		.style("font-family", "sans-serif")
		.transition()
		.style("opacity", 1.0)
		.duration(1500);
}

//input box to type in, this simulates voice recognition
function makeInputBox(timeArc, wordCountArc){
	var storyInput = document.createElement("INPUT");
	storyInput.setAttribute("type","text");
	storyInput.setAttribute("value","Type here to simulate voice recognition...");
	storyInput.setAttribute("id","storyInput");
	storyInput.style.position = "absolute";
	storyInput.style.top = height + buffer +"px";
	storyInput.style.left = "8px";
	storyInput.style.width = width +"px";
	storyInput.onkeyup = function(){onkeyup(timeArc, wordCountArc)};
	document.body.appendChild(storyInput);
}

//Start the timer arc if it hasn't started yet.
//Add input to the display
//Update wordcount arc
//When done exit.
function onkeyup(timeArc, wordCountArc){

	if (!started){
		started = true;
		arcTimerStart(timeArc);
	}

	canvas.select(".story")
		.text(document.getElementById("storyInput").value.substr(-14))

  	story = document.getElementById("storyInput").value;

	updateWordCountArc(wordCountArc)

	if (wordCount > wordGoal){
	 	done("***500 Words***");
	}
}

/*
Once the word count or time limit has been reached
*/
function done(message){
	canvas.select(".story")
		.text(message);

	clearInput();

	stories.push({"type":"story",
          "title":story.substring(0,10),
          "story":story});

	var navbuttons = [{"name":"read", "func":(function(){return read({"story":story})}), "x":390},
		{"name":"bubble chart", "func":(function(){backScreen = (function(){return read({"story":story})}); bubble()}), "x":205}];
	navButtons(navbuttons);	

	backScreen = freeWriting;
}

/*
This word count arc is on the right hand side. 
When the word count is reached, the arc will be a complete circle
*/
function updateWordCountArc(wordCountArc){
	wordCount = document.getElementById("storyInput").value.split(" ").length;
	countArcData[0].previous = countArcData[0].value; 
	countArcData[0].value = wordCount;

	var path = wordCountArc.selectAll("path")
		.data(countArcData);

	path.enter().append("svg:path")
		.attr("transform", function(d, i) { return "translate(175,0)"; })
		.transition()
		.duration(150)
		.attrTween("d", arcTween);

	path.transition()
		.duration(150)
		.attrTween("d", arcTween);
}

function arcTimerStart(timeArc){
	var tick = setInterval(function() {
		if (!started){stop();}

        timeArcData[0].previous = timeArcData[0].value; 
        timeArcData[0].value = seconds++;
          
        var path = timeArc.selectAll("path")
  	        .data(timeArcData);

        path.enter().append("svg:path")
            .attr("transform", function(d, i) { return "translate(" + width/4 + ",0)"; })
            .transition()
            .ease("elastic")
            .duration(650)
            .attrTween("d", arcTween);

        path.transition()
            .ease("elastic")
            .duration(650)
            .attrTween("d", arcTween);
          
        path.exit().transition()
            .ease("bounce")
            .duration(650)
            .attrTween("d", arcTween)
            .remove();
        
        //stop the clock when the word limit is reached
        if(wordCount >= wordGoal){stop();}

        //stop the clock when the timer is done
        if (seconds > timeLimit){
            stop();
            done("***Time Up***");
        }
    }, 1000);
    function stop(){
        clearInterval(tick);
    } 
}

function arcTween(b) {
	var i = d3.interpolate({value: b.previous}, b);
	return function(t) {
		return arc(i(t));
	};
}

function clearInput(){
	if (document.getElementById("storyInput") != null){
		document.getElementById("storyInput").remove();
	}
	seconds = 1;
	wordCount = 0;
	started = false;
}

function readPrev(){
	backScreen = freeWriting;

	//change the heading
	newHeading("Free Writing");

	var bodybuttons = [
  		{"title":stories[selection].title, "func":read, "story":stories[selection].story},
  		{"title":stories[(selection+1)%stories.length].title, "func":read, "story":stories[(selection+1)%stories.length].story}];
	bodyButtons(bodybuttons);

	var navbuttons = [
		{"name":"back", "func":back, "x":20},
		{"name":"<<" , "x":140, "func":(function(){selection = (selection+stories.length-1)%stories.length;readPrev();})}, 
		{"name":">>", "x":270, "func":(function(){selection = (selection + 1)%stories.length;readPrev();})}];
	navButtons(navbuttons);
}

function bubble(){
	transitionFade();
	var navbuttons = [{"name":"back", "func":back, "x":20}];
	navButtons(navbuttons);

	var children = [],
		found = false,
		splitText = story.split(" ");

	//Makes a list of all words and their frequency
	splitText.forEach(function(entryI){
		children.forEach(function(entryJ){
			if (entryJ.name === entryI){
				found = true;
				entryJ.size = entryJ.size+1;
			}
		})
		if (!found & entryI != ""){
			children.push({"name":entryI, "size":1});
		}
		found = false;
	});

	var root = {"name":"root", "children":children},
		format = d3.format(",d");

    var bubble = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(1);

    var node = canvas.selectAll(".node")
        .data(bubble.nodes(classes(root))
        .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("opacity", 0.8)
        .attr("transform", function(d){return"translate("+d.x+","+d.y+")";});

    node.append("title")
        .text(function(d) { return d.className + ": " + format(d.value); });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return getRandomColor(); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className.substring(0, d.r / 3); });

      // Returns all leaf nodes under the root. Not really needed as only using 
      // 1 parent, root.
    function classes(root) {
        var classes = [];

        function recurse(name, node) {
          if (node.children) node.children.forEach(function(child) {recurse(node.name, child); });
          else classes.push({packageName: name, className: node.name, value: node.size});
        }

        recurse(null, root);
        return {children: classes};
    }

    d3.select(self.frameElement).style("height", height + "px");

    function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
}

function read(storyObj){
	story = storyObj.story;
	transitionFade();
	speed = 10;
	scrollingText(story);
	backScreen = readPrev;

	var navbuttons = [
		{"name":"back", "func":back, "x":20},
		{"name":"bubble chart" , "x":205, "func":(function(){backScreen = (function(){return read(storyObj)}); bubble()})}, 
		//{"name":"-" , "x":140, "func":(function(){speed--;})}, 
		//{"name":"+", "x":270, "func":(function(){speed++;})},
		{"name":"pause" , "x":390, "func":(function(){(speed==0)? speed=10: speed=0;})}];
	navButtons(navbuttons);
}