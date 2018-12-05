const app = getApp()

Page({
  data: {
    data: [],
    price: 0.00
  },

  onShow: function() {
    let url = app.globalData.domain + 'cart/'
    wx.request({
      url: url,
      header: {
        Authorization: 'Token ' + app.globalData.token
      },
      success: (res) => this.setData({data: res.data})
    })
  },

  onBuy: function() {
    wx.navigateTo({url: '/pages/buy/buy'})
  }
})
