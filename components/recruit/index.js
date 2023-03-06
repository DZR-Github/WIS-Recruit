// pages/Recruit/Recruit.js
const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['计算机学院', '信息工程学院', '机电工程学院', '自动化学院', '生物医药学院', '轻工化工学院', '土木与交通工程学院', '环境科学与工程学院', '外国语学院', '材料与能源学院', '物理与光电工程学院', '集成电路学院'],
    Direction: "",
    Academy: "",
    choice: 0,
    NONE: "none",
    BLOCK: "block",
    phoneDes: "",
    stuNumDes: "",
    show: false,
    showMsg: " ",
    showActionsheet: false,
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
    close: function () {
      this.setData({
        showActionsheet: false
      })
    },
    btnClick(e) {
      // console.log(e.detail.value)
      this.setData({
        Direction: e.detail.value
      })
      this.close()
    },
    tapDialogButton() {
      this.setData({
        show: false
      })
    },
    commit(e) {
      const Data = e.detail.value
      const that = this
      if (!Data.username || !Data.stuNumber || !Data.academy || !Data.direction || !Data.phoneNum || !Data.introduction) {
        this.setData({
          showMsg: "请将表单内容填写完整！",
          show: true
        })
      } else {
        wx.request({ //点击提交后发送请求，报名
          url: 'http://wisstudio.top/api/user/info/' + app.globalData.userId,

          // url: 'http://43.139.33.166/api/user/info/' + app.globalData.userId,
          data: {
            "userName": Data.username,
            "stuNumber": Data.stuNumber,
            "academy": Data.academy,
            "direction": Data.direction,
            "phoneNum": Data.phoneNum,
            "introduction": Data.introduction
          },
          header: {
            "token": app.globalData.token
          },
          method: 'PUT',
          success: (result) => {
            // console.log("报名成功！")
            app.globalData.entryStatus = 1;
            that.setData({
              showMsg: "恭喜你，报名成功！",
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
    setActionsheet() {
      this.setData({
        showActionsheet: true
      })
    },
    bindPickerChange: function (e) {
      this.setData({
        Academy: this.data.array[e.detail.value],
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
    }

  }
})