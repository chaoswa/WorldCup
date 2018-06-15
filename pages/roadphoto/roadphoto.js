const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    no_have:true, //没有参与预测冠军标识
    win:false,
    winer:[],
    nickname:''
  },
  
  back:function(){
    wx.navigateTo({
      url: '../road/road',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let forUrl = common.baseUrl + 'myForecast';
    this.setData({ nickname : app.globalData.loginData.nickname});
    let forData = { skey: app.globalData.loginData.skey };
    common.Post(forUrl, forData).then(res => {
      console.log(res.data);
      if (res.data.err==0){
        this.setData({
          no_have:false,
          win:true,
          winer:res.data.data
        });
      }
    });
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