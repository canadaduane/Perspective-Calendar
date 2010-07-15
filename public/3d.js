var Cube = function() {
  $.extend(this, {
    x: 0.0,
    y: 0.0,
    z: 0.0,
    w: 0.1,
    h: 0.1,
    d: 0.1,
    color: [255, 0, 0],

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

    // Position the cube using the bottom-front edge of the cube
    corner: function(x, y, z) {
      this.x = x; this.y = y; this.z = z;
      return this;
    },

    quad: function(paper, p1, p2, p3, p4) {
      var cx = paper.width/2.0, cy = 0.0;
      var square = Math.sqrt(paper.width * paper.height);
      var zadd = 0.0;
      return paper.path(
        "M" + parseInt(p1.x / (p1.z + zadd) * square + cx) + "," +
              parseInt(p1.y / (p1.z + zadd) * square + cy) +
        "L" + parseInt(p2.x / (p2.z + zadd) * square + cx) + "," +
              parseInt(p2.y / (p2.z + zadd) * square + cy) +
        "L" + parseInt(p3.x / (p3.z + zadd) * square + cx) + "," +
              parseInt(p3.y / (p3.z + zadd) * square + cy) +
        "L" + parseInt(p4.x / (p4.z + zadd) * square + cx) + "," +
              parseInt(p4.y / (p4.z + zadd) * square + cy) +
        "z");
    },
    draw: function(paper) {
      var w2 = this.w/2, h2 = this.h/2, d2 = this.d/2;
      var attr = {stroke: '#888'};
      this.set = paper.set();

      // Left face
      if (this.x > 0)
        this.set.push(this.quad(paper,
          {x:this.x, y:this.y, z:this.z},
          {x:this.x, y:this.y+this.h, z:this.z},
          {x:this.x, y:this.y+this.h, z:this.z+this.d},
          {x:this.x, y:this.y, z:this.z+this.d}).
            attr($.extend({fill: '45-#777-#aaa'}, attr)));

      // Right face
      if (this.x < 0)
        this.set.push(this.quad(paper,
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x+this.w, y:this.y+this.h, z:this.z},
          {x:this.x+this.w, y:this.y+this.h, z:this.z+this.d},
          {x:this.x+this.w, y:this.y, z:this.z+this.d}).
            attr($.extend({fill: '135-#aaa-#ddd'}, attr)));

      // Top face
      if (this.y > 0)
        this.set.push(this.quad(paper,
          {x:this.x, y:this.y, z:this.z+this.d},
          {x:this.x+this.w, y:this.y, z:this.z+this.d},
          {x:this.x+this.w, y:this.y, z:this.z},
          {x:this.x, y:this.y, z:this.z}).
            attr($.extend({fill: '45-#aaa-#eee'}, attr)));

      // Bottom face
      if (this.y < 0)
        this.set.push(this.quad(paper,
          {x:this.x, y:this.y+this.h, z:this.z+this.d},
          {x:this.x+this.w, y:this.y+this.h, z:this.z+this.d},
          {x:this.x+this.w, y:this.y+this.h, z:this.z},
          {x:this.x, y:this.y+this.h, z:this.z}).
            attr($.extend({fill: '45-#888-#999'}, attr)));

      // Front face
      this.set.push(this.quad(paper,
        {x:this.x, y:this.y, z:this.z},
        {x:this.x+this.w, y:this.y, z:this.z},
        {x:this.x+this.w, y:this.y+this.h, z:this.z},
        {x:this.x, y:this.y+this.h, z:this.z}).
          attr($.extend({fill: '225-#eee-#777'}, attr)));

      return this;
    }
  });
};

$(function() {
  var paper = new Raphael('canvas', 800, 600);
  // paper.circle().attr({cx:400, cy:300, r:20});

  new Cube().size(1.2, 0.0, 100.0).corner(-0.6, 1.0, 1.16).draw(paper);
  new Cube().size(0.2, 0.2, 0.2).corner(0.5, 0.5, 2.8).draw(paper);

  // new Cube().size(0.1, 0.1, 0.4).center(-0.5, 0.3, 0.2).draw(paper);
  // new Cube().center(-0.25, 0.3, 0.2).draw(paper);
  // new Cube().center(-0.0, 0.3, 0.2).draw(paper);
  // new Cube().center(0.25, 0.3, 0.2).draw(paper);

  // new Cube().center(0.0, 0.3, 0.0).draw(paper);
  // new Cube().center(0.0, 0.3, 1.2).draw(paper);
  // new Cube().center(0.0, 0.3, 5.2).draw(paper);

});
