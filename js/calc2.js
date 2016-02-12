$(document).ready(function() {

  // setup canvas and line styles
  canvas = document.getElementById("calc-head");
  ctx = canvas.getContext('2d');
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 10.0;
  ctx.strokeStyle = '#000000';
  
  // draw parts of Calculon's head that css doesn't handle
  drawHeadCap();
  drawAntennas();
  drawAntennaTips();
  

  // draw mouth of teeth
  drawTeeth();

  // array of eye animations
  func_array = [lookUp, lookLeft, lookRight, lookDown];

  // uses setInterval to run continous eye movement
  delayedGlances();

  // set up some global vars to save/reset state

  // collects button presses
  strVal = "";

  // holds result of single calculation 
  globVal = null;

  // tracks running total while calculations continue
  totalVal = null;

  // stores operator type in case of operator changes during 
  // chaining calculations
  globOp = "";

  // toggle flag used to control when to print the operator
  // to screen and when not to when chaining calculations
  opFlag = true;
  
  // mini portfolio navigation
  $('#ab').click(function(){
    $('#about').toggle(600);
  });
 
  $('#pr').click(function(){
    $('#projects').toggle(600);
  });

  $('#ti').click(function(){
    $('#timpic').toggle(600);
  });
});

// stops delayed glances eye animation
function stopGlances()
{
  clearInterval(intervalID);
}

// sets up delay between calls of glances function
function delayedGlances()
{
  intervalID = setInterval(glances, 2000);
}

// randomly selects an eye animation an calls it
function glances()
{
  ran_num = getRandomIntInclusive(0, 3);
  func_array[ran_num]();
}

function drawTeeth()
{
  cvs = document.getElementById("teeth");
  ctxTeeth = cvs.getContext('2d');
  ctxTeeth.lineJoin = 'round';
  ctxTeeth.lineCap = 'round';
  ctxTeeth.lineWidth = 5.0;
  ctxTeeth.strokeStyle = '#000';  
  ctxTeeth.moveTo(38, 3);
  ctxTeeth.lineTo(38, 288);
  ctxTeeth.moveTo(90.5, 292);
  ctxTeeth.lineTo(90.5, 0)
  ctxTeeth.moveTo(143, 0);
  ctxTeeth.lineTo(143, 292);
  ctxTeeth.moveTo(195.5, 292);
  ctxTeeth.lineTo(195.5, 0);
  ctxTeeth.moveTo(250, 0);
  ctxTeeth.lineTo(250, 288);
  ctxTeeth.stroke();

}

function drawHeadCap()
{
  ctx.beginPath();
  ctx.moveTo(5, 100);
  ctx.lineTo(100, 5);
  ctx.lineTo(300, 5);
  ctx.lineTo(695, 400);
  ctx.stroke();
  ctx.fillStyle = '#f5a819';
  ctx.fill();
}

function drawAntennas()
{
  // draw left antenna
  ctx.beginPath();
  ctx.moveTo(25, 75);
  ctx.lineTo(10, 20);
  ctx.lineWidth = 5.0;
  ctx.lineTo(17, 17);
  ctx.lineTo(45, 55);
  ctx.fillStyle = '#bf7f00';
  ctx.fill();
  ctx.stroke();

  // draw right antenna
  ctx.beginPath();
  ctx.moveTo(canvas.width - 25, 75);
  ctx.lineTo(canvas.width - 10, 20);
  ctx.lineWidth = 5.0;
  ctx.lineTo(canvas.width - 17, 17);
  ctx.lineTo(canvas.width - 45, 55);
  ctx.fillStyle = '#bf7f00';
  ctx.fill();
  ctx.stroke();
}

function drawAntennaTips()
{
  // draw left antenna tip
  ctx.beginPath();
  ctx.arc(9.5, 9.5, 8, 0, 2*Math.PI, false);
  ctx.fillStyle = '#f5a819';
  ctx.fill();
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // draw right antenna tip
  ctx.beginPath();
  ctx.arc(canvas.width - 9.5, 9.5, 8, 0, 2*Math.PI, false);
  ctx.fillStyle = '#f5a819';
  ctx.fill();
  ctx.lineWidth = 3.0;
  ctx.strokeStyle = "black";
  ctx.stroke();
}

// provides randomness to eye animation and sound clips
function getRandomIntInclusive(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// for directional animations:
// css: top value not exceed 35 or -12 OR 19 or 3 in side
// css: left value not exceed -12 or 35 OR 19 or 3 in top/bottom
function lookUp()
{
  $(".pupil").animate({"top": "-=22px"}, 900);  
  $(".pupil").animate({"left": "-=7px"}, 900);  
  $(".pupil").animate({"left": "+=16px"}, 900);  
  $(".pupil").animate({"left": "-=9px"}, 900);  
  $(".pupil").animate({"top": "+=22px"}, 900);  
}

function lookLeft()
{
  $(".pupil").animate({"left": "-=12"}, 900);
  $(".pupil").animate({"top": "-=7"}, 200);
  $(".pupil").animate({"top": "+=22"}, 900);
  $(".pupil").animate({"top": "-=15"}, 300);
  $(".pupil").animate({"left": "+=12"}, 900);
}

function lookRight()
{
  $(".pupil").animate({"left": "+=12"}, 900);
  $(".pupil").animate({"top": "-=7"}, 300);
  $(".pupil").animate({"top": "+=22"}, 900);
  $(".pupil").animate({"top": "-=15"}, 400);
  $(".pupil").animate({"left": "-=12"}, 900);
}

function lookDown()
{
  $(".pupil").animate({"top": "+=22px"}, 900);  
  $(".pupil").animate({"left": "-=7px"}, 400);  
  $(".pupil").animate({"left": "+=16px"}, 900);  
  $(".pupil").animate({"left": "-=9px"}, 300);  
  $(".pupil").animate({"top": "-=22px"}, 900);  
}


// restores animated eyes to calculation field
function restoreEyes()
{
  $("#eye-slot").empty();
  leftEye = document.createElement("div");
  rightEye = document.createElement("div"); 
  pupil = document.createElement("div");

  leftEye.setAttribute("id", "left-eye");
  leftEye.setAttribute("class", "eyes");

  rightEye.setAttribute("id", "right-eye");
  rightEye.setAttribute("class", "eyes");

  pupil.setAttribute("class", "pupil");


  $("#eye-slot").append(leftEye);
  $("#eye-slot").append(rightEye);
  
  $(".eyes").append(pupil);
  $("#eye-slot").css({"background-color": "#000", "box-shadow": "none", "border-style": "none"});
  var ind = document.getElementById("eye-slot");
  ind.setAttribute("mode", "eyes");
}

// deletes eyes to display calculation field
function deleteEyes()
{
  $("#eye-slot").empty();
  $("#eye-slot").css({"background-color": "#a8f682", "box-shadow": "inset 3px 3px 10px 1px grey", "border-style": "solid", "border-width": "5px"});
  numField = document.createElement("div");
  numField.setAttribute("id", "num-field");
  $("#eye-slot").append(numField);
  readout = document.createElement("p");
  readout.setAttribute("id", "readout");
  $("#num-field").append(readout);
  var ind = document.getElementById("eye-slot");
  ind.setAttribute("mode", "readout");
}

// prints presses to screen and creates operands
function displayAndComputeValue(val)
{
  var ind = document.getElementById("eye-slot");
  var att = ind.getAttribute("mode"); 

  // if eyes are present when calculation starts
  // get rid of them
  if (att  == "eyes")
  {
    deleteEyes();       
  }

  // if a non-operator number button is pressed
  // clears globals to quit chaining, start new calculations
  if (totalVal)
  {
    clearValue();
    totalVal = null;
  }

  // prints button presses to screen
  // and adds them to ongoing strVal, creates operand
  countCharsAndShrink();
  $("#readout").append(val);
  strVal += val;
}

// clears globals, deletes eyes, except totalVal
function clearValue()
{
  if (globVal !== null)
  {
    globVal = null;
    strVal = "";
    globOp = "";
    deleteEyes();
  }
  else
  {
    deleteEyes();
  }
}

// clears globals, AND totalVal
function clearComplete()
{
    totalVal = null;
    globVal = null;
    strVal = "";
    globOp = "";
    deleteEyes();
}

// decides which operator to use
// and which values to pass for computation
// turns appropriate strings into floats
function getResult(computeType)
{
  opFlag = true;
  if ((globOp) && globOp !== computeType)
  {
    opFlag = false;
    if (strVal.indexOf('.') < 0)
    {
      var tempVal;
      if (checkZeroValue(strVal))
      {
        tempVal = '0'; 
      }
      else
      {
        tempVal = parseInt(strVal);
      }
      computeVal(globOp, tempVal);
      strVal = "";
    }
    else
    {
      var tempVal;
      if (checkZeroValue(strVal))
      {
        tempVal = '0'; 
      }
      else
      {
        tempVal = parseFloat(strVal);
      }
      computeVal(globOp, tempVal);
      strVal = "";
    }
  }
  globOp = computeType;
  if (globVal == null)
  {
    if(totalVal || totalVal == 0)
    {
      globVal = totalVal;
      computeVal(computeType, null); 
      strVal = "";
      totalVal = null;
    }
    else if (strVal.indexOf('.') < 0)
    {
      globVal = parseInt(strVal);
      computeVal(computeType, null); 
      strVal = "";
    }
    else
    {
      globVal = parseFloat(strVal); 
      computeVal(computeType, null); 
      strVal = "";
    }
  }
  else
  {
    if (strVal.indexOf('.') < 0)
    {
      var tempVal;
      if (checkZeroValue(strVal))
      {
        tempVal = '0'; 
      }
      else
      {
        tempVal = parseInt(strVal);
      }
      computeVal(computeType, tempVal);
      strVal = "";
    }
    else
    {
      var tempVal;
      if (checkZeroValue(strVal))
      {
        tempVal = '0'; 
      }
      else
      {
        tempVal = parseFloat(strVal);
      }
      computeVal(computeType, tempVal);
      strVal = "";
    }
  }
}

// performs actual calculations
// and prints appropriate operators to screen
function computeVal(computeType, tempVal)
{
  switch (computeType)
  {
    case "divide":
      if (opFlag && tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal /= tempVal;
        $("#readout").append('/');
      }
      else if (tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal /= tempVal;
      }
      else
      {
        $("#readout").append('/');
      }
      break;
    case "multiply":
      if (opFlag && tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal *= tempVal;
        $("#readout").append('X');
      }
      else if (tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal *= tempVal;
      }
      else
      {
        $("#readout").append('X');
      }
      break;
    case "mod":
      if (opFlag && tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal %= tempVal;
        $("#readout").append('%');
      }
      else if (tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal %= tempVal;
      }
      else
      {
        $("#readout").append('%');
      }
      break;
    case "subtract":
      // below commented code was a bad red herring!
      /*var readout = document.getElementById("readout");
      var negTest = readout.innerHTML;
      console.log("#readout: " + negTest);
      console.log("tempVal: " + tempVal);
      var result = negTest.match(new RegExp("-", "g")); 
      if (result)
      {
        len = result.length; 
      }
      else
      {
        len = 600;
      }*/
      //console.log(negTest);
      //if (tempVal && len < 2 && negTest[0] == "-")
      if (opFlag && tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal -= tempVal;
        $("#readout").append('-');
      }
      else if (tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal -= tempVal;
      }
      else
      {
        $("#readout").append('-');
      }
      break;
    case "add":
      if (opFlag && tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal += tempVal;
        $("#readout").append('+');
      }
      else if (tempVal)
      {
        if (tempVal == '0')
        {
          tempVal = 0;
        }
        globVal += tempVal;
        $("#readout").append('+');
      }
      else
      {
        $("#readout").append('+');
      }
      //opFlag = "add"
      break;
  }

}

// handles whether minus button is subtraction 
// operator or a prefix indicating a negative value
function handleNegative()
{
  if (strVal.length == 0 && (!totalVal))
  {
    displayAndComputeValue('-');
  }
  else
  {
    getResult("subtract");
  }
}

// tallies up current value of calculations
// to print to the screen, chaining is still
// possible after the equal button is hit
function equalTally()
{
  getResult(globOp);
  totalVal = globVal;
  clearValue();
  
  // changes font size for displaying large values
  countNumValAndShrink(totalVal, 99999999);  

  // fixes floats to 2 decimal points
  if (totalVal % 1 !== 0)
  {
    var printVal = totalVal.toFixed(2);
  }
  else
  {
    var printVal = totalVal;
  }
  $("#readout").append(printVal);
}

// I find myself checking for null, and the number 0 while
// necessary for calculations, returns null/false/whatever!
// so this substitutes with the string of zero so checks for zero
// don't show null. Also handles negative zero entries
// and zero floats
function checkZeroValue(val)
{
  if (val == '0' || val == '0.0' || val == '-0' || val == '-0.0')
  {
    return true;
  }

  return false;
}

// plays random calculon clip
function playRandom()
{
  var clips = ["js/eating-donkeys.mp3", "js/no-scream.mp3", "js/print-it.mp3", "js/remote-control.mp3", "js/self-explanatory.mp3", "js/sway-emotions.mp3", "js/two-takes.mp3", "js/unholy-acting.mp3"];
  var ran_num = getRandomIntInclusive(0, clips.length - 1);
  var current_clip = clips[ran_num];
  var audio = new Audio(current_clip);
  audio.play();
}

function getRandomIntInclusive(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// count characters to be printed to calculator
// display and shrinks font to fit large values
function countCharsAndShrink()
{
  var currentReadout = document.getElementById("readout").innerHTML;
  var len = currentReadout.length;
  if (len > 10)
  {
    $("#readout").css("font-size", "17px");
  }

}

// compares calculation(numval) to the 
// largest value for default font size(maxval)
// and shrinks font accordingly
function countNumValAndShrink(numval, maxval)
{
  if (numval > maxval)
  {
    $('#readout').css('font-size', '17px');
  }

}
