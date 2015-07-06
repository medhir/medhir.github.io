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

  //set correct values for the new, rotated tree.
  this.value = left.value;
  this.left = left.left
  this.right = newRight;
};

//Rotate left 
BinaryTree.prototype.rotateLeft = function() {
  //check for right child
  if(this.right === null) return;
  //right tree becomes new root 
  var right = this.right;
  //old root is now at the left of the new root 
  var newLeft = new BinaryTree(this.value, this.left, this.right.left);

  //set correct values for the new, rotated tree
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
};

/* Tree Traversal Methods */

BinaryTree.prototype.PreOrder = function(cb) {
  cb(this);
  if(this.left) this.left.PreOrder(cb);
  if(this.right) this.right.PreOrder(cb);
};

BinaryTree.prototype.InOrder = function(cb) {
  if(this.left) this.left.InOrder(cb);
  cb(this);
  if(this.right) this.right.InOrder(cb);
};

BinaryTree.prototype.PostOrder = function(cb) {
  if(this.left) this.left.PostOrder(cb);
  if(this.right) this.right.PostOrder(cb);
  cb(this);
};

BinaryTree.prototype.LevelOrder = function(cb) {
  var q = [];
  var node = this;
  while(node !== null) {
    cb(node);
    if(node.left) q.push(node.left); 
    if(node.right) q.push(node.right);
    q.length ? node = q.shift() : node = null;
  }
}

//array representation of nodes for d3 animations
BinaryTree.prototype.nodeArray = function() {
  var array = [];

  this.InOrder(function(node) {
    array.push({
      value : node.value, 
      x : node.x, 
      y : node.y
    });
  });

  return array;
}

//Array representation of links connecting the nodes
BinaryTree.prototype.pathArray = function() {
  var array = [];

  this.InOrder(function(node) {
    if(node.left) {
      //push path to left child node
      array.push([
        {x: node.x, y: node.y}, 
        {x: node.left.x, y: node.left.y}
        ]);
    }
    if(node.right) {
      //push path to right child node
      array.push([
        {x: node.x, y: node.y}, 
        {x: node.right.x, y: node.right.y}
        ]);
    }
  });
  
  return array;
};

var AnimatedTree = function(tree, className) {
  //stores tree and className
  this.tree = tree;
  this.className = '.' + className;

  //creates width and height values
  this.width = parseInt(d3.select(this.className).style('width'), 10);
  this.height = this.width * 3/4; 

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

AnimatedTree.prototype.add = function(value) {
  this.tree.add(value);
  this.generate();
  this.drawNodes();
  this.animate();
}

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


var structure = new BinaryTree(5);
var values = [3,7,1,4,6,8];
values.forEach(function(value){
  structure.add(value);
});


var structureTree = new AnimatedTree(structure, 'structureTree');


var linkedListTree = new BinaryTree(1);
var values = [2,3,4,5,6];
values.forEach(function(value){
  linkedListTree.add(value);
});


var linked = new AnimatedTree(linkedListTree, 'linkedListTree');

$('#linkedRotateLeft').on('click', function() {
  linked.left();
});

$('#linkedRotateRight').on('click', function() {
  linked.right();
});


var tree1 = new BinaryTree(7);
var values = [3,8,4,6,5,1];
values.forEach(function(value){
  tree1.add(value);
});

var tree1animate = new AnimatedTree(tree1, 'tree1');

$('#tree1Left').on('click', function() {
  tree1animate.left();
});

$('#tree1Right').on('click', function() {
  tree1animate.right();
});

var tree2 = new BinaryTree(10);
var values = [5,14,3,50,13,4];
values.forEach(function(value){
  tree2.add(value);
});

var tree2animate = new AnimatedTree(tree2, 'tree2');

$('#tree2Left').on('click', function() {
  tree2animate.left();
});

$('#tree2Right').on('click', function() {
  tree2animate.right();
});
