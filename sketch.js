//variables
var bg,bg1,bgimg,bg1img;
var player,playerimg;
var meteor,meteorleftimg,meteorrightimg;
var gameState="start";
var play,playimg;
var blastimg;
var meteorgrp;
var gameover,gameoverimg;
var blastsound;
var clicksound;
var speed=0;
var life=3;
var score=0;
var heartimg;
var about,aboutimg;
var help,helpimg;
var back,backimg;

function preload(){
  bgimg=loadImage("Space.jpg");
  playerimg=loadImage("rocket.png");
  meteorleftimg=loadImage("meteorleft.png");
  meteorrightimg=loadImage("meteorright.png");
  bg1img=loadImage("Bg.png");
  playimg=loadImage("play.png");
  blastimg=loadImage("blast.png");
  gameoverimg=loadImage("gameover.png");
  blastsound=loadSound("crash.wav");
  clicksound=loadSound("click.mp3");
  heartimg=loadImage("Heart.png");
  helpimg=loadImage("help.png");
  backimg=loadImage("back.png");
}

function setup() {
  createCanvas(1200,600);

  bg1 = createSprite(600,300,1200,600);
  bg1.addImage(bg1img);

  play = createSprite(600,300,50,50);
  play.addImage(playimg);

  help = createSprite(600,400,50,50);
  help.addImage(helpimg);
  help.scale=0.5;

  back = createSprite(70,50,50,50);
  back.addImage(backimg)
  back.scale=0.1;


  bg = createSprite(600,300,1200,600);
  bg.addImage(bgimg);
  
  player=createSprite(600,500,50,50)
  player.addImage(playerimg);
  player.scale=0.7;

  player.setCollider("rectangle",0,0,50,280);

  gameover = createSprite(600,300,50,50);
  gameover.addImage(gameoverimg);

  meteorgrp=new Group();
  edges=createEdgeSprites();
}

function draw() {
  background("#04101F");  
  drawSprites();

  if(gameState==="start"){
    bg1.visible=true;
    play.visible=true;
    help.visible=true;
    bg.visible=false;
    player.visible=false;
    gameover.visible=false;
    back.visible=false;

    if(mousePressedOver(play)){
      clicksound.play();
      gameState = "play";
    }

    if(mousePressedOver(help)){
      clicksound.play();
      gameState = "help";
    }
    if(frameCount%2===0){
      play.scale=0.8;
    }
    else{
      play.scale=0.6;
    }
  }
  if(gameState==="help"){
    bg1.visible=false;
    play.visible=false;
    help.visible=false;
    bg.visible=false;
    player.visible=false;
    gameover.visible=false;
    back.visible=true;

    if(mousePressedOver(back)){
      clicksound.play();
      gameState = "start";
    }

    textSize(60);
    fill(255);
    stroke("red");
    strokeWeight(25);
    text("HELP",520,70);

    strokeWeight(0);
    textSize(30);
    text("1. Use UP, DOWN, LEFT, RIGHT Arrow Keys To Move Your Rocket.",30,150);
  }
  if(gameState==="play"){
    bg1.visible=false;
    play.visible=false;
    bg.visible=true;
    player.visible=true;
    gameover.visible=false;
    help.visible=false;
    player.collide(edges);
    back.visible=false;

    textSize(50);
    fill(255);
    strokeWeight(5);
    stroke("red");
    text("Score : "+score,900,80);

    score=score+1;

    speed=speed+1
    bg.velocityY=5+speed/100;
    //camera.position.y=player.y;
    //camera.position.x=player.x;

    if(bg.y > 600){
      bg.y =300;
   }
   if(keyDown("left")){
     player.x = player.x-5;
   }
   if(keyDown("right")){
     player.x = player.x+5;
   }
   if(keyDown("up")){
    player.y = player.y-5;
  }
  if(keyDown("down")){
    player.y = player.y+5;
  }
   spawnMeteors();

   if(life===3){
    image(heartimg,50,50,50,50);
    image(heartimg,110,50,50,50);
    image(heartimg,170,50,50,50);
   }
   if(life===2){
    image(heartimg,50,50,50,50);
    image(heartimg,110,50,50,50);
  }
  if(life===1){
    image(heartimg,50,50,50,50);
  }
  if(life===0){
    gameState="end";
  }
   if(player.isTouching(meteorgrp)){
     blastsound.play();
     meteorgrp.destroyEach();
     life= life-1;
   }
  }
  if(gameState==="end"){
    player.addImage(blastimg);
    help.visible=false;
    player.changeImage(blastimg);
    player.scale=1.2;
    gameover.visible=true;
    back.visible=false;

    meteorgrp.destroyEach();
    bg.velocityY=0;

    textSize(50);
    fill(255);
    strokeWeight(5);
    stroke("red");
    text("Final Score : "+score,600,80);

  }


  
}
function spawnMeteors(){
  if(frameCount%100===0){
    var num=Math.round(random(1,2));
    if(num===1){
      meteor=createSprite(random(600,1200),0,30,30);
      meteor.addImage(meteorleftimg);
      meteor.velocityY=5+speed/100;
      meteor.velocityX=-3;
      meteor.setCollider("circle",-45,55,30);
    }
    if(num===2){
      meteor=createSprite(random(0,600),0,30,30);
      meteor.addImage(meteorrightimg);
      meteor.velocityY=5+speed/100;;
      meteor.velocityX=3;
      meteor.setCollider("circle",50,60,40);
    }
    meteorgrp.add(meteor);
  }
}