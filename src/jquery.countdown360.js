/*
 * jquery.countdown360
 *
 * Version 0.1
 *
 * Copyright (c) 2014
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

;(function ($, window, document, undefined) {
  var pluginName = "countdown360",
    defaults = {
      radius: 15.5,               // radius of arc
      strokeWidth: 3,             // the width of the stroke
      strokeStyle: "#477050",     // the color of the stroke
      fillStyle: "#8ac575",       // the fill color
      fontColor: "#477050",       // the font color
      fontFamily: "sans-serif",   // the font family
      fontSize: 20,               // the font size
      fontWeight: 700,            // the font weight
      autostart: true,            // start the countdown automatically
      seconds: 10,                // the number of seconds to count down
      onComplete: undefined
    };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.__init();
  }

  Plugin.prototype = {

    start: function () {
      this.startedAt = new Date();
      this.__drawCountdownShape(Math.PI*3.5, true);
      this.__drawCountdownLabel(0);
      this.interval = setInterval(jQuery.proxy(this.__draw, this), 1000);
    },

    stop: function (cb) {
      clearInterval(this.interval);
      if (cb) { cb(); }
    },

    __init: function () {
      this.settings.width = (this.settings.radius * 2) + (this.settings.strokeWidth * 2);
      this.settings.height = this.settings.width;
      this.settings.arcX = this.settings.radius + this.settings.strokeWidth;
      this.settings.arcY = this.settings.arcX;
      this.__initPen(this.__getCanvas());
      if (this.settings.autostart) { this.start(); }
    },

    __getCanvas: function () {
      var $canvas = $("<canvas id=\"countdown360_" + $(this.element).attr("id") + "\" width=\"" +
                      this.settings.width + "\" height=\"" +
                      this.settings.height + "\"></canvas>");
      $(this.element).prepend($canvas[0]);
      return $canvas[0];
    },

    __initPen: function (canvas) {
      this.pen          = canvas.getContext("2d");
      this.pen.lineWidth     = this.settings.strokeWidth;
      this.pen.strokeStyle   = this.settings.strokeStyle;
      this.pen.fillStyle     = this.settings.fillStyle;
      this.pen.font          = this.settings.fontWeight + " " + this.settings.fontSize + "px " + this.settings.fontFamily;
      this.pen.textAlign     = "center";
      this.pen.textBaseline  = "middle";
      this.__clearRect();
    },

    __clearRect: function () {
      this.pen.clearRect(0, 0, this.settings.width, this.settings.height);
    },

    __drawCountdownLabel: function (secondsElapsed) {
      this.pen.fillStyle = this.settings.fontColor;
      this.pen.fillText(this.settings.seconds - secondsElapsed, this.settings.width/2, this.settings.height/2);
    },

    __drawCountdownShape: function (endAngle, drawStroke) {
      this.pen.fillStyle = this.settings.fillStyle;
      this.pen.beginPath();
      this.pen.arc(this.settings.arcX, this.settings.arcY, this.settings.radius, Math.PI*1.5, endAngle, false);
      this.pen.fill();
      if (drawStroke) { this.pen.stroke(); }
    },

    __draw: function () {
      var secondsElapsed = Math.round((new Date().getTime() - this.startedAt.getTime())/1000),
          endAngle = (Math.PI*3.5) - (((Math.PI*2)/this.settings.seconds) * secondsElapsed);
      this.__clearRect();
      this.__drawCountdownShape(Math.PI*3.5, false);
      if (secondsElapsed < this.settings.seconds) {
        this.__drawCountdownShape(endAngle, true);
        this.__drawCountdownLabel(secondsElapsed);
      } else {
        this.__drawCountdownLabel(this.settings.seconds);
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


