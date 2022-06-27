var trex, trex_running, edges;
var groundImage;
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload() {
  trex_running = loadAnimation("trex_1.png", "trex_2.png", "trex_3.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground.png")
  cloudImage = loadImage("cloud.png")
  obstacle1image = loadImage("obstacle1.png")
  obstacle2image = loadImage("obstacle2.png")
  obstacle3image = loadImage("obstacle3.png")
  obstacle4image = loadImage("obstacle4.png")
  obstacle5image = loadImage("obstacle5.png")
  obstacle6image = loadImage("obstacle6.png")
  restartimg = loadImage("restart.png")
  gameoverimg = loadImage("gameOver.png")
  sunImage = loadImage("sun.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // creating trex
  trex = createSprite(width-50, height-182, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  edges = createEdgeSprites();
  
  restart = createSprite(300,100)
  restart.addImage(restartimg)
  restart.scale = 0.4
  restart.visible = false

  gameover = createSprite(300,70)
  gameover.addImage(gameoverimg)
  gameover.scale = 0.4
  gameover.visible = false

  //adding scale and position to trex
  trex.scale = 0.06;
  trex.x = 50
  //creating ground sprite
  ground = createSprite(width/2,height-141, 800, 5)
  ground.addImage("ground", groundImage)
  ground.scale = 0.6


  invisibleground = createSprite(200, height-182, 800, 5)
  invisibleground.visible = false

  obstaclesgroup = new Group()
  cloudsgroup = new Group()

  score = score+frameCount/60
  text("Score = ", score, 550, 30)
  sun = createSprite(width-30,height-300,15,15)
  sun.addImage("sun", sunImage)
  sun.scale = 0.06
}

function draw() {
  //set background color 
  background("white");

  //logging the y position of the trex
  

text("Score = ", score,550,50)


  //stop trex from falling down
  trex.collide(invisibleground)

  if(gamestate == PLAY){
    spawnclouds()
    spawnobstacles()
    ground.velocityX = -5
    console.log(trex.y)
      //jump when space key is pressed
  if (keyDown("space") && trex.y >= height-186) {
    trex.velocityY = -8.2;
  }
  //add the gravity
  trex.velocityY = trex.velocityY + 0.4;

  if (ground.x < 0) {
    ground.x = 300
  }

  if(trex.isTouching(obstaclesgroup)){
    gamestate = END
  }
  }
  else if(gamestate == END){
    ground.velocityX = 0
    cloudsgroup.setVelocityXEach(0)
    obstaclesgroup.setVelocityXEach(0)
    trex.changeAnimation("collided", trex_collided)
    restart.visible = true
    gameover.visible = true
    trex.velocityY = 0

    if(mousePressedOver(restart)){
      reset()
    }

  }
  drawSprites();
}

function spawnclouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(600, 100, 20, 10)
    clouds.velocityX = -5
    clouds.addImage("clouds", cloudImage)
    trex.depth = clouds.depth
    clouds.scale = 0.6
    clouds.y = Math.round(random(30,100))
    cloudsgroup.add(clouds)
    clouds.lifetime = 130
  }
}  

function spawnobstacles(){
  if (frameCount % 40 === 0 ){
    obstacles = createSprite(width-200,height-205,20,10)
    obstacles.velocityX = -5
    obstacles.scale = 0.5
    var rand = Math.round(random(1,6))
    console.log(rand)
    switch(rand){
      case 1:obstacles.addImage("obstacles",obstacle1image) 
      break;
      case 2:obstacles.addImage("obstacles",obstacle2image)
      break;
      case 3:obstacles.addImage("obstacles",obstacle3image)
      break;
      case 4:obstacles.addImage("obstacles",obstacle4image)
      break;
      case 5:obstacles.addImage("obstacles",obstacle5image)
      break;
      case 6:obstacles.addImage("obstacles",obstacle6image)
      break;
      
    }
    obstaclesgroup.add(obstacles)
  }
  obstaclesgroup.setColliderEach("circle",0,0,35)
}
function reset(){
gamestate = PLAY
console.log(gamestate)
gameover.visible = false
restart.visible = false
obstaclesgroup.destroyEach()
cloudsgroup.destroyEach()
trex.changeAnimation("running", trex_running)
}