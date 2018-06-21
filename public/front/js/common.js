
  // 滑动效果
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,
    indicators: false //是否显示滚动条
  });

  // 轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });



