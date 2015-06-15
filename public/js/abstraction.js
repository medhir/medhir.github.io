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

var appendLine = function(i) {
  var radian = i * Math.PI / 180;
  var x = (Math.round(titleWidth/2 + radius * Math.cos(radian)) - lineWidth/2) + 'px'; 
      y = (Math.round(titleHeight/2 + radius * Math.sin(radian))) + 'px'; 
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

var generateTitle = function(number) {
  var count = 0; 
  var interval = setInterval(function(){
    appendLine(count);
    count++;
    if(count === number) clearInterval(interval);
  },20);

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

generateTitle(720);
