// pages/Information/Information.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['计算机学院', '信息工程学院', '机电工程学院', '自动化学院', '生物医药学院', '轻工化工学院', '土木与交通工程学院', '环境科学与工程学院', '外国语学院', '材料与能源学院', '物理与光电工程学院', '集成电路学院'],
    username: "",
    stuNumber: "",
    academy: "",
    direction: "",
    phoneNum: "",
    username_change: "",
    stuNumber_change: "",
    academy_change: "",
    direction_change: "",
    phoneNum_change: "",
    Disable: true,
    show: false,
    showActionsheet: false,
    overlay: false,
    Overlay: 'none',
    stuNumDes: "",
    phoneDes: "",
    showDialog: false,
    showMsg: "",
    showDialog_back: false,
    FALSE: false,
    groups: [{
        text: '前端',
        value: "前端"
      },
      {
        text: '后台',
        value: "后台"
      },
      {
        text: '安卓',
        value: "安卓"
      },
      {
        text: 'UI',
        value: "UI"
      }
    ]
  },
  tapDialogBack() {
    wx.navigateBack()
  },
  btnClick(e) {
    // console.log(e.detail.value)
    this.setData({
      direction_change: e.detail.value,
      showActionsheet: false
    })
  },
  setActionsheet() {
    this.setData({
      showActionsheet: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      academy_change: this.data.array[e.detail.value],
    })
  },
  tapDialogButton() {
    this.setData({
      showDialog: false
    })
  },
  exit() {
    this.setData({
      Overlay: 'none',
      show: false
    })
  },
  commit(e) {
    console.log(e.detail.value)
    const that = this
    const data = e.detail.value

    if (!data.username || !data.stuNumber || !data.academy || !data.direction || !data.phoneNum) {
      this.setData({
        showMsg: "请将个人资料填写完整！",
        showDialog: true
      })
    } else {
      this.setData({
        username: data.username,
        stuNumber: data.stuNumber,
        academy: data.academy,
        direction: data.direction,
        phoneNum: data.phoneNum,
        show: false,
        Overlay: 'none'
      })



      wx.request({ //点击提交后发送请求，报名
        url: 'http://wisstudio.top/api/user/info/' + app.globalData.userId,

        // url: 'http://43.139.33.166/api/user/info/' + app.globalData.userId,
        data: {
          "userName": data.username,
          "stuNumber": data.stuNumber,
          "academy": data.academy,
          "direction": data.direction,
          "phoneNum": data.phoneNum
        },
        header: {
          "token": app.globalData.token
        },
        method: 'PUT',
        success: (result) => {
          that.setData({
            username: data.username,
            stuNumber: data.stuNumber,
            academy: data.academy,
            direction: data.direction,
            phoneNum: data.phoneNum,
            show: false,
            Overlay: 'none'
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
  open() {
    this.setData({
      show: true,
      Overlay: 'block',
      username_change: this.data.username,
      stuNumber_change: this.data.stuNumber,
      academy_change: this.data.academy,
      direction_change: this.data.direction,
      phoneNum_change: this.data.phoneNum,
    })
  },

  stuNumInput(e) {
    const stuNumReg = /^\d{10}$/
    const stuNum = e.detail.value

    if (!stuNumReg.test(stuNum)) {
      this.setData({
        stuNumDes: "学号输入有误！"
      })
    } else {
      this.setData({
        stuNumDes: ""
      })
    }
  },
  mobileInput(e) {
    const numberReg = /^\d{11}$/
    const mobile = e.detail.value
    if (!numberReg.test(mobile)) {
      this.setData({
        phoneDes: "手机号输入有误！"
      })
    } else {
      this.setData({
        phoneDes: ""
      })
    }
    //console.log(e.detail.value)
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
    const that = this
    if (app.globalData.information_status === 0) { //information_status等于0时代表未发送过请求，需要发送请求获取数据；否则直接从全局变量中取值
      wx.request({ //发送请求获取个人信息
        url: 'http://wisstudio.top/api/user/info/' + app.globalData.userId,
        // url: 'http://43.139.33.166/api/user/info/' + app.globalData.userId,
        header: {
          "token": app.globalData.token
        },
        method: 'GET',
        success: (result) => {
          //console.log("获取个人信息 success!")
          //console.log(result)

          app.globalData.information.userName = result.data.data.userName
          app.globalData.information.stuNumber = result.data.data.stuNumber
          app.globalData.information.academy = result.data.data.academy
          app.globalData.information.direction = result.data.data.direction
          app.globalData.information.phoneNum = result.data.data.phoneNum

          if (!result.data.data.direction) {
            that.setData({
              showDialog_back: true
            })
          } else {
            app.globalData.information_status = 1
          }


          that.setData({
            username: result.data.data.userName,
            stuNumber: result.data.data.stuNumber,
            academy: result.data.data.academy,
            direction: result.data.data.direction,
            phoneNum: result.data.data.phoneNum
          })
        },
        fail: (res) => {
          console.log("fail")
          console.log(res)
        },
        complete: (res) => {},
      })
    } else {
      that.setData({
        username: app.globalData.information.userName,
        stuNumber: app.globalData.information.stuNumber,
        academy: app.globalData.information.academy,
        direction: app.globalData.information.direction,
        phoneNum: app.globalData.information.phoneNum
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      showDialog_back: false
    })
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