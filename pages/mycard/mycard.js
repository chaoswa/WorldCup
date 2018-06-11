// pages/mycard/mycard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: ["../../images/starcard/card01.png", "../../images/starcard/card02.png", "../../images/starcard/card03.png", "../../images/starcard/card04.png", "../../images/starcard/card05.png", "../../images/starcard/card06.png", "../../images/starcard/card07.png", "../../images/starcard/card08.png", "../../images/starcard/card09.png", "../../images/starcard/card10.png", "../../images/starcard/card11.png", "../../images/starcard/card12.png", "../../images/starcard/card13.png", "../../images/starcard/card14.png", "../../images/starcard/card15.png"]
  },
  
  //点击卡片
  clickCard:function(e){
    let index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../changeCard/changeCard?index=${index}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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