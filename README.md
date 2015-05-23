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
* The size of image items or other display items is limited to 425px at this time.

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

You can have as many 3D carousels you want as long as you follow the above format of pl

#### Jade Note

The original Jade node templating files I used are provided as well.  

You will find most of the test/demo code in `mixins.project.041415.1.jade`.


### CSS

