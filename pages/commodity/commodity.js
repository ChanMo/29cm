const app = getApp()

Page({
  data: {
    commodity: null
  },
  onLoad: function(options) {
    this.fetchCommodity()
    this.fetchRank()
  },
  fetchCommodity: function() {
    const data = {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01GRTBvM2DuRyAFerUz_!!704298669.jpg',name:'毛衣女2018秋冬新款长袖套头百搭韩版半高领针织打底衫',price:3000.00,content:'<img src="https://img.alicdn.com/imgextra/i4/704298669/O1CN01ZMm6Au2DuRyFjx7RE_!!704298669.jpg" style="width:100%;" align="absmiddle">'}
    this.setData({commodity:data})
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

  onBuy: function() {
    wx.navigateTo({url:'/pages/buy/buy'})
  }
})
