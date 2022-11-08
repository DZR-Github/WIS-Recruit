Component({

  data: {
    selected: 0,
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
  attached() {},
  methods: {
    switchTab(e) {
      let app = getApp()
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
      app.globalData.selected = data.index
      // console.log(app.globalData.selected)
    }
  }

})