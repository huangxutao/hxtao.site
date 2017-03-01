var tools = (function() {
  return {
    /***
     * getViewSize 获取可视区窗口大小
     */
    getViewSize : function() {
      return {
        width : document.body.clientWidth || document.documentElement.clientWidth,
        height : document.body.clientHeight || document.documentElement.clientHeight,
      };
    },

    /***
     * getScrollTop 获取页面滚动的距离
     */
    getScrollTop : function() {
      return document.body.scrollTop || document.documentElement.scrollTop;
    },

    /***
     * getObjSize 获取元素的大小
     * @param {Object} obj 目标元素
     */
    getObjSize : function(obj) {
      return {
        width: obj.offsetWidth,
        height: obj.offsetHeight
      };
    },

    /***
     * getPosition 获取元素的绝对位置
     * @param {Object} obj 目标元素
     */
    getPosition : function(obj) {
      var x = 0, y = 0;  // x: X 轴坐标; y: Y 轴坐标
      var currentElement = obj;

      while(currentElement !== null) {
        x += currentElement.offsetLeft;
        y += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      }

      return {
        x : x,
        y : y
      };
    },

    /***
     * isInView 判断元素是否在可视区内
     * @param {Object} obj 目标元素
     */
    isInView : function(obj) {
      var obj_y = this.getPosition(obj).y,     // 目标元素的 Y 轴坐标 (相对与整个页面)
          obj_height = this.getObjSize(obj).height,  // 目标元素的高度
          view_height = this.getViewSize().height,  // 当前窗口大小
          scroll_top = this.getScrollTop();  // 页面滚过的距离

      var judgment = obj_y - view_height < scroll_top && obj_y + obj_height > scroll_top;

      return (judgment ?  true : false);  // when目标元素可见返回 true 否则 false
    },

    createPage: function(data) {
      var data = data || [];
      var list = document.querySelector('.content');
      var prefix_url = 'https://github.com/huangxutao/hxtao.site/tree/master/';
      var tmp = '';

      for(var i = 0, len = data.length; i < len; i++) {
        tmp += '' +
        '<div class="row hide">' + 
          '<div class="description">' +
            '<h1>' + data[i].num + '</h1>' +
            '<p>' + data[i].desc + '</p>' +
          '</div>' +
          '<div class="img">' +
            '<a href="' + prefix_url + '' + data[i].num + '"><img src="' + data[i].num +'/source/images/snapshot-pc.png" alt=""></a>' +
          '</div>' +
        '</div>';
      }

      return list.innerHTML = tmp;
    }
  };
})();