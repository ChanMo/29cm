const app = getApp()

Page({
  data: {
    data: []
  },

  onShow: function() {
    this.fetchData()
  },

  fetchData: function() {
    let url = app.globalData.domain + 'blog/'
    wx.request({url, success:res=>this.setData({data: res.data.results})})
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    wx.stopPullDownRefresh()
  },

})
