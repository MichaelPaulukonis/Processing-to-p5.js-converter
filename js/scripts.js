function pFunk(feelIt) {
  var str = document.getElementById("input").value;

  // TODO: do not include "types" in function params lists
  var str1 = str.replace(/new float\[(\w+)]/g, "new Array($1)") // wait. NEW ARRAY ?!!?!??!
  .replace(/new float \[(\w+)]/g, "new Array($1)")
  .replace(/new int\[(\w+)]/g, "new Array($1)")
  .replace(/new int \[(\w+)]/g, "new Array($1)")
  .replace(/new PImage\[(\w+)]/g, "new Array($1)")
  .replace(/new PImage \[(\w+)]/g, "new Array($1)")
  .replace(/new boolean\[(\w+)]/g, "new Array($1)")
  .replace(/new boolean \[(\w+)]/g, "new Array($1)")
  .replace(/new PVector\((\w+,.\w+)\)/g, "createVector($1)")
  .replace(/new PVector \((\w+,.\w+)\)/g, "createVector($1)")
  .replace(/(int|float|PImage|boolean) ?\[\]/g, "var")
  .replace(/(\bint\b|float|boolean|String|\bChar\b|PImage|\blong\b|PVector) /g, "var ")
  .replace(/\bsize\b/g, "createCanvas")
  
  .replace(/void/g, "function")
  .replace(/(push)Matrix|(pop)Matrix/g, "$1$2")
  .replace(/(push)Style|(pop)Style/g, "$1$2")
  .replace(/mousePressed/g, "mouseIsPressed")
  .replace(/mouseIsPressed\(\)/g, "mousePressed()")
  .replace(/frameRate/g, "frameRate()")
  ;


  // Instance Mode
  // ((\w|\d)+)(\s?\(|\()([^\)]*)\)
  if( document.getElementById("check_instantiation").checked ) {
    //alert("converting to instance mode");

    str1 = instantiation(str1);
  }

  document.getElementById("output").value = str1;
}

// Instance Mode
function instantiation(raw) {
  var parsed = raw;
  var instance_name;
  if (document.getElementById("text_instantiation").value == null) {
    instance_name = "mySketchName";
  }
  else {
    instance_name = document.getElementById("text_instantiation").value;
  }

  parsed = parsed.replace(/function\s((\w|\d)+)(\s?\(|\()([^\)]*)\)\s?\{/g, "p.$1 = function($4) {"); // replace function definitions
  // ((\w|\d|\.)+)(\s?\(|\()([^\)]*)\)\;
  parsed = parsed.replace(/((\w|\d)+)(\s?\(|\()([^\)]*)\)\s*\;/g, "p.$1($4) {"); // replace function calls
  parsed = "var sketch = function( p ) { \n" + parsed + " \n };\n\n" + "var " + document.getElementById("text_instantiation").value + " = new p5(sketch);";
  return parsed;
}


function clipboard()
{
  output.select();
}
