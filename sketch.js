var score =0;
var gun,bluebubble,redbubble, bullet, backBoard,blast;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var heading,scoreboard

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading=createElement("h1");
  scoreboard=createElement("h1");

}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  heading.html("life: "+life);
  heading.style("color:red");
  heading.position(160,30);

  scoreboard.html("score: "+score);
  scoreboard.style("color:red");
  scoreboard.position(650,30);


  if(gameState===1){
    gun.y=mouseY  

    if(keyDown("space")){
      shootBullets();
    }

    if(frameCount%80===0){
      drawBlueBubble();
    }

    if(frameCount%100===0){
      drawRedBubble();
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(backBoard)){
      handleGameover(redBubbleGroup);
    }

    
    drawSprites();
  }
     
}

function shootBullets(){
  bullet=createSprite(150,400,50,20);
  bullet.y=gun.y-20;
  bullet.addImage(bulletImg);
  bullet.scale=0.1
  bullet.lifetime=200;
  bullet.velocityX=7;
  bulletGroup.add(bullet);

}

function drawBlueBubble(){
  bluebubble=createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale=0.1;
  bluebubble.velocityX=-7
  bluebubble.lifetime=300;
  blueBubbleGroup.add(bluebubble);

}


function drawRedBubble(){
  redbubble=createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale=0.1;
  redbubble.velocityX=-7
  redbubble.lifetime=300;
  redBubbleGroup.add(redbubble);

}

function handleBubbleCollision(bubbleGroup){
  if(life>0){
    score=score+1;
  }
  blast=createSprite(bullet.x+50,bullet.y,40,40);
  blast.addImage(blastImg);
  blast.scale=0.3;
  blast.lifetime=15;
  bubbleGroup.destroyEach();
  bulletGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  life=life-1;
  bubbleGroup.destroyEach();
  if(life===0){
    gameState=2;
    swal({
      title:`GameOver`,
      text:"Opps! You lost the game",
      imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      connfirmButtonText:"Thanks for playing"
    })
  }
}