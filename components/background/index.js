// components/background/background.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached() {
      const stars = 40
      let arr = new Array(stars)
      const Color = [
        "aliceblue",
        "#06cbfa",
        "#06faec",
        "#dcdcd7"
      ]
      for (let i = 0; i < stars; i++) {
        arr[i] = {
          top: Math.random() * 100 + "vh",
          left: Math.random() * 100 + "vw",
          delay: Math.random() * 5000 + "ms",
          bgColor: Color[i % 4]
        }
      }
      this.setData({
        Arr: arr
      })
    }
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */

  data: {
    Arr: new Array(40)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    randomTop() {
      return Math.random() * innerHeight + "rpx"
    }
  }
})