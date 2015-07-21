var width,
	height,
	svgContainer,
	arrayWidth,
	arrayHeight,
	squareSize,
	speed,
	toggle,
	remainderXBuffer,
	pause,
	maxShade,
	remainderYBuffer;


var arrayA;
var	arrayB;

var colors;
/* COLOUR SCHEME
Green : (88, 140, 126,), (#588C7E)
Yellow: (242, 227, 148), (#F2E394);
Orange: (242, 174, 114),(#F2AE72);
Red:(217, 100, 89),(#D96459);
Crimson:(140, 70, 70),(#8C4646);
*/

function init(){

	//speed in ms
	speed = 300;

	//set colors
	colors = ["#588C7E","#F2E394","#F2AE72","#D96459","#8C4646"];
	
	squareSize = 8;
	width = document.getElementById('lifewell').offsetWidth;
	height = document.getElementById('lifewell').offsetHeight;//window.innerHeight/4;
	// console.log(height);
	// height = height - $("#nav").height(); // remove height of nav bar
	pause = false;

	initArrays();
	maxShade = 50;

	toggle = true;

	remainderXBuffer = ((width - (arrayWidth*squareSize))/2) + squareSize/2;
	remainderYBuffer = ((height - (arrayHeight*squareSize))/2) + squareSize/2;

	// put a listener on the title well
	// so when it's clicked, it will re-seed the life game
	d3.select("#lifewell").on("click", function(){initArrays();})

	svgContainer = d3.select(".life")
		.append("svg")
		.attr("width", width)
		.attr("height", height)

	draw();
	
}


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

			//decide aliveness
			var aliveness = false;
			if (Math.random() > .7){
				aliveness = true;
			}
			arrayA[i][j] = {"alive":aliveness, "age":0};
			arrayB[i][j] = {"alive":aliveness, "age":0};
		} 
	}
}



function draw(){
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
    //.on('mouseover', tip.show)
    //.on('mouseout', function() {
      // d3.select(".d3-tip")
      // .transition()
      //   .delay(1700)
      //   .duration(900)
      //   .style("opacity",0)
      //   .style('pointer-events', 'none')
      // })
    .attr("id", function(d, i, j){return "id"+i.toString()+"X"+j.toString();})
    //.attr("fill", function(d){return "rgb(255,255,255)";})
    .attr("cx", function(d, i, j){ return j * squareSize + remainderXBuffer ;})
    .attr("cy", function(d, i, j){ return i * squareSize + remainderYBuffer ;})
    .attr("fill", function(){
    	var colo = parseInt(Math.random()*colors.length); 
    	return colors[colo];})
    .style("opacity", 0.7)
    .attr("r", function(d){
				if (d.alive){ return (squareSize/2);} else {return 0;} 
			;})

}


var start = null;
function run(timestamp){
	if (!start) start = timestamp;

	var progress = timestamp - start;
	if (progress >= speed){
		tick();
		drawTick();
		start = timestamp;
	}
	window.requestAnimationFrame(run);
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
    	.duration(speed)
    	.attr("r", function(d){
				if (d.alive){ return (squareSize/2);} else {return 0;} 
			;})
}

init();