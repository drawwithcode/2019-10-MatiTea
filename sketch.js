let tree;
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
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  treeGraphics = createGraphics(500, 500);
}

function draw() {
  background(bgColor.rB, bgColor.gB, bgColor.bB);

  showLightButton();

  //orbitControl();

  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
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

  // ground
  push();
  rotateX(90);
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
    bgColor.rB = 51;
    bgColor.gB = 102;
    bgColor.bB = 153;

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
