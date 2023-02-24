// pages/Reservation/Reservation.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     selectDate:"暂无",
     directionData:"前端",
     directionCode:"",
     lineData:"暂无预约 !",
     commitDisabled:true,
     cancelDisabled:true,
     chooseDisabled:false,
     multiItems: [['2023-03-11', '2023-03-12'], ["10:00-11:00","11:00-12:00","15:00-16:00","16:00-17:00","17:00-18:00","19:00-20:00","20:00-21:00"]],
  },
  //获取用户选择的日期
  handleMulti(e){
    this.setData({
      selectDate:this.data.multiItems[0][e.detail.value[0]]+
      "    "+this.data.multiItems[1][e.detail.value[1]]
    })
    if(this.data.selectDate!="暂无"){
     this.setData({
       commitDisabled:false
     })
   }
  },

  // timeOpen(){
  //   this.picker.showDialog();
  // },
  // confirm(e){
  //   this.setData({
  //      selectDate:e.detail.selectDate
  //   })
  //   if(this.data.selectDate!="暂无"){
  //     this.setData({
  //       commitDisabled:false
  //     })
  //   }
  // },
  direction(e){
    this.setData({
      directionData:e.detail.value
   })
  },
  CommitReservation(){
    let TimeDate=this.data.selectDate;
    wx.request({ //发送请求提交面试预约信息
      url: 'http://43.139.33.166/api/user/interview/'+app.globalData.userId,
      data: {
        "interviewTime":TimeDate.slice(0,11)+TimeDate.slice(15,20)+":00",
      },
      header:{
        "token": app.globalData.token
      },
      method: 'POST',
      success: (result) => {
        console.log(result)
        this.setData({
          cancelDisabled:!this.data.cancelDisabled,
          commitDisabled:!this.data.commitDisabled,
          chooseDisabled:true
        })
        wx.request({ //发送请求获取当前排队进度
          url: 'http://43.139.33.166/api/user/line/'+app.globalData.userId,
          data:{   
            "direction":wx.getStorageSync('dirationCode1')
          },
          header: {
            "token": app.globalData.token,
          },
          method: 'POST',
          success: (result) => {
            console.log(result)
            if(result.data.data!=undefined){
              this.setData({
                lineData:"前面还有 "+result.data.data+" 位"
              })
            }
          },
          fail: (res) => {
            console.log("fail")
            console.log(res)
          },
          complete: (res) => {},
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
    wx.request({ //发送请求取消面试预约信息
      url: 'http://43.139.33.166/api/user/interview/'+app.globalData.userId,
      header:{
        "token": app.globalData.token
      },
      method: 'DELETE',
      success: (result) => {
        console.log(result)
        this.setData({
          lineData:"暂无预约 !",
          cancelDisabled:!this.data.cancelDisabled,
          commitDisabled:!this.data.commitDisabled,
          chooseDisabled:false,
          selectDate:"暂无"
        })
      },
      fail: (res) => {
        console.log("fail")
        console.log(res)
      },
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    // this.picker=this.selectComponent("#picker")
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
    //先将选择器清零
    // 这里调用用户查看面试时间的接口
    wx.request({ 
      url: 'http://43.139.33.166/api/user/interview/'+app.globalData.userId,
      header:{
        "token": app.globalData.token,
      },
      method: 'GET',
      success: (result) => {
        console.log(result)
        console.log(result.data.data.interviewTime);
        if(result.data.data.interviewTime!=null){
          // 显示预约面试的时间
          this.setData({
            selectDate:result.data.data.interviewTime,
            cancelDisabled:false,
            chooseDisabled:true
         })
        }else{
          this.setData({
            selectDate:"暂无"
         })
        }
      },
      fail: (res) => {
        console.log("fail")
        console.log(res)
      },
      complete: (res) => {},
    })
    wx.request({ //发送请求获取个人信息
      url: 'http://43.139.33.166/api/user/info/' + app.globalData.userId,
      header: {
        "token": app.globalData.token
      },
      method: 'GET',
      success: (result) => {
        console.log(result)
        console.log(result.data.data.direction);
        if(result.data.data.direction=="前端"){
          this.setData({
            directionCode:0,
            directionData:result.data.data.direction
          })
        }else if(result.data.data.direction=="后台"){
          this.setData({
            directionCode:1,
            directionData:result.data.data.direction
          })
        }else if(result.data.data.direction=="安卓"){
          this.setData({
            directionCode:2,
            directionData:result.data.data.direction
          })
        }else if(result.data.data.direction=="UI"){
          this.setData({
            directionCode:3,
            directionData:result.data.data.direction
          })
        }
        //本地存储用户选择的方向
        wx.setStorageSync('dirationCode1',this.data.directionCode);
        console.log(wx.getStorageSync('dirationCode1'));
        wx.request({ //发送请求获取当前排队进度
          url: 'http://43.139.33.166/api/user/line/'+app.globalData.userId,
          data: {   
            "direction": wx.getStorageSync('dirationCode1')
          },
          header: {
            "token": app.globalData.token,
          },
          method: 'POST',
          success: (result) => {
            console.log(result)
            if(result.data.data!=undefined){
            this.setData({
              lineData:"前面还有 "+result.data.data+" 位"
            })
          }
          },
          fail: (res) => {
            console.log("fail")
            console.log(res)
          },
          complete: (res) => {},
        })
      },
      fail: (res) => {
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