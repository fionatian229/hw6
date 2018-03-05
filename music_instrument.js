let a = 0;
var freqA = 523.25;
var freqB = 333.3;
var freqS = 196;
var freqD = 493.88;
var freqF = 254;


var oscA, oscB, oscS, oscD, oscF;
var cnv;

var playingBubble1, playingBubble2, playingBubble3, playingBubble4, playingBubble5;



var bubble1 = {
	x: 215,
	y: 375,

	display: function() {
		fill(41, 145, 152);
		ellipse(bubble1.x, bubble1.y, 30, 30);

	},
	move: function() {
		this.x = width / 2 - cos(a) * 175;
		this.y = height / 2 + sin(a) * 175;
		a = a + 0.5;

	}


}

var bubble2 = {
	x: 221,
	y: 60,

	display: function() {
		fill(255, 100, 47);
		ellipse(bubble2.x, bubble2.y, 25, 25);

	},
	move: function() {
		this.x = width / 2 + cos(a) * 140;
		this.y = height / 2 + sin(a) * 140;
		a = a + 0.2;

	}

}

var bubble3 = {
	x: 215,
	y: 375,

	display: function() {
		fill(239, 203, 143);
		ellipse(bubble3.x, bubble3.y, 25, 25);

	},
	move: function() {
		this.x = width / 2 + cos(a) * 105;
		this.y = height / 2 - sin(a) * 105;
		a = a + 0.1;

	}

}

var bubble4 = {
	x: 200,
	y: 200,

	display: function() {
		fill(255, 240, 47);
		ellipse(bubble4.x, bubble4.y, 57, 57);

	}
}

var bubble5 = {
	x: 100,
	y: 100,

	display: function() {
		fill(100, 75, 75);
		ellipse(this.x, bubble5.y, 42, 42);

	},
	move: function() {
		this.x = width / 2 - cos(a) * 140;
		this.y = height / 2 - sin(a) * 140;
		a = a + 0.015;
	}

}


function setup() {
	cnv = createCanvas(400, 400);
	background(0);
	angleMode(DEGREES);
	playingBubble1 = false;
	playingBubble2 = false;
	playingBubble3 = false;
	playingBubble4 = false;
	playingBubble5 = false;


	cnv.mousePressed(soundOn);
	cnv.mouseReleased(soundOff);

	oscA = new p5.Oscillator();
	oscA.setType('sin');
	oscA.freq(freqA);
	oscA.amp(0);
	oscA.start();

	oscB = new p5.Oscillator();
	oscB.setType('sin');
	oscB.freq(freqB);
	oscB.amp(0);
	oscB.start();

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

	filter = new p5.BandPass();

	noise = new p5.Noise();
	// disconnect unfiltered noise,
	// and connect to filter
	noise.disconnect();
	noise.connect(filter);
	noise.start();

	fft = new p5.FFT();

}





function soundOn() {

	if (!playingBubble1) {
		playingBubble1 = true;
		oscA.amp(0.5, 0.1);
	} else if (!playingBubble2) {
		playingBubble2 = true;
		oscB.amp(0.5, 0.1);
	} else if (!playingBubble3) {
		playingBubble3 = true;
		oscS.amp(0.5, 0.1);
	} else if (!playingBubble4) {
		playingBubble4 = true;
		oscD.amp(0.5, 0.1);
	} else if (!playingBubble5) {
		playingBubble5 = true;
		oscF.amp(0.5, 0.1);
	}
}

function soundOff() {
	playingBubble1 = false;
	playingBubble2 = false;
	playingBubble3 = false;
	playingBubble4 = false;
	playingBubble5 = false;
	oscA.amp(0, 0.5);
	oscB.amp(0, 0.5);
	oscS.amp(0, 0.5);
	oscD.amp(0, 0.5);
	oscF.amp(0, 0.5);
}


function draw() {
	background(0);
	stroke(255);
	noFill();
	ellipse(200, 200, 350, 350);
	//fill(aColor);
	// ellipse(75, 75, 36, 36);
	noFill();
	ellipse(200, 200, 278, 278);
	// fill(212, 127, 127);
	// ellipse(70, 225, 40, 40);
	noFill();
	ellipse(200, 200, 211, 211);



	//fill(100, 75, 75);
	//ellipse(315, 280, 42, 42);

	bubble1.display();
	bubble1.move();
	bubble2.display();
	bubble2.move();
	bubble3.display();
	bubble3.move();

	bubble4.display();

	bubble5.display();
	bubble5.move();
	var freq = map(mouseX, 50, width, 900, 10000);

	filter.freq(freq);
	filter.res(100);
	isMouseOverCanvas();
	var mX = mouseX,
		mY = mouseY;

	if (mX > 85 && mX < 350 && mY < 300 && mY > 85) {
		noise.amp(0.9, 0.2);
	} else {
		noise.amp(0, 0.2);
	}
}

function isMouseOverCanvas() {
	var mX = mouseX,
		mY = mouseY;
	if (mX > 75 && mX < 90 && mY < 90 && mY > 75) {
		noise.amp(0.5, 0.2);
	} else {
		noise.amp(0, 0.2);
	}

}