var ColorDancer = function (top, left) {
  LineDancer.call(this, top, left);

  var colors = ['red', 'yellow', 'blue'];
  var randomColor = Math.floor(Math.random() * colors.length);
  var colorProperty = {};
  colorProperty["background-color"] = colors[randomColor];

  this.$node.css(colorProperty);
}

ColorDancer.prototype = Object.create(LineDancer.prototype);
ColorDancer.prototype.constructor = ColorDancer;
