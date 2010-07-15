var colors = {
  'gray': {
    'left'  : '45-#777-#aaa',
    'right' : '135-#aaa-#ddd',
    'top'   : '45-#aaa-#eee',
    'bottom': '45-#888-#999',
    'front' : '225-#eee-#777',
    'stroke': '#999'
  },
  'red': {
    'left'  : '45-#f77-#faa',
    'right' : '135-#faa-#fdd',
    'top'   : '45-#faa-#fee',
    'bottom': '45-#f88-#f99',
    'front' : '225-#fee-#f77',
    'stroke': '#f99'
  },
  'green': {
    'left'  : '45-#7f7-#afa',
    'right' : '135-#afa-#dfd',
    'top'   : '45-#afa-#efe',
    'bottom': '45-#8f8-#9f9',
    'front' : '225-#efe-#7f7',
    'stroke': '#9f9'
  },
  'blue': {
    'left'  : '45-#77f-#aaf',
    'right' : '135-#aaf-#ddf',
    'top'   : '45-#aaf-#eef',
    'bottom': '45-#88f-#99f',
    'front' : '225-#eef-#77f',
    'stroke': '#99f'
  },
  'panel': {
    'top'   : '90-#aaa-#fbfbfb',
    'stroke': '#fff'
  }
};

var line = function(paper, p1, p2) {
  var cx = paper.cx;
  var cy = paper.cy;
  var square = paper.square;
  return paper.path(
    "M" + parseInt(p1.x / p1.z * square + cx) + "," +
          parseInt(p1.y / p1.z * square + cy) +
    "L" + parseInt(p2.x / p2.z * square + cx) + "," +
          parseInt(p2.y / p2.z * square + cy));
};

var threeToScreen = function(paper, x, y, z) {
  var sx = x / z * paper.square + paper.cx;
  var sy = y / z * paper.square + paper.cy;
  return {x:sx, y:sy};
};

var screenToThree = function(paper, sx, sy) {
  var cx = paper.width/2.0, cy = 0.0;
  var square = Math.sqrt(paper.width * paper.height);
  var y = 1.0; // Assume we want the point that lies on the calendar plane
  var z = (y*square)/sy;
  var x = z*(sx-cx)/square;
  return {x:x, y:y, z:z};
};

var Cube = function(paper, attrs) {

  $.extend(this, {
    x: 0.0,
    y: 0.0,
    z: 0.0,
    w: 0.1,
    h: 0.1,
    d: 0.1,
    color: 'gray',
    paper: paper,

    // Set the size of the cube (Width, Height, Depth)
    size: function(w, h, d) {
      this.w = w; this.h = h; this.d = d;
      return this;
    },

    // Position the cube using the center of the cube
    center: function(x, y, z) {
      this.x = x - this.w / 2;
      this.y = y - this.h / 2;
      this.z = z - this.d / 2;
      return this;
    },

    // Position the cube using the bottom-front-left corner of the cube
    corner: function(x, y, z) {
      this.x = x; this.y = y; this.z = z;
      return this;
    },


    quad: function(p1, p2, p3, p4) {
      var cx = this.paper.cx, cy = this.paper.cy;
      var square = this.paper.square;
      return this.paper.path(
        "M" + parseInt(p1.x / p1.z * square + cx) + "," +
              parseInt(p1.y / p1.z * square + cy) +
        "L" + parseInt(p2.x / p2.z * square + cx) + "," +
              parseInt(p2.y / p2.z * square + cy) +
        "L" + parseInt(p3.x / p3.z * square + cx) + "," +
              parseInt(p3.y / p3.z * square + cy) +
        "L" + parseInt(p4.x / p4.z * square + cx) + "," +
              parseInt(p4.y / p4.z * square + cy) +
        "z");
    },

    draw: function() {
      var paper = this.paper;
      var w2 = this.w/2, h2 = this.h/2, d2 = this.d/2;
      var attr = {stroke: colors[this.color].stroke};
      this.set = this.paper.set();

      this.screen = threeToScreen(this.paper, this.x, this.y, this.z);

      // Left face
      if (this.x > 0)
        this.set.push(this.leftFace = this.quad(
          {x:this.x, y:this.y-this.h, z:this.z},
          {x:this.x, y:this.y, z:this.z},
          {x:this.x, y:this.y, z:this.z+this.d},
          {x:this.x, y:this.y-this.h, z:this.z+this.d}).
            attr($.extend({fill: colors[this.color].left}, attr)));

      // Right face
      if (this.x < 0)
        this.set.push(this.rightFace = this.quad(
          {x:this.x+this.w, y:this.y-this.h, z:this.z},
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y, z:this.z+this.d},
          {x:this.x+this.w, y:this.y-this.h, z:this.z+this.d}).
            attr($.extend({fill: colors[this.color].right}, attr)));

      // Top face
      if (this.y > 0)
        this.set.push(this.topFace = this.quad(
          {x:this.x, y:this.y-this.h, z:this.z+this.d},
          {x:this.x+this.w, y:this.y-this.h, z:this.z+this.d},
          {x:this.x+this.w, y:this.y-this.h, z:this.z},
          {x:this.x, y:this.y-this.h, z:this.z}).
            attr($.extend({fill: colors[this.color].top}, attr)));

      // Bottom face
      if (this.y < 0)
        this.set.push(this.bottomFace = this.quad(
          {x:this.x, y:this.y, z:this.z+this.d},
          {x:this.x+this.w, y:this.y, z:this.z+this.d},
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x, y:this.y, z:this.z}).
            attr($.extend({fill: colors[this.color].bottom}, attr)));

      // Front face
      if (this.w > 0 && this.h > 0) {
        this.set.push(this.frontFace = this.quad(
          {x:this.x, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y-this.h, z:this.z},
          {x:this.x, y:this.y-this.h, z:this.z}).
            attr($.extend({fill: colors[this.color].front}, attr)));
      }

      // Draggable front face
      if (this.w > 0 && this.h > 0) {
        this.dragFace = this.quad(
          {x:this.x, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y-this.h, z:this.z},
          {x:this.x, y:this.y-this.h, z:this.z}).
            attr({opacity: 0.0,fill:"#999",'stroke-opacity':0.0});
      }
      return this;
    },

    translate: function(x, y, z) {
      this.x += x; 
      this.y += y;
      this.z += z;
      this.set.remove();
      this.draw();
    },

    moveTo: function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.set.remove();
      this.draw();
    }

  }, attrs);
};

$(function() {
  // Init "Paper"
  var paper = new Raphael('canvas', 800, 600);
  paper.square = Math.sqrt(paper.width * paper.height);
  paper.cx = paper.width/2.0;
  paper.cy = 0.0;

  paper.rect(0, 0, 800, 600).attr({opacity:0});
  // paper.circle().attr({cx:400, cy:300, r:20});

  var initial_z = 1.16;
  new Cube(paper, {color:'panel'}).size(1.2, 0.0, 100.0).corner(-0.6, 1.0, initial_z).draw();
  for (var i = 0; i < 14; i++) {
    var z = initial_z + i/2.0;
    line(paper, {x:-0.6,y:1.0,z:z}, {x:0.6,y:1.0,z:z}).attr({stroke: '#fff', opacity: 0.75});
  }
  new Cube(paper, {color:'red'}).corner(-0.5, 1.0, initial_z+0.5*2).size(0.2, 0.2, 0.5).draw();
  new Cube(paper, {color:'green'}).corner(-0.3, 1.0, initial_z+0.5*4).size(0.2, 0.2, 0.5).draw();
  cube = new Cube(paper, {color:'blue'}).corner(0.2, 1.0, initial_z+0.5*7).size(0.2, 0.2, 0.5).draw();

  var start = function (x, y) {
    this.ox = x;
    this.oy = y;
    // console.log('ox', this.ox, 'oy', this.oy);
  };

  var move = function (dx, dy, x, y) {
    var diffx = (x - this.ox);
    var diffy = (y - this.oy);
    this.ox = x;
    this.oy = y;
    var scr = this.cube.screen;
    var p = screenToThree(paper, scr.x + diffx, scr.y + diffy);
    this.cube.moveTo(p.x, p.y, p.z);
  };

  cube.dragFace.cube = cube;
  cube.dragFace.drag(move, start);

  // $('#canvas svg').mousemove(function(e) {
  //   var offset = $(e.currentTarget).offset();
  //   var sx = e.clientX - offset.left;
  //   var sy = e.clientY - offset.top;
    
  //   // console.log(offset, e);
  //   // console.log(sx, sy);
  //   var cx = paper.width/2.0, cy = 0.0;
  //   var square = Math.sqrt(paper.width * paper.height);
  //   var y = 1.0;
  //   var z = (y*square)/sy;
  //   var x = z*(sx-cx)/square;
  //   // console.log('x',x,'y',y,'z',z);
  //   cube.moveTo(x, y, z);
  // });

  console.log(cube.screen);
});
