////////////////////////////////////////////
///// 		360 CAROUSEL PLUGIN
///////////////////////////////////////////////
// this file is the main javascript file
// place this before the main javascript file "scripts.js"

$.fn.threeSixtyDim = function(options) {

// console.log('threeSixtyDim plugin active.');

// ----------------------------------------
// THIS  ------------------
// ----------------------------------------
// using this in a variable for later methods works best
var thisCarousel = this;
// ----------------------------------------
// END THIS  ------------------
// ----------------------------------------

// TARGETING
// the plugin should target the #carousel (a single unique ID)
// this = #carousel

if (!this.length) { return this; }

////////////////////////////////////////////
// 		VARIABLES & REFERENCES
////////////////////////////////////////////
// these are not user supplied

var t6D1 = {};

// then below there you can add things
t6D1.angleYVer = 0;
t6D1.angleXHor = 0;
t6D1.netDegrees = 360;

// ----------------------------------------
// Default options  ------------------
// ----------------------------------------

// default options
t6D1.defaults1 = {
	// carousel parent
	carouselDimensionSet: false,
	carouselWidth: "100%",
	carouselHeight: "50vh",
	// spinner
	upDownIncrement: 7,
	baseZOffsetValue: -2000,
	changeInitialRingPosition: false,
	// item targets
	itemTarget: '.spinner img',
	// these are the default values for starting position of #spinner
	rotateX: 0,
	rotateY: 0,
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
	autoScrollPauseEnabled: false,
	// slider buttons
	sliderButtonsRightLeftEnable: true,
	sliderButtonsUpDownEnable: true,
	// images
	rotateZImages: false
	// other
	
};

// default options
// you will use opts.propertyName instead of t6D1.defaults1
var opts = $.extend(t6D1.defaults1, options);

// ----------------------------------------
// END Default options  ------------------
// ----------------------------------------



// ----------------------------------------
// Spinner  ------------------
// ----------------------------------------
// t6D1.items1 holds the items in the gallery... whether they're images or a div
t6D1.spinner = this.find('.spinner');
// t6D1.spinner = $('#spinner');
t6D1.items1 = this.find(opts.itemTarget);
// t6D1.items1 = $('#spinner img');
// ----------------------------------------
// END Spinner  ------------------
// ----------------------------------------

// ----------------------------------------
// Horizontal Controls  ------------------
// ----------------------------------------
// these would be plugin generated
t6D1.leftPrev = this.find('span.fa.fa-chevron-left');
t6D1.rightNext = this.find('span.fa.fa-chevron-right');
// t6D1.leftPrev = $('span.fa.fa-chevron-left');
// t6D1.rightNext = $('span.fa.fa-chevron-right');
// ----------------------------------------
// END Horizontal Controls  ------------------
// ----------------------------------------

// ----------------------------------------
// Vertical Controls  ------------------
// ----------------------------------------
t6D1.upRotate = this.find('span.fa.fa-chevron-up');
t6D1.downRotate = this.find('span.fa.fa-chevron-down');
// t6D1.upRotate = $('span.fa.fa-chevron-up');
// t6D1.downRotate = $('span.fa.fa-chevron-down');
// ----------------------------------------
// END Vertical Controls  ------------------
// ----------------------------------------


////////////////////////////////////////////
// 		END VARIABLES & REFERENCES
////////////////////////////////////////////

////////////////////////////////////////////
// 		HELPERS
////////////////////////////////////////////
t6D1.craftRotateString = function (axisString,angleValue) {
	// this is the initial image angle when plugin loads
	// EXAMPLE:  transform: rotateY(0deg);
	// where axisString is "X", "Y", "Z"
	var string = "rotate" + axisString + "(";
		string += angleValue;
		string += "deg)";
	return string;
}

t6D1.itemAngles = function () {
	// this function sets the initial item angle positions upon load before we do anything else... especially if our gallery is huge

	var totalItems = t6D1.items1.length;
	
	// use this if you want decimal places and to have the first image centred as intended
	var degreeItem = t6D1.netDegrees/totalItems;

	// floor the value so you avoid decimals
	// WARNING:  doing so prevents the first image from being centred the way you wanted (for the current image size)
	// var degreeItem = Math.floor(t6D1.netDegrees/totalItems);
	
	t6D1.degreeConstant = degreeItem;
	var degreeCount = degreeItem;
	var degreeCountZ = degreeItem;
	var degreeCountX = degreeItem;

	$.each(t6D1.items1, function(index, target) {
		// what we have here is an array of objects
		// console.log(index,target);

		// I had to store the target in the $() so that it became a jQuery object, otherwise jQuery methods wouldn't work
		var finalTarget = $(target);

		
		// if the rotateZImages settings is true
		if (opts.rotateZImages && opts.rotateX != 0 && opts.rotateY) {
			// since we're already setting rotateY for images
			// if this is enabled, we can also set the rotateZ
			
			

			// the first gallery item should always have a rotateY(0deg) rotateZ(0deg)
			if (index == 0) {
				// finalTarget.css('transform', 'rotateY(0deg) rotateZ(0deg)');
				finalTarget.css({
					'-webkit-transform': 'rotateY(0deg) rotateZ(0deg)',
					'-moz-transform': 'rotateY(0deg) rotateZ(0deg)',
					'-o-transform': 'rotateY(0deg) rotateZ(0deg)',
					'-ms-transform': 'rotateY(0deg) rotateZ(0deg)',
					'transform': 'rotateY(0deg) rotateZ(0deg)'
				});
			}

			// you needed to use degreeCount not degreeItem otherwise all images would be set with the same angle
			// should be able to concat the strings
			finalTarget.css({
				'-webkit-transform': t6D1.craftRotateString("Y",degreeCount) + " " + t6D1.craftRotateString("Z",degreeCount),
				'-moz-transform': t6D1.craftRotateString("Y",degreeCount) + " " + t6D1.craftRotateString("Z",degreeCount),
				'-o-transform': t6D1.craftRotateString("Y",degreeCount) + " " + t6D1.craftRotateString("Z",degreeCount),
				'-ms-transform': t6D1.craftRotateString("Y",degreeCount) + " " + t6D1.craftRotateString("Z",degreeCount),
				'transform': t6D1.craftRotateString("Y",degreeCount) + " " + t6D1.craftRotateString("Z",degreeCount)
			});

			degreeCount += degreeItem;
		}

		// this is the default
		// if the rotateZImages settings is false
		if (!opts.rotateZImages) {
			// the first gallery item should always have a rotateY(0deg)
			if (index == 0) {
				// finalTarget.css('transform', 'rotateY(0deg)');
				finalTarget.css({
					'-webkit-transform': 'rotateY(0deg)',
					'-moz-transform': 'rotateY(0deg)',
					'-o-transform': 'rotateY(0deg)',
					'-ms-transform': 'rotateY(0deg)',
					'transform': 'rotateY(0deg)'
				});
			}

			// you needed to use degreeCount not degreeItem otherwise all images would be set with the same angle
			// finalTarget.css('transform', t6D1.craftRotateString("Y",degreeCount));

			finalTarget.css({
				'-webkit-transform': t6D1.craftRotateString("Y",degreeCount),
				'-moz-transform': t6D1.craftRotateString("Y",degreeCount),
				'-o-transform': t6D1.craftRotateString("Y",degreeCount),
				'-ms-transform': t6D1.craftRotateString("Y",degreeCount),
				'transform': t6D1.craftRotateString("Y",degreeCount)
			});

			degreeCount += degreeItem;
		}

	});
}

t6D1.transformStringBuilder = function (actString,axisString,valueN,unit) {

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

t6D1.craftSpinnerString = function (rotY, rotX, transY, transX) {
	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);
	
	// include the vendor prefixes in case
	// primary string
	
	if (rotY) {
		// if the value is true, build a string with that value
		var rY = t6D1.transformStringBuilder("rotate","Y",rotY,"deg");
	} else {
		// default
		var rY = t6D1.transformStringBuilder("rotate","Y",0,"deg");
	}
	
	if (rotX) {
		// if the value is true, build a string with that value
		var rX = t6D1.transformStringBuilder("rotate","X",rotX,"deg");
	} else {
		// default
		var rX = t6D1.transformStringBuilder("rotate","X",0,"deg");
	}
	
	if (transY) {
		// if the value is true, build a string with that value
		var tY = t6D1.transformStringBuilder("translate","Y",transY,"em");
	} else {
		// default
		var tY = t6D1.transformStringBuilder("translate","Y",-6.5,"em");
	}

	if (transX) {
		// if the value is true, build a string with that value
		var tX = t6D1.transformStringBuilder("translate","X",transX,"em");
	} else {
		// default
		var tX = t6D1.transformStringBuilder("translate","X",-9,"em");
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

t6D1.setInitialRingPosition = function () {
	
	// Friday, May 22, 2015 12:29 PM:  currently if changeInitialRingPosition = false, you the developer must remove the passed rotateX and rotateY settings too 

	// pure vertical
	// EXAMPLE:  transform: rotateY(-90deg) rotateX(90deg) translateY(-6.5em) translateX(-9em)

	// NOTE:  trying to use rotateZ() doesn't rotate the ring like a carousel, it rotates exactly like using rotateY()

	// NOTE:  Using Javascript to set the initial position... when other methods also alter transform, as long as they use += or -= to change opts.rotateX, opts.rotateY
	// JS would overwrite the CSS transforms because it applies inline styling which is seen last



	// if change initial ring position is true
	if (opts.changeInitialRingPosition) {
		t6D1.spinner.css(t6D1.craftSpinnerString(opts.rotateY, opts.rotateX, opts.translateY, opts.translateX));
	}

}
////////////////////////////////////////////
// 		END HELPERS
////////////////////////////////////////////


////////////////////////////////////////////
// 		CAROUSEL PARENT
////////////////////////////////////////////

t6D1.carouselDimensions = function () {
	// this function uses JS to set the custom dimensions of the parent carousel

	if (opts.carouselDimensionSet) {
		thisCarousel.css({
			width: opts.carouselWidth,
			height: opts.carouselHeight
		});
	}

}

////////////////////////////////////////////
// 		END CAROUSEL PARENT
////////////////////////////////////////////


////////////////////////////////////////////
// 		GALLERY SPINNER
////////////////////////////////////////////
t6D1.galleryspinLeftRight = function (horString) {

	// where horString is the "left" or "right" string passed from the previous/next buttons

	// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

	// a user is only likely to click one button at a time

	// this is used for the previous and next buttons
	// if none of the conditions match then default values are used
	if (horString == "left") {
		opts.rotateY -= t6D1.degreeConstant;
		// console.log(opts.rotateY);
	} else if (horString == "right") {
		opts.rotateY += t6D1.degreeConstant;
		
		// console.log(opts.rotateY);
	}

	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);

	var finalCSSObj = t6D1.craftSpinnerString(opts.rotateY, opts.rotateX, opts.translateY, opts.translateX);

	t6D1.spinner.css(finalCSSObj);
}

t6D1.galleryspinUpDown = function (verString) {

	// where verString is the "up" or "down" string passed from the up/down buttons

	// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

	// a user is only likely to click one button at a time

	// NOTE:  once you rotate past the first image, the buttons up/down direction reverses

	// this is used for up and down buttons
	// if none of the conditions match then default values are used
	if (verString == "down") {
		opts.rotateX -= opts.upDownIncrement;
		// console.log(opts.rotateX);
	} else if (verString == "up") {
		opts.rotateX += opts.upDownIncrement;
		// console.log(opts.rotateX);
	}

	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);

	var finalCSSObj = t6D1.craftSpinnerString(opts.rotateY, opts.rotateX, opts.translateY, opts.translateX);

	t6D1.spinner.css(finalCSSObj);
}
////////////////////////////////////////////
// 		END GALLERY SPINNER
////////////////////////////////////////////

////////////////////////////////////////////
// 		IMAGE ALTERATIONS
////////////////////////////////////////////
// if we directly alter the images in some way, place methods here

t6D1.extractRotateXAngle = function (objItem) {

	// https://stackoverflow.com/questions/8890888/css3-converting-matrix3d-values

	var spinnerVal = objItem.css('transform');
	console.log('spinnerVal is %s',spinnerVal);
	// extract the rotateX value (i.e. -90deg)
	var spinnerExtract = spinnerVal.match(/(rotateX)(\(\-*\d+\w+\))/gm).toString().match(/(\-*\d+\w+)/gm).toString().match(/(\-*\d+)/gm).toString();
	console.log(spinnerExtract);

	return spinnerExtract;
}

t6D1.imageRotateZ = function () {
	// function to rotate the images to match rotateX angle of the #spinner
	// i.e. rotateZ of image matches rotateX of spinner
	
	// EXAMPLE:  transform: rotateY(90deg) rotateX(-90deg) translateY(-6.5em) translateX(-9em)

	// grab the transform value of the #spinner
	var spinnerVal = t6D1.spinner.css('transform');
	console.log('spinnerVal is %s',spinnerVal);
	// extract the rotateX value (i.e. -90deg)
	var spinnerExtract = spinnerVal.match(/(rotateX)(\(\-*\d+\w+\))/gm).toString().match(/(\-*\d+\w+)/gm).toString();
	console.log(spinnerExtract);

	// grab the transform value of the #spinner img
	// add the extracted value to the string
	// set the transform of #spinner img (by looping)
	
	if (rotateZImages) {
		expression
	}

	$.each(t6D1.items1, function(index, objItem) {
		//
	});

}

////////////////////////////////////////////
// 		END IMAGE ALTERATIONS
////////////////////////////////////////////

////////////////////////////////////////////
// 		AUTO SCROLL
////////////////////////////////////////////
t6D1.autoScrollHorizontal = function () {
	// this must be called in init

	if (opts.autoScrollHorizontalEnable) {

		if (opts.autoScrollToRight) {
			// https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
			// console.log('Right scroll set.');
			
			t6D1.autoScrollIntervalH = setInterval( function() { t6D1.galleryspinLeftRight("right"); 
			}, opts.autoScrollHorizontalTime );

			t6D1.autoScrollPause("horizontal",t6D1.autoScrollIntervalH,"right",opts.autoScrollHorizontalTime);

		}

		if (opts.autoScrollToLeft) {
			// https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
			// console.log('Left scroll set.');
			t6D1.autoScrollIntervalH = setInterval( function() { t6D1.galleryspinLeftRight("left"); 
			}, opts.autoScrollHorizontalTime );

			t6D1.autoScrollPause("horizontal",t6D1.autoScrollIntervalH,"left",opts.autoScrollHorizontalTime);
			
		}
		
	}

}

t6D1.autoScrollVertical = function () {
	// this must be called in init
	
	if (opts.autoScrollVerticalEnable) {
		
		if (opts.autoScrollToTop) {
			t6D1.autoScrollIntervalV = setInterval(function () {
				t6D1.galleryspinUpDown("up");
			}, opts.autoScrollVerticalTime);

			t6D1.autoScrollPause("vertical",t6D1.autoScrollIntervalV,"up",opts.autoScrollVerticalTime);
		}

		if (opts.autoScrollToBottom) {
			t6D1.autoScrollIntervalV = setInterval(function () {
				t6D1.galleryspinUpDown("down");
			}, opts.autoScrollVerticalTime);

			t6D1.autoScrollPause("vertical",t6D1.autoScrollIntervalV,"down",opts.autoScrollVerticalTime);
		}

	}
}

t6D1.autoScrollPause = function (scrollAxis,intervalItem,gallerySpinDir,scrollTime) {

	// where scrollAxis = "horizontal", "vertical"
	// where gallerySpinDir = "left", "right", "up", "down"

	// Sunday, May 24, 2015 6:46 PM:  due to using a single variable to store the intervals for horizontal and vertical, if there are multiple auto-scrolls on the same page, stopping one stops them all

	switch(scrollAxis) {
		case "horizontal":
			// set initial autoscrollpausestate to false
			t6D1.autoScrollPauseStateH = "off";
			// console.log('t6D1.autoScrollPauseStateH is %', t6D1.autoScrollPauseStateH);

			// you need the condition check to occur in the same if else statement, using two ifs results in two checks
			thisCarousel.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (t6D1.autoScrollPauseStateH == "off" && opts.autoScrollPauseEnabled) {
					window.clearInterval(intervalItem);
					t6D1.autoScrollPauseStateH = "on";
					// console.log('interval cleared.');
					// console.log('t6D1.autoScrollPauseStateH is %', t6D1.autoScrollPauseStateH);
				} else if (t6D1.autoScrollPauseStateH == "on" && opts.autoScrollPauseEnabled) {
					
					intervalItem = setInterval( function() { t6D1.galleryspinLeftRight(gallerySpinDir) }, scrollTime );

					// switch(gallerySpinDir) {
					// 	case "right":
					// 		intervalItem = setInterval( function() { t6D1.galleryspinLeftRight(gallerySpinDir) }, scrollTime );
					// 		break;
					// 	case "left":
					// 		intervalItem = setInterval( function() { t6D1.galleryspinLeftRight(gallerySpinDir) }, scrollTime );
					// 		break;
					// }
					
					t6D1.autoScrollPauseStateH = "off";
					// console.log('t6D1.autoScrollPauseStateH is %', t6D1.autoScrollPauseStateH);
					// console.log('interval started');
				}
			});
			break;
		case "vertical":
			// set initial autoscrollpausestate to false
			t6D1.autoScrollPauseStateV = "off";

			thisCarousel.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (t6D1.autoScrollPauseStateV == "off" && opts.autoScrollPauseEnabled) {
					window.clearInterval(intervalItem);
					t6D1.autoScrollPauseStateV = "on";
					// console.log('interval cleared.');
					// console.log('t6D1.autoScrollPauseStateH is %', t6D1.autoScrollPauseStateV);
				} else if (t6D1.autoScrollPauseStateV == "on" && opts.autoScrollPauseEnabled) {
					
					intervalItem = setInterval( function() { t6D1.galleryspinUpDown(gallerySpinDir) }, scrollTime );

					// switch(gallerySpinDir) {
					// 	case ("right" || "left"):
					// 		intervalItem = setInterval( function() { t6D1.galleryspinLeftRight(gallerySpinDir) }, scrollTime );
					// 		break;
					// 	case ("up" || "down"):
					// 		intervalItem = setInterval( function() { t6D1.galleryspinUpDown(gallerySpinDir) }, scrollTime );
					// 		break;
					// }
					
					t6D1.autoScrollPauseStateV = "off";
					// console.log('t6D1.autoScrollPauseStateH is %', t6D1.autoScrollPauseStateV);
					// console.log('interval started');
				}
			});

			break;
	}

}

////////////////////////////////////////////
// 		END AUTO SCROLL
////////////////////////////////////////////

////////////////////////////////////////////
// 		TRANSFORM ORIGIN
////////////////////////////////////////////
t6D1.getTransOriginZOffset = function () {
	// this is a helper function for t6D1.changeTransOriginZOffset

	// grabs the Z-offset value of the #spinner

	// EXAMPLE:  transform-origin: 50% 50% $transOriginZOffset;
	// EXAMPLE:  transform-origin: 50% 50% -2000px;
	
	// get the current z-offset
	var currentZOffSet = t6D1.spinner.css('transform-origin');

	// extract the actual vallue of the z-offset for changing using regex
	// currentZOffSet = currentZOffSet.match(/(\-?)(\d+)(\w+)(\W*?)$/gm);
	currentZOffSet = currentZOffSet.match(/(\-*)(\d+)(\D{1,3})$/gm);
	// should result in ["-2000px"] (an array)
	
	// now extract the number as a string and convert to a number
	// should result in "-2000px" (a string)
	currentZOffSet = currentZOffSet.toString().match(/^(\-*)(\d+)/gm);

	// convert string to integer (so you can actually use it in calculations)
	currentZOffSet = parseInt(currentZOffSet.toString());

	return currentZOffSet;
}

t6D1.changeTransOriginZOffset = function () {
	// call this function in init
	
	// grab the current transform origin z offset value for the spinner
	var currentZOffsetValue = t6D1.getTransOriginZOffset();
	// determine the number of images currently in the carousel
	var itemTotal = t6D1.items1.length;

	// for every 36 items beyond 36, add -1000 or -2000 to the z offset
	// since the z-offset increment value is about -2000 per 36, and the baseZOffsetValue is -2000 anyway, we can use that option to set both the base and the increment value
	
	// var addedUnits = Math.floor((itemTotal-36)/36);
	var addedUnits = (itemTotal-36)/36;

	// if the division is less than or equal to zero that means we're still in the safe zone, set it to zero, no change to z offset
	if (addedUnits <= 0) {
		var addedUnits = 0;
	}

	// if the division is greater than zero yet still less than 1, set it to 1
	if (addedUnits > 0 && addedUnits < 1) {
		var addedUnits = 1;
	}

	var addedZOffset = addedUnits * opts.baseZOffsetValue;

	var newZOffsetValue = currentZOffsetValue + addedZOffset;

	// convert the new Z-offset value into a string
	// EXAMPLE:  transform-origin: 50% 50% -2000px;
	// means... 50% 50% -2000px
	var transOriginSettingValue = "50% 50% " + newZOffsetValue + "px";

	// change transform origin on the spinner and its items
	t6D1.spinner.css('transform-origin', transOriginSettingValue);
	t6D1.items1.css('transform-origin', transOriginSettingValue);
}

t6D1.setBaseZOffsetValue = function () {
	
	// NOTE:  the opts.baseZOffsetValue should not be lower than -2000

	if (opts.baseZOffsetValue != -2000) {

		var transOriginSettingValue = "50% 50% " + opts.baseZOffsetValue + "px";

		// change the transform z-offset for #spinner
		t6D1.spinner.css('transform-origin', transOriginSettingValue);

		// change the transform z-offset for img items
		t6D1.items1.css('transform-origin', transOriginSettingValue);
	}
}
////////////////////////////////////////////
// 		END TRANSFORM ORIGIN
////////////////////////////////////////////

////////////////////////////////////////////
// 		NAVIGATION CONTROLS
////////////////////////////////////////////
t6D1.buildControls = function () {
	
	// ----------------------------------------
	// Control Frame  ------------------
	// ----------------------------------------
	var $controlFrame = $('<div>').addClass('controlframe');
	// ----------------------------------------
	// END Control Frame  ------------------
	// ----------------------------------------
	
	// ----------------------------------------
	// Vertical  ------------------
	// ----------------------------------------
	var $vertical1 = $('<div>').addClass('controls vertical1');
	var $vertical2 = $('<div>').addClass('controls vertical2');
	var $updiv = $('<div>').append($('<span>').addClass('fa fa-chevron-up'));
	var $downdiv = $('<div>').append($('<span>').addClass('fa fa-chevron-down'));
	// ----------------------------------------
	// END Vertical  ------------------
	// ----------------------------------------
	
	// ----------------------------------------
	// Horizontal  ------------------
	// ----------------------------------------
	var $horizontal = $('<div>').addClass('controls horizontal');
	var $leftdiv = $('<div>').append($('<span>').addClass(
		'fa fa-chevron-left'));
	var $rightdiv = $('<div>').append($('<span>').addClass('fa fa-chevron-right'));
	// ----------------------------------------
	// END Horizontal  ------------------
	// ----------------------------------------
	

	// ----------------------------------------
	// Build Final ------------------
	// ----------------------------------------

	if (opts.sliderButtonsUpDownEnable) {
		$vertical1.append($updiv);
		$vertical2.append($downdiv);
	}

	if (opts.sliderButtonsRightLeftEnable) {
		$horizontal.append($leftdiv,$rightdiv);
	}

	$controlFrame.append($vertical1).append($horizontal).append($vertical2);

	// append controlframe to 'this' carousel
	// pass this to a variable first and use here
	thisCarousel.append($controlFrame);
	// ----------------------------------------
	// END Build Final  ------------------
	// ----------------------------------------	

}

t6D1.horizontalEvents = function () {

	// these need to be changed to use event delegation because if the buttons are dynamically generated, regular event handling won't work

	thisCarousel.on('click','span.fa.fa-chevron-left', function(e) {
		e.preventDefault();
		// console.log('clicked left');
		t6D1.galleryspinLeftRight("left");
	});

	thisCarousel.on('click','span.fa.fa-chevron-right', function(e) {
		e.preventDefault();
		// console.log('clicked right');
		t6D1.galleryspinLeftRight("right");
	});
}

t6D1.verticalEvents = function () {

	// these need to be changed to use event delegation because if the buttons are dynamically generated, regular event handling won't work

	thisCarousel.on('click','span.fa.fa-chevron-up', function(e) {
		e.preventDefault();
		// console.log('clicked up');
		t6D1.galleryspinUpDown("up");
	});

	thisCarousel.on('click','span.fa.fa-chevron-down', function(e) {
		e.preventDefault();
		// console.log('clicked down');
		t6D1.galleryspinUpDown("down");
	});
}
////////////////////////////////////////////
// 		END NAVIGATION CONTROLS
////////////////////////////////////////////


////////////////////////////////////////////
// 		MODAL LARGE 1
////////////////////////////////////////////

t6D1.extractImgData = function (objItem) {
	// this method extracts the image link that's been included as attribute data-imagemodallink
	// EXAMPLE:  data-imagemodallink="http://demosthenes.info/assets/images/wanaka-tree.jpg"
	// EXAMPLE:  data-captionmodalinfo="Wanaka Tree"

	// create object to hold data and for later return
	var extractedData = {};

	// grab the value of the passed object
	extractedData.dataModalLink = objItem.attr('data-imagemodallink');
	extractedData.dataModalCaption = objItem.attr('data-captionmodalinfo');
	
	// return object
	return extractedData;
}

t6D1.buildLargeModal1 = function (dataObj) {
	// this method is used for constructing the modal on the fly

	// NOTE:  it'd probably be more data efficient to build the modal once and then change the data instead of building it every time an item is clicked

	var $section = $('<section>').addClass('largeModal1');

	// IMAGE DISPLAY  ------------------------------------------------
	var $displayField = $("<div>").addClass('displayField');
	var $imgFrame = $("<div>").addClass('imgFrame');
	var $img = $("<img>").attr('src', dataObj.dataModalLink);
	$imgFrame.append($img);
	$displayField.append($imgFrame);
	// END IMAGE DISPLAY ------------------------------------------------
	

	// CAPTION  ------------------------------------------------
	var $captionZone = $("<div>").addClass('caption');
	var $captionText = $("<p>").text(dataObj.dataModalCaption);
	$captionZone.append($captionText);
	// END CAPTION ------------------------------------------------

	return $section.append($displayField,$captionZone);

}

t6D1.buildLargeModal1OnLoad = function () {
	// NOTE:  it'd probably be more data efficient to build the modal once and then change the data instead of building it every time an item is clicked

	// NOTE:  it appears this option works best when using Browser Sync, which inserts an item for reload at the end, just before the closing body tag, this might interfere with appending to the body

	var $section = $('<section>').addClass('largeModal1');

	// IMAGE DISPLAY  ------------------------------------------------
	var $displayField = $("<div>").addClass('displayField');
	var $imgFrame = $("<div>").addClass('imgFrame');
	var $img = $("<img>");
	$imgFrame.append($img);
	$displayField.append($imgFrame);
	// END IMAGE DISPLAY ------------------------------------------------
	

	// CAPTION  ------------------------------------------------
	var $captionZone = $("<div>").addClass('caption');
	var $captionText = $("<p>");
	$captionZone.append($captionText);
	// END CAPTION ------------------------------------------------

	$section.append($displayField,$captionZone);
	// $("body").append($section);
	thisCarousel.append($section);
}

t6D1.largeModal1 = function () {

	// Saturday, May 23, 2015 8:39 PM:  current issue, z-index of the control frame puts the buttons above the images, we can't click them... have to change the z-index of the .controlframe

	// when you click on one of the carousel items...
	t6D1.items1.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// extract the link data from the image
		var linkData = t6D1.extractImgData($(this));

		// // store a reference to the large modal... we'll use this to check if it exists already
		// var $largeModalRef = $("body").find(".largeModal1");

		// if the large modal does exist simply alter the attributes
		if ($(".largeModal1")) {
			console.log('Changing modal...');
			// alter the existing modal
			
			var $largeModalRef = thisCarousel.find(".largeModal1");

			$largeModalRef.find('.imgFrame img').attr('src', linkData.dataModalLink);
			$largeModalRef.find('.caption p').text(linkData.dataModalCaption);
		}

		// if the large modal doesn't exist build it
		// Sunday, May 24, 2015 10:57 AM:  so far hasn't been working
		if (!$(".largeModal1")) {
			console.log('Building modal...');
			// build the large modal on the spot using extracted data object (means pass it as arg)
			var $largeModalBuilt = t6D1.buildLargeModal1(linkData);
			// append large modal to the body
			thisCarousel.append($largeModalBuilt);

			// store a reference to the modal now that it exists
			var $largeModalRef = thisCarousel.find(".largeModal1");
		}

		// hide the carousel controls so users aren't confused
		// could also use .hide()
		// thisCarousel.find('.controlframe').css('display', 'none');
		thisCarousel.find('.controlframe').hide('fast');

		// make the large modal appear
		$largeModalRef.css({
			display: 'flex',
			zIndex: '10'
		});
	});

	// when you click anywhere or hit a key, make the modal disappear
	$(".largeModal1").on('click', function(e) {
		e.stopPropagation();
		// make the modal disappear
		$(this).fadeOut('400').css('z-index', '0');
		// reveal the carousel controls
		thisCarousel.find('.controlframe').css('display', 'flex');
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27 ) {
			$(".largeModal1").fadeOut(400).css('z-index', '0');
			// reveal the carousel controls
			thisCarousel.find('.controlframe').css('display', 'flex');
		}
	});
}

////////////////////////////////////////////
// 		END MODAL LARGE 1
////////////////////////////////////////////


////////////////////////////////////////////
// 		INIT
////////////////////////////////////////////
// simply call the relevant methods/functions

t6D1.carouselDimensions();
t6D1.itemAngles();

t6D1.horizontalEvents();
t6D1.verticalEvents();

t6D1.autoScrollHorizontal();
t6D1.autoScrollVertical();

t6D1.changeTransOriginZOffset();

t6D1.setInitialRingPosition();
t6D1.setBaseZOffsetValue();

t6D1.buildControls();

t6D1.buildLargeModal1OnLoad();
t6D1.largeModal1();

////////////////////////////////////////////
// 		END INIT
////////////////////////////////////////////

return this;

};

