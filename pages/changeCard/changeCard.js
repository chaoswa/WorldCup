// pages/changeCard/changeCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: ["../../images/starcard/card01.png", "../../images/starcard/card02.png", "../../images/starcard/card03.png", "../../images/starcard/card04.png", "../../images/starcard/card05.png", "../../images/starcard/card06.png", "../../images/starcard/card07.png", "../../images/starcard/card08.png", "../../images/starcard/card09.png", "../../images/starcard/card10.png", "../../images/starcard/card11.png", "../../images/starcard/card12.png", "../../images/starcard/card13.png", "../../images/starcard/card14.png", "../../images/starcard/card15.png"],
    cardName:[
      "里奥·梅西","克里斯蒂亚诺·罗纳尔多","路易斯·阿尔贝托·苏亚雷斯",
      "内马尔·达席尔瓦","托马斯·穆勒","穆罕默德·萨尔赫",
      "凯文·德布劳内","罗伯特·莱万多夫斯基","安东尼·格里兹曼",
      "哈梅斯·罗德里格斯","埃登·阿扎尔","谢尔丹·沙奇里",
      "哈里·凯恩","曼努埃尔·诺伊尔","卢卡·莫德里奇"
    ],
    src:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({src:this.data.cards[index]});
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