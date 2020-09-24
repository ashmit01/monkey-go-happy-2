var bg,backImage;
var bananaImage,foodGroup;
var player,playerImage;
var obstacleGroup,obstacleImage;
var ground;
var score;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload() {
  backImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  playerImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage=loadImage("stone.png")
}

function setup() {
  createCanvas(400, 400);
  
  bg=createSprite(400,200,400,400);
  bg.addImage(backImage);
  bg.velocityX=-6;
  
  score=0;
  
 ground=createSprite(100,370,400,10);
  ground.visible=false;

  
  player=createSprite(100,300,10,10);
  player.addAnimation("running",playerImage);
  player.scale=0.08;
  
  foodGroup= new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  food();
  Obstacles();
  
  if(gameState===PLAY){
  
  if(bg.x<0){
    bg.x=bg.width/2;
  }  
  
  if(keyDown("space")&&player.collide(ground)){
     player.velocityY=-12
     }   
  
  if(player.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+2
  } 
  
  if(player.isTouching(obstacleGroup)) {
    player.scale= 0.08;
    gameState=END;
  }  
    if(score>0&&score%10===0){
     switch(score){
    case 10: player.scale=0.12;
          break;
    case 20: player.scale=0.14;
          break;
    case 30: player.scale=0.16;
          break;
    case 40: player.scale=0.18; 
         default: break;
     }
  }   
}  
  
  if(gameState===END){
    bg.velocityX=0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0); 
    player.velocityY=0;
  }  
  
  
  
  
  //add gravity to the player
  player.velocityY=player.velocityY+0.8;
  
  player.collide(ground);
  
  
     
 drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  
 createEdgeSprites(); 
}

function food() {
  if(frameCount%80===0){
    var banana = createSprite(400,400,0,0);
    banana.y = Math.round(random(250,340));
    banana.addImage(bananaImage);
    banana.scale=0.02;
    foodGroup.add(banana);
    banana.velocityX=-6;
  }
}

function Obstacles() {
  if(World.frameCount % 100 === 0) {
    var stone = createSprite(430,350,10,40);
    //generate random obstacles
    stone.addImage(obstacleImage);
    stone.velocityX = -6;
    
    //assign scale to the obstacle           
    stone.scale = 0.15;
    
    //add each obstacle to the group
    obstacleGroup.add(stone);
    
    
  }
}


