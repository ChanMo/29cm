const app = getApp()

Page({
  data: {
    id: 0, // 商品ID
    count: 1, // 商品数量
    commodity: [],
    price: 0.00, // 商品总价格
    is_cart: true, // 是否从购物车
  },

  onLoad: function(options) {
    if(options.id) {
      // 从商品详情
      this.setData({
        id: options.id,
        count: parseInt(options.count),
        is_cart: false
      })
      this.fetchCommodity()
    } else {
      // 从购物车
      this.fetchFromCart()
    }
  },

  /**
   * 获取商品详情
   */
  fetchCommodity: function() {
    const self = this
    let url = app.globalData.domain + 'commodity/' + this.data.id + '/'
    wx.request({url, success:res=>{
      let data = {'commodity':res.data, 'count':self.data.count}
      self.setData({commodity: [data]})
      self.makePrice()
    }})
  },

  /**
   * 获取购物车数据
   */
  fetchFromCart: function() {
    const self = this
    let url = app.globalData.domain + 'cart/?is_checked=true'
    wx.request({
      url: url,
      header: {'Authorization': 'Token '+wx.getStorageSync('token')},
      success: res=>{
        self.setData({commodity: res.data})
        self.makePrice()
      }
    })
  },

  /**
   * 获取地址
   */
  onChooseAddress: function() {
    const self = this
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success:()=>self.chooseAddress()
          })
        } else {
          self.chooseAddress()
        }
      }
    })
  },

  /**
   * 选择地址
   */
  chooseAddress: function() {
    wx.chooseAddress({
      success: res => this.setData({
        consignee: res.userName,
        mobile: res.telNumber,
        region: res.provinceName + res.cityName,
        street: res.detailInfo
      })
    })
  },

  /**
   * 计算价格
   */
  makePrice: function() {
    let price = 0.00
    this.data.commodity.map(item=>price += item.count * item.commodity.price * item.commodity.discount)
    this.setData({price: price.toFixed(2)})
  },

  /**
   * 提交订单
   */
  onSubmit: function() {
    if(!this.data.consignee) {
      wx.showToast({title:'请选择收货地址'})
      return
    }
    wx.showLoading({mask:true})
    let url = app.globalData.domain + 'order/buy'
    let commodities = []
    this.data.commodity.map(item=>commodities.push({
      id: item.commodity.id,
      count: item.count
    }))
    let data = {
      consignee: this.data.consignee,
      mobile: this.data.mobile,
      region: this.data.region,
      street: this.data.street,
      commodities: commodities,
      is_cart: this.data.is_cart,
    }
    wx.request({
      url: url,
      method: 'POST',
      header: {'Authorization': 'Token '+wx.getStorageSync('token')},
      data: data,
      success: res=>wx.showToast({title:'订单提交成功'}),
      complete: wx.hideLoading()
    })
  },

})
