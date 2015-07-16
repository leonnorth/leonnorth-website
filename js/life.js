
var width,
	height,
	svgContainer,
	arrayWidth,
	arrayHeight,
	squareSize,
	toggle,
	remainderXBuffer,
	pause,
	maxShade,
	remainderYBuffer;
var arrayA;
var	arrayB;

function init(){
	
	squareSize = 20;
	width = window.innerWidth/2;
	height = window.innerHeight/2;
	// height = height - $("#nav").height(); // remove height of nav bar
	pause = false;

	initArrays();
	maxShade = 50;

	toggle = true;

	remainderXBuffer = ((width - (arrayWidth*squareSize))/2) + squareSize/2;
	remainderYBuffer = ((height - (arrayHeight*squareSize))/2) + squareSize/2;

	// window.addEventListener("keydown", checkKeyPressed, false);

	svgContainer = d3.select(".life")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
	// 	.on("click", function(d){
	// 		var mouseX = d3.mouse(this)[0],
	// 	mouseY = d3.mouse(this)[1];
	// 		addNewCell(mouseX, mouseY);
	// })
  	
	// console.log("width:"+width+" height:"+height+" arrayWidth:"+arrayWidth+" arrayHeight:"+arrayHeight+" arrayWidth*squareSize:"+(arrayWidth*squareSize)+" arrayHeight*squareSize:"+(arrayHeight*squareSize)+" remainderYBuffer:"+remainderYBuffer+" remainderXBuffer:"+remainderXBuffer);

	draw();
	
}

// function reset(){
// 	pause = true;
// 	//reset arrayA
// 	arrayA = new Array(arrayWidth);
// 	arrayB = new Array(arrayWidth);
// 	for (var i = 0; i < arrayWidth; i++){
// 		arrayA[i] = new Array(arrayHeight);
// 		arrayB[i] = new Array(arrayHeight);
// 		for (var j = 0; j < arrayHeight; j++){
// 			arrayA[i][j] = {"alive":false, "age":0};
// 			arrayB[i][j] = {"alive":false, "age":0};
// 		} 
// 	}

	// seed arrayA
// 	arrayA[1][1].alive = arrayA[2][2].alive = arrayA[3][3].alive = arrayA[4][3].alive = true;
// 	arrayA[1][2].alive = arrayA[2][1].alive = arrayA[3][4].alive = arrayA[4][4].alive = true;
// 	arrayA[1][1].age = arrayA[2][2].age = arrayA[3][3].age = arrayA[4][3].age = 1;
// 	arrayA[1][2].age = arrayA[2][1].age = arrayA[3][4].age = arrayA[4][4].age = 1;

// 	arrayA[0][10].alive = arrayA[1][9].alive = arrayA[2][9].alive = arrayA[3][9].alive = true;
// 	arrayA[4][9].alive = arrayA[4][10].alive = arrayA[4][11].alive = arrayA[3][12].alive = true;
// 	arrayA[0][12].alive = true;
// 	arrayA[0][10].age = arrayA[1][9].age = arrayA[2][9].age = arrayA[3][9].age = 1;
// 	arrayA[4][9].age = arrayA[4][10].age = arrayA[4][11].age = arrayA[3][12].age = 1;
// 	arrayA[0][12].age = 1;

// 	pause = false;
// }

// function writeInstructions(){
// 	console.log("writeInstructions")
// 	var instructions = "hi, SPACE to pause R to reset"

// 	svgContainer.append("text")
// 		.text(instructions)
// 		.attr("x", 0)
// 		.attr("y", 0)
// 		.attr("dy", 0)
// 		.attr("text-anchor", "middle")
// 		.attr("fill", "white")
// 		.attr("font-size", "50px")
// 		.attr("font-family", "sans-serif")
// 		.attr("transform", function(d, i){return"translate("+width/2+","+height/2+")";})
// 		.call(wrap, Math.max(width/2, 300))

	/*
Wraps text in the width given.
*/
// function wrap(text, wid) {
// 	text.each(function() {
// 		var text = d3.select(this),
// 			words = text.text().split(/\s+/).reverse(),
// 			word,
// 			line = [],
// 			lineNumber = 0,
// 	     	lineHeight = 1.1, // ems
// 	        y = text.attr("y"),
// 	        dy = parseFloat(text.attr("dy")),
// 	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
//         while (word = words.pop()) {
//         	line.push(word);
//         	tspan.text(line.join(" "));
//         	if (tspan.node().getComputedTextLength() > wid) {
//         		line.pop();
//         		tspan.text(line.join(" "));
//         		line = [word];
//         		tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
//         	}
//         }
//     });
// }

// }

// function checkKeyPressed(e) {

// 	//r to reset
// if (e.keyCode == "82") {
//       reset();
//   }
// 	//spacebar to pause
//   if (e.keyCode == "32") {
//       pause = !pause;
//   }
// }

// function addNewCell(mouseX, mouseY){

// cellX = parseInt((mouseX - remainderXBuffer + (squareSize/2))/squareSize);
// cellY = parseInt((mouseY - remainderYBuffer + (squareSize/2))/squareSize);

// arrayA[cellX][cellY].alive = true;
// arrayA[cellX][cellY].age = Math.max(arrayA[cellX][cellY].age, 1);

// //find the correct cell by the xy coordinates and update it's size
// var id = '#id'+cellY.toString()+'X'+(cellX).toString();
// svgContainer.select(id).transition().duration(100).attr("r", squareSize/2);
// }

function initArrays(){

	// calculate array size
	arrayWidth = parseInt( width / squareSize );
	arrayHeight = parseInt( height / squareSize );

	// initialise arrays to false
	arrayA = new Array(arrayWidth);
	arrayB = new Array(arrayWidth);
	for (var i = 0; i < arrayWidth; i++){
		arrayA[i] = new Array(arrayHeight);
		arrayB[i] = new Array(arrayHeight);
		for (var j = 0; j < arrayHeight; j++){
			arrayA[i][j] = {"alive":false, "age":0};
			arrayB[i][j] = {"alive":false, "age":0};
		} 
	}

	// seed arrayA
	// arrayA[1][1].alive = arrayA[2][2].alive = arrayA[3][3].alive = arrayA[4][3].alive = true;
	// arrayA[1][2].alive = arrayA[2][1].alive = arrayA[3][4].alive = arrayA[4][4].alive = true;
	// arrayA[1][1].age = arrayA[2][2].age = arrayA[3][3].age = arrayA[4][3].age = 1;
	// arrayA[1][2].age = arrayA[2][1].age = arrayA[3][4].age = arrayA[4][4].age = 1;
	
	arrayA[0][10].alive = arrayA[1][9].alive = arrayA[2][9].alive = arrayA[3][9].alive = true;
	arrayA[4][9].alive = arrayA[4][10].alive = arrayA[4][11].alive = arrayA[3][12].alive = true;
	arrayA[0][12].alive = true;
	arrayA[0][10].age = arrayA[1][9].age = arrayA[2][9].age = arrayA[3][9].age = 1;
	arrayA[4][9].age = arrayA[4][10].age = arrayA[4][11].age = arrayA[3][12].age = 1;
	arrayA[0][12].age = 1;
}



function draw(){
	// pink background
	// svgContainer.append("rect")
	// 	.attr("width", "100%")
	// 	.attr("height", "100%")
	// 	.attr("fill", "pink");
	// writeInstructions();
  	drawInit();
	run();
}

function drawInit(){
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>This is Conway's Game Of Life, check out my projects to see a full implimentation</strong>";
  })

  svgContainer.call(tip);

  svgContainer.selectAll("g")
    .data(arrayA)
    .enter()
    .append("g")
    .selectAll("circle")
    .data( function(d, i, j){ return d;})
    .enter()
    .append("circle")
    .on('mouseover', tip.show)
    .on('mouseout', function() {
      d3.select(".d3-tip")
      .transition()
        .delay(1700)
        .duration(900)
        .style("opacity",0)
        .style('pointer-events', 'none')
      })
    .attr("id", function(d, i, j){return "id"+i.toString()+"X"+j.toString();})
    .attr("fill", function(d){return "rgb(255,255,255)";})
    .attr("cx", function(d, i, j){ return j * squareSize + remainderXBuffer ;})
    .attr("cy", function(d, i, j){ return i * squareSize + remainderYBuffer ;})
    .style("opacity", 0.7)
    .attr("r", function(d){
				if (d.alive){ return (squareSize/2);} else {return 0;} 
			;})

}

function run(){
	var running = setInterval(function(){
		if (!pause){
		
		tick();
		drawTick();
	}
    },500);
    function done(){
    	console.log("done");
      clearInterval(running);      
    } 
}

function tick(){

	//create next array CORE LOGIC
	for (col = 0; col < arrayWidth; col++){
		for (row = 0; row < arrayHeight; row++){
			var aliveNeighbours = checkNeighbours(col, row);

	// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		if(arrayA[col][row].alive && aliveNeighbours < 2){
			arrayB[col][row].alive = false;
			arrayB[col][row].age = 0;
		}
	// Any live cell with two or three live neighbours lives on to the next generation.
		else if(arrayA[col][row].alive && aliveNeighbours < 4){
			arrayB[col][row].alive = true;
			arrayB[col][row].age = arrayA[col][row].age+1;
		}
	// Any live cell with more than three live neighbours dies, as if by overcrowding.
		else if(arrayA[col][row].alive){
			arrayB[col][row].alive = false;
			arrayB[col][row].age = 0;
		}
	// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		else if(!arrayA[col][row].alive && aliveNeighbours === 3){
			arrayB[col][row].alive = true;
			arrayB[col][row].age = 1;
		}
		}
	}

	//set arrayA and clear arrayB
for (col = 0; col < arrayWidth; col++){
	for (row = 0; row < arrayHeight; row++){
		arrayA[col][row].alive = arrayB[col][row].alive;
		arrayA[col][row].age = arrayB[col][row].age;
		arrayB[col][row].alive = false;
		arrayB[col][row].age = 0;
	}
}

}

function printArray(){
	console.log("new print");
	var strLine = " ";
for (col = 0; col < arrayWidth; col++){
	for (row = 0; row < arrayHeight; row++){
		strLine = strLine + " " + (arrayA[col][row].alive ? "T" : "F" );
	}
	console.log("");
	console.log(strLine);
	strLine = " "
}
}

//count number of surrounding neighbours
function checkNeighbours(col, row){
//function for using modulo and keeping output positive
  Number.prototype.mod = function(n) { return ((this%n)+n)%n; }
  var neighbours = 0;

   if (arrayA[(col-1).mod(arrayWidth)][(row-1).mod(arrayHeight)].alive) {neighbours++;} 
   if (arrayA[col][(row-1).mod(arrayHeight)].alive) {neighbours++;} 
   if (arrayA[(col+1).mod(arrayWidth)][(row-1).mod(arrayHeight)].alive) {neighbours++;} 
   if (arrayA[(col-1).mod(arrayWidth)][row].alive) {neighbours++;} 
 // if((row) >=0 & (col) >= 0)//1,1 NOT THIS ONE!
 // {
 //  if (arrayA[row][col].alive) {neighbours++;} 
 // }
   if (arrayA[(col+1).mod(arrayWidth)][row].alive) {neighbours++;} 
   if (arrayA[(col-1).mod(arrayWidth)][(row+1).mod(arrayHeight)].alive) {neighbours++;} 
   if (arrayA[col][(row+1).mod(arrayHeight)].alive) {neighbours++;} 
   if (arrayA[(col+1).mod(arrayWidth)][(row+1).mod(arrayHeight)].alive) {neighbours++;} 

  return neighbours;
}

function drawTick(){
  	svgContainer.selectAll("g")
      .data(arrayA)
      .selectAll("circle")
      .data( function(d, i, j){ return d;})
    	.transition()
    	.duration(500)
    	.attr("fill", function(d){var shade =255 - ((d.age/10) * 254);return"rgb("+shade+","+shade+","+shade+")"})
    	.attr("r", function(d){
				if (d.alive){ return (squareSize/2);} else {return 0;} 
			;})
}

init();


