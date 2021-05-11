const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var divisionHeight = 300;
var particles=[];
var plinkos=[];
var division = [];
var particle;

var score = 0;
var count = 0;
var gameState = "start";


function setup(){
    var canvas = createCanvas(800,800);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(400,780,800,20);

    for(var k=0; k<=width; k=k+80){
        division.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
    }

    for(var j=75; j<=width; j=j+50){
        plinkos.push(new Plinko(j, 75));
    }

    for(var p=50; p<=width-10; p=p+50){
        plinkos.push(new Plinko(p, 175));
    }

    for(var o=75; o<=width; o=o+50){
        plinkos.push(new Plinko(o, 275));
    }

    for(var t=50; t<=width-10; t=t+50){
        plinkos.push(new Plinko(t, 175));
    }

}

function draw(){
    background("black");
    textSize(35);
    text("Score : " + score, 20, 40);
    fill("white");

    textSize(35);
    text("500", 740, 550);
    text("500", 660, 550);
    text("200", 580, 550);
    text("200", 500, 550);
    text("200", 420, 550);
    text("100", 340, 550);
    text("100", 260, 550);
    text("100", 180, 550);
    text("1000", 90, 550);
    text("1000", 10, 550);

    Engine.update(engine);
    ground.display();

    if(gameState == "end"){
        textSize(100);
        text("GameOver", 150, 250);
    }


    for(var i= 0; i<plinkos.length; i++){
     plinkos[i].display();
    }

    if(particle!=null){
        particle.display();

        if(particle.body.position.y>760){

            if(particle.body.position.x<300){
                score = score+500;
                particle = null;
                if(count>=5)gameState ="end";
            }

            else if(particle.body.position.x<600 && particle.position.body.x>301){
                score = score+100;
                particle = null;
                if(count>=5)gameState ="end";
            }

            else if(particle.body.position.x<900 && particle.body.position.x>601){
                score = score+200;
                particle = null;
                if(count>=5)gameState ="end";
            }
        }
    }

    for (var m = 0; m<particles.length; m++){
        particles[m].display();
    }
   
    for (var n = 0; n<division.length; n++){
        division[n].display();
    }
 
}

function mousePressed(){
    if(gameState!=="end"){
        count++;
        particle = new Particle(mouseX, 10, 10, 10);
    }
}