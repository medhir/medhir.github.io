var LineDancer = function (top, left) {
  Dancer.call(this, top, left);
  this.rotateRight(); // initialize with a right spin
};

LineDancer.prototype = Object.create(Dancer.prototype);
LineDancer.prototype.constructor = LineDancer;

LineDancer.prototype.makeBigger = function () {
  var getHuge = {
    height: "3%",
    width: "30%"
  };
  this.$node.css(getHuge);
};

LineDancer.prototype.makeSmaller = function () {
  var getTiny = {
    height: "3%",
    width: "30%"
  };
  this.$node.css(getTiny);
};

LineDancer.prototype.rotateRight = function () {
  this.$node.removeClass("rotate-left");
  this.$node.addClass("rotate-right");
};

LineDancer.prototype.rotateLeft = function () {
  this.$node.removeClass("rotate-right");
  this.$node.addClass("rotate-left");
};



