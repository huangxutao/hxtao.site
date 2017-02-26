// 首页 material design 水波纹
;(function() {

  function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
  }

  function setMaterial(obj, way) {
    var objWidth    = parseInt(getStyle(obj, 'width').slice(0, -2), 10),
        objHeight   = parseInt(getStyle(obj, 'height').slice(0, -2), 10),
        color       = getStyle(obj, 'color'),
        radius      = (objWidth > objHeight) ? objWidth*1.414 : objHeight*1.414,
        currRadius  = 0,
        canvas      = document.createElement('canvas'),
        ctx         = canvas.getContext('2d'),
        isDrawing   = false;

    canvas.width  = objWidth;
    canvas.height = objHeight;

    obj.appendChild(canvas);

    // canvas 绘画
    var draw = function(e, X, Y) {
      ctx.beginPath();
      ctx.arc( X, Y, currRadius, 0, 2*Math.PI, true);
      ctx.fillStyle = color;
      ctx.fill();
    };

    obj.addEventListener(way, function(e) {
      var X = e.offsetX,
          Y = e.offsetY;
      var timer = {};
      currRadius = isDrawing ? radius : 0;
      timer = setInterval(function() {
        if(currRadius > radius) {
          clearInterval(timer);
          ctx.clearRect( 0, 0, canvas.width, canvas.height);
          currRadius = 0;
          isDrawing = false;
        } else {
          draw(e, X, Y);
          isDrawing = true;
          currRadius ++;
        }
      }, 1);
    }, false);
  };

  var links = document.querySelectorAll('.item a');
  
  for(var i=0; i<links.length; i++) {
    setMaterial(links[i], 'mouseover');
  }
}());