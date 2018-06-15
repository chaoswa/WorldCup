const app = getApp();
const util = require('../../utils/util.js');
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLogin: false, //登录授权框
    setting: false,  //授权设置
    today_guessing_list: [],  //今日竞猜阵容
    countDown: [],  //竞猜倒计时
    guessingOptions: ['主胜', '平', '客胜'], //竞猜选项
    guessingOptions_index: '',  //竞猜选项下标
    load_e: '',  //分享者的skey
    current:0, 
    interval:null,
  },

  // 拒绝授权
  scope: function (e) {
    console.log(e.detail.authSetting['scope.userInfo']);
    if (e.detail.authSetting['scope.userInfo']) {
      wx.setStorage({
        key: 'showLogin',
        data: false,
        success: function () {
          wx.reLaunch({
            url: '../index/index',
          });
        }
      });
    } else {
      wx.showToast({
        title: '无法获取您相关信息，无法参与世界杯活动哟',
        icon: 'none',
        duration: 1500
      })
    }

  },

  // 授权模态框点击
  getUserInfo: function (e) {
    console.log(e);
    let url = '../index/index';
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorage({
        key: 'showLogin',
        data: false,
        success: function () {
          wx.reLaunch({
            url: url,
          });
        }
      });
    } else {
      this.setData({ setting: true });
    }
  },

  /**
  * 登录
  */
  login: function (e) {
    wx.login({
      success: res => {
        let code = res.code;
        if (code) {
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: res => {
                    let scene = e.scene;
                    //通过场景值判断appId的值，进行数据统计
                    let appId = (scene == 1037 ? e.referrerInfo.appId : 0);
                    let loginUrl = common.baseUrl + 'login';
                    let data = {
                      code: code,
                      iv: res.iv,
                      encryptedData: res.encryptedData,
                      appid: appId
                    }
                    common.Post(loginUrl, data).then(res => {
                      console.log('login', res);
                      app.globalData.loginData = res.data.data;  //用户游戏数据
                      this.setData({ is_onShow_data: true });//控制是否加载onShow
                      if ('skey' in e) {
                        // 分享进入成为好友
                        let pullInUrl = common.baseUrl + 'pullIn';
                        let pullInData = { shareId: e.skey, friendId: res.data.data.skey };
                        common.Post(pullInUrl, pullInData).then(res => {
                          if(res.data.err == 0){
                            wx.showModal({
                              showCancel: false,
                              title: '获得星卡',
                              content: '恭喜你成功获得一张随机球星卡',
                              success: function (res) {
                                if (res.confirm) {
                                  console.log('用户点击确定')
                                }
                              }
                            });
                          }
                        });
                      };
                      if('status' in e){
                        console.log('索取',e)
                        if(e.status == 0){ //索要球星卡
                          let askUrl = common.baseUrl +'askForCard';
                          let askData = {
                            asker: e.shareId,
                            giver: res.data.data.skey,
                            card_id:e.cardId
                          };
                          common.Post(askUrl, askData).then(res=>{
                            if(res.data.err == 0){ //如果有这张卡
                              wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 2000,
                                success:function(){
                                  wx.navigateTo({
                                    url: `../changeCard/changeCard?asker=${e.shareId}&cardId=${e.cardId}`,
                                  })
                                }
                              });
                            }else{
                              wx.showToast({
                                title: res.data.msg,
                                icon:'loading',
                                duration:1000
                              })
                            }
                          });
                        }else if(e.status == 1){ //赠送
                          let giveUrl = common.baseUrl +'giveCard';
                          let giveData = {
                            giver: e.shareId,
                            receiver: res.data.data.skey,
                            card_id: e.cardId
                          }
                          common.Post(giveUrl, giveData).then(res=>{
                            console.log('赠送',res);
                            if(res.data.err == 0){
                              wx.showModal({
                                content: `恭喜你获得一张来自${res.data.nickname}赠送的球星卡`,
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    console.log('用户点击确定')
                                  }
                                }
                              });
                            }else{
                              wx.showModal({
                                content: res.data.msg,
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    console.log('用户点击确定')
                                  }
                                }
                              });
                            }
                         
                          });
                        }else{

                        }
                      }
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  },

  //获取竞猜选项
  getOption: function (e) {
    // console.log(e.currentTarget.dataset.id);
    this.setData({ guessingOptions_index: e.currentTarget.dataset.id });
  },

  // 预测冠军之路
  goWin:function(){
    wx.navigateTo({
      url: '../road/road',
    })
  },

  // 提交竞猜结果
  orderSign: function (e) {
    // console.log(e.detail.formId);
    let guessUrl = common.baseUrl+'todayGuess';
    if (this.data.guessingOptions_index == ''){
      wx.showToast({
        title: '请选择您的竞猜选项',
        icon: 'none',
        duration: 2000
      })
    }else{
      let guessData = {
        skey: app.globalData.loginData.skey,
        guess: this.data.guessingOptions_index,
        schedule_id: e.currentTarget.dataset.id,
        form_id: e.detail.formId
      };
      common.Post(guessUrl, guessData).then(res => {
        // console.log(res);
        if(res.data.err == 0){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          });
        }else{
          wx.showToast({
            title: '您已经提交过本场比赛的竞猜',
            icon: 'none',
            duration: 2000,
          });
        }
      });
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    //通过取缓存处理是否显示授权弹窗
    wx.getStorage({
      key: 'showLogin',
      success: function (res) {
        // console.log('showLogin', res.data)
        if (res.data === false) {
          that.setData({ showLogin: false });
          that.login(e);
          // console.log('success:getStorage', res.data);
        }
      },
      fail: function (res) {
        that.setData({ showLogin: true });
        // console.log('fail:getStorage', res);
      }
    });

    //今日竞猜
    wx.showLoading({
      title: '加载中',
    });
    let todayUrl = common.baseUrl + 'todayGuessList';
    common.Post(todayUrl, []).then(res => {
      console.log(res.data);
      if (res.data.err == 0) {
        this.setData({ today_guessing_list: res.data.data });
        //倒计时
        let duration = that.current_time()[this.data.current];
        if (duration > 0) {
          let interval = setInterval(() => {
            duration -= 1;
            if (duration <= 0) { clearInterval(interval);}
            this.getTimes(duration);
          }, 1000)
          this.setData({ interval: interval });
        }
        
      }
    });
    wx.hideLoading();


  },

  getIndex:function(e){
    // console.log(e.detail.current);
    let that=this;
    that.setData({ current: e.detail.current});
    clearInterval(that.data.interval);
    //倒计时
    let duration = that.current_time()[e.detail.current];
    if (duration>0){
      let interval = setInterval(() => {
        duration -= 1;
        if (duration <= 0) { clearInterval(interval); }
        that.getTimes(duration);
      }, 1000)
      this.setData({ interval: interval });
    }
    
  },

  current_time: function () {
    let times = [];
    let duration = [];
    let list = this.data.today_guessing_list;
    for (let i = 0; i < list.length;i++){
      times.push(list[i].start_at.split(":"));
    }
    console.log('time',times)
    for (let i = 0; i < times.length; i++){
      let allTime = times[i][0] * 3600;
      let time = util.formatTime(new Date());
      let nowSecond = time[0] * 3600 + time[1] * 60 + time[2];
      duration[i] = (allTime - nowSecond) > 0 ? (allTime - nowSecond):0;
    } 
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
    let skey = app.globalData.loginData.skey;
    let nickname = app.globalData.loginData.nickname;
    // if (res.from === 'button') {
    //   console.log(res.target)
    // }
    return {
      title: `【${nickname}@我】不花钱只赚钱的世界杯竞猜，百万现金等着你`,
      imageUrl: '../../images/share1.jpg',
      path: '/pages/index/index'
    }
  }
})
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}