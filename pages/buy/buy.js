const app = getApp()

Page({
  data: {
    commodity: [],
    address: {}
  },

  onLoad: function() {
    this.fetchCommodity()
    this.getAddress()
  },

  fetchCommodity: function() {
    const data = [
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01GRTBvM2DuRyAFerUz_!!704298669.jpg',name:'毛衣女2018秋冬新款长袖套头百搭韩版半高领针织打底衫',price:12.00},
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01H3haGQ2DuRy1xm1Zz_!!704298669.jpg',name:'波点半身裙2018秋冬装新款半身裙子女高腰百搭复古A字裙',price:12.00},
    ]
    this.setData({commodity:data})
  },

  getAddress: function() {
    const address = {name:'Chan', mobile:'15550001234', street:'神都上东门88号'}
    this.setData({address: address})
  }

})
