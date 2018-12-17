const app = getApp()

Page({
  data: {
    id: null, // 商品ID
    commodity: null,
    content: null, // 图文详情
    modal: false, // 弹出框状态
    count: 1, // 选择商品数量
  },
  onLoad: function(options) {
    this.setData({id: options.id})
    this.fetchCommodity()
    this.fetchRank()
  },
  fetchCommodity: function() {
    const self = this
    let url = app.globalData.domain + 'commodity/' + this.data.id + '/'
    wx.request({url, success:(res)=>{
      let content = res.data.content.replace(new RegExp('style=', 'g'), 'style2=')
      content = content.replace(new RegExp('<img ', 'g'), '<img style="width:100% !important;height:100% !important;" ')
      self.setData({
        commodity: res.data,
        content: content
      })
    }})
  },
  fetchRank: function() {
    const data = [
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01GRTBvM2DuRyAFerUz_!!704298669.jpg',name:'毛衣女2018秋冬新款长袖套头百搭韩版半高领针织打底衫',price:12.00},
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01H3haGQ2DuRy1xm1Zz_!!704298669.jpg',name:'波点半身裙2018秋冬装新款半身裙子女高腰百搭复古A字裙',price:12.00},
      {image:'https://gd1.alicdn.com/imgextra/i1/704298669/O1CN017y3RPA2DuRy5BjCwa_!!704298669.jpg',name:'连帽卫衣连衣裙长裙2018秋冬新款原宿风长款后开叉裙子女',price:12.00},
      {image:'https://gd3.alicdn.com/imgextra/i3/704298669/O1CN01oTVR6o2DuRy42JRRO_!!704298669.jpg',name:'2018冬季新款高腰宽松百搭休闲时尚毛呢短裤女秋冬打底裤',price:12.00}
    ]
    this.setData({rank:data})
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
      'commodity': this.data.id,
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
      path: '/pages/commodity/commodity?id='+this.data.id
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
    this.fetchCommodity()
    this.fetchRank()
    wx.stopPullDownRefresh()
  },

})
