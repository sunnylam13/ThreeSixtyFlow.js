////////////////////////////////////////////
///// 		360 CAROUSEL PLUGIN
///////////////////////////////////////////////
// this file is the main javascript file
// place this before the main javascript file "scripts.js"

$.fn.threeSixtyDim = function(options) {

	console.log('threeSixtyDim plugin active.');

	if (!this.length) { return this; }

	var opts = $.extend($.fn.pluginName.defaults, options);

	var t6D1 = {};

	// then below there you can add things
	t6D1.angle = 0;
	t6D1.netDegrees = 360;
	t6D1.spinner = $('#spinner');

	t6D1.leftPrev = $('span[data-dir1="left"]');
	t6D1.rightNext = $('span[data-dir1="right"]');
	// t6D1.items1 holds the items in the gallery... whether they're images or a div
	t6D1.items1 = $('#spinner img');

	t6D1.craftRotateString = function (axisString,angleValue) {
		var string = "rotate" + axisString + "(";
			string += angleValue;
			string += "deg)";
		return string;
	}

	t6D1.itemAngles = function () {
		// this function sets the initial item angle positions upon load before we do anything else... especially if our gallery is huge

		var totalItems = t6D1.items1.length;
		// may want to floor the value so you avoid decimals
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

			if (index == 0) {
				finalTarget.css('transform', 'rotateY(0deg)');
			}

			// you needed to use degreeCount not degreeItem otherwise all images would be set with the same angle
			finalTarget.css('transform', t6D1.craftRotateString("Y",degreeCount));

			degreeCount += degreeItem;
		});
	}

	t6D1.galleryspin = function (dirString) {

		// just realized that the angle adjustments must match the angle increments you calculated in object.itemAngles() method

		// this is used for the previous and next buttons
		if (dirString == "left") {
			t6D1.angle -= t6D1.degreeConstant;
			console.log(t6D1.angle);
		} else {
			t6D1.angle += t6D1.degreeConstant;
			
			console.log(t6D1.angle);
		}

		t6D1.spinner.css({
			'-webkit-transform': "rotateY("+ t6D1.angle +"deg) rotateX(-7deg)",
			'-moz-transform': "rotateY("+ t6D1.angle +"deg) rotateX(-7deg)",
			'transform': "rotateY("+ t6D1.angle +"deg) rotateX(-7deg)"
		});

		// t6D1.spinner.attr({
		// 	style: "-webkit-transform: rotateY("+ t6D1.angle +"deg); -moz-transform: rotateY("+ t6D1.angle +"deg); transform: rotateY("+ t6D1.angle +"deg);"	
		// });

		// setting the actual inline style attribute seems to result in real time changes
		// spinner.setAttribute("style","-webkit-transform: rotateY("+ t6D1.angle +"deg); -moz-transform: rotateY("+ t6D1.angle +"deg); transform: rotateY("+ t6D1.angle +"deg);");
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
		this.events();
	}

	$(function() {
		t6D1.init();
	});

	return this;
};

// default options
$.fn.threeSixtyDim.defaults = {
  // defaultOne: true,
  // defaultTwo: false,
  // defaultThree: 'yay!'
};