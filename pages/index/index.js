// index.js
// 获取应用实例
let app = getApp()
Page({
  data: {
    selected: app.globalData.selected,
    FLEX: "flex",
    NONE: "none",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  change(e) { //点击tabbar图标改变selected的值
    this.setData({
      selected: app.globalData.selected
    })
  },
  // 事件处理函数
  onLoad() {

    if (this.data.selected != app.globalData.selected) {
      this.setData({
        selected: app.globalData.selected
      })
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
   
  }
})