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

// default options are found at bottom of file
var opts = $.extend(true, {}, $.fn.pluginName.defaults, options);

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
	// floor the value so you avoid decimals
	// var degreeItem = t6D1.netDegrees/totalItems;
	var degreeItem = Math.floor(t6D1.netDegrees/totalItems);
	t6D1.degreeConstant = degreeItem;
	var degreeCount = degreeItem;

	// for (var i = 0; i < t6D1.items1.length; i++) {
	// 	if (i == 0) {
	// 		t6D1.items1[i].css('transform', 'rotateY(0deg)');
	// 	} else {
	// 		t6D1.items1[i].css('transform', t6D1.craftRotateString("Y",degreeItem));

	// 		degreeCount += degreeItem;
	// 	}
	// }

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
	} else {
		t6D1.angleYVer += t6D1.degreeConstant;
		
		console.log(t6D1.angleYVer);
	}

	// this is used for up and down buttons
	if (verString == "down") {
		t6D1.angleXHor -= opts.upDownIncrement;
		console.log(t6D1.angleXHor);
	} else {
		t6D1.angleXHor += opts.upDownIncrement;
		console.log(t6D1.angleXHor);
	}

	// EXAMPLE:  transform: rotateY(0deg) rotateX(0deg) translateY(-6.5em) translateX(-9em);

	t6D1.spinner.css(transformObj);

}

t6D1.horizontalEvents = function () {
	$(t6D1.leftPrev).on('click', function(e) {
		e.preventDefault();
		console.log('clicked left');
		// var dirString = t6D1.leftPrev.attr('data-dir1').val();
		// console.log(dirString);
		// t6D1.galleryspin(dirString);
		t6D1.galleryspin("left");
	});

	$(t6D1.rightNext).on('click', function(e) {
		e.preventDefault();
		console.log('clicked right');
		// var dirString = t6D1.rightNext.attr('data-dir1').val();
		// console.log(dirString);
		// t6D1.galleryspin(dirString);
		t6D1.galleryspin("right");
	});
}

t6D1.verticalEvents = function () {
	// body...
}

t6D1.init = function () {
	t6D1.horizontalEvents();
}

$(function() {
	t6D1.init();
});

return this;

};

// default options
$.fn.threeSixtyDim.defaults = {
	upDownIncrement: 7,
	translateY: -6.5,
	translateX: -9
};