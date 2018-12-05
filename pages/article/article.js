const app = getApp()

Page({
  data: {
    id: 0,
    data: {},
    content: null
  },

  onLoad: function(options) {
    this.setData({id: options.id})
    this.fetchData()
  },

  fetchData: function() {
    let url = app.globalData.domain + 'blog/' + this.data.id + '/'
    wx.request({url, success:res=>{
      let content = res.data.content.replace(new RegExp('style=', 'g'), 'style2=')
      content = content.replace(new RegExp('<img ', 'g'), '<img style="width:100% !important;height:100% !important;" ')
      this.setData({
        data: res.data,
        content: content
      })
    }})
  }
})
