//app.js
App({
  onLaunch: function () {
    const self = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let url = self.globalData.domain + 'wxa/login/'
        wx.request({
          url: url,
          method: 'POST',
          data: {code:res.code, p:0},
          success:res=>{
            wx.setStorageSync('token', res.data.token)
            self.globalData.token = res.data.token
            self.globalData.uid = res.data.id
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: 'https://life.mandiankeji.com/'
  }
})
