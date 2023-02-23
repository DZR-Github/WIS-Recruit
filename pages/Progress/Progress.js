// pages/Progress/Progress.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    write: 2, //笔试结果，2：未知；0：未通过；1：通过
    interview: 2, //面试结果，2：未知；0：未通过；1：通过
    firstItem: 2, //一轮结果，2：未知；0：未通过；1：通过
    secondItem: 2, //二轮结果，2：未知；0：未通过；1：通过
    red: "red",
    green: "#84f59b",
    BLOCK: "block",
    NONE: "none",
    finalResult: " " //最终结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this //将this赋值给that，在请求中使用that
    wx.request({ //发送请求获取进度
      url: 'http://wisstudio.top/api/user/progress/' + app.globalData.userId,
      header: {
        "token": app.globalData.token
      },
      method: 'GET',
      success: (result) => {
        console.log(result)
        let i = 0, //以下为对请求回来的进度结果的处理
          arr = Array(4)

        for (i = 0; i < 4; i++) arr[i] = 0

        for (i = 0; i < result.data.data.progress; i++) arr[i] = 1

        if (result.data.data.status == 1) arr[i] = 1
        if (result.data.data.status == 0) arr[i] = 2

        if (i < 3) {
          i++
          for (; i < 4; i++) arr[i] = 2
        }

        that.setData({
          write: arr[0],
          interview: arr[1],
          firstItem: arr[2],
          secondItem: arr[3]
        })

        if (result.data.data.status === 1 && result.data.data.progress === 3) {
          that.setData({
            finalResult: "通过！"
          })
          app.globalData.finalResult = "通过！"
        }

        if (result.data.data.status === 2) {
          that.setData({
            finalResult: "未通过"
          })
          app.globalData.finalResult = "未通过"
        }
      },
      fail: (res) => {
        console.log("fail")
        console.log(res)
      },
      complete: (res) => {},
    })

  },

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