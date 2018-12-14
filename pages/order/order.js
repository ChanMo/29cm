const app = getApp()

Page({
  data: {
    data: []
  },

  onLoad: function() {
    this.fetchData()
  },

  /**
   * 获取订单数据
   */
  fetchData: function() {
    let url = app.globalData.domain + 'order'
    wx.request({
      url:url,
      header: {
        'Authorization': 'Token ' + wx.getStorageSync('token')
      },
      success:res=>this.setData({data: res.data.results})})
  }
})
