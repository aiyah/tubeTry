TestTube
========
Exercise in creating a tube class for udacity course:  https://www.udacity.com/course/cs291

In order to use tubeTry.js you will need to be able to reference
the three.js library.  

In order to run the example tube.html you may need to 
get some of the cs291 files (Coordinates.js, dat.gui.min.js).  For
some reason the OrbitAndPanControls.js did not work after downloaded recent threejs,
but another student Yann Granjon had a fix which I've included as OrbitAndPanControlsYann.js.
Also be sure to change the path of the scripts to wherever you have them saved

Example use:

var tube1 = new Tube(rTop, rBottom, rTopIn, rBottomIn, height, rSegments, hSegments, capTop, capBottom, material);

rTop = radius top outer wall
rBottom = radius bottom outer wall
rTopIn = radius of inner top outer wall
rBottomIn = radius of inner bottom wall
height = height 
rSegments = radius segments like in cylinder
hSegments = height segments like in cylinder
capTop = boolean indicator if should draw the top cap
capBottom = boolean indicator if should draw the bottom cap
material = THREE js material object
