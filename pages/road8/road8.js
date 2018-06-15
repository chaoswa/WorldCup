// pages/road8/road8.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    data: ['', '', '', ''],
    win8: ["", "", "", ""],
    next: true
  },

  next: function () {
    wx.navigateTo({
      url: `../road4/road4`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let win16 = wx.getStorageSync("win16");
    let data=[{},{},{},{}];
    let arr = [[win16[0], win16[1]], [win16[2], win16[3]], [win16[4], win16[5]], [win16[6], win16[7]]];
    for (let i = 0; i < data.length; i++) {
      data[i].index = i;
      data[i].status1 = false;
      data[i].status2 = false;
      data[i].arr = arr[i];
    }
    console.log(data)
    this.setData({
      data: data
    })
  },

  select: function (e) {
    let id = e.currentTarget.id;
    let data = this.data.data;
    let index = e.currentTarget.dataset.index;
    this.setData({ current: id })
    this.setWin16Arr(id, data[id].arr[index])
    if (index == 0) {
      this.setDataStatus(id, true);
    } else if (index == 1) {
      this.setDataStatus(id, false);
    }
    let pass = this.data.data.every(function (currentValue, index, arr) {
      return (currentValue.status1 == true || currentValue.status2 == true);
    })
    if (pass) {
      this.setData({ next: false })
    }
  },

  setDataStatus: function (id, status) {
    let data = this.data.data;
    data[id].status1 = status;
    data[id].status2 = !status;
    this.setData({
      data: data
    })
  },

  setWin16Arr: function (index, option) {
    let win8 = this.data.win8;
    win8[index] = option;
    this.setData({
      win8: win8
    })
    wx.setStorageSync("win8", win8)
    console.log(this.data.win8)
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