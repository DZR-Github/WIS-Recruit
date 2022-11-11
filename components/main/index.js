// pages/Home.js
Page({
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})