const app = getApp()

Page({
  data: {
    data: []
  },
  onLoad: function() {
    this.fetchData()
  },
  fetchData: function() {
    let url = app.globalData.domain + 'commodity'
    wx.request({url, success:res=>this.setData({data: res.data.results})})
  }
})
