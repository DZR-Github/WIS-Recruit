// pages/Feedback/Feedback.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: "",
    show: false,
    showActionsheet: true,
    groups: [{
        text: '前端',
        value: 1
      },
      {
        text: '后台',
        value: 2
      },
      {
        text: '安卓',
        value: 3
      },
      {
        text: 'UI',
        value: 4
      }
    ]
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    console.log(e)
    this.close()
  },
  setSelected() {
    //let app = getApp()
    //app.globalData.selected = 2
  },
  setFeedback(e) {
    // console.log(e.detail.value)
    this.setData({
      feedback: e.detail.value
    })
  },
  tapDialogButton() {
    this.setData({
      show: false
    })
  },
  commit() {
    const that = this

    if (this.data.feedback) {
      wx.request({ //发送请求提交用户反馈
        url: 'http://43.139.33.166/api/user/addFeedback/' + app.globalData.userId,
        data: {
          "content": that.data.feedback
        },
        header: {
          "token": app.globalData.token
        },
        method: 'GET',
        success: (result) => {
          //console.log("Get openID success!")
          //console.log(result)
          that.setData({
            show: true
          })
        },
        fail: (res) => {
          console.log("fail")
          console.log(res)
        },
        complete: (res) => {},
      })
    }
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