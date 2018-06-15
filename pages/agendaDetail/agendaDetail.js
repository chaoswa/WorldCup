const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_list: [],
    c_team: true,
    c_agenda: false,
    c_video: false,
    schedule_id: '',
    have_real: false, //比赛开始，录入赛况
    no_real: true, //比赛未开始 没有录入赛况
    math_data:[], //赛况
    video:false,  //有视频
    no_video:false, //没有视频
  },

  // 球队阵容
  select_team: function () {
    this.setData({ c_team: true, c_agenda: false, c_video: false, });
  },
  // 赛况
  select_agenda: function () {
    this.setData({ c_team: false, c_agenda: true, c_video: false, });
    let matchUrl = common.baseUrl + 'matchStatus';
    let mathData = { skey: app.globalData.loginData.skey, schedule_id: this.data.schedule_id };
    common.Post(matchUrl, mathData).then(res => {
      console.log('赛况', res);
      if (res.data.err == 0) {
        this.setData({ have_real: true, no_real: false, math_data:res.data.data });
      } else {
        this.setData({ no_real: true })
      }
    });

  },
  // 视频回放
  select_video: function () {
    this.setData({ c_team: false, c_agenda: false, c_video: true, });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // console.log(e.schedule_id);
    this.setData({ schedule_id: e.schedule_id });
    let teamUrl = common.baseUrl + 'teamLineUp';
    let teamData = {
      skey: app.globalData.loginData.skey,
      schedule_id: e.schedule_id
    };
    common.Post(teamUrl, teamData).then(res => {
      // console.log('首发阵容',res);
      if (res.data.err == 0) {
        if (res.data.data.video == '') { this.setData({ no_video:true, video:false});}
        else { this.setData({ no_video: false, video: true }); }
        this.setData({ team_list: res.data.data });
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