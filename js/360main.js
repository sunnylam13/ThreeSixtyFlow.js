////////////////////////////////////////////
///// 		360 CAROUSEL PLUGIN
///////////////////////////////////////////////
// this file is the main javascript file
// place this before the main javascript file "scripts.js"

$.fn.threeSixtyDim = function(options) {

console.log('threeSixtyDim plugin active.');

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
	upDownIncrement: 7,
	// these are the default values for starting position of #spinner
	rotateX: 0,
	rotateY: 0,
	translateY: -6.5,
	translateX: -9,
	autoScrollHorizontalTime: 10000,
	autoScrollVerticalTime: 100,
	autoScrollHorizontalEnable: false,
	autoScrollVerticalEnable: false,
	autoScrollToRight: true,
	autoScrollToLeft: false,
	autoScrollToTop: true,
	autoScrollToBottom: false,
	baseZOffsetValue: -2000,
	sliderButtonsRightLeftEnable: true,
	sliderButtonsUpDownEnable: true
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
t6D1.spinner = this.find('#spinner');
// t6D1.spinner = $('#spinner');
t6D1.items1 = this.find('#spinner img');
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


t6D1.craftRotateString = function (axisString,angleValue) {
	// this is the initial image angle when plugin loads
	// EXAMPLE:  transform: rotateY(0deg);
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

	$.each(t6D1.items1, function(index, target) {
		// what we have here is an array of objects
		// console.log(index,target);

		// I had to store the target in the $() so that it became a jQuery object, otherwise jQuery methods wouldn't work
		var finalTarget = $(target);

		// the first gallery item should always have a rotateY(0deg)
		if (index == 0) {
			finalTarget.css('transform', 'rotateY(0deg)');
		}

		// you needed to use degreeCount not degreeItem otherwise all images would be set with the same angle
		finalTarget.css('transform', t6D1.craftRotateString("Y",degreeCount));

		degreeCount += degreeItem;
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

t6D1.galleryspin = function (horString,verString,transformObj) {

	// where horString is the "left" or "right" string passed from the previous/next buttons
	// where verString is the "up" or "down" string passed from the up/down buttons

	// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

	// this is used for the previous and next buttons
	if (horString == "left") {
		t6D1.angleYVer -= t6D1.degreeConstant;
		console.log(t6D1.angleYVer);
	} else if (horString == "right") {
		t6D1.angleYVer += t6D1.degreeConstant;
		
		console.log(t6D1.angleYVer);
	}

	// if (horString == "left") {
	// 	t6D1.angleYVer -= t6D1.degreeConstant;
	// 	console.log(t6D1.angleYVer);
	// } else {
	// 	t6D1.angleYVer += t6D1.degreeConstant;
		
	// 	console.log(t6D1.angleYVer);
	// }

	// this is used for up and down buttons
	if (verString == "down") {
		t6D1.angleXHor -= opts.upDownIncrement;
		console.log(t6D1.angleXHor);
	} else if (verString == "up") {
		t6D1.angleXHor += opts.upDownIncrement;
		console.log(t6D1.angleXHor);
	}

	// if (verString == "down") {
	// 	t6D1.angleXHor -= opts.upDownIncrement;
	// 	console.log(t6D1.angleXHor);
	// } else {
	// 	t6D1.angleXHor += opts.upDownIncrement;
	// 	console.log(t6D1.angleXHor);
	// }

	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);

	t6D1.spinner.css(transformObj);
}

t6D1.galleryspinLeftRight = function (horString) {

	// where horString is the "left" or "right" string passed from the previous/next buttons
	// where verString is the "up" or "down" string passed from the up/down buttons

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

	// where horString is the "left" or "right" string passed from the previous/next buttons
	// where verString is the "up" or "down" string passed from the up/down buttons

	// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

	// a user is only likely to click one button at a time

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

t6D1.autoScrollHorizontal = function () {
	// this must be called in init

	if (opts.autoScrollHorizontalEnable) {

		if (opts.autoScrollToRight) {
			// https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
			// console.log('Right scroll set.');
			setInterval( function() { t6D1.galleryspinLeftRight("right"); }, opts.autoScrollHorizontalTime );
		}

		if (opts.autoScrollToLeft) {
			// https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
			// console.log('Left scroll set.');
			setInterval( function() { t6D1.galleryspinLeftRight("left"); }, opts.autoScrollHorizontalTime );
		}
		
	}

}

t6D1.autoScrollVertical = function () {
	// this must be called in init
	
	if (opts.autoScrollVerticalEnable) {
		
		if (opts.autoScrollToTop) {
			setInterval(function () {
				t6D1.galleryspinUpDown("up");
			}, opts.autoScrollVerticalTime)
		}

		if (opts.autoScrollToBottom) {
			setInterval(function () {
				t6D1.galleryspinUpDown("down");
			}, opts.autoScrollVerticalTime)
		}

	}
}

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
	// should result in "-2000px"
	
	// now extract the number as a string and convert to a number
	currentZOffSet = currentZOffSet.toString().match(/^(\-*)(\d+)/gm);

	// convert string to integer
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
	if (addedUnits >= 0 && addedUnits < 1) {
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

t6D1.horizontalEvents = function () {
	$(t6D1.leftPrev).on('click', function(e) {
		e.preventDefault();
		// console.log('clicked left');
		t6D1.galleryspinLeftRight("left");
	});

	$(t6D1.rightNext).on('click', function(e) {
		e.preventDefault();
		// console.log('clicked right');
		t6D1.galleryspinLeftRight("right");
	});
}

t6D1.verticalEvents = function () {
	$(t6D1.upRotate).on('click', function(e) {
		e.preventDefault();
		// console.log('clicked up');
		t6D1.galleryspinUpDown("up");
	});

	$(t6D1.downRotate).on('click', function(e) {
		e.preventDefault();
		// console.log('clicked down');
		t6D1.galleryspinUpDown("down");
	});
}

////////////////////////////////////////////
// 		INIT
////////////////////////////////////////////
// simply call the relevant methods/functions

t6D1.itemAngles();

t6D1.horizontalEvents();
t6D1.verticalEvents();

t6D1.autoScrollHorizontal();
t6D1.autoScrollVertical();

t6D1.changeTransOriginZOffset();

////////////////////////////////////////////
// 		END INIT
////////////////////////////////////////////

return this;

};

