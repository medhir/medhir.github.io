var ColoredLine = function (top, left) {
  // debugger;
  Line.call(this, top, left);

  this.colors = ['red', 'yellow', 'blue'];
  this.randomColor = Math.floor(Math.random() * this.colors.length);
  this.colorProperty = {};
  this.colorProperty["background-color"] = this.colors[this.randomColor];

  this.$node.css(this.colorProperty);
};

ColoredLine.prototype = Object.create(Line.prototype);
ColoredLine.prototype.constructor = ColoredLine;

