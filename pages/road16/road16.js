// pages/road16/road16.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    data:['','','','','','','',''],
    show:"",
    current:'',
    win16:["","","","","","","",""],
    next:true

  },
  

  next: function () {
    wx.navigateTo({
      url: `../road8/road8`
    })
  },
  
  select:function(e){
    let id=e.currentTarget.id;
    let data = this.data.data;
    let index=e.currentTarget.dataset.index;
    this.setData({ current: id})
    this.setWin16Arr(id,data[id].arr[index])
    if(index==0){
      this.setDataStatus(id,true);
    }else if(index==1){
      this.setDataStatus(id, false);
    }
    let pass = this.data.data.every(function (currentValue, index, arr) {
      return (currentValue.status1 == true || currentValue.status2 == true);
    })
    if (pass) {
      this.setData({ next: false })
    }
  },

  setDataStatus:function(id,status){
    let data = this.data.data;
    data[id].status1 = status;
    data[id].status2 = !status;
    this.setData({
      data: data
    })
  },

  setWin16Arr:function(index,option){
    let win16 = this.data.win16;
    win16[index]=option;
    this.setData({
      win16: win16
    })
    wx.setStorageSync("win16", win16)
    console.log(this.data.win16)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let win32=wx.getStorageSync("win32");
    let data=[{},{},{},{},{},{},{},{}];
    for(let i=0;i<data.length;i++){
      data[i].index=i;
      data[i].status1=false;
      data[i].status2=false;
      data[i].arr=win32[i]
    }
    console.log(data)
    this.setData({
      data: data
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