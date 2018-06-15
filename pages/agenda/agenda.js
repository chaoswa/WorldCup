const app = getApp();
const common = require('../common/common.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["赛程", "积分"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    all_list: [], //所有赛况
    groupStage: [
      '小组赛A组', '小组赛B组', '小组赛C组', '小组赛D组', '小组赛E组', '小组赛F组', '小组赛G组', '小组赛H组'
    ],//小组赛
    height:'',
  },

  //选项卡切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  // 点击进入本场比赛详情
  onceDetail:function(e){
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../agendaDetail/agendaDetail?schedule_id=' + id,
    })
  },

  // 点击预约
  clickSub: function (e) {
    console.log(e.currentTarget.dataset.id);
    let mentUrl = common.baseUrl +'appointment';
    let mentData = {
      skey:app.globalData.loginData.skey,
      schedule_id: e.currentTarget.dataset.id
    };
    wx.showModal({
      title: '赛程提醒',
      content: '是否预约本场比赛，点击确定会及时给您推送相关赛事信息',
      success: function (res) {
        if (res.confirm) {
          common.Post(mentUrl, mentData).then(res => {
            console.log('预约',res);
            if(res.data.err == 0){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 500
              });
            }
          });
        } else{
          // console.log('用户点击取消')
          wx.showToast({
            title: '已取消',
            icon: 'loading',
            duration: 500
          })
        }
      }
    })
  },

  // 滑动加载


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: parseInt((res.windowWidth / that.data.tabs.length - sliderWidth) / 1.7),
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          height: res.windowHeight
        });
      }
    });

    // 世界杯球队积分榜
    let rankUrl = common.baseUrl + 'rank';
    common.Post(rankUrl, []).then(res => {
      console.log(res.data.data);
      this.setData({ groupStage: res.data.data });
    });
    // 世界杯赛程榜
    let schUrl = common.baseUrl+'schedule';
    wx.showLoading({
      title: '加载中',
    });
    common.Post(schUrl, []).then(res => {
      console.log(res.data.data);
      this.setData({ all_list: res.data.data });
      wx.hideLoading();
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