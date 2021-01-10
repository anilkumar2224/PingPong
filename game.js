
if(window.innerWidth<420 || window.innerHeight<420){
    size2();
}else{
    size1();  
}


function size1(){
var canavs=document.getElementById('canva');
var ctx=canavs.getContext('2d');
var userscore=0;
var aiscore=0;
var name=document.getElementById('name');
let ball=new Ball();
let paddel=new Paddel();
let aipaddel=new Aipaddel();

var elem=document.documentElement;
var start=document.getElementById('start');
var id;

var score=document.getElementById('score');
var num=document.getElementById('num');

var t=document.getElementById('t');
start.addEventListener('click',()=>{
start.classList.add('hide');
name.classList.add('hide');
canavs.style.display='block';
num.innerText='score:0';
    t.innerText='score:0';
    score.innerText='';
if(elem.requestFullscreen){ elem.requestFullscreen();}
game();
});
function game(){



const timer=1;
id=window.setInterval(function(){
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


if(ball.vx==-1 && aiscore==1 && ball.x==20){
    aipaddel.score++;
    t.innerText='score:'+aipaddel.score;
    aiscore=0;
  }else if(ball.vx==1 && userscore==1 && ball.x==580){
      paddel.score++;
      num.innerText='score:'+paddel.score;
      userscore=0;
  }
if(ball.vx==-1 && ball.x==58 && ball.y==paddel.y+50 && paddel.y+50==200){
    userscore=1;
    console.log("userscore:"+paddel.score);
    ball.vx=1;
    ball.vy=0;
    
}
else if( ball.vx==-1 && ball.x==58&& ball.x>200 && ball.y+20>paddel.y+50 && ball.y-20<paddel.y+100 ){
    userscore=1;
    console.log("userscore:"+paddel.score);
    ball.vx=1;
    ball.vy=-1;
}else if( ball.vx==-1 && ball.x==58 && ball.x>200&& ball.y+20>paddel.y && ball.y-20<paddel.y+50){
    userscore=1;
    console.log("userscore:"+paddel.score);
    ball.vx=1;
    ball.vy=1;
}else if( ball.vx==-1 && ball.x==58&& ball.x<200 && ball.y+20>paddel.y+50 && ball.y-20<paddel.y+100 ){
    userscore=1;
    console.log("userscore:"+paddel.score);
    ball.vx=1;
    ball.vy=1;
}else if( ball.vx==-1 && ball.x==58&& ball.x<200 && ball.y+20>paddel.y && ball.y-20<paddel.y+50){
    userscore=1;
    console.log("userscore:"+paddel.score);
    ball.vx=1;
    ball.vy=-1;
}

if(ball.vx==1 && ball.x==542 && ball.y==aipaddel.y+50 && aipaddel.y+50==200){
    aiscore=1;
    console.log("aiscore:"+aipaddel.score);
    ball.vx=-1;
    ball.vy=0;
    
}
 else if( ball.vx==1 && ball.vy==1 && ball.x==542 && ball.y+20>aipaddel.y && ball.y-20<aipaddel.y+100 ){
    aiscore=1;
    console.log("aiscore:"+aipaddel.score);
    ball.vx=-1;
    ball.vy=1;
}
 else if( ball.vx==1 && ball.vy==-1 && ball.x==542 && ball.y+20>aipaddel.y && ball.y-20<aipaddel.y+100){
    aiscore=1;
    console.log("aiscore:"+aipaddel.score);
    ball.vx=-1;
    ball.vy=-1;
}

},timer);



};
function Ball(){
    this.x=300;
    this.y=200;
    this.vx=1;
    this.vy=1;

    this.move=function(){
        
        if(paddel.score<5 && aipaddel.score==5){
            clearInterval(id);
            console.log("youlose");
            userscore=0;
            aiscore=0;
            card.classList.remove('hide');
            score.innerText='you lose';
            start.innerText='Restart';
            this.x=300;
            this.y=200;
            this.vx=1;
            this.vy=1;
            paddel.score=0;
            aipaddel.score=0;
            paddel.y=150;
             paddel.vy=0;
             aipaddel.y=150;
             aipaddel.vy=0;
        start.classList.remove('hide');
        }else if(paddel.score==5 && aipaddel.score==5){
            clearInterval(id);
            console.log("draw");
            score.innerText='draw';
            userscore=0;
            aiscore=0;
            card.classList.remove('hide');
            start.innerText='Restart';
            this.x=300;
            this.y=200;
            this.vx=1;
            this.vy=1;
            paddel.score=0;
            aipaddel.score=0;
            
            paddel.y=150;
            paddel.vy=0;
            aipaddel.y=150;
            aipaddel.vy=0;
             start.classList.remove('hide');
        }else if(paddel.score==5 && aipaddel.score<5){
            clearInterval(id);
            console.log("you win");
            score.innerText='you won';
            userscore=0;
            aiscore=0;
            card.classList.remove('hide');
            start.innerText='Restart';
            this.x=300;
            this.y=200;
            this.vx=1;
            this.vy=1;
            paddel.score=0;
            aipaddel.score=0;
            paddel.y=150;
             paddel.vy=0;
             aipaddel.y=150;
             aipaddel.vy=0;
             start.classList.remove('hide');
        }


        if(this.x>=580){
            this.vx=-1;

        }else if(this.x<=20){
            this.vx=1;
        } else if(this.y>=380){
            this.vy=-1;

        }else if(this.y<=20){
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
    this.score=0;
   this.dir=function(val){
    this.vy=val;
 
  
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

  
    }
}
//ai paddel
function Aipaddel(){
    this.x=562;
    this.y=150;
    this.vy=0;
  this.a=0;
  this.b=0;
  this.score=0;
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
document.addEventListener('keyup',e=>{
    
    
    paddel.dir(0);



});
document.addEventListener('keyup',e=>{
    paddel.dir(0);

});
}


///size2

function size2(){
    var canavs=document.getElementById('canv');
    var ctx=canavs.getContext('2d');
    var userscore=0;
    var aiscore=0;
    var name=document.getElementById('name');
    let balls=new Balls();
    let paddels=new Paddels();
    let aipaddels=new Aipaddels();
    var id;
    var elem=document.documentElement;
    var start=document.getElementById('start');
    var card=document.getElementById('card');
    var score=document.getElementById('score');
    var num=document.getElementById('num');
    var t=document.getElementById('t');
    var down=document.getElementById('down');
    var up=document.getElementById('up');
    start.addEventListener('click',()=>{
    start.classList.add('hide');
    canavs.style.display='block';
    down.style.display='block';
    num.innerText='score:0';
    t.innerText='score:0';
    score.innerText='';
    name.classList.add('hide');
    up.style.display='block';
    if(elem.requestFullscreen){ elem.requestFullscreen();}
    game();
    });
    function game(){
    
    
    
    const timer=1;
    id =window.setInterval(function(){
    ctx.clearRect(0,0,320,320);  
   
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(160,10);
    ctx.lineTo(160, 320);
    ctx.strokeStyle="white";
    ctx.stroke();
    paddels.move();
    paddels.draw();
    aipaddels.aidir();
    aipaddels.move();
    aipaddels.draw();
    balls.move();
    balls.draw();
    
    if(balls.vx==-1 && aiscore==1 && balls.x==15){
      aipaddels.score++;
      num.innerText='score:'+aipaddels.score;
      aiscore=0;
    }else if(balls.vx==1 && userscore==1 && balls.x==305){
        paddels.score++;
        t.innerText='score:'+paddels.score;
        userscore=0;
    }
    if(balls.vx==-1 && balls.x==40 && balls.y==paddels.y+40 ){
        userscore=1;
        console.log("userscore:"+paddels.score);
        balls.vx=1;
        balls.vy=0;
        
    }
    else if( balls.vx==-1 && balls.x==40 &&balls.y>160&& balls.y+15>paddels.y+40 && balls.y-15<paddels.y+80 ){
        userscore=1;
        console.log("userscore:"+paddels.score);
        balls.vx=1;
        balls.vy=-1;
    }else if( balls.vx==-1 && balls.x==40 &&balls.y>160&& balls.y+15>paddels.y && balls.y-15<paddels.y+40){
        userscore=1;
        console.log("userscore:"+paddels.score);
        balls.vx=1;
        balls.vy=1;
    } else if( balls.vx==-1 && balls.x==40 && balls.y<=160 && balls.y+15>paddels.y+40 && balls.y-15<paddels.y+80 ){
        userscore=1;
        console.log("userscore:"+paddels.score);
        balls.vx=1;
        balls.vy=-1;
    }else if( balls.vx==-1 && balls.x==40 &&balls.y<=160 && balls.y+15>paddels.y && balls.y-15<paddels.y+40){
        userscore=1;
        console.log("userscore:"+paddels.score);
        balls.vx=1;
        balls.vy=1;
    }
    
    if(balls.vx==1 && balls.x==280 && balls.y==aipaddels.y+40 ){
        aiscore=1;
        console.log("aiscore:"+aipaddels.score);
        balls.vx=-1;
        balls.vy=2;
        
    }
     else if( balls.vx==1 && balls.vy>=0  && balls.x==280 && balls.y+15>aipaddels.y && balls.y-15<aipaddels.y+80 ){
        aiscore=1;
        console.log("aiscore:"+aipaddels.score);
        balls.vx=-1;
        balls.vy=1;
    }
     else if( balls.vx==1 && balls.vy>=-1 &&balls.vy<=0 && balls.x==280 && balls.y+15>aipaddels.y && balls.y-15<aipaddels.y+80){
        aiscore=1;
        console.log("aiscore:"+aipaddels.score);
        balls.vx=-1;
        balls.vy=-1;
    }
    
    },timer);
    
    
    
    };
    function Balls(){
        this.x=160;
        this.y=160;
        this.vx=-1;
        this.vy=0;
    
        this.move=function(){

            if(paddels.score<5 && aipaddels.score==5){
                clearInterval(id);
                console.log("youlose");
                userscore=0;
                aiscore=0;
                card.classList.remove('hide');
                score.innerText='you lose';
                start.innerText='Restart';
                this.x=160;
                this.y=160;
                this.vx=-1;
                this.vy=0;
                paddels.score=0;
                aipaddels.score=0;
                aipaddels.y=120;
                aipaddels.vy=0;
           paddels.y=120;
            paddels.vy=0;
            start.classList.remove('hide');
            }else if(paddels.score==5 && aipaddels.score==5){
                clearInterval(id);
                console.log("draw");
                score.innerText='draw';
                userscore=0;
                aiscore=0;
                card.classList.remove('hide');
                start.innerText='Restart';
                this.x=160;
                this.y=160;
                paddels.score=0;
                aipaddels.score=0;
                this.vx=-1;
                this.vy=0;
                aipaddels.y=120;
                aipaddels.vy=0;
                paddels.y=120;
                 paddels.vy=0;
                 start.classList.remove('hide');
            }else if(paddels.score==5 && aipaddels.score<5){
                clearInterval(id);
                console.log("you win");
                score.innerText='you won';
                userscore=0;
                aiscore=0;
                card.classList.remove('hide');
                start.innerText='Restart';
                this.x=160;
                this.y=160;
                paddels.score=0;
                aipaddels.score=0;
                this.vx=-1;
                this.vy=0;
                paddels.y=120;
                 paddels.vy=0;
                 aipaddels.y=120;
                 aipaddels.vy=0;
                 start.classList.remove('hide');
            }




    
            if(this.x>=305){
                this.vx=-1;
    
            }
            else if(this.x<=15){
                this.vx=1;
            
            } else if(this.y>=305){
                this.vy=-1;
    
            }else if(this.y<=15){
                this.vy=1;
            }
    
            this.x=this.x+this.vx;
            this.y=this.y+this.vy;
        }
        this.draw=function(){
            ctx.beginPath();
          ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
          ctx.fillStyle="white";
          ctx.fill();
        }
    }
    function Paddels(){
        this.x=5;
        this.y=120;
     
        this.vy=0;
        this.score=0;
       this.dir=function(val){
        this.vy=val;
      
       }
        this.move=function(){
    
            if(this.y==240 && this.vy==1){
                this.vy=0;
    
            }else if(this.y==0 && this.vy==-1){
                this.vy=0;
            }else if(this.y==240 && this.vy==-1){
                this.vy=-1;
    
            }else if(this.y==0 && this.vy==1){
                this.vy=1;
            }
    
            this.y=this.y+this.vy;
            
           
            
            
        }
        this.draw=function(){
       
        
          ctx.fillStyle="green";
          ctx.fillRect(this.x, this.y, 20, 80);
       
      
        }
    }
    //ai paddels
    function Aipaddels(){
        this.x=295;
        this.y=120;
        this.vy=0;
      this.a=0;
      this.b=0;
      this.score=0;
       this.aidir=function(){
      
    
        if(balls.vx==1 && balls.vy==1 &&balls.x<180 && balls.x>100 && balls.y<100){
            this.vy=0; 
            this.a=1;
        }else if(balls.vx==1 && balls.vy==-1 &&balls.x<180 && balls.x>100 && balls.y>160){
            this.vy=0; 
            this.b=1;
        }
        
         if(balls.vx==1 && balls.vy==-1 &&balls.x>180 && balls.y<160){
            this.vy=-1;
        }else if(balls.vx==-1 && this.y==0 ){
            this.vy=1;
        }else if(balls.vx==-1 && this.y==120){
            this.vy=0;
        }else if(balls.vx==1 && balls.vy==1 &&balls.x>180 && balls.y>160){
            this.vy=1;
        }else if(balls.vx==-1 && this.y==240 ){
            this.vy=-1;
        }
        else if(balls.vx==-1 && this.a==1){
            this.vy=-1;
            this.a=0;
        }else if(balls.vx==-1 && this.b==1){
            this.vy=1;
            this.b=0;
        }
        else if(balls.vx==1 && balls.vy==0 &&balls.x>160 && balls.y<100){
            this.vy=-1;
        }else if(balls.vx==1 && balls.vy==0 &&balls.x>180 && balls.y>210 ){
            this.vy=1;
        }
      
        
      
       }
        this.move=function(){
    
            if(this.y==240 && this.vy==1){
                this.vy=0;
    
            }else if(this.y==0 && this.vy==-1){
                this.vy=0;
            }else if(this.y==240 && this.vy==-1){
                this.vy=-1;
    
            }else if(this.y==0 && this.vy==1){
                this.vy=1;
            }
          
    
            this.y=this.y+this.vy;
           
           
            
            
        }
        this.draw=function(){
       
        
          ctx.fillStyle="blue";
          ctx.fillRect(this.x, this.y, 20, 80);
       
      
        }
    }
    
    document.addEventListener('keydown',e=>{
    
    
        if(e.keyCode==38){
            paddels.dir(-1);
    
        }
        else if(e.keyCode==40){
            paddels.dir(1);
        }
    
    
    });
    down.addEventListener('click',e=>{
        paddels.dir(1);
    });
    up.addEventListener('click',e=>{
        paddels.dir(-1);
    });
    document.addEventListener('keyup',e=>{
            paddels.dir(0);

    });
  
    }
    
