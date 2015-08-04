//paths.js

//configuration
var config = {
  height : parseInt(d3.select('.twelve').style('width'), 10) / 2,
  width : parseInt(d3.select('.twelve').style('width'), 10), 
  boardId: '#pathsBoard'
};

config.gridElement = config.height / 5;
config.gridElement -= 6;

/*

  Start with a game board, where i represents a row, and j represents a column

         0  1 ...n-1
      0 [ ][ ][ ][ ]
      1 [ ][ ][ ][ ]
    ... [ ][ ][ ][ ]
    n-1 [ ][ ][ ][ ]

  This will be the underlying data structure that is used by d3 to render the grid.

*/

//board data structure
var makeBoard = function(n, svg) {
  var block = config.gridElement;
  var board = [];
  board.size = n;
  board.solutionCount = 0;
  board.counter = d3.select('#solution')
                    .append('p')
                    .text('Counter: ' + board.solutionCount);
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push({
        visited: false, 
        /* 
          Here, a svg 'rect' element is created using d3. This will create individual boxes for the grid. 
          By adding it to the board data structure itself, it becomes easy to access the DOM element that 
          corresponds with the item in our 2D array.
        */
        element: svg.append('rect')
                    .attr({
                      width : block, 
                      height : block, 
                      x : i*block + block, 
                      y : j*block + block
                    })
                    .style({
                      fill : '#FFFFFF', 
                      'stroke-width' : 3, 
                      stroke : '#000000'
                    })
      });
    }
  }

  board.updateCount = function(i, j) {
    if(i === this.size-1 && j === this.size-1) this.solutionCount++;
    this.counter.text('possiblePaths: ' + this.solutionCount);
  }

  board.visit = function(i, j, time) {
    this[i][j].visited = true;
    this[i][j].element
              .transition()
              .duration(100)
              .delay(time*100)
              .style({
                fill : '#FF9900'
              })
              .each('interrupt', this.updateCount.call(this, i, j));
  }

  board.unVisit = function(i, j, time) {
    this[i][j].visited = false;
    this[i][j].element
              .transition()
              .duration(100)
              .delay(time*100)
              .style({
                fill : '#FFFFFF'
              });
  }

  board.hasBeenVisited = function(i, j) {
    return this[i][j].visited === true;
  }
  return board;
};

var svg = d3.select(config.boardId)
            .append('svg')
            .attr({
              width : config.width, 
              height: config.height
            });

var canMoveLeft = function(n, board, i, j) {
  if(j > 0 && !board.hasBeenVisited(i, j-1)) return true;
  return false;
}

var canMoveRight = function(n, board, i, j) {
  if(j < n-1 && !board.hasBeenVisited(i , j+1)) return true;
  return false;
}

var canMoveUp = function(n, board, i, j) {
  if(i > 0 && !board.hasBeenVisited(i-1, j)) return true;
  return false;
}

var canMoveDown = function(n, board, i, j) {
  if(i < n-1 && !board.hasBeenVisited(i+1, j)) return true;
  return false;
}

var robotPaths = function(n, board) {
  var possiblePaths = 0;
  var time = 1;
  var generatePaths = function(n, board, i, j) {
    //first toggle piece
    board.visit(i, j, time++);

    //if robot reaches bottom right corner, increment paths
    if(i === n-1 && j === n-1){
      ++possiblePaths; return;
    }

    //try moving right
    if(canMoveRight(n, board, i, j)) {
      generatePaths(n, board, i, j+1); 
      board.unVisit(i, j+1, time++); 
    }

    //try moving down
    if(canMoveDown(n, board, i, j)) {
      generatePaths(n, board, i+1, j); 
      board.unVisit(i+1, j, time++); 
    }

    //try moving left
    if(canMoveLeft(n, board, i, j)) {
      generatePaths(n, board, i, j-1); 
      board.unVisit(i, j-1, time++); 
    }

    //try moving up
    if(canMoveUp(n, board, i, j)) {
      generatePaths(n, board, i-1, j); 
      board.unVisit(i-1, j, time++);
    }
  }

  generatePaths(n, board, 0, 0);
  return possiblePaths;
};

var board = makeBoard(4, svg);
setTimeout(function() {
  robotPaths(4, board);
}, 1000);
