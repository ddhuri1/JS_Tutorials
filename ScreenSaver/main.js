// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) 
{
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


// define Ball constructor
/* x and Y denote the start positions on screen*/
class Ball 
{
  
  constructor(x, y, velX, velY, color, size) 
  {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
 }
  
  // define ball draw method 
  /* Prototype property of a function allows to share the property across all objects rather than each object having to redefine it again and again.
   * The beginPath() method begins a path, or resets the current path, to state that we want to draw a shape on the paper.
   * Use fillStyle to define what color we want the shape to be.
   * Use the arc() method to trace an arc shape on the paper.
   * Use fill() to finish drawing the path we started with beginPath().
   */
 
  draw() 
  {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    /* DRAW HEART: ctx.bezierCurveTo(100, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40); */
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // define ball update method
  update() 
  {
    if ((this.x + this.size) >= width) 
       this.velX = -(this.velX);
    if ((this.x - this.size) <= 0) 
       this.velX = -(this.velX);
    if ((this.y + this.size) >= height) 
       this.velY = -(this.velY);
    if ((this.y - this.size) <= 0) 
       this.velY = -(this.velY);
    this.x += this.velX;
    this.y += this.velY;
 }


  // define ball collision detection
  collisionDetect() 
  {
    for (let j = 0; j < balls.length; j++) 
    {
      if (!(this === balls[j])) 
      {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[j].size) 
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
}

// define array to store balls and populate it
let balls = [];

while (balls.length < 100) 
{
  const size = random(5,20);
  let ball = new Ball(
     random(0 + size,width - size),
     random(0 + size,height - size),
     random(-7,7),
     random(-7,7),
     'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
     size
  );

 balls.push(ball);
}

// define loop that keeps drawing the scene constantly
/* The window.requestAnimationFrame() method tells the browser that you wish to perform an animation 
 * and requests that the browser calls a specified function to update an animation before the next repaint. 
 * The method takes a callback as an argument to be invoked before the repaint.
 */
function loop() 
{
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) 
  {
    balls[i].draw();
    balls[i].update();
    //balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();