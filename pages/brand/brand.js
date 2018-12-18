const app = getApp()

Page({
  data: {
    id: 0,
    data: null,
    product: [],
    category: []
  },

  onLoad: function(options) {
    this.setData({id: options.id})
    this.fetchData()
    this.fetchproduct()
    this.fetchCategory()
  },

  /**
   * 获取品牌数据
   */
  fetchData: function() {
    let url = app.globalData.domain + 'product/brand/' + this.data.id + '/'
    wx.request({url, success:res=>this.setData({data: res.data})})
  },

  /**
   * 获取推荐商品
   */
  fetchproduct: function() {
    let url = app.globalData.domain + 'product?brand=' + this.data.id
    wx.request({url, success:res=>this.setData({product: res.data.results})})
  },

  /**
   * 获取分类
   */
  fetchCategory: function() {
    let url = app.globalData.domain + 'product/category'
    wx.request({url, success:res=>this.setData({category:res.data})})
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    this.fetchproduct()
    this.fetchCategory()
    wx.stopPullDownRefresh()
  },
})
