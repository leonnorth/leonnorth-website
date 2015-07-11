var stories = [],
	speeches = [];

d3.json("json/speech-data.json",function(error, json){
	if (error) return console.warn(error);
	speeches = json.data;
});

d3.json("json/story-data.json",function(error, json){
	if (error) return console.warn(error);
	stories = json.data;
});