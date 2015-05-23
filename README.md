# ThreeSixtyFlow.js

This plugin gives you the ability to quickly and easily create a 3D carousel slider for your web site *without* having to:

* Do the math for Javascript or CSS transforms yourself. (If you hate doing math yet want your gallery to appear like it's floating in space this plugin is for you.)
* Figure out how to position the slider buttons using CSS for up-down or right-left scrolling.  (Flexbox in the CSS solves all your positioning woes and you can switch these controls on or off using simple true/false statements -- use them only if you need them.)
* Crafting your own animation sequence to make the 3D carousel move on its own.

## What Else Can It Do For You?

The plugin will...

* Show more than just images... you can also use `<div>`, `<section>` or other kind of elements as "slides".  (Simply change the `itemTarget` property from `#spinner img` to `#spinner YOURELEMENTBLOCK`)
* Display dozens of images or other element blocks -- ThreeSixtyFlow adapts and expands to hold them all with plenty of space in between thanks to the power of math.

## What This Plugin Does Not Do

This plugin isn't for every developer's case.

* This plugin does not make the 3D image carousel responsive.
* The images do not rotate images when the carousel is vertical in any way at this time due to a limitation on the way `transform-origin` was used.
* If you set the carousel to be perfectly vertical on the screen like a pole, the images will rotate so that they're in the right orientation however it's not perfect... yet.
* The size of image items or other display items is limited to 425px at this time.  (You can change this in the CSS however you'll have to play with the `translateY` and `translateX` plugin options -- see below.)

If neither of these facts is an issue for you, feel free to grab this plugin and use it.

## How to Use It

### HTML

First setup your HTML file to: 

* have one parent element with the id of `#carousel` (or whatever you want...)
* under the parent, have a child list `<ul>` with id of `#spinner` (the `#spinner` is needed for this plugin so it's a **must have**... also recommend using `<ul>`)
* have each of your images inside of each of the `<li>` elements

See the code example below:

	<section id="carousel">
	  <ul id="spinner">
	        <li><img src="http://demosthenes.info/assets/images/wanaka-tree.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/still-lake.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/pink-milford-sound.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/paradise.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/morekai.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/milky-blue-lagoon.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/lake-tekapo.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/wanaka-tree.jpg" alt=""/></li>
	        <li><img src="http://demosthenes.info/assets/images/milford-sound.jpg" alt=""/></li>
	  </ul>

You can have as many 3D carousels you want as long as you follow the above structure each time.

#### Jade Note

The original Jade node templating files I used are provided as well.  

You will find most of the test/demo code in `mixins.project.041415.1.jade`.


### CSS

The original CSS code was written with SCSS however it was compiled to an un-minified version (`style.css`).

The un-minified CSS however lacks any comments.

If you want to change the stylesheet you should reference `style.css` and overwrite the properties in your own customized stylesheet that is loaded last in your HTML or Jade file.

You should probably use the SCSS file if you can.  

The file to use is `360main.scss` in the `css/partials/` folder.

NOTE:  The stylesheet does import Font Awesome 4.3.0 for the slider buttons.

### Javascript

The Javascript is un-minified so if you need to "peek under the hood" you shouldn't have any trouble.

What follows are use cases.

#### Basic Use Case

To use the plugin simply give it a reference.

For example:

	var $parentElement = $('#carousel');

	$parentElement.threeSixtyDim();

This will create your ThreeSixtyFlow carousel with the default options.

#### Passing Options Case

What if you don't want the default settings?

You can pass options to the plugin using an object.

**Example**: Setting the carousel to automatically scroll and rotate to the right.

	var $parentElement = $('#carousel');

	var tDOptions = {
		autoScrollHorizontalEnable: true,
		autoScrollToRight: true
	};

	$parentElement.threeSixtyDim(tDOptions);

or...

	var $parentElement = $('#carousel');

	$parentElement.threeSixtyDim({
		autoScrollHorizontalEnable: true,
		autoScrollToRight: true
	});

The full list of options is detailed below.

### Options

Here are the current options you can use.

#### upDownIncrement

*Default*:  `7`
*Units*: `deg`

The value is the number of degrees either up or down that the carousel shifts when you click one of the vertical slider buttons.

#### baseZOffsetValue

*Default*:  `-2000`
*Units*: `px`

The value is the number of pixels that the #spinner and your images (or elements) are from the origin.  

Typically this is `transform-origin: 50% 50% -2000px`.  

The -2000 is the recommended value in almost all cases and works well for sets of 45 images or more.  

The plugin automatically changes the z-offset value as the number of items in the carousel increases.

#### changeInitialRingPosition

*Default*: `false`

Setting this to `true` allows you to rotate the carousel on page load to a certain angled position.

Normal slider rotations using buttons won't work normally however.

For anything to happen, you must also change `rotateX` and/or `rotateY` options.

#### itemTarget

*Default*: `'#spinner img'`

By default, the plugin finds `#spinner img` to build your 3D carousel.

If you want to display something else however like a PDF in an `<iframe>` for example then you might change this to `#spinner iframe`.

This assumes that the `<img>` or other element is wrapped by a `<li>` element.

#### rotateX

*Default*: `0`
*Units*: `deg`

This is the number of degrees that the carousel is rotated from the X axis or horizontal plane.

To change the initial rotation of the carousel upon page load, `changeInitialRingPosition` must be `true`.

#### rotateY

*Default*: `0`
*Units*: `deg`

This is the number of degrees that the carousel is rotated from the Y axis or vertical plane.

To change the initial rotation of the carousel upon page load, `changeInitialRingPosition` must be `true`.

#### translateY

*Default*: `-6.5`
*Units*: `em`

This is the number of `em` that the carousel and its children are shifted from the origin along the Y axis. 

It is used with the `translateX` property to centre the first loaded image in the screen.

If you change the size of the images in the CSS you may have to change this option.

To change the initial rotation of the carousel upon page load, `changeInitialRingPosition` must be `true`.

#### translateX

*Default*: `-9`
*Units*: `em`

This is the number of `em` that the carousel and its children are shifted from the origin along the X axis. 

It is used with the `translateY` property to centre the first loaded image in the screen.

If you change the size of the images in the CSS you may have to change this option.

To change the initial rotation of the carousel upon page load, `changeInitialRingPosition` must be `true`.

#### autoScrollHorizontalTime

*Default*: `10000`
*Units*: ms (1000 ms = 1s)

This is the amount of delay time before the carousel rotates to the next image (so that that image is front and centre).

`autoScrollHorizontalEnable` must be `true` for this to matter.

#### autoScrollVerticalTime

*Default*: `100`
*Units*: ms (1000 ms = 1s)

This is the amount of delay time before the carousel rotates along the X axis.

`autoScrollVerticalEnable` must be `true` for this to matter.

#### autoScrollHorizontalEnable

*Default*: `false`

This is the auto scroll or rotate feature that spins the #spinner so that the next image is front and centre.

The amount of time before scrolling happens is set by `autoScrollHorizontalTime`.  

The direction is controlled by `autoScrollToRight` and `autoScrollToLeft`.

#### autoScrollVerticalEnable

*Default*: `false`

This rotation feature is mostly for fun than for any practical use.

The carousel acts like a paddlewheel of a steam boat.

The amount of time before scrolling happens is set by `autoScrollVerticalTime`.  

The direction is controlled by `autoScrollToTop` and `autoScrollToBottom`.

#### autoScrollToRight

*Default*: `true`

When `autoScrollHorizontalEnable` is `true` the carousel always rotates towards the right by default.

#### autoScrollToLeft

*Default*: `false`

Set `autoScrollHorizontalEnable` to `true`, `autoScrollToRight` to `false` and set this to `true` to make the carousel automatically spin towards the left.

#### autoScrollToTop

*Default*: `true`

When `autoScrollVerticalEnable` is `true` the carousel always rotates towards the top by default.

#### autoScrollToBottom

*Default*: `false`

Set `autoScrollVerticalEnable` to `true`, `autoScrollToTop` to `false` and set this to `true` to make the carousel automatically spin towards the bottom.

#### sliderButtonsRightLeftEnable

*Default*: `true`

By default the previous and next slider rotation buttons are available and visible.

If set to `false`, they aren't built 'on the fly' by the plugin and are unavailable for the user.

#### sliderButtonsUpDownEnable

*Default*: `true`

By default the up and down slider rotation buttons are available and visible.

If set to `false`, they aren't built 'on the fly' by the plugin and are unavailable for the user.

#### rotateZImages

*Default*: `true`

By default this is set to `true`.  

If the options `rotateX` and/or `rotateY` are not exactly 0, the images automatically rotate along the Z-axis so that the images remain "right side up"...

They don't rotate and face the same way as the carousel #spinner.