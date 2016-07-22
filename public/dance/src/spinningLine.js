var SpinningLine = function (top, left) {
  Line.call(this, top, left);
  var number = Math.floor(Math.random()*10);
  number % 2 === 0 ? this.rotateRight() : this.rotateLeft();
};

SpinningLine.prototype = Object.create(Line.prototype);
SpinningLine.prototype.constructor = SpinningLine;

SpinningLine.prototype.makeBigger = function () {
  var getHuge = {
    height: "3%",
    width: "30%"
  };
  this.$node.css(getHuge);
};

SpinningLine.prototype.makeSmaller = function () {
  var getTiny = {
    height: "3%",
    width: "30%"
  };
  this.$node.css(getTiny);
};

SpinningLine.prototype.rotateRight = function () {
  this.$node.removeClass("rotate-left");
  this.$node.addClass("rotate-right");
};

SpinningLine.prototype.swapDirection = function() {
  this.$node.toggleClass("rotate-left");
  this.$node.toggleClass("rotate-right");
}

SpinningLine.prototype.rotateLeft = function () {
  this.$node.addClass("rotate-left");
};

SpinningLine.prototype.disableSpin = function () {
  this.$node.removeClass("rotate-right rotate-left");
};
