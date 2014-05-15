# jQuery countdown360

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
    fillColor   : '#0276FD',
    strokeColor : '#003F87',
    fontSize    : 50,
    fontColor   : '#FFFFFF',
    autostart: false,
     onComplete  : function () { console.log('completed') }
   }).start()
```
	
## Default Options

```javascript
{
  radius: 15.5,               // radius of arc
  strokeWidth: 3,             // the width of the stroke
  strokeColor: "#477050",     // the color of the stroke
  fillColor: "#8ac575",       // the fill color
  fontColor: "#477050",       // the font color
  fontFamily: "sans-serif",   // the font family
  fontSize: 20,               // the font size
  fontWeight: 700,            // the font weight
  autostart: true,            // start the countdown automatically
  seconds: 10,                // the number of seconds to count down
  onComplete: undefined
}
```

## License

[MIT License](http://johnschult.mit-license.org/) © John Schult
