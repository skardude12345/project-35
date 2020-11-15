class Food{

    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
        this.lastFed;

    }


    getFoodStock(){
        database.ref("food").on("value", function(data){
            this.foodStock = data.val();
        })

        
        
    }



    updateFoodStock(s){
        database.ref("/").update({
            food: s
        })
    }


    deductFoodStock(){
    }

    display(){
      image(this.image, 720, 220, 70, 70);

       var x=70,y=100; 
       imageMode(CENTER);
       if(this.foodStock!=0){
       for(var i=0;i<this.foodStock;i++){
         if(i%10==0){
           x=70;
           y=y+50;
         }
         image(this.image,x,y,50,50);
         x=x+30;
       }
     }
   }
}  
    

    
    



     
