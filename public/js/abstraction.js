//set element variables
var titleWidth = parseInt(d3.select('#titleContainer').style('width'), 10),
    titleHeight = titleWidth,
    radius = titleWidth/2.5, 
    lineWidth = titleWidth / 5,
    lineCount = 180,
    lineHeight = 1,
    speed = 0.075
    color = "white";

var svgContainer = d3.select('#titleContainer')
                     .append('svg')
                     .attr({
                        width: titleWidth,
                        height: titleHeight
                     });

var circle = d3.select('#titleContainer').selectAll("span")
             .data(d3.range(lineCount))
             .enter()
             .append("span")
             .attr({
              className: function(i) {
                if(i%2 === 0) return "rotate-right";
                return "rotate-left"
              }, 
              style({
                top: function(i) {
                  return Math.round(titleHeight/2 + radius * Math.sin(i)) - lineWidth/2;
                }, 
                left: function(i) {
                  return Math.round(titleWidth/2 + radius * Math.sin(i))
                }, 

              });

console.dir(circle);

d3.timer(function(elapsed) {
  d3.selectAll('rect')
      .attr("transform", function(t) { return "rotate(" + (t * 360 + elapsed * speed) + ")"; });
});

