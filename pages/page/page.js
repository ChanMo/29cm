const app = getApp()

Page({
  data: {
    slug: null,
    data: null
  },

  onLoad: function(options) {
    this.setData({slug: options.slug})
    this.fetchData()
  },

  fetchData: function() {
    let url = app.globalData.domain + 'page/' + this.data.slug
    wx.request({url, success:res=>this.setData({data: res.data})})
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    wx.stopPullDownRefresh()
  },

})
