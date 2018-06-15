const common = require('../common/common.js');
const app = getApp()
// pages/road4/road4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    data:[],
    data2:[],
    data3:[],
    select1:false,
    select2:false,
    select3:false,
    select4:false,
    select5:false,
    select6:false,
    next: true,
    show:false,
    hidden:true
  },

  next: function () {
    let data3 = this.data.data3
    wx.setStorageSync("win", this.data.data3)

    let Url = "https://wdcup.chaosuduokai.com/index/api/forecastChampion";
    let Data={
      skey: app.globalData.loginData.skey,
      champion: this.data.data3[0].title
    }
    common.Post(Url, Data).then(res => {
      console.log(res);
      wx.navigateTo({
        url: `../win/win`
      })
    })
  },

  select1:function(e){
    let index=parseFloat(e.currentTarget.id)
    let data2 = this.data.data2;
    let data = this.data.data;
    if(index==0){
      this.setData({
        select1: true,
        select2: false
      })
    } else if (index == 1){
      this.setData({
        select1: false,
        select2: true
      })
    }
    data2[0]=data[index]
    this.setData({
      data2: data2
    })
    console.log(data2)
  },

  select2: function (e) {
    let index = parseFloat(e.currentTarget.id)
    let data2 = this.data.data2;
    let data = this.data.data;
    if (index == 2) {
      this.setData({
        select3: true,
        select4: false
      })
    } else if (index == 3) {
      this.setData({
        select3: false,
        select4: true
      })
    }
    data2[1] = data[index]
    this.setData({
      data2: data2
    })
    console.log(data2)
  },

  select3: function (e) {
    let index = parseFloat(e.currentTarget.id)
    let data2 = this.data.data2;
    let data3 = this.data.data3;
    if (data2.length >= 2 && data2[0]){
      if (index == 0) {
        this.setData({
          select5: true,
          select6: false
        })
      } else if (index == 1) {
        this.setData({
          select5: false,
          select6: true
        })
      }
      data3[0] = data2[index]
      this.setData({
        data3: data3
      })
      if (data3.length > 0) {
        this.setData({
          next: false
        })
      }
      console.log(data3)
      
    }


  },



  share:function(){
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          prurl: res.tempFilePath,
          hidden: false,
          show:false
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let win8 = wx.getStorageSync("win8");

    console.log(win8)
    this.setData({
      data: win8
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})