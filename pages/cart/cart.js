const app = getApp()

Page({
  data: {
    data: [],
    price: 0.00, // 总价格
  },

  onShow: function() {
    this.fetchData()
  },

  /**
   * 计算总价格
   */
  makePrice: function() {
    let price = 0.00
    let checked = this.data.data.filter(item=>item.is_checked)
    checked.map(item=>price += item.commodity.price * item.count * item.commodity.discount)
    price = price.toFixed(2)
    this.setData({price: price})
  },

  /**
   * 获取购物车信息
   */
  fetchData: function() {
    const self = this
    let url = app.globalData.domain + 'cart/'
    wx.request({
      url: url,
      header: {
        Authorization: 'Token ' + wx.getStorageSync('token')
      },
      success: (res) => {
        self.setData({data: res.data})
        self.makePrice()
      }
    })
  },

  onBuy: function() {
    if(this.data.price <= 0) {
      wx.showToast({title:'请先选择商品'})
      return
    }
    wx.navigateTo({url: '/pages/buy/buy'})
  },

  /**
   * 跳转商品详情
   */
  onGoCommodity: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url: '/pages/commodity/commodity?id='+id})
  },

  /**
   * 确认删除Modal
   */
  onDelete: function(e) {
    const self = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定从购物车删除此商品?',
      confirmColor: '#ff0000',
      success: res=>{
        if(res.confirm) {
          self.fetchDelete(id)
        }
      }
    })
  },

  /**
   * 删除
   */
  fetchDelete: function(id) {
    wx.showLoading({mask:true})
    const self = this
    let url = app.globalData.domain + 'cart/' + id + '/'
    wx.request({
      url: url,
      method: 'DELETE',
      header: {
        'Authorization': 'Token ' + wx.getStorageSync('token')
      },
      success: res=>wx.showToast({title:'删除成功'}),
      complete: res=>{
        self.fetchData()
        wx.hideLoading()
      }
    })
  },

  /**
   * 数量增加
   */
  onIncrease: function(e) {
    let id = e.currentTarget.dataset.id
    let count = e.currentTarget.dataset.count
    count += 1
    this.fetchChangeCount(id, count)
  },

  /**
   * 数量减少
   */
  onDecrease: function(e) {
    let count = e.currentTarget.dataset.count
    if(count == 1) {
      // 如果数量为1
      return
    }
    let id = e.currentTarget.dataset.id
    count -= 1
    this.fetchChangeCount(id, count)
  },

  /**
   * 请求更改数量
   */
  fetchChangeCount: function(id, count) {
    //wx.showLoading({mask:true})
    const self = this
    let url = app.globalData.domain + 'cart/' + id + '/'
    let data = {
      count: count
    }
    wx.request({
      url: url,
      method: 'PUT',
      data: data,
      header: {'Authorization': 'Token '+wx.getStorageSync('token')},
      success: res=>self.fetchData(),
      //complete: res=>wx.hideLoading()
    })
  },

  /**
   * 更改选中状态
   */
  onChangeChecked: function(e) {
    const self = this
    let id = e.currentTarget.dataset.id
    let url = app.globalData.domain + 'cart/' + id + '/'
    let is_checked = e.currentTarget.dataset.checked
    wx.request({
      url: url,
      method: 'PUT',
      data: {'is_checked':!is_checked},
      header: {'Authorization': 'Token '+wx.getStorageSync('token')},
      success: res=>self.fetchData()
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.fetchData()
    wx.stopPullDownRefresh()
  },

})
