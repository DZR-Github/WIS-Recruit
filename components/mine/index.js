// pages/Mine.js
const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "微信用户",
    avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    urls: [
      "/pages/Information/Information",
      "/pages/Progress/Progress",
      "/pages/Feedback/Feedback",
      "/pages/Reservation/Reservation"
    ]
  },

  pageLifetimes: {

    // 组件所在页面的生命周期函数

    show: function () {

    },

    hide: () => {}

  },
  methods:{
    onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail
      this.setData({
        avatarUrl,
      })
    },
  }

})