//set element variables
var titleWidth = parseInt(d3.select('#titleContainer').style('width'), 10),
    titleHeight = titleWidth,
    radius = titleWidth/3, 
    lineWidth = titleWidth / 8,
    lineCount = 1000,
    lineHeight = 1,
    color = "white";

// d3.select('#titleContainer').selectAll("div")
//              .data(d3.range(lineCount))
//              .enter().append("div")
//              .attr("class", function(i) {
//                   if(i%2 === 0) return "rotate-right";
//                   else return "rotate-left";
//               })
//               .style('top', function(i) { return (Math.round(titleHeight/2 + radius * Math.sin(i))) + 'px'; })
//               .style('left', function(i) { return (Math.round(titleWidth/2 + radius * Math.cos(i)) - lineWidth/2) + 'px'; })
//               .style({ 
//                 'background-color' : color, 
//                 'height': lineHeight + 'px',
//                 'width': lineWidth + 'px',
//                 'position': 'absolute'
//               });

d3.select('#titleContainer').append('h4')
  .text('exploring abstraction')
  .style({
    'text-align': 'center'
  });


var abstractionHeight = parseInt(d3.select('#titleContainer h4').style('height'), 10);

d3.select('#titleContainer h4')
  .style({
    'padding-top' : (titleHeight/2 - abstractionHeight) + 'px', 
    'padding-bottom' : (titleHeight/2 - abstractionHeight) + 'px'
  });

var appendLine = function(i) {
  var x = (Math.round(titleWidth/2 + radius * Math.cos(i)) - lineWidth/2) + 'px'; 
      y = (Math.round(titleHeight/2 + radius * Math.sin(i))) + 'px'; 
  d3.select('#titleContainer').append("div")
                .attr("class", "rotate-right")
                .style('top', y)
                .style('left', x)
                .style({ 
                  'background-color' : color, 
                  'height': lineHeight + 'px',
                  'width': lineWidth + 'px',
                  'position': 'absolute'
                });
};

var generateTitle = function() {
  var count = 0; 
  var interval = setInterval(function(){
    appendLine(count);
    count++;
    if(count === 360) clearInterval(interval);
  },1);
};

generateTitle();
