;(function ($, window, document, undefined) {
  var pluginName = "countdown360",
    defaults = {
      radius: 15.5,               // radius of arc
      strokeStyle: "#477050",     // the color of the stroke
      strokeWidth: undefined,     // the stroke width, dynamically calulated if omitted in options
      fillStyle: "#8ac575",       // the fill color
      fontColor: "#477050",       // the font color
      fontFamily: "sans-serif",   // the font family
      fontSize: undefined,        // the font size, dynamically calulated if omitted in options
      fontWeight: 700,            // the font weight
      autostart: true,            // start the countdown automatically
      seconds: 10,                // the number of seconds to count down
      onComplete: undefined
    };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    if (!this.settings.fontSize) { this.settings.fontSize = this.settings.radius/1.2; }
    if (!this.settings.strokeWidth) { this.settings.strokeWidth = this.settings.radius/4; }
    this._defaults = defaults;
    this._name = pluginName;
    this._init();
  }

  Plugin.prototype = {

    start: function () {
      this.startedAt = new Date();
      this._drawCountdownShape(Math.PI*3.5, true);
      this._drawCountdownLabel(0);
      this.interval = setInterval(jQuery.proxy(this._draw, this), 1000);
    },

    stop: function (cb) {
      clearInterval(this.interval);
      if (cb) { cb(); }
    },

    _init: function () {
      this.settings.width = (this.settings.radius * 2) + (this.settings.strokeWidth * 2);
      this.settings.height = this.settings.width;
      this.settings.arcX = this.settings.radius + this.settings.strokeWidth;
      this.settings.arcY = this.settings.arcX;
      this._initPen(this._getCanvas());
      if (this.settings.autostart) { this.start(); }
    },

    _getCanvas: function () {
      var $canvas = $("<canvas id=\"countdown360_" + $(this.element).attr("id") + "\" width=\"" +
                      this.settings.width + "\" height=\"" +
                      this.settings.height + "\">" +
                      "<span id=\"countdown-text\" role=\"status\" aria-live=\"assertive\"></span></canvas>");
      $(this.element).prepend($canvas[0]);
      return $canvas[0];
    },

    _initPen: function (canvas) {
      this.pen              = canvas.getContext("2d");
      this.pen.lineWidth    = this.settings.strokeWidth;
      this.pen.strokeStyle  = this.settings.strokeStyle;
      this.pen.fillStyle    = this.settings.fillStyle;
      this.pen.textAlign    = "center";
      this.pen.textBaseline = "middle";
      this.ariaText = $(canvas).children("#countdown-text");
      this._clearRect();
    },

    _clearRect: function () {
      this.pen.clearRect(0, 0, this.settings.width, this.settings.height);
    },

    _drawCountdownLabel: function (secondsElapsed) {
      var secondsLeft = this.settings.seconds - secondsElapsed,
          label = secondsLeft === 1 ? "second" : "seconds";
      this.ariaText.text(secondsLeft);
      this.pen.fillStyle    = this.settings.fontColor;
      this.pen.font         = this.settings.fontWeight + " " + this.settings.fontSize + "px " + this.settings.fontFamily;
      this.pen.fillText(secondsLeft, this.settings.width/2, this.settings.height/2 - (this.settings.fontSize/6.2) );
      this.pen.font = "normal small-caps " + (this.settings.fontSize/3) + "px " + this.settings.fontFamily;
      this.pen.fillText(label, this.settings.width/2, this.settings.height/2 + (this.settings.fontSize/2.2));
    },

    _drawCountdownShape: function (endAngle, drawStroke) {
      this.pen.fillStyle = this.settings.fillStyle;
      this.pen.beginPath();
      this.pen.arc(this.settings.arcX, this.settings.arcY, this.settings.radius, Math.PI*1.5, endAngle, false);
      this.pen.fill();
      if (drawStroke) { this.pen.stroke(); }
    },

    _draw: function () {
      var secondsElapsed = Math.round((new Date().getTime() - this.startedAt.getTime())/1000),
          endAngle = (Math.PI*3.5) - (((Math.PI*2)/this.settings.seconds) * secondsElapsed);
      this._clearRect();
      this._drawCountdownShape(Math.PI*3.5, false);
      if (secondsElapsed < this.settings.seconds) {
        this._drawCountdownShape(endAngle, true);
        this._drawCountdownLabel(secondsElapsed);
      } else {
        this._drawCountdownLabel(this.settings.seconds);
        this.stop();
        this.settings.onComplete();
      }
    }

  };

  $.fn[pluginName] = function (options) {
    var plugin;
    this.each(function() {
      plugin = $.data(this, "plugin_" + pluginName);
      if (!plugin) {
        plugin = new Plugin(this, options);
        $.data(this, "plugin_" + pluginName, plugin);
      }
    });
    return plugin;
  };

})(jQuery, window, document);
