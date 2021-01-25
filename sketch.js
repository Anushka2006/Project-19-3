var back, back_img, boy,boyImg, obstacleImg, gameOver, gameOverImg, restart, coinImg, restartImg;
var distance=0;
var obstaclesGroup, coinsGroup, coins2Group;
var score=0;
var gameState= "play";

function preload(){
  back_img=loadImage("subway.jpg");
  boyImg = loadImage("boy2.png");
  obstacleImg = loadImage("Tains.jpg");
  coinImg = loadImage("coin.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("game.jpg");
  

}

function setup() {
 createCanvas(600,600);
  back = createSprite(300,300,600,600);
  back.shapeColor="pink";
  back.addImage(back_img);
  back.scale = 2.2;
  back.offsetTop = -10;
  boy= createSprite(300,500,10,10);
  boy.addImage(boyImg);
  boy.scale=0.45;
  obstaclesGroup= new Group();
  coinsGroup= new Group();
  coins2Group= new Group();
  boy.debug=false;
  boy.setCollider("circle",30,30,130);
  restart= createSprite(280,400,10,10);
  restart.addImage(restartImg);
  gameOver= createSprite(280,210,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
}

function draw() {
  background("green");
  if(gameState==="play"){
  back.velocityY= Math.round(2.5+distance/100);
  
  if(back.y>330){
    back.y= 270;
  }
    restart.visible=false;
    gameOver.visible=false;
  boy.x= World.mouseX;
  distance= distance+ Math.round(getFrameRate()/60);
    createObstacles();
  createCoins();
  if(boy.isTouching(coinsGroup)||boy.isTouching(coins2Group)){
    score= score+5;
    coinsGroup.destroyEach();
    coins2Group.destroyEach();
  }
  
  if(boy.isTouching(obstaclesGroup)){
     gameState="end";
     }
  }
  if(gameState==="end"){
    obstaclesGroup.setLifetimeEach(-2);
    obstaclesGroup.setVelocityYEach(0);
    
    coinsGroup.setLifetimeEach(-2);
    coinsGroup.setVelocityYEach(0);
    coins2Group.setLifetimeEach(-2);
    coins2Group.setVelocityYEach(0);
    back.velocityY=0;
    restart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
    textSize(45);
    textFont("gregorian");
    fill("yellow");
    text("Game Over",185,300);
  }
  
  
  drawSprites();
  fill("black");
  textSize(20);
  textFont("gregorian");
  text("Distance:"+distance,230,70);
  text("Coins:"+score,350,70);
  
 
}

function createObstacles(){
  
if(frameCount%90===0){
  var rand = Math.round(random(30,500));
  var obstacle = createSprite(rand,10,20,20);
  obstacle.addImage(obstacleImg);
  obstacle.scale=0.27;
  obstacle.velocityY= Math.round(4+distance/100);
  obstacle.lifetime= 125;
  obstacle.depth= boy.depth;
  boy.depth=boy.depth+1;
  obstaclesGroup.add(obstacle);
}
}

function createCoins(){
  
if(frameCount%60===0){
  var rand2 = Math.round(random(30,500));
  var coin1 = createSprite(rand2,10,20,20);
  coin1.addImage(coinImg);
  coin1.scale=0.15;
  coin1.velocityY= Math.round(4+distance/100);
  coin1.lifetime= 125;

  
  
  var coin2 = createSprite(rand2,10,20,20);
  coin2.addImage(coinImg);
  coin2.scale=0.15;
  coin2.velocityY= Math.round(4+distance/100);
  coin2.lifetime= 125;
  coin1.depth= boy.depth;
  boy.depth=boy.depth+1;
  coin2.depth= boy.depth;
  boy.depth=boy.depth+1;
  coinsGroup.add(coin1);
  coins2Group.add(coin2);
}
}

function reset(){
  gameState = "play";
 
  restart.visible= false;
  gameOver.visible=false;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  coins2Group.destroyEach();
  distance=0;
  score=0;
}

