var img = "";
var status1 = "";
var objects = [];
var baby="";
var song="";

function preload() {
    img = loadImage("baby.jpg");
    song = loadSound("song.crdownload")
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

        for (var i=0; i<objects.length; i++) {
        strokeWeight(2);
        fill("#1AA7EC");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y +10);
        noFill();
        stroke("#1AA7EC");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        check();
    document.getElementById("status").innerHTML = "Status - Object Detected";
    }
}

function check() {
    for (var i=0; i<objects.length; i++) {
        if(objects[i].label == "person") {
            baby = "there"
        } else {
            baby = "";
        }
    }
    if (baby == "") {
        song.play();
        document.getElementById("").innerHTML = "Status = Baby Safe";
    } else {
        song.pause();
        document.getElementById("").innerHTML = "Status = Baby Missing";
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = "true";
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}