var ExtendLine = function(top, left) {
  Line.call(this, top, left);
  this.$node.addClass("extend");

  var angle = Math.floor(Math.random() * 360);
  var angleString = "rotate(" + angle + "deg)";
  var newCss = {"-webkit-transform": angleString};

  // this.$node.css(skew);
};

ExtendLine.prototype = Object.create(Line.prototype);
ExtendLine.prototype.constructor = ExtendLine;

ExtendLine.prototype.lineUp = function() {
  var x = $('.partyScreen').width() / 2;
  var y = $('.partyScreen').height() / 2;
  this.animate(y, x, 2000);
};
