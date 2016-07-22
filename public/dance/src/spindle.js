var Spindle = function(top, left) {
  SpinningLine.call(this, top, left);
  SpinningLine.call(this, top, left);
};

Spindle.prototype = Object.create(SpinningLine.prototype);
Spindle.prototype.constructor = Spindle;
