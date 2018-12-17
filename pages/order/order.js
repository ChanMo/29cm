const app = getApp()

Page({
  data: {
    id: 0,
    data: {}
  },
  onLoad: function(options) {
    this.setData({id: options.id})
    this.fetchData()
  },
  /**
   * 获取订单数据
   */
  fetchData: function() {
    let url = app.globalData.domain + 'order/' + this.data.id + '/'
    wx.request({
      url: url,
      header: {
        'Authorization': 'Token ' + wx.getStorageSync('token')
      },
      success:res=>this.setData({data: res.data})})
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    wx.stopPullDownRefresh()
  },

})
