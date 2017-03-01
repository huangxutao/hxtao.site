;(function() {

  var page = document.querySelector('.page');
  var point = document.querySelector('.point');

  if(document.all){ 
    sendMsg();
  }

  point.addEventListener('click', function(e) {
    if(e.target.className === 'circle') {
      for(var i = 0, len = point.children.length; i < len; i++) {
        point.children[i].className = 'circle';
      }
      e.target.className = 'circle active';

      page.className = 'page ' + e.target.getAttribute('data-page');
    }

  }, false);



  document.addEventListener('mouseover', playAudio, false);
  window.addEventListener('load', rmLoader, false);
  window.addEventListener('mousewheel', change_page(), false);
  window.addEventListener('DOMMouseScroll', change_page(), false);
  window.addEventListener('keydown', function(e) {
    var index = parseInt(document.querySelector('.circle.active').getAttribute('data-index'), 10);

    for(var i = 0, len = point.children.length; i < len; i++) {
      point.children[i].className = 'circle';
    }

    if(e.keyCode === 40 || e.keyCode === 34) {
      index = (len - index > 1) ? index + 1 : index;
    }

    if(e.keyCode === 33 || e.keyCode === 38) {
      index = (index === 0) ? index : index - 1;
    }

    point.children[index].className = 'circle active';
    page.className = 'page ' + point.children[index].getAttribute('data-page');
  }, false);

  function change_page() {
    var wait = 2000;
    var previous = 0;

    return function(e) {
      e.preventDefault();
      var now = Date.now();
      var remaining = wait - (now - previous);
      var index = parseInt(document.querySelector('.circle.active').getAttribute('data-index'), 10);
      var get_dir = function() {
        return (e.wheelDelta > 0 || e.detail < 0) ? 'up' : 'down';
      }

      if(remaining > 0) {
        // console.log('急什么？排队！');
        return false;
      } else {
        // console.log('到你了');
        previous = now;
        aa();
      }

      function aa() {
        for(var i = 0, len = point.children.length; i < len; i++) {
          point.children[i].className = 'circle';
        }

        if(get_dir() === 'up') {
          index = (index === 0) ? index : index - 1;
        }

        if(get_dir() === 'down'){
          index = (len - index > 1) ? index + 1 : index;
        }

        point.children[index].className = 'circle active';
        page.className = 'page ' + point.children[index].getAttribute('data-page');
      }
    }
  }

  function rmLoader() {
    console.log(0);
    var loading = document.getElementById('loading');
    var timer = {};

    loading.className = 'hide';

    timer = setTimeout(function() {
      document.body.removeChild(loading);
      clearTimeout(timer);
    }, 1000);
  }

  function playAudio(e) {
    var audio1 = document.querySelector('#audio1');
    var audio2 = document.querySelector('#audio2');

    if(e.target.className === 'circle') {
      audio1.play();
    } else if(e.target.className === 'with-audio') {
      audio2.play();
    }
  }
  

  function sendMsg() {
    var div = document.createElement('div');

    div.id = 'if-ie';
    div.innerHTML = '<h1>非 IE , 浏览更佳哦.</h1>';
    div.innerHTML += '<p><a href="https://blog.hxtao.site">我的博客</a></p>';
    div.innerHTML += '<p><a href="https://blog.hxtao.site">关于我</a></p>';
    div.innerHTML += '<p id="refuse">拒绝</p>';

    document.body.appendChild(div);

    document.getElementById('refuse').onclick = rmMsg;
  }

  function rmMsg() {
    document.body.removeChild(document.getElementById('if-ie'));
  }


}());