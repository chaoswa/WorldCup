const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guess_list: [], //所有赛况
    yes: true, //预测成功印章
    no: false, //预测失败印章
    nomal: false, //比赛结果标识
    notHave: false, //无竞猜记录
    showActivity:false, //活动
  },

  // 点击展示活动文案
  showPacket:function(){
    this.setData({ showActivity: true });
  },
  
  // 关闭活动文案 
  close:function(){
    this.setData({ showActivity: false, timg: false });
  },

  bingo:function(){
    this.setData({ showActivity:true });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let guessUrl = common.baseUrl + 'guessResult';
    let guessData = { skey: app.globalData.loginData.skey };
    common.Post(guessUrl, guessData).then(res => {
      if (res.data.err == 0) {
        if (res.data.msg == 'ok') {
          this.setData({ guess_list: res.data.data });
        } else if (res.data.msg == '您还没有竞猜') {
          this.setData({ notHave: true });
        } else {
          this.setData({ nomal:true });
        }
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