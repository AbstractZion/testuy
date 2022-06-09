function preload(){
    song=loadSound("sound.mp3");
}

song=" ";
leftwristX= 0;
leftwristY= 0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded(){
    console.log("poseNet is initiallized");
}


function draw(){
    image(video,0,0,600,500);
    fill("#692fa3");
    stroke("#ffffff");
    if(scorerightwrist>0.2){
    
        circle(rightWristX,rightWristY,20,20);
        if(rightWristY>0 &&rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed🍃=0.5x";
            song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed🍃=1x";
            song.rate(1);
        }
        if(rightWristY>200 &&rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed🍃=1.5x";
            song.rate(1.5);
        }
        if(rightWristY>300 &&rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed🍃=2x";
            song.rate(2);
        }
        if(rightWristY>400 &&rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed🍃=2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    in_numberleftwristY=Number(leftwristY);
    remove_decimals=floor(in_numberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="🥴Volume="+volume;
    song.setVolume(volume);
}
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= "+scoreleftwrist+"scorerightwrist= "+scorerightwrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX= "+leftwristX+"leftwristY= "+leftwristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightwristX= "+rightWristX+"rightwristY= "+rightWristY);
    }
}
