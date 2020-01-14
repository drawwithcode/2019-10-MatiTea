let tree;
let cloud;
let treeGraphics;
let buttonName = 'Day';

let bgColor = {
  rB: 0,
  gB: 0,
  bB: 5
}

let pointLightColor = {
  rPL: 100,
  gPL: 100,
  bPL: 100
}

function preload() {
  tree = loadModel("assets/lowpolytree.obj", true);
  cloud = loadImage("assets/cloud.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  treeGraphics = createGraphics(500, 500);

  skyGraphics = createGraphics(600, 600);
}

function draw() {
  showLightButton();

  //orbitControl();

  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);

  let locX = mouseX - width / 2;
  pointLight(pointLightColor.rPL, pointLightColor.rPL, pointLightColor.rPL, locX, height, 2 * height);

  // rotate imported 3D models
  rotateZ(180);

  ambientMaterial(255, 255, 255);

  // draw 3D objects
  trees();

  changeTreeColor();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function trees() {
  texture(treeGraphics);

  noStroke();

  // sky
  push();
  translate(0, 0, -120);

  skyGraphicsSettings();
  texture(skyGraphics);

  plane(2600, 1500);
  pop();

  // ground
  push();
  rotateX(100);
  translate(0, 0, 100);
  plane(2600, 1500);
  pop();

  // third tree
  model(tree);

  push();
  // second tree
  translate(140, 0, 0);
  model(tree);

  // first tree from left
  translate(150, 0, 40);
  model(tree);
  pop();

  push();
  // forth tree
  translate(- 150, 0, 40);
  model(tree);
  pop();

  // fifth tree
  translate(- 300, 0, 100);
  model(tree);
}

function showLightButton() {
  let lightButton = createButton(buttonName);
  lightButton.position(width - 110, 8);
  lightButton.addClass("lightButton");
  lightButton.mousePressed(changeDayNight);
}

function changeDayNight() {
  if (bgColor.rB == 0) {
    bgColor.rB = 25;
    bgColor.gB = 124;
    bgColor.bB = 211;

    pointLightColor.rPL = 255;
    pointLightColor.gPL = 255;
    pointLightColor.bPL = 255;

    buttonName = 'Night';
  } else {
    bgColor.rB = 0;
    bgColor.gB = 0;
    bgColor.bB = 5;

    pointLightColor.rPL = 120;
    pointLightColor.gPL = 120;
    pointLightColor.bPL = 120;

    buttonName = 'Day';
  }
}

function changeTreeColor() {
  treeGraphics.background(map(mouseX, 0, width, 63, 208), map(mouseY, 0, height, 70, 234), map(mouseY, 0, height, 57, 185));
}

// skyGraphics setting
function skyGraphicsSettings() {
  skyGraphics.noStroke();
  skyGraphics.background(bgColor.rB, bgColor.gB, bgColor.bB);
  skyGraphics.imageMode(CENTER);

  let xBigCloud = map(mouseX, 0, width, width / 6, 208);
  let xSmallCloud = map(mouseX, 0, width, width / 3.5, (width / 3.5) - 10);
  
  skyGraphics.image(cloud, xBigCloud, (height / 2) + 40, cloud.width / 35, cloud.height / 30);
  skyGraphics.image(cloud, xSmallCloud, (height / 2.7) + 100, cloud.width / 60, cloud.height / 55);
}