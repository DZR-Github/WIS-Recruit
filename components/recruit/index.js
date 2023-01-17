// pages/Recruit/Recruit.js
const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    Direction: "",
    Academy: "",
    choice: 0,
    NONE: "none",
    BLOCK: "block",
    Animate: " ", //点击'方向'的动画
    Animate_Academy: " " //点击'学院'的动画
  },
  lifetimes: {
    attached() {

    },
    detached() {

    }
  },
  pageLifetimes: {
    show() {

    }

  },
  methods: {
    commit(e) {
      //console.log(e.detail.value)
      const Data = e.detail.value
      //console.log(app.globalData.userId + "&&token=" + app.globalData.token)

      wx.request({ //点击提交后发送请求，报名
        url: 'http://127.0.0.1:4523/m1/1875832-0-default/user/info/1',
        data: {
          "userId": app.globalData.userId,
          "token": app.globalData.token,
          "username": Data.username,
          "stuNumber": Data.stuNumber,
          "academy": Data.academy,
          "direction": Data.direction,
          "phoneNum": Data.phoneNum,
          "introduction": Data.introduction
        },
        method: 'PUT',
        success: (result) => {
          console.log("Change msg success!")
          console.log(result)

        },
        fail: (res) => {
          console.log("fail")
          console.log(res)
        },
        complete: (res) => {},
      })

    },
    setChoice() {
      this.setData({
        choice: 1,
        Animate: "appear 0.5s ease 1 forwards"
      })
    },
    setChoice_2() {
      this.setData({
        choice: 1,
        Animate_Academy: "appear_Academy 0.5s ease 1 forwards"
      })
    },
    choose_academy(e) {
      const that = this
      const academys = ['计算机学院', '信息工程学院', '机电工程学院', '自动化学院', '生物医药学院', '轻工化工学院', '土木与交通工程学院', '环境科学与工程学院', '外国语学院', '材料与能源学院', '物理与光电工程学院', '集成电路学院']
      this.setData({
        Academy: academys[e.currentTarget.id],
        choice: 0,
        Animate_Academy: "disappear_Academy 0.5s ease 1 forwards"
      })
      setTimeout(() => {
        that.setData({
          Animate_Academy: " "
        })
      }, 500)
    },
    choose(e) {
      // console.log(e.currentTarget.id)
      const that = this
      const directions = ['前端', '后台', '安卓', 'UI']
      this.setData({
        Direction: directions[e.currentTarget.id],
        choice: 0,
        Animate: "disappear 0.5s ease 1 forwards"
      })
      setTimeout(() => {
        that.setData({
          Animate: " "
        })
      }, 500)
    }
  }
})