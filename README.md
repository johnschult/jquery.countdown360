# jQuery countdown360

[![Build Status](https://travis-ci.org/johnschult/jquery.countdown360.svg)](https://travis-ci.org/johnschult/jquery.countdown360)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/johnschult/jquery.countdown360?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

### A simple countdown timer in seconds

This plugin provides a simple circular countdown timer with customizable settings.

[Check out a Demo](http://jsfiddle.net/johnschult/gs3WY/)

## Basic Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.countdown360.min.js"></script>
	```

3. Include the plugin container in your HTML:

  ```html
  <div id="countdown"></div>
  ```

3. Call the plugin:

  ```javascript
  $("#countdown").countdown360({
    radius      : 60.5,
    seconds     : 5,
    strokeWidth : 15,
    fillStyle   : '#0276FD',
    strokeStyle : '#003F87',
    fontSize    : 50,
    fontColor   : '#FFFFFF',
    autostart: false,
    onComplete  : function () { console.log('completed') }
  }).start()
  ```

## Default Options

```javascript
{
  radius: 15.5,                    // radius of arc
	strokeStyle: "#477050",          // the color of the stroke
	strokeWidth: undefined,          // the stroke width, dynamically calulated if omitted in options
	fillStyle: "#8ac575",            // the fill color
	fontColor: "#477050",            // the font color
	fontFamily: "sans-serif",        // the font family
	fontSize: undefined,             // the font size, dynamically calulated if omitted in options
	fontWeight: 700,                 // the font weight
	autostart: true,                 // start the countdown automatically
	seconds: 10,                     // the number of seconds to count down
	label: ["second", "seconds"],   // the label to use or false if none, first is singular form, second is plural
	startOverAfterAdding: true,      // Start the timer over after time is added with addSeconds
	onComplete: function () {}
}
```

## Functions

```
.start()             // starts the countdown timer
.stop()              // stops the countdown timer, onComplete is not called
.extendTimer(secs)   // extends the current timer by backing up by the number of seconds provided
.addSeconds(secs)    // adds additional seconds to the original timer and restarts if startOverAfterAdding is true
```

## Callbacks

```
onComplete					// The function defined in this option is called after the timer completes.
```

## Contributing

[See Contributing](https://github.com/johnschult/jquery.countdown360/blob/master/CONTRIBUTING.md)

## License

[MIT License](http://johnschult.mit-license.org/) © John Schult
