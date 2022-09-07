function setup(){
canvas = createCanvas(250, 250);
canvas.center();
background("white");  
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function preload()
{
classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(10);
    stroke(0, 0, 250);
    if(mouseIsPressed){
       line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clear(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results)
{
if(error){
    console.error(error);
}
console.log(results);
console.log("The results are here before you. If you can't see but have eyes, look closely. If you are blind, then you can't read this.");

document.getElementById('label').innerHTML = "Label : "+results[0].label;
document.getElementById('confidence').innerHTML = "Confidence : "+Math.round(results[0].confidence*100)+"%";
utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}

