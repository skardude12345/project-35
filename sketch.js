//Create variables here
var dog, happyDog, database, foodS, foodStock, foodObj, feedPet, addFood;
var dogImage, happyDogImg;
var fedTime, lastFed, hour;


function preload(){
  //load images here
  dogImage = loadImage("./images/dogImg.png");
  happyDogImg = loadImage("./images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
  dog = createSprite(200, 200);
  dog.addImage(dogImage);
  dog.scale = 0.5;
  
  foodObj = new Food();
  
  hour = hour();
}


function draw() {  
  background(46, 139, 87)
    
  

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val()
  })
 

  feedPet = createButton("feed the dog");
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods)

  foodObj.display();
  drawSprites();

  fill(255);
  stroke(255);
  textSize(20);
  
  if(lastFed > 12){
    text("Last Fed: " + lastFed % 12 + " pm", 350, 30);
  } else if(lastFed === 0){
    text("Last Fed: 12 am", 350, 30);
  } else if(lastFed === 12){
      text("Last Fed: 12 pm", 350, 30);
  } else {
    text("Last Fed: " + lastFed + " am", 350, 30);
  }

  
}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  dog.addImage(happyDogImg);
  
  
  database.ref("/").update({
    FeedTime: hour(),
    food: writeStock(foodS)
  })

}



function writeStock(x){
  if (x <= 0){
    x = 0;
  } else {
    x-- 
  }

  database.ref("/").update({
    food: x
  })

  

}

function addFoods(){
  foodS++;
  database.ref("/").update({
    food: foodS
  })
}



