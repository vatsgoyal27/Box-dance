var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var Boxes = [];
 
var ground;
var gSlider;
 
 
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    gSlider = createSlider(0, 100, 50);
    gSlider.position(150, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
 
    var ground_op = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height - 50, 400, 10, ground_op);
    World.add(world, ground);
}
 
function mousePressed() {
    if (mouseY < 350) {
        Boxes.push(new Box(mouseX, mouseY, random(10, 60), random(10, 60)));
    }
}
 
function draw() {
    background("red");
    var grav = gSlider.value();
 
    for (var i = 0; i < Boxes.length; i++) {
        Boxes[i].show();
    }
    noStroke();
    fill(170);
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, 400, 10);
}
 
function Box(x, y, w, h, b_op) {
    var ground_op = {
        friction: 0.1,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x, y, w, h, b_op);
    this.w = w-1;
    this.h = h-1;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        pop();
    }
}