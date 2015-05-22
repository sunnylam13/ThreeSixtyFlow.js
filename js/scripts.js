////////////////////////////////////////////
///// 		MAIN JS FILE
///////////////////////////////////////////////
// DEMO FILE
// this file is the main javascript file
// place this last in the load order

////////////////////////////////////////////
// 		VARIABLES
////////////////////////////////////////////

var t6D2 = {};

// this object is used to hold functions for testing
var t6DTest1 = {};

t6D2.carouselRef = $('#carousel');

// ----------------------------------------
// YOUR DEVELOPER SETTINGS  ------------------
// ----------------------------------------

// you pass an object with your chosen settings to the plugin
// place this inside t6D2.carouselRef.threeSixtyDim()
t6D2.devSettings = {
	// spinner
	upDownIncrement: 7,
	baseZOffsetValue: -2000,
	changeInitialRingPosition: true,
	// these are the default values for starting position of #spinner
	rotateX: -90,
	rotateY: 90,
	translateY: -6.5,
	translateX: -9,
	// auto scroll
	autoScrollHorizontalTime: 10000,
	autoScrollVerticalTime: 100,
	autoScrollHorizontalEnable: false,
	autoScrollVerticalEnable: false,
	autoScrollToRight: true,
	autoScrollToLeft: false,
	autoScrollToTop: true,
	autoScrollToBottom: false,
	// slider buttons
	sliderButtonsRightLeftEnable: true,
	sliderButtonsUpDownEnable: true
	// other
};
// ----------------------------------------
// END YOUR DEVELOPER SETTINGS  ------------------
// ----------------------------------------


////////////////////////////////////////////
// 		END VARIABLES
////////////////////////////////////////////


////////////////////////////////////////////
// 		FUNCTIONS
////////////////////////////////////////////



////////////////////////////////////////////
// 		END FUNCTIONS
////////////////////////////////////////////


////////////////////////////////////////////
// 		TEST THESE FUNCTIONS
////////////////////////////////////////////
// we're testing the plugin's functions more easily by placing a copy here

// verified
t6DTest1.transformStringBuilder = function (actString,axisString,valueN,unit) {

	// where actString is rotate,translate,scale (string)
	// where axisString is X,Y (string)
	// where valueN is the value (integer)
	// where unit is deg, em, px, % (string)
	
	// EXAMPLE:  rotateY(0deg)
	// EXAMPLE:  scaleX(2)

	if (!unit) {
		// !unit is only true if using scaleX,scaleY which don't use units
		var finalString = actString + axisString + "(" + valueN + ")";
	} else {
		var finalString = actString + axisString + "(" + valueN + unit + ")";
	}

	return finalString;
}

// verified operational
// all args must be supplied
// 0,0,-6.5,-9
t6DTest1.craftSpinnerString = function (rotY, rotX, transY, transX) {
	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);
	
	// include the vendor prefixes in case
	// primary string
	
	console.log('Desired Target: transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em)');

	if (rotY) {
		// if the value is true, build a string with that value
		var rY = t6DTest1.transformStringBuilder("rotate","Y",rotY,"deg");
	} else {
		// default
		var rY = t6DTest1.transformStringBuilder("rotate","Y",0,"deg");
	}
	
	if (rotX) {
		// if the value is true, build a string with that value
		var rX = t6DTest1.transformStringBuilder("rotate","X",rotX,"deg");
	} else {
		// default
		var rX = t6DTest1.transformStringBuilder("rotate","X",0,"deg");
	}
	
	if (transY) {
		// if the value is true, build a string with that value
		var tY = t6DTest1.transformStringBuilder("translate","Y",transY,"em");
	} else {
		// default
		var tY = t6DTest1.transformStringBuilder("translate","Y",-6.5,"em");
	}

	if (transX) {
		// if the value is true, build a string with that value
		var tX = t6DTest1.transformStringBuilder("translate","X",transX,"em");
	} else {
		// default
		var tX = t6DTest1.transformStringBuilder("translate","X",-9,"em");
	}

	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);

	var transformObj = {
		'-webkit-transform': rY + " " + rX + " " + tY + " " + tX,
		'-moz-transform': rY + " " + rX + " " + tY + " " + tX,
		'-ms-transform': rY + " " + rX + " " + tY + " " + tX,
		'-o-transform': rY + " " + rX + " " + tY + " " + tX,
		'transform': rY + " " + rX + " " + tY + " " + tX
	};

	// return an object that is passed to the css() method
	// Tween would have been ideal however you'd have to be dependant on another plugin library
	return transformObj;
}

// verified
t6DTest1.getTransOriginZOffset = function () {
	// call this function in init

	// grabs the Z-offset value of the #spinner

	// EXAMPLE:  transform-origin: 50% 50% $transOriginZOffset;
	// EXAMPLE:  transform-origin: 50% 50% -2000px;
	
	// get the current z-offset
	var currentZOffSet = t6D2.carouselRef.find('#spinner').css('transform-origin');

	// extract the actual vallue of the z-offset for changing using regex
	// currentZOffSet = currentZOffSet.match(/(\-?)(\d+)(\w+)(\W*?)$/gm);
	currentZOffSet = currentZOffSet.match(/(\-*)(\d+)(\D{1,3})$/gm);
	// should result in "-2000px"
	
	// now extract the number as a string and convert to a number
	currentZOffSet = currentZOffSet.toString().match(/^(\-*)(\d+)/gm);

	// convert string to integer
	currentZOffSet = parseInt(currentZOffSet.toString());

	return currentZOffSet;
}

// does not work
t6DTest1.extractDegrees = function (objItem,axisTarget) {

	// where objItem is the target
	// where axisTarget is "z","x","y" or capitalized

	// EXAMPLE:  transform: rotateY(90deg) rotateX(97deg) translateY(-6.5em) translateX(-9em)
	// value:  rotateY(90deg) rotateX(97deg) translateY(-6.5em) translateX(-9em)
	// target:  rotateX(97deg)
	
	// store a reference to the target
	// the target has the css transform property
	// extract it
	var transValue1 = objItem.css('transform');	

	// isolate the number
	
	if (axisTarget == "z" || axisTarget == "Z") {
		var rotateAxis = "rotateZ";
		var targetValue = transValue1.match(/(rotateZ)(\(\-*\d+\w+\))/gm).match(/\-*\d+\w+/gm);

		return targetValue;
	}

	if (axisTarget == "x" || axisTarget == "X") {
		var rotateAxis = "rotateX";
		var targetValue = transValue1.match(/(rotateX)(\(\-*\d+\w+\))/gm).match(/\-*\d+\w+/gm);

		return targetValue;
	}

	if (axisTarget == "y" || axisTarget == "Y") {
		var rotateAxis = "rotateY";
		var targetValue = transValue1.match(/(rotateY)(\(\-*\d+\w+\))/gm).match(/\-*\d+\w+/gm);

		return targetValue;
	}

	// return the number plus deg for use

} 

////////////////////////////////////////////
// 		END TEST THESE FUNCTIONS
////////////////////////////////////////////


////////////////////////////////////////////
// 		360 CAROUSEL
////////////////////////////////////////////

t6D2.threeSixCarouselEvents = function () {
	t6D2.carouselRef.threeSixtyDim(t6D2.devSettings);
}

////////////////////////////////////////////
// 		END 360 CAROUSEL
////////////////////////////////////////////




////////////////////////////////////////////
// 		INIT
////////////////////////////////////////////
// method to initialize our application
// all our code will be put inside here
// you should not be defining things in here
t6D2.init = function () {
	// t6D2.threeSixCarouselEvents();
	t6D2.threeSixCarouselEvents();
}
////////////////////////////////////////////
// 		END INIT
////////////////////////////////////////////

////////////////////////////////////////////
// 		EXECUTION CODE
////////////////////////////////////////////
jQuery(document).ready(function($) {
	t6D2.init();
});  //end doc.onready function
////////////////////////////////////////////
// 		END EXECUTION CODE
////////////////////////////////////////////