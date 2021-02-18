"use strict";

//TRIED ONLY FOR ONE HARMONY AND NOW MY BRAIN DOESN'T WORK

//GET VALUE ON LOAD
window.addEventListener("DOMContentLoaded", getValue);

function getValue() {

    document.getElementById("colour-picker").addEventListener("input", function (event) {
        let hexValue = addColour(event); //hexValue = hex
        let rgbValue = hexToRGB(hexValue); //rgbValue = rgb
        let hslValue = getHSL(rgbValue); //hslValue = hsl

        checkHarmonies(hslValue);
    });
}

function checkHarmonies(hslValue){
//insert if statements for different harmony selections and call calculations

let harmonyValue = document.getElementById("harmonies").value;

if (harmonyValue == "analogous") {
    let analogousColours  = calcAnalogous(hslValue);
    let colour2CSS = hslToRGB(analogousColours.colour2);
    document.getElementById("colour2").style.backgroundColor = colour2CSS;

    let colour3CSS = hslToRGB(analogousColours.colour3);
    document.getElementById("colour3").style.backgroundColor = colour3CSS;

    let colour4CSS = hslToRGB(analogousColours.colour4);
    document.getElementById("colour4").style.backgroundColor = colour4CSS;

    let colour5CSS = hslToRGB(analogousColours.colour5);
    document.getElementById("colour5").style.backgroundColor = colour5CSS;
}

//if (harmonyValue == "monochromatic") {
//    console.log("mono");
//    let monochromaticColours = calcMonochromatic(hslValue);
//    let colour2CSS = hslToRGB(monochromaticColours.colour2);
//    document.getElementById("colour2").style.backgroundColor = colour2CSS;
//
//    let colour2CSS = hslToRGB(monochromaticColours.colour2);
//    document.getElementById("colour2").style.backgroundColor = colour2CSS;
//
//
//}
}


function hslToRGB(array){

    array.h = array.h;
    array.s = array.s / 100;
    array.l = array.l / 100;
 
let c = (1 - Math.abs(2 * array.l - 1)) * array.s,
x = c * (1 - Math.abs(((array.h / 60) % 2) - 1)),
m = array.l - c / 2,
r = 0,
g = 0,
b = 0;
if (0 <= array.h && array.h < 60) {
r = c;
g = x;
b = 0;
} else if (60 <= array.h && array.h < 120) {
r = x;
g = c;
b = 0;
} else if (120 <= array.h && array.h < 180) {
r = 0;
g = c;
b = x;
} else if (180 <= array.h && array.h < 240) {
r = 0;
g = x;
b = c;
} else if (240 <= array.h && array.h < 300) {
r = x;
g = 0;
b = c;
} else if (300 <= array.h && array.h < 360) {
r = c;
g = 0;
b = x;
}
r = Math.round((r + m) * 255);
g = Math.round((g + m) * 255);
b = Math.round((b + m) * 255);

let css = `rgb(${r}, ${g}, ${b})`;
//console.log(css);
return css
}

//get and return hex value 

function addColour(event) {
document.getElementById("base-colour").style.backgroundColor = event.target.value;
let hex = event.target.value;
return hex;
}

//GET RGB 
function hexToRGB(hexValue) {
    const rString = hexValue.substring(1, 3);
    const gString = hexValue.substring(3, 5);
    const bString = hexValue.substring(5, 7);
  
    const r = parseInt(rString, 16);
    const g = parseInt(gString, 16);
    const b = parseInt(bString, 16);

    let rgb = {
      r,
      g,
      b,
    }
    return rgb;
}

//GET HEX
function getHSL(rgbValue){
    rgbValue.r /= 255;
    rgbValue.g /= 255;
    rgbValue.b /= 255;
  
    let h, s, l;
  
    const min = Math.min(rgbValue.r, rgbValue.g, rgbValue.b);
    const max = Math.max(rgbValue.r, rgbValue.g, rgbValue.b);
   
    if( max === min ) {
      h = 0;
    } else
    if (max === rgbValue.r) {
      h = 60 * (0 + (rgbValue.g - rgbValue.b) / (max - min) );
    } else
    if (max === rgbValue.g) {
      h = 60 * (2 + (rgbValue.b - rgbValue.r) / (max - min) );
    } else
    if (max === rgbValue.b) {
      h = 60 * (4 + (rgbValue.r - rgbValue.g) / (max - min) );
    }
   
    if (h < 0) 
    {h = h + 360; }
   
    l = (min + max) / 2;
   
    if (max === 0 || min === 1 ) {
      s = 0;
    } else {
      s = (max - l) / ( Math.min(l,1-l));
    }
    s *= 100;
    l *= 100;

    let hsl = {
        h: h.toFixed(0), 
        s: s.toFixed(0), 
        l: l.toFixed(0),
    };

    return hsl;
}

////Calculate analogous colours
function calcAnalogous(hslValue){

let colour2 = { h: parseInt(hslValue.h) + 10, s: parseInt(hslValue.s), l: parseInt(hslValue.l)};
let colour3 = { h: parseInt(hslValue.h) + 20, s: parseInt(hslValue.s), l: parseInt(hslValue.l)};
let colour4 = { h: parseInt(hslValue.h) + 30, s: parseInt(hslValue.s), l: parseInt(hslValue.l)};
let colour5 = { h: parseInt(hslValue.h) + 40, s: parseInt(hslValue.s), l: parseInt(hslValue.l)};

return {
    colour2,
    colour3,
    colour4,
    colour5,
}
}

//Calculate monochromatic colours 

//function calcMonochromatic(hslValue) {
//    let colour2 = { h: parseInt(hslValue.h), s: parseInt(hslValue.s) + 5, l: parseInt(hslValue.l)};
//    let colour3 = { h: parseInt(hslValue.h), s: parseInt(hslValue.s), l: parseInt(hslValue.l) + 10};
//    let colour4 = { h: parseInt(hslValue.h), s: parseInt(hslValue.s) +20, l: parseInt(hslValue.l)};
//    let colour5 = { h: parseInt(hslValue.h), s: parseInt(hslValue.s), l: parseInt(hslValue.l) + 25};
//    
//    return {
//        colour2,
//        colour3,
//        colour4,
//        colour5,
//    }
//}
