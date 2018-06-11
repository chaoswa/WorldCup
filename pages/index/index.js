const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today_guessing_list:[
      {team_img:'../../images/index/1.png',team_name:'俄罗斯'},
      { team_img: '../../images/index/2.png', team_name: '沙特' },
    ],  //今日竞猜阵容
    countDown:[],  //竞猜倒计时
    guessingOptions:['主胜','平','客胜'], //竞猜选项
  },

  //获取竞猜选项
  getOption:function(e){
    console.log(e.currentTarget.dataset.val);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    //倒计时
    let duration = that.current_time();
    setInterval(() => {
      duration -= 1;
      that.getTimes(duration);
    }, 1000)
  },

  current_time: function () {
    let allTime = 24 * 3600;
    let time = util.formatTime(new Date());
    let nowSecond = time[0] * 3600 + time[1] * 60 + time[2];
    let duration = allTime - nowSecond;
    return duration;
  },

  getTimes: function (duration) {
    let that = this;
    let data = [];
    let hour = parseInt(duration / 3600);
    let minute = parseInt((duration - hour * 3600) / 60);
    let second = parseInt(duration - hour * 3600 - minute * 60);
    data[0] = hour;
    data[1] = minute;
    data[2] = second;
    let array = data.map(formatNumber);
    that.setData({
      countDown: `${array[0]}时${array[1]}分${array[2]}秒`
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
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}