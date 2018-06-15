// pages/starcard/starcard.js
const common = require('../common/common.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    imgUrl:"https://cfy.chaosuduokai.com/wordcup2018/starcards/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    });

    wx.showLoading({
      title: '加载中',
    })
    let Url ="https://wdcup.chaosuduokai.com/index/api/starCardsList";
    common.Get(Url).then(res=>{
      console.log(res);
      this.setData({
        cards:res.data.data
      })
      wx.hideLoading();
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
  onShareAppMessage: function (res) {
    let skey = app.globalData.loginData.skey;
    let nickname = app.globalData.loginData.nickname;
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '集齐15张球星卡，瓜分百万现金红包',
      imageUrl:'../../images/share1.jpg',
      path: '/pages/index/index?skey=' + skey
    }
  }
})