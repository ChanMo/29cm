//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: [],
    commodity: [],
    discount: []
  },
  onLoad: function () {
    this.fetchBanner()
    this.fetchCommodity()
    this.fetchDiscount()
  },
  fetchBanner: function() {
    const data = [
      {image:'https://img.alicdn.com/bao/uploaded/i3/704298669/O1CN01RDuy6p2DuRy8HAlTG_!!704298669.jpg', link:''},
      {image:'https://gd1.alicdn.com/imgextra/i4/704298669/O1CN01moai7s2DuRy1loLA7_!!704298669.jpg', link:''},
    ]
    this.setData({banner: data})
  },
  fetchCommodity: function() {
    const data = [
      {image:'https://gd1.alicdn.com/imgextra/i1/798012255/TB28st9jlHH8KJjy0FbXXcqlpXa_!!798012255.jpg',name:'Sony x5000',price:4500.00,desc:'Sony x5000 是一款入门微单相机'}
    ]
    this.setData({commodity: data})
  },
  fetchDiscount: function() {
    const data = [
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01GRTBvM2DuRyAFerUz_!!704298669.jpg',name:'毛衣女2018秋冬新款长袖套头百搭韩版半高领针织打底衫',price:12.00},
      {image:'https://gd4.alicdn.com/imgextra/i4/704298669/O1CN01H3haGQ2DuRy1xm1Zz_!!704298669.jpg',name:'波点半身裙2018秋冬装新款半身裙子女高腰百搭复古A字裙',price:12.00},
      {image:'https://gd1.alicdn.com/imgextra/i1/704298669/O1CN017y3RPA2DuRy5BjCwa_!!704298669.jpg',name:'连帽卫衣连衣裙长裙2018秋冬新款原宿风长款后开叉裙子女',price:12.00},
      {image:'https://gd3.alicdn.com/imgextra/i3/704298669/O1CN01oTVR6o2DuRy42JRRO_!!704298669.jpg',name:'2018冬季新款高腰宽松百搭休闲时尚毛呢短裤女秋冬打底裤',price:12.00}
    ]
    this.setData({discount:data})
  }
})
