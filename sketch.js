var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var foodGroup, obstacleGroup, survivalTimeScore;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 350, 900, 10);
 
  console.log(ground.x);
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,10,monkey.height);
 // monkey.debug=true;
  survivalRate = 0;
}


function draw() {
background("#32c9c9");
  survivalTimeScore();
  if(gameState===PLAY){
    // monkey jumps if space is pressed
  if(keyDown("space")) {
        monkey.velocityY = -12;
  }
    // added gravity
  // made ground move with score
  ground.velocityX = -4;
  
  monkey.velocityY = monkey.velocityY+1.2;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
   // obstacle.collide(ground);
    spawnObstacles();
  spawnBananas();
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
     obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);  
  
   
  }
  monkey.collide(ground);
  drawSprites();
}



function survivalTimeScore(){
  stroke("black");
  textSize(20);
  fill("black");
  if(monkey.isTouching(foodGroup)){
    survivalTime = survivalTime+1; 
    foodGroup.destroyEach();
  }
  text("Survival time:"+ survivalTime, 100, 50);
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
   obstacle = createSprite(500, 330, 10, 40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -6;
    obstacle.lifetime = 300;
  
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if (frameCount % 100 === 0) {
    banana = createSprite(360, 315, 20, 20);
    banana.y = Math.round(random(120,300));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //add each cloud to the group
    foodGroup.add(banana);
  }
}
