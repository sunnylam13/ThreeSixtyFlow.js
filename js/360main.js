////////////////////////////////////////////
///// 		360 CAROUSEL PLUGIN
///////////////////////////////////////////////
// this file is the main javascript file
// place this before the main javascript file "scripts.js"

$.fn.threeSixtyDim = function(options) {

	console.log('threeSixtyDim plugin active.');

	if (!this.length) { return this; }

	var opts = $.extend(true, {}, $.fn.pluginName.defaults, options);

	this.each(function() {
	var $this = $(this);

	});

	return this;
};

// default options
$.fn.pluginName.defaults = {
  defaultOne: true,
  defaultTwo: false,
  defaultThree: 'yay!'
};