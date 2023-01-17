// pages/Home.js
Page({     //此行的Page不能更改为Component!!!
  /**
   * 页面的初始数据
   */
  data: {
    url: "/pages/Home/Home",
    currentIndex: 0, //记录轮播图的位置
    sumIndex: 5
  },
  swiperChange(e) { //监听轮播图所在位置
    this.setData({
      currentIndex: e.detail.current
    })
  },
  moveRight() { //轮播图往右偏移
    const newIndex = (this.data.currentIndex + 1) % this.data.sumIndex
    if (newIndex != 0) {
      this.setData({
        currentIndex: newIndex
      })
    }
  },
  moveLeft() { //轮播图往左偏移
    const newIndex = (this.data.currentIndex + this.data.sumIndex - 1) % this.data.sumIndex
    if (newIndex != (this.data.sumIndex - 1)) {
      this.setData({
        currentIndex: newIndex
      })
    }
  }
})