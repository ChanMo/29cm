//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: [],
    commodity: [],
    discount: [], // 优惠商品
    category: [] // 商品分类
  },
  onLoad: function () {
    this.fetchBanner()
    this.fetchCommodity()
    this.fetchDiscount()
    this.fetchCategory()
  },

  /**
   * 获取banner图
   */
  fetchBanner: function() {
    let url = app.globalData.domain + 'link/HOME_BANNER_S/'
    wx.request({url, success: (res)=>this.setData({banner: res.data})})
  },

  /**
   * 获取推荐商品
   */
  fetchCommodity: function() {
    let url = app.globalData.domain + 'commodity/'
    //wx.request({url, success:(res)=>this.setData({commodity:res.data})})
    const data = [
      {image:'https://gd1.alicdn.com/imgextra/i1/798012255/TB28st9jlHH8KJjy0FbXXcqlpXa_!!798012255.jpg',name:'Sony x5000',price:4500.00,desc:'Sony x5000 是一款入门微单相机'}
    ]
    this.setData({commodity: data})
  },

  /**
   * 获取优惠商品
   */
  fetchDiscount: function() {
    let url = app.globalData.domain + 'commodity?discount=true'
    wx.request({url, success:(res)=>this.setData({discount:res.data.results})})
  },

  /**
   * 获取分类
   */
  fetchCategory: function() {
    let url = app.globalData.domain + 'commodity/category'
    wx.request({url, success:res=>this.setData({category:res.data})})
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchBanner()
    this.fetchCommodity()
    this.fetchDiscount()
    this.fetchCategory()
    wx.stopPullDownRefresh()
  },
})
