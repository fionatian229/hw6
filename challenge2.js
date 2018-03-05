/*

Click inside the four color rectangles to start the sound. 
Keep the mouse key pressed to let the sound continue.
Keep the mouse key pressed and move the mouse left/right to change the pitch.
Keep the mouse key pressed and move the mouse up/down to change the volume.
Release the mouse key to stop the sound.

*/

//hw4.volume

var freqA = 174;
var freqS = 196;
var freqD = 220;
var freqF = 246;

var oscA, oscS, oscD, oscF;
var cnv;

var playingA, playingS, playingD, playingF;
playingA = false;
playingD = false;
playingS = false;
playingF = false;

var aColor = "#ADDCCA";
var sColor = "#DCEBC2";
var dColor = "#FED2B7";
var fColor = "#F7A8A4";
var w = 200;
var h = 80;

function setup() {

  playingA = false;
  playingS = false;
  playingD = false;
  playingF = false;

  cnv = createCanvas(800, 800);
  cnv.mousePressed(soundOn);
  cnv.mouseReleased(soundOff);

  stroke(30);
  rect(10, 10, 500, 450);
  
  oscA = new p5.Oscillator();
  oscA.setType('triangle');
  oscA.freq(freqA);
  oscA.amp(0);
  oscA.start();
  
  oscS = new p5.Oscillator();
  oscS.setType('triangle');
  oscS.freq(freqS);
  oscS.amp(0);
  oscS.start();
  
  oscD = new p5.Oscillator();
  oscD.setType('triangle');
  oscD.freq(freqD);
  oscD.amp(0);
  oscD.start();
  
  oscF = new p5.Oscillator();
  oscF.setType('triangle');
  oscF.freq(freqF);
  oscF.amp(0);
  oscF.start();

  text('click here,\nthen press A/S/D/F keys to play', 20, 40);
  text('move mouse up and down to change volume', 20, 80);


  drawClickAreas();

}

function drawClickAreas() {
  noStroke();
  
  fill(aColor);
  rect(20, 300, 100, h);

  fill(sColor);
  rect(130, 300, 100, h);

  fill(dColor);
  rect(240, 300, 100, h);

  fill(fColor);
  rect(350, 300, 100, h);

}


function soundOn() {

  if (!playingA && mouseX > 20 && mouseX < 120 && mouseY < (300+h) && mouseY > 300) {
    playingA = true;
    oscA.amp(0.5, 0.1);
  } else if (!playingS && mouseX > 130 && mouseX < 230 && mouseY < (300+h) && mouseY > 300) {
    playingS = true;
    oscS.amp(0.5, 0.1);
  } else if(!playingD && mouseX > 240 && mouseX < 340 && mouseY < (300+h) && mouseY > 300) {
    playingD = true;
    oscD.amp(0.5, 0.1);
  } else if (!playingF && mouseX > 350 && mouseX < 450 && mouseY < (300+h) && mouseY > 300) {
    playingF = true;
    oscF.amp(0.5, 0.1);
  }
  
}

function soundOff(){
  playingA = false;
  playingS = false;
  playingD = false;
  playingF = false;
  oscA.amp(0, 0.5);
  oscS.amp(0, 0.5);
  oscD.amp(0, 0.5);
  oscF.amp(0, 0.5);
}


function visualFeedback() {

  var width = 140;
  var textColor = 20;

  textSize(18);

  noStroke();

  if (playingA) {
    fill(aColor);
    rect(30, 100, width, h);
    fill(textColor);
    text('A: ' + freqA, 70, 150);    
  } else if (playingS) {
    fill(sColor);
    rect(30, 100, width, h);
    fill(textColor);
    text('S: ' + freqS, 70, 150);   
  } else if (playingD) {
    fill(dColor);
    rect(30, 100, width, h);
    fill(textColor);
    text('D: ' + freqD, 70, 150);   
  } else if (playingF) {
    fill(fColor);
    rect(30, 100, width, h);
    fill(textColor);
    text('F: ' + freqF, 70, 150);   
  }

}

function changePitch() {
  var osc;
  var freq;

  if (playingA) {
    osc = oscA;
    freq = freqA;
  } else if (playingS) {
    osc = oscS;
    freq = freqS;
  } else if (playingD) {
    osc = oscD;
    freq = freqD;
  } else if (playingF) {
    osc = oscF;
    freq = freqF;
  }

  if (osc) {
    freq = map(mouseX, 0, width, freq - 50, freq + 50);
    osc.freq(freq);
  }

}

function changeVolume() {
  var osc;
  var amp;

  if (playingA) {
    osc = oscA;
  } else if (playingS) {
    osc = oscS;
  } else if (playingD) {
    osc = oscD;
  } else if (playingF) {
    osc = oscF;
  }

  if (osc) {
    amp = map(mouseY, 500, 0, 0.2, 0.8);
    osc.amp(amp);
  }
}

function metronome() {
  var s = round(millis());
  var r;
  
  if (s % 600 > 300) {
    fill(20);
    r = 10;
  } else {
    fill(200);
    r = 20;
  }

  ellipse(470, 50, r, r);

}

function draw() {
  
  visualFeedback();
  changePitch();
  changeVolume();
  metronome();

}

function keyPressed() {
  print("got key press for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    playingA = true;
  } else if (key == 'S') {
    osc = oscS;
    playingS = true;
  } else if (key == 'D') {
    osc = oscD;
    playingD = true;
  } else if (key == 'F') {
    osc = oscF;
    playingF = true;
  }
  if (osc) {
    osc.amp(0.5, 0.1);
  }

}

function keyReleased() {
  print("got key release for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    playingA = false;
  } else if (key == 'S') {
    osc = oscS;
    playingS = false;
  } else if (key == 'D') {
    osc = oscD;
    playingD = false;
  } else if (key == 'F') {
    osc = oscF;
    playingF = false;
  }
  if (osc) {
    osc.amp(0, 0.5);
  }
  
}