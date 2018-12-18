const app = getApp()

Page({
  data: {
    id: null, // 商品ID
    product: null,
    content: null, // 图文详情
    modal: false, // 弹出框状态
    count: 1, // 选择商品数量
    follow: false, // 是否关注此品牌
    follow_count: 0, // 关注数量
  },
  onLoad: function(options) {
    this.setData({id: options.id})
    this.fetchproduct()
    this.fetchRank()
  },
  fetchproduct: function() {
    const self = this
    let url = app.globalData.domain + 'product/' + this.data.id + '/'
    wx.request({url, success:(res)=>{
      let content = res.data.content.replace(new RegExp('style=', 'g'), 'style2=')
      content = content.replace(new RegExp('<img ', 'g'), '<img style="width:100% !important;height:100% !important;" ')
      self.setData({
        product: res.data,
        content: content,
        follow_count: res.data.brand.follow_count // 品牌关注数量
      })
    }})
  },
  fetchRank: function() {
    let url = app.globalData.domain + 'product?sort=hot&limit=5'
    wx.request({url, success:res=>this.setData({rank: res.data.results})})
  },

  /**
   * 直接购买
   */
  onBuy: function() {
    this.setData({modal: false})
    wx.navigateTo({url:`/pages/buy/buy?id=${this.data.id}&count=${this.data.count}`})
  },

  /**
   * 加入购物车
   */
  onAddToCart: function() {
    //wx.showLoading({mask:true})
    const self = this
    let url = app.globalData.domain + 'cart/'
    let data = {
      'product': this.data.id,
      'count': 1,
    }
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'Authorization': 'Token ' + wx.getStorageSync('token')
      },
      success: res=>{
        wx.showToast({title:'加入成功'})
        self.setData({modal:false})
      },
      //complete: res=>wx.hideLoading()
    })
  },

  /**
   * 跳转购物车
   */
  onGoCart: function() {
    wx.switchTab({url: '/pages/cart/cart'})
  },

  /**
   * 打开modal
   */
  onToggleModal: function() {
    this.setData({modal: !this.data.modal})
  },

  /**
   * 转发
   */
  onShare: function() {
    wx.showShareMenu({withShareTicket:true})
  },

  /**
   * 转发事件
   */
  onShareAppMessage: function() {
    return {
      title: 'DOYOU.LIVE',
      path: '/pages/product/product?id='+this.data.id
    }
  },

  /**
   * 数量增加
   */
  onIncrease: function() {
    this.setData({count: this.data.count+1})
  },

  /**
   * 数量减少
   */
  onDecrease: function(e) {
    let count = this.data.count
    if(count == 1) {
      // 如果数量为1
      return
    }
    count -= 1
    this.setData({count: count})
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchproduct()
    this.fetchRank()
    wx.stopPullDownRefresh()
  },

  /**
   * 获取关注状态
   */
  fetchFollow: function() {
  },


  /**
   * 关注品牌
   */
  onFollow: function() {
    let count = this.data.follow_count
    this.setData({
      follow: !this.data.follow,
      follow_count: this.data.follow ? count - 1 : count + 1
    })
  }
})
