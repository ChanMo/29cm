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
  },

  /**
   * 订单详情
   */
  onGoDetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '/pages/order/order?id=' + id})
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    wx.stopPullDownRefresh()
  },

})
