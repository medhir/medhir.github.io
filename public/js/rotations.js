//initialize tree
var BinaryTree = function(value, left, right) {
  this.value = value;
  this.left = left || null;
  this.right = right || null;
};

//insert
BinaryTree.prototype.add = function(value) {
  if(value > this.value) {
    this.right === null ? this.right = new BinaryTree(value) : this.right.add(value);
  } else {
    this.left === null ? this.left = new BinaryTree(value) : this.left.add(value);
  }
};

//Rotate right
BinaryTree.prototype.rotateRight = function() {
  //check for left child
  if(this.left === null) return;
  //left tree becomes new root
  var left = this.left;
  //old root is now at the right of the new root 
  var newRight = new BinaryTree(this.value, this.left.right, this.right);
  //left tree of root is now the right tree of the left tree of the old root
  this.value = left.value;
  this.left = left.left
  this.right = newRight;
};

//Rotate left 
BinaryTree.prototype.rotateLeft = function() {
  //right tree becomes new root 
  var right = this.right;
  //old root is now at the left of the new root 
  var newLeft = new BinaryTree(this.value, this.left, this.right.left);
  this.value = right.value;
  this.left = newLeft;
  this.right = right.right;
};


//create drawing
BinaryTree.prototype.draw = function(x, y, step) {
  var x = x;

  //knuth algorithm for generating coordinates
  var generateCoordinates = function(tree, y) {
    if(tree.left) generateCoordinates(tree.left, y + step);
    tree.x = x;
    tree.y = y;
    x += step;
    if(tree.right) generateCoordinates(tree.right, y + step);
  }

  generateCoordinates(this, y);
}

//array representation of nodes for d3 animations
BinaryTree.prototype.nodeArray = function() {
  var array = [];
  var generate = function(tree) {
    array.push({
      value : tree.value, 
      x: tree.x, 
      y: tree.y
    });
    if(tree.left) generate(tree.left);
    if(tree.right) generate(tree.right);
  }
  generate(this);
  return array;
}

//Array representation of links connecting the nodes
BinaryTree.prototype.pathArray = function() {
  var array = [];
  var generate = function(tree) {
    if(tree.left) {
      //push path to left child node
      array.push([
        {x: tree.x, y: tree.y}, 
        {x: tree.left.x, y: tree.left.y}
        ]);
      //generate paths one level down 
      generate(tree.left);
    }
    if(tree.right) {
      //push path to right child node
      array.push([
        {x: tree.x, y: tree.y}, 
        {x: tree.right.x, y: tree.right.y}
        ]);
      generate(tree.right);
    }
  }
  generate(this);
  return array;
};

var AnimatedTree = function(tree, className) {
  //stores tree and className
  this.tree = tree;
  this.className = '.' + className;

  //creates width and height values
  this.width = parseInt(d3.select(this.className).style('width'), 10);
  this.height = this.width; 

  console.log(this.width);

  this.createContainer();

  //generate coordinates and d3 arrays
  this.generate();

  //place tree in DOM
  this.drawPaths();
  this.drawNodes();

  // this.line = d3.svg.line()
  //            .x(function(d) {return d.x;})
  //            .y(function(d) {return d.y;})
  //            .interpolate('linear');
}


//creates svgContainer 
AnimatedTree.prototype.createContainer = function() {
  this.container = d3.select(this.className)
    .append('svg')
    .attr({
      width: this.width, 
      height: this.height
  });
};

//places tree on screen
AnimatedTree.prototype.drawNodes = function() {
  this.container.selectAll('circle')
              .data(this.nodes)
              .enter()
              .append('circle')
              .attr({
                r: 20,
                cx: function(d) {return d.x + 'px'}, 
                cy: function(d) {return d.y + 'px'}, 
                stroke : 'black', 
                "stroke-width" : "3", 
                fill : 'white', 
              });

  this.container.selectAll('text')
              .data(this.nodes)
              .enter()
              .append('text')
              .text(function(d) {return d.value;})
              .attr({
                "text-anchor" : "middle", 
                x: function(d) {return d.x;},
                y: function(d) {return d.y+5;}
              });
}

//helper method to create lines
AnimatedTree.prototype.line = d3.svg.line()
             .x(function(d) {return d.x;})
             .y(function(d) {return d.y;})
             .interpolate('linear');

AnimatedTree.prototype.drawPaths = function() {
  var that = this;

  this.paths.forEach(function(path) {
    that.container.append("svg:path")
    .attr("d", that.line(path))
    .style("stroke-width", "3")
    .style("stroke", "black")
    .style("fill", "none");
  });
}

AnimatedTree.prototype.generate = function() {
  //draw tree 
  this.tree.draw(30, 30, 50);

  //d3 data containing information about nodes and paths
  this.nodes = this.tree.nodeArray();
  this.paths = this.tree.pathArray();
};

AnimatedTree.prototype.animate = function() {
  this.container.selectAll('circle')
  .data(this.nodes)
  .transition().duration(3000)
  .attr({
    cx: function(d) {return d.x + 'px'}, 
    cy: function(d) {return d.y + 'px'}
  });

  this.container.selectAll('text')
  .data(this.nodes)
  .transition().duration(3000)
  .attr({
    x: function(d) {return d.x;},
    y: function(d) {return d.y+5;}
  })
  .text(function(d) {return d.value;});

  var that = this;

  this.container.selectAll('path')
  .data(this.paths)
  .transition().duration(3000)
  .attr("d", function(d) {return that.line(d);});
};

AnimatedTree.prototype.right = function() {
  this.tree.rotateRight();
  this.generate();
  this.animate();
};

AnimatedTree.prototype.left = function() {
  this.tree.rotateLeft();
  this.generate();
  this.animate();
};

var linkedListTree = new BinaryTree(1);
var values = [2,3,4,5,6];
values.forEach(function(value) {
  linkedListTree.add(value);
});

var mainTree = new BinaryTree(5);
var values = [3,7,1,4,6,8];
values.forEach(function(value) {
  mainTree.add(value);
});

var first = new AnimatedTree(linkedListTree, 'linkedListTree');
var second = new AnimatedTree(mainTree, 'mainTree');

$('#linkedRotateLeft').on('click', function() {
  first.right();
});

$('#linkedRotateRight').on('click', function() {
  first.left();
});
