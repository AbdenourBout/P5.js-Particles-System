let particleInstances = [];
let nearbyParticles =[];
let index;
function preload(){
    for(let i =0; i<100;i++){
        
        particleInstances.push(new Particle());
        
    }
   
}



function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  

  function draw() {
    background(220);
    for (const instance of particleInstances) {
        
        instance.move();
        if(abs(instance.x-mouseX)<100 && abs(instance.y-mouseY)<100 ){
            stroke(60);
            //line(instance.x, instance.y, mouseX, mouseY);
            if(!nearbyParticles.includes(instance)){
                nearbyParticles.push(instance);
            }
        }else {
            if(nearbyParticles.includes(instance)){
            index = nearbyParticles.indexOf(instance);
            nearbyParticles.splice(index, 1);
            }
        }
        for (const elm of nearbyParticles) {
            for (const elm2 of nearbyParticles) {
                line(elm.x, elm.y, elm2.x, elm2.y);  
            }
        }
        instance.show();

    }
    
  }


  class Particle{
      constructor(){
          this.x= random(10,windowWidth);
          this.y= random(10,windowHeight);
          this.r=10;
          this.xSpeed=random(-2,2);
          this.ySpeed=random(-2,2);
      }

      show(){
        noStroke();
          ellipse(this.x,this.y,this.r);
      }
      move(){
          if(this.x>windowWidth||this.x<0)
          this.xSpeed=-this.xSpeed;

          if(this.y>windowWidth||this.y<0)
          this.ySpeed=-this.ySpeed;

          this.x+=this.xSpeed;
          this.y+=this.ySpeed;
      }

  }