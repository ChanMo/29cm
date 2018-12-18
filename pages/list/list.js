const app = getApp()

Page({
  data: {
    category: 0, // 分类ID
    filterVisible: false,
    sort: 'new',
    data: []
  },
  onLoad: function(options) {
    if(options.category) {
      this.setData({category: options.category})
    }
    this.fetchData()
  },

  /**
   * 获取商品数据
   */
  fetchData: function() {
    wx.showLoading({mask:true})
    let url = app.globalData.domain + 'product'
    let data = {
      category: this.data.category,
      sort: this.data.sort,
    }
    wx.request({
      url,
      data: data,
      success:res=>this.setData({data: res.data.results}),
      complete: ()=>{
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
  },

  /**
   * toggle filter
   */
  onToggleFilter: function() {
    this.setData({filterVisible: !this.data.filterVisible})
  },

  /**
   * 设置排序
   */
  onSetSort: function(e) {
    let value = e.currentTarget.dataset.value
    console.log(value)
    this.setData({sort: value})
    this.fetchData()
  }
})
