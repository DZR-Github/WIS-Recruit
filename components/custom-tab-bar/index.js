let app = getApp()
Component({
  properties: {
    Selected: {
      type: Number,
      value: 0
    }
  },
  data: {
    selected: app.globalData.selected,
    list: [{
        selectedIconPath: "../../img/main_active.png",
        iconPath: "../../img/main.png"
      },
      {
        selectedIconPath: "../../img/recruit_active.png",
        iconPath: "../../img/recruit.png"
      },
      {
        selectedIconPath: "../../img/mine_active.png",
        iconPath: "../../img/mine.png"
      }
    ]
  },
  attached() {
    if (this.data.selected != app.globalData.selected) {
      this.setData({
        selected: app.globalData.selected
      })
    }
  },
  pageLifetimes: {

    // 组件所在页面的生命周期函数

    show: () => {},

    hide: () => {}

  },
  methods: {
    switchTab(e) {
      let app = getApp()
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
      app.globalData.selected = data.index
    }
  }

})