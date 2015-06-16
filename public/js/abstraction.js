//set element variables
var titleWidth = parseInt(d3.select('#titleContainer').style('width'), 10),
    titleHeight = titleWidth,
    radius = titleWidth/3, 
    lineWidth = titleWidth / 8,
    lineCount = 1000,
    lineHeight = 1,
    color = "white";

// d3.select('#titleContainer').append('h4')
//   .text('exploring abstraction')
//   .style({
//     'text-align': 'center'
//   });


// var abstractionHeight = parseInt(d3.select('#titleContainer h4').style('height'), 10);

// d3.select('#titleContainer h4')
//   .style({
//     'padding-top' : (titleHeight/2 - abstractionHeight) + 'px', 
//     'padding-bottom' : (titleHeight/2 - abstractionHeight) + 'px'
//   });

var appendLine = function(i, rotateClass) {
  var radian = i * Math.PI / 180;
  var x = (Math.round(titleWidth/2 + radius * Math.cos(radian)) - lineWidth/2) + 'px'; 
      y = (Math.round(titleHeight/2 + radius * Math.sin(radian))) + 'px'; 
  d3.select('#titleContainer').append("div")
                .attr("class", rotateClass)
                .style('top', y)
                .style('left', x)
                .style({ 
                  'background-color' : color, 
                  'height': lineHeight + 'px',
                  'width': lineWidth + 'px',
                  'position': 'absolute'
                });
};

var generateTitle = function(number, step, mobile) {
  if(mobile === true) {
    for(var i = 0; i < number; i++) {
      if(i % 2 === 0) appendLine(i, 'rotate-right');
      else appendLine(i, 'rotate-left');
    }
  } else {
    var count = 0; 
    var interval = setInterval(function(){
      appendLine(count, 'rotate-right');
      count++;
      if(count === number) clearInterval(interval);
    },step);
  }

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
};

if(titleWidth < 500) {
  generateTitle(360, 40, true);
} else {
  generateTitle(720, 20, false);
}
