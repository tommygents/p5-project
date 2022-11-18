let ball, floor, player, peg, targets;
const center = {
    x:200,
    y:300
}




//a list of the shapes that the Sprite() function can update to
const shapes = {
    2: 'circle',
    3: 'triangle',
    4: 'square',
    5: 'pentagon',
    6: 'hexagon',
    7: 'septagon',
    8: 'octagon',
    //9: 'enneagon',
    //10: 'decagon',
    //11: 'hendegagon',
    //12: 'dodecagon'
}

// initializes the shape of ball to circle  
let mouseValue = 2;

let ballLaunched = false;


function setup() {
  createCanvas(1000, 600);

  //create sprite that will be what is launched
    
    ball = new Sprite(center.x, center.y, 200/mouseValue, shapes[mouseValue]);
	ball.diameter = 50;
    peg = new Sprite(center.x, center.y);
    peg.diameter = 5;
    peg.layer=0;
    ball.overlaps(peg);
    peg.collider = 'none';
    floor = new Sprite(500, 550, 1000, 10);
    floor.collider = 'static';
    initializeTargets();

}

function draw() {
  clear();
    if (mouseIsPressed){
        elasticPull();
    }
    //ball.x = 100;
}

//this function "loads" 
//the ball back into a sling
function elasticPull() {
    ball.moveTowards(mouse, .10);
}

//this function is called when the mouse
//is released
function launchBall(){
world.gravity.y = 1;
ball.velocity.y = (ball.y - center.y)/10;
ball.velocity.x = (ball.x - center.x)/10;
}
//I want the launch zone to be 200x200, centered on 100, 400.
//Need to make it so this doesn't just shut off the movetowards function 
function stayInLaunchZone(b){

}

//sets the mouseValue within the parameters of the shapes Object
function MouseWheel(event){
mouseValue += event.delta;
while (mouseValue < 2)
{
    mouseValue += Object.keys(shapes).length;
}
while (mouseValue > Object.keys(shapes).length + 1)
{
    mouseValue -= Object.keys(shapes).length;
}
shapeChange(mouseValue);
return false;
}

//updates the shape to be the next shape in the array
function shapeChange(num){
    let oldball = ball;
    ball = new Sprite(ball.x, ball.y, 200/num, shapes[num]);
    oldball.remove();
   }


//uses up and down arrow keys to cycle through shapes, based on the size of shapes
function keyPressed() {
    if (keyCode === UP_ARROW) {
      mouseValue++;
    } else if (keyCode === DOWN_ARROW) {
      mouseValue--;
    }
    while (mouseValue < 2)
{
    mouseValue += Object.keys(shapes).length;
}
while (mouseValue > Object.keys(shapes).length + 1)
{
    mouseValue -= Object.keys(shapes).length;
}
console.log(mouseValue, shapes[mouseValue]);
shapeChange(mouseValue);
  }

  //launches ball based on how far back it has been pulled
  function mouseReleased(event){
    console.log("Mouse Released")
    if (ballLaunched == false){
    world.gravity.y = 10;
    ball.velocity.y = (ball.y - center.y)/-10;
    ball.velocity.x = (ball.x - center.x)/-10;
    ballLaunched = true;    
     }

}


function initializeTargets(){

targets = new Group();


for(let i = 0;i <3; i++)
{
new targets.Sprite(750+(i*50),500,50,50);

}
for(let i = 0;i <2; i++)
{
new targets.Sprite(775+(i*50),450,50,50);
}
new targets.Sprite(800,400,50,50);
targets.color = 'red';
}