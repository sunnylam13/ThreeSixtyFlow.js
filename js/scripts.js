////////////////////////////////////////////
///// 		MAIN JS FILE
///////////////////////////////////////////////
// DEMO FILE
// this file is the main javascript file
// place this last in the load order

////////////////////////////////////////////
// 		VARIABLES
////////////////////////////////////////////

// ----------------------------------------
// PRIMARY EXPERIMENTING CANVAS  ------------------
// ----------------------------------------

var t6D2 = {};

t6D2.carouselRef = $('.carousel.primaryExp1');

// you pass an object with your chosen settings to the plugin
// place this inside t6D2.carouselRef.threeSixtyDim()
t6D2.devSettings = {

	// carousel parent
	// carouselDimensionSet: true,
	// carouselWidth: "100%",
	// carouselHeight: "50vh"

	// auto scroll testing
	// autoScrollHorizontalTime: 1000,
	// autoScrollVerticalTime: 100,
	// autoScrollHorizontalEnable: false,
	// autoScrollVerticalEnable: true,
	// autoScrollToRight: true,
	// autoScrollToLeft: false,
	// autoScrollToTop: false,
	// autoScrollToBottom: true,
	// autoScrollPauseEnabled: true
};

// ----------------------------------------
// END PRIMARY EXPERIMENTING CANVAS  ------------------
// ----------------------------------------


// ----------------------------------------
// TESTING  ------------------
// ----------------------------------------
// this object is used to hold functions for testing
var t6DTest1 = {};
// ----------------------------------------
// END TESTING  ------------------
// ----------------------------------------



// ----------------------------------------
// DEMOS  ------------------
// ----------------------------------------
// object used to hold things for demo blocks
var t6D3 = {};

// CAROUSEL DIMENSION DEMO  ------------------------------------------------
t6D3.carouselRef1 = $('.carousel.carouselDim1');
t6D3.carouselRef1DemoSet = {
	// carousel parent
	carouselDimensionSet: true,
	carouselWidth: "50%",
	carouselHeight: "50vh"
};
// END CAROUSEL DIMENSION DEMO ------------------------------------------------

// VERTICAL RING  ------------------------------------------------
t6D3.carouselRef2 = $('.carousel.verticalRing1');
t6D3.carouselRef2DemoSet = {
	changeInitialRingPosition: true,
	rotateX: -90,
	rotateY: 90,
	carouselDimensionSet: true,
	carouselHeight: "100vh",
	rotateZImages: true
};
// END VERTICAL RING ------------------------------------------------

// CHANGED INITIAL POSITION  ------------------------------------------------
t6D3.carouselRef3 = $('.carousel.verticalSlash1');
t6D3.carouselRef3DemoSet = {
	changeInitialRingPosition: true,
	rotateX: -45,
	rotateY: 90,
	carouselDimensionSet: true,
	carouselHeight: "100vh",
	rotateZImages: true
};
// END CHANGED INITIAL POSITION ------------------------------------------------

// AUTOSCROLL HORIZONTAL ------------------------------------------------
t6D3.carouselRef4 = $('.carousel.autoScrollH1');
t6D3.carouselRef4DemoSet = {
	autoScrollHorizontalEnable: true,
	autoScrollHorizontalTime: 3000,
	autoScrollPauseEnabled: true,
	sliderButtonsUpDownEnable: false
};
// END AUTOSCROLL HORIZONTAL ------------------------------------------------

// AUTOSCROLL VERTICAL ------------------------------------------------
t6D3.carouselRef5 = $('.carousel.autoScrollV1');
t6D3.carouselRef5DemoSet = {
	autoScrollVerticalEnable: true,
	autoScrollVerticalTime: 100,
	autoScrollPauseEnabled: true,
	sliderButtonsRightLeftEnable: false
};
// END AUTOSCROLL VERTICAL ------------------------------------------------

// AUTOSCROLL HORIZONTAL VERTICAL  ------------------------------------------------
t6D3.carouselRef6 = $('.carousel.autoScrollHV1');
t6D3.carouselRef6DemoSet = {
	// horizontal
	autoScrollHorizontalEnable: true,
	autoScrollHorizontalTime: 200,
	autoScrollPauseEnabled: true,
	sliderButtonsUpDownEnable: false,
	// vertical
	autoScrollVerticalEnable: true,
	autoScrollVerticalTime: 100,
	autoScrollPauseEnabled: true,
	sliderButtonsRightLeftEnable: false
};
// END AUTOSCROLL HORIZONTAL VERTICAL ------------------------------------------------

// ----------------------------------------
// END DEMOS  ------------------
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

// not working
// currently matrix3d
t6DTest1.extractRotateXAngle = function (objItem) {

	var spinnerVal = objItem;

	spinnerVal.style.webkitTransform = matrix.toString();

	var matrix = new WebKitCSSMatrix(spinnerVal.style.webkitTransform);
	var rotationX = Math.acos(matrix.a) * (180/pi);
	var rotationY = Math.asin(matrix.b) * (180/pi);

	console.log('spinnerVal is %s',rotationX);

	return rotationX;
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
// 		DEMO
////////////////////////////////////////////

t6D3.events = function () {
	t6D3.carouselRef1.threeSixtyDim(t6D3.carouselRef1DemoSet);
	t6D3.carouselRef2.threeSixtyDim(t6D3.carouselRef2DemoSet);
	t6D3.carouselRef3.threeSixtyDim(t6D3.carouselRef3DemoSet);
	t6D3.carouselRef4.threeSixtyDim(t6D3.carouselRef4DemoSet);
	t6D3.carouselRef5.threeSixtyDim(t6D3.carouselRef5DemoSet);
	t6D3.carouselRef6.threeSixtyDim(t6D3.carouselRef6DemoSet);
}

////////////////////////////////////////////
// 		END DEMO
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

t6D3.init = function () {
	// t6D3.threeSixCarouselEvents();
	t6D3.events();
}

////////////////////////////////////////////
// 		END INIT
////////////////////////////////////////////

////////////////////////////////////////////
// 		EXECUTION CODE
////////////////////////////////////////////
jQuery(document).ready(function($) {
	t6D2.init();
	t6D3.init();
});  //end doc.onready function
////////////////////////////////////////////
// 		END EXECUTION CODE
////////////////////////////////////////////