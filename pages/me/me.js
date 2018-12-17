const app = getApp()

Page({
  data: {
    link: []
  },
  onLoad: function() {
    this.fetchLink()
  },

  /**
   * 获取链接
   */
  fetchLink: function() {
    let url = app.globalData.domain + 'link/USER_LINK/'
    wx.request({url, success:res=>this.setData({link:res.data})})
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchLink()
    wx.stopPullDownRefresh()
  },

})
