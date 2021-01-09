var canavs=document.getElementById('canva');
var ctx=canavs.getContext('2d');
var userscore=0;
var aiscore=0;

let ball=new Ball();
let paddel=new Paddel();
let aipaddel=new Aipaddel();


(function(){



const timer=1;
window.setInterval(function(){
ctx.clearRect(0,0,600,400);  
ctx.setLineDash([20, 20]);
ctx.beginPath();
ctx.moveTo(300,10);
ctx.lineTo(300, 400);
ctx.strokeStyle="white";
ctx.stroke();
paddel.move();
paddel.draw();
aipaddel.aidir();
aipaddel.move();
aipaddel.draw();
ball.move();
ball.draw();

if(ball.vx==-1 && ball.x==58 && ball.y==paddel.y+50 && paddel.y+50==200){
    userscore++;
    console.log("userscore:"+userscore);
    ball.vx=1;
    ball.vy=0;
    
}
else if( ball.vx==-1 && ball.x==58 && ball.y+20>paddel.y+50 && ball.y-20<paddel.y+100 ){
    userscore++;
    console.log("userscore:"+userscore);
    ball.vx=1;
    ball.vy=1;
}else if( ball.vx==-1 && ball.x==58 && ball.y+20>paddel.y && ball.y-20<paddel.y+50){
    userscore++;
    console.log("userscore:"+userscore);
    ball.vx=1;
    ball.vy=-1;
}

if(ball.vx==1 && ball.x==542 && ball.y==aipaddel.y+50 && aipaddel.y+50==200){
    aiscore++;
    console.log("aiscore:"+aiscore);
    ball.vx=-1;
    ball.vy=0;
    
}
 else if( ball.vx==1 && ball.vy==1 && ball.x==542 && ball.y+20>aipaddel.y && ball.y-20<aipaddel.y+100 ){
    aiscore++;
    console.log("aiscore:"+aiscore);
    ball.vx=-1;
    ball.vy=1;
}
 else if( ball.vx==1 && ball.vy==-1 && ball.x==542 && ball.y+20>aipaddel.y && ball.y-20<aipaddel.y+100){
    aiscore++;
    console.log("aiscore:"+aiscore);
    ball.vx=-1;
    ball.vy=-1;
}

},timer);



}());
function Ball(){
    this.x=300;
    this.y=200;
    this.vx=1;
    this.vy=0;

    this.move=function(){

        if(this.x==580){
            this.vx=-1;

        }else if(this.x==20){
            this.vx=1;
        } else if(this.y==380){
            this.vy=-1;

        }else if(this.y==20){
            this.vy=1;
        }

        this.x=this.x+this.vx;
        this.y=this.y+this.vy;
    }
    this.draw=function(){
        ctx.beginPath();
      ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle="white";
      ctx.fill();
    }
}
function Paddel(){
    this.x=8;
    this.y=150;
    this.vy=0;
    this.chek=0;
   this.dir=function(val){
    this.vy=val;
    this.check=val;
  
   }
    this.move=function(){

        if(this.y==300 && this.vy==1){
            this.vy=0;

        }else if(this.y==0 && this.vy==-1){
            this.vy=0;
        }else if(this.y==300 && this.vy==-1){
            this.vy=-1;

        }else if(this.y==0 && this.vy==1){
            this.vy=1;
        }

        this.y=this.y+this.vy;
        
       
        
        
    }
    this.draw=function(){
   
    
      ctx.fillStyle="green";
      ctx.fillRect(this.x, this.y, 30, 100);
      ctx.fillStyle="red";
      ctx.fillRect(this.x+29, this.y+50, 1, 1);
  
    }
}
//ai paddel
function Aipaddel(){
    this.x=562;
    this.y=150;
    this.vy=0;
  this.a=0;
  this.b=0;
   this.aidir=function(){
  

    if(ball.vx==1 && ball.vy==1 &&ball.x<450 && ball.x>200 && ball.y<100){
        this.vy=0; 
        this.a=1;
    }else if(ball.vx==1 && ball.vy==-1 &&ball.x<450 && ball.x>200 && ball.y>250){
        this.vy=0; 
        this.b=1;
    }
    
     if(ball.vx==1 && ball.vy==-1 &&ball.x>400 && ball.y<200){
        this.vy=-1;
    }else if(ball.vx==-1 && this.y==0 ){
        this.vy=1;
    }else if(ball.vx==-1 && this.y==150){
        this.vy=0;
    }else if(ball.vx==1 && ball.vy==1 &&ball.x>400 && ball.y>200){
        this.vy=1;
    }else if(ball.vx==-1 && this.y==300 ){
        this.vy=-1;
    }else if(ball.vx==-1 && this.a==1){
        this.vy=-1;
        this.a=0;
    }else if(ball.vx==-1 && this.b==1){
        this.vy=1;
        this.b=0;
    }
    
  
    
  
   }
    this.move=function(){

        if(this.y==300 && this.vy==1){
            this.vy=0;

        }else if(this.y==0 && this.vy==-1){
            this.vy=0;
        }else if(this.y==300 && this.vy==-1){
            this.vy=-1;

        }else if(this.y==0 && this.vy==1){
            this.vy=1;
        }
      

        this.y=this.y+this.vy;
       
       
        
        
    }
    this.draw=function(){
   
    
      ctx.fillStyle="blue";
      ctx.fillRect(this.x, this.y, 30, 100);
   
  
    }
}

document.addEventListener('keydown',e=>{


    if(e.keyCode==38){
        paddel.dir(-1);

    }
    else if(e.keyCode==40){
        paddel.dir(1);
    }


});
