noseX=0;
noseY=0;

leftWristX=0;
rightWristX=0;
difference=0;

texth= document.getElementById('text').value;
function setup(){
    video= createCapture(VIDEO);
    video.size(600, 500);
    video.position(100,185);
    canvas= createCanvas(650,500);
    canvas.position(650, 150);

    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}


function draw() {
    texth= document.getElementById('text').value;
    document.getElementById("font_size").innerHTML= 'Font Size is '+difference+'px';
    background('white');
    textSize(difference);
    fill('#337ab7');
    text(texth,noseX,noseY);
}

function modelLoaded() {
    console.log('Pose Net loaded');
}

function gotPoses(results){
    if (results.length > 0 ) {
        console.log(results);
        noseX= results[0].pose.nose.x - 250;
        noseY= results[0].pose.nose.y - 50;
        console.log('Nose X: '+ noseX + 'Nose Y: '+ noseY);

        leftWristX= results[0].pose.leftWrist.x;
        rightWristX= results[0].pose.rightWrist.x;
        difference= floor(leftWristX - rightWristX);
        console.log('Left Wrist: '+leftWristX+ " Right Wrist: "+ rightWristX+ " Difference: "+difference);
    }
}

