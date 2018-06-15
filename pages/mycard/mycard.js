// pages/mycard/mycard.js
const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    data: {},
    next: true,
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/starcards/",
    getContact:false,  //获得现金红包
    msg:'',
  },

  //点击卡片
  clickCard: function (e) {
    let index = parseFloat(e.currentTarget.dataset.index);
    let data = this.data.data;
    let status = 0;
    if (data[index] && data[index][1] > 0) {
      status = 1;
    } else {
      status = 0;
    }
    wx.navigateTo({
      url: `../changeCard/changeCard?index=${index}&status=${status}`,
    })
  },
  
  // 关闭现金红包弹窗
  close:function(){
    this.setData({ getContact: false  });
  },

  show: function () {
    let that = this;
    let fullUrl = common.baseUrl + 'fullCardToLuckDraw';
    let fullData = {skey:app.globalData.loginData.skey};
    common.Post(fullUrl,fullData).then(res=>{
      if(res.data.err == 0){
        that.setData({ getContact: true,msg:res.data.msg });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Url = common.baseUrl + "starCardsList";
    common.Get(Url).then(res => {
      console.log(res);
      wx.setStorageSync("card", res.data.data)
      this.setData({
        cards: res.data.data
      })
    });

    let mycardUrl = common.baseUrl + 'myStarCards';
    let mycardData = { skey: app.globalData.loginData.skey };
    common.Post(mycardUrl, mycardData).then(res => {
      if (res.data.err == 0) {
        this.setData({ data: res.data.data });
        if (res.data.count == 15) { //集齐15张球星卡
          this.setData({ next: false});
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