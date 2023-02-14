// pages/Reservation/Reservation.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     selectDate:"暂无",
     directionData:"暂无",
     lineData:"暂无预约 !",
     timeData:"",
     flag:false,
  },

  timeOpen(){
    this.picker.showDialog();
  },
  confirm(e){
    this.setData({
       selectDate:e.detail.selectDate
    })
  },
  direction(e){
    this.setData({
      directionData:e.detail.value
   })
  },
  CommitReservation(){
    let TimeDate=this.data.selectDate;
    wx.request({ //发送请求提交面试预约信息
      url: 'http://127.0.0.1:4523/m1/1875832-0-default/user/interview/1',
      data: {
        "userId": app.globalData.userId,
        "token": app.globalData.token,
        "interviewTime":TimeDate.slice(0,11)+TimeDate.slice(15,20)+":00",
      },
      method: 'POST',
      success: (result) => {
        console.log(result)
      },
      fail: (res) => {
        console.log("fail")
        console.log(res)
      },
      complete: (res) => {},
    })
    wx.request({ //发送请求获取当前排队进度
      url: 'http://127.0.0.1:4523/m1/1875832-0-default/user/line/1',
      data: {
        "userId": app.globalData.userId,
        "token": app.globalData.token,
      },
      method: 'GET',
      success: (result) => {
        console.log(result)
        this.setData({
          lineData:"当前位于队列中的第"+result.data.data+"个"
        })
      },
      fail: (res) => {
        console.log("fail")
        console.log(res)
      },
      complete: (res) => {},
    })
  },
  CancelReservation(){
    this.setData({
      lineData:"暂无预约 !"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    this.picker=this.selectComponent("#picker")
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