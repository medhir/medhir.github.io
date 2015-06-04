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

//create the tree
var mainTree = new BinaryTree(5);
var values = [3,7,1,4,6,8];
values.forEach(function(value) {
  mainTree.add(value);
});

var mainTreeContainer = d3.select('.mainTree')
  .append('svg')
  .attr({
    width: '600px', 
    height: '600px'
  });

var line = d3.svg.line()
             .x(function(d) {return d.x;})
             .y(function(d) {return d.y;})
             .interpolate('linear');

var createTree = function(tree, svgContainer) {

  tree.draw(30, 30, 50);

  var nodes = tree.nodeArray();
  var paths = tree.pathArray();


  tree.draw(100, 100, 50);

  paths.forEach(function(path) {
    svgContainer.append("svg:path")
    .attr("d", line(path))
    .style("stroke-width", "3")
    .style("stroke", "black")
    .style("fill", "none");
  });


  svgContainer.selectAll('circle')
  .data(nodes)
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

  svgContainer.selectAll('text')
              .data(nodes)
              .enter()
              .append('text')
              .text(function(d) {return d.value;})
              .attr({
                "text-anchor" : "middle", 
                x: function(d) {return d.x;},
                y: function(d) {return d.y+5;}
              });
};

var animateRight = function(tree, svgContainer) {
  tree.rotateRight();
  tree.draw(100, 100, 50);
  nodes = tree.nodeArray();
  paths = tree.pathArray();

  svgContainer.selectAll('circle')
  .data(nodes)
  .transition().duration(3000)
  .attr({
    cx: function(d) {return d.x + 'px'}, 
    cy: function(d) {return d.y + 'px'}
  });

  svgContainer.selectAll('text')
  .data(nodes)
  .transition().duration(3000)
  .attr({
    x: function(d) {return d.x;},
    y: function(d) {return d.y+5;}
  })
  .text(function(d) {return d.value;});

  svgContainer.selectAll('path')
  .data(paths)
  .transition().duration(3000)
  .attr("d", function(d) {return line(d);});
};

var animateLeft = function(tree, svgContainer) {
  tree.rotateLeft();
  tree.draw(100, 100, 50);
  nodes = tree.nodeArray();
  paths = tree.pathArray();

  svgContainer.selectAll('circle')
  .data(nodes)
  .transition().duration(3000)
  .attr({
    cx: function(d) {return d.x + 'px'}, 
    cy: function(d) {return d.y + 'px'}
  });

  svgContainer.selectAll('text')
  .data(nodes)
  .transition().duration(3000)
  .attr({
    x: function(d) {return d.x;},
    y: function(d) {return d.y+5;}
  })
  .text(function(d) {return d.value;});

  svgContainer.selectAll('path')
  .data(paths)
  .transition().duration(3000)
  .attr("d", function(d) {return line(d);});
};

createTree(mainTree, mainTreeContainer);


var linkedListTree = new BinaryTree(1);
var values = [2,3,4,5,6];
values.forEach(function(value) {
  linkedListTree.add(value);
});

var linkedListTreeContainer = d3.select('.linkedListTree')
  .append('svg')
  .attr({
    width: '600px', 
    height: '600px'
  });

createTree(linkedListTree, linkedListTreeContainer);

$('#linkedRotateLeft').on('click', function() {
  animateLeft(linkedListTree, linkedListTreeContainer);
});

$('#linkedRotateRight').on('click', function() {
  animateRight(linkedListTree, linkedListTreeContainer);
});
