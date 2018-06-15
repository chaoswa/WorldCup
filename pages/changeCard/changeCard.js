
const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/starcards/",
    cardName: [
      "里奥·梅西", "克里斯蒂亚诺·罗纳尔多", "路易斯·阿尔贝托·苏亚雷斯",
      "内马尔·达席尔瓦", "托马斯·穆勒", "穆罕默德·萨尔赫",
      "凯文·德布劳内", "罗伯特·莱万多夫斯基", "安东尼·格里兹曼",
      "哈梅斯·罗德里格斯", "埃登·阿扎尔", "谢尔丹·沙奇里",
      "哈里·凯恩", "曼努埃尔·诺伊尔", "卢卡·莫德里奇"
    ],
    src: "",
    getCard: false,
    postCard: false,
    status: '',
    index: "",
    give: false,
    asker: '',  //索取者
    giver: '',  //赠送者
    card_id: '', //赠送卡
    sharePost:[
      '好友向你赠送一张球星卡，快去领取抽现金红包吧',
      '../../images/share2.jpg',
    ],
    shareGet:[
      '好友向你索取一张球星卡，快帮他领现金红包吧',
      '../../images/share3.jpg',
    ]
  },

  // 同意赠送
  give: function () {
    let giveUrl = common.baseUrl + 'agreeGiveCard';
    let giveData = {
      asker: this.data.asker,
      giver: this.data.giver,
      card_id: this.data.card_id
    };
    common.Post(giveUrl, giveData).then(res => {
      // console.log(res);
      if(res.data.err == 0){
        wx.showToast({
          title: '赠送成功',
          icon: 'success',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: '赠送失败',
          icon: 'loading',
          duration: 1000
        })
      }
    });
  },

  // 放弃赠送
  goback:function(){
    wx.navigateBack({
      delta:1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    let card = wx.getStorageSync("card")
    if (options.index) {
      let index = options.index;
      let status = options.status;
      this.setData({
        src: card[index],
        status: status,
        index: index
      });
      if (status == 0) {
        this.setData({
          getCard: true,
        })
      } else if (status == 1) {
        this.setData({
          postCard: true
        })
      }
    }

    // 如果携带索取信息
    if (options.asker) {
      this.setData({
        src: card[options.cardId],
        give: true,
        asker: options.asker,
        giver: app.globalData.loginData.skey,
        card_id: options.cardId
      });
    }
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
    let that = this;
    let status = that.data.status;
    let index = that.data.index;
    let skey = app.globalData.loginData.skey;
    let sharePost = that.data.sharePost;  //赠送
    let shareGet = that.data.shareGet;  //索取

    let sharetitle = status == 0 ? shareGet[0] : sharePost[0];
    let shareimg = status == 0 ? shareGet[1] : sharePost[1];

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: sharetitle,
      imageUrl: shareimg,
      path: `/pages/index/index?shareId=${skey}&status=${status}&cardId=${index}`
    }

  }
})