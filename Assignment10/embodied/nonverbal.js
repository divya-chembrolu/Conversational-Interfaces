
// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var images = {};
var totalResources = 9;
var numResourcesLoaded = 0;
var fps = 30;
var charX = 245;
var charY = 185;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeRadius = 4;
var eyeRadius = maxEyeRadius;
var curEyeColor = "black"
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var fpsInterval = setInterval(updateFPS, 1000);
var numFramesDrawn = 0;
var curFPS = 0;
var jumping = false;
var blinking = true;

function updateFPS() {
	
	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	canvas.width = canvas.width; // clears the canvas 
	context.fillText("loading...", 40, 140);
	
	loadImage("leftArm");
	loadImage("legs");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("helmet");		
	loadImage("head_eyesopen");
	loadImage("head_eyesclosed");
	loadImage("leftArm-jump");
	loadImage("legs-jump");
	loadImage("rightArm-jump");
	loadImage("tail");
	loadImage("tail-jump");
	loadImage("leftLeg");

}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  
	setInterval(redraw, 1000 / fps);
  }
}

function redraw() {

  var x = charX;
  var y = charY;
  var jumpHeight = 45;
  
  canvas.width = canvas.width; // clears the canvas 

  // Draw shadow
  if (jumping) {
	drawEllipse(x + 60, y + 110, 100 - breathAmt, 4, "white", false);
  } else {
	drawEllipse(x + 60, y + 105, 160 - breathAmt, 6, "white", false);
  }
  
  if (jumping) {
	y -= jumpHeight;
  }
  
 //  if (jumping) {
	// context.drawImage(images["legs-jump"], x, y- 6);
 //  } else {
	// context.drawImage(images["legs"], x, y);
 //  }
	
  if (jumping) {
  	context.drawImage(images["tail-jump"], x + 100, y + 12 - breathAmt);	
  } else {
  	context.drawImage(images["tail"], x + 100, y + breathAmt - 3);
  }
  context.drawImage(images["torso"], x, y - 60);

  context.drawImage(images["helmet"], x + 12, y - 145 - breathAmt);
  if (blinking) {
  	context.drawImage(images["head_eyesopen"], x + 13, y - 145 - breathAmt);
	drawEllipse(x + 60, y - 90 - breathAmt, 8, eyeRadius, curEyeColor, true); // Left Eye
    drawEllipse(x + 90, y - 64 - breathAmt, 8, eyeRadius, curEyeColor, true); // Right Eye
  } else {
  	context.drawImage(images["head_eyesclosed"], x + 10, y - 145 - breathAmt);
  }

  
  context.drawImage(images["rightArm"], x + 40, y - 22 - breathAmt);
  context.drawImage(images["leftArm"], x - 12, y - 40 - breathAmt);
  context.drawImage(images["leftLeg"], x - 9, y + 55);
}

function drawEllipse(centerX, centerY, width, height, color, eye) {

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
 if (!eye) { 
    context.bezierCurveTo(
	  centerX + width/2, centerY - height/2,
	  centerX + width/2, centerY + height/2,
	  centerX, centerY + height/2);

    context.bezierCurveTo(
	  centerX - width/2, centerY + height/2,
	  centerX - width/2, centerY - height/2,
	  centerX, centerY - height/2);
  } else {
    context.arc(centerX + width/2, centerY - height/2,
  			eyeRadius, 0, 2.0 * Math.PI);
  }
  context.fillStyle = color;
  context.fill();
  context.closePath();	
}

function setEyeColor(color) {
    curEyeColor = color
}

function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function setBreathInc(inc) {
    breathInc = inc;
}

function updateBlink() { 
				
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}

function setTimeBetweenBlinks(duration) {
    timeBtwBlinks = duration
}

function blink() {
	if (blinking) {
		blinking = false;
		setTimeout(blink, 200);
	} else {
		blinking = true;
		eyeOpenTime = 0;
		setTimeout(blink, timeBtwBlinks);
	}
	// if (eyeRadius == 0) {
	// 	eyeRadius = maxEyeRadius;
	// } else {
	// 	eyeRadius = 0;
	// 	setTimeout(blink, 50);
	// }
}

function jump() {
	
  if (!jumping) {
	jumping = true;
	setTimeout(land, 500);
  }

}
function land() {
	
  jumping = false;

}