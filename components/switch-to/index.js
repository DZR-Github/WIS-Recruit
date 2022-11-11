// components/switchTo/switchTo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ""
    },
    setSelected: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      // console.log(this.data.url)
      const Url = this.data.url
      const num = this.data.setSelected
      let app = getApp()
      if (num === 2) {
        app.globalData.selected = 2
      }
      wx.navigateTo({
        url: Url
      })
      // console.log(app.globalData.selected)
    }
  }
})