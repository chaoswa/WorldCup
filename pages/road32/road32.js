// pages/road32/road32.js
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    current:0,
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    winOne:false,
    winTwo:false,
    clickNum:0,
    index:-1,
    select0:false,
    select1:false,
    select2:false,
    select3:false,
    winGame:[],
    frist:'',
    second:'',
    win32:["","","","","","","",""],
    next: true
  },

  // 选择
  select:function(e){
    let index=e.currentTarget.dataset.index;
    this.setData({
      current:index,
      winOne: false,
      winTwo: false,
      clickNum: 0,
      index: -1,
      select0: false,
      select1: false,
      select2: false,
      select3: false,
      winGame: [],
      frist: '',
      second: ''
    })
  },

  next:function(){
    wx.navigateTo({
      url: `../road16/road16`
    })
  },

  //选择胜出
  winSelect:function(e){
    let that=this;
    let index=parseFloat(e.target.id)
    let clickNum = that.data.clickNum;
    console.log(index)
    console.log(that.data.index )
    console.log(clickNum)
    if (that.data.index != index && clickNum<=1){
      clickNum++
      that.setData({ 
        clickNum: clickNum,
        index: index 
      })
      console.log(clickNum)
      if (clickNum <= 1) {
        that.activeSelect(index);
        let arr=that.data.data[that.data.current].data[index];
        let getArr=[];
        getArr.push(arr);
        that.setData({
          winOne: true,
          winGame: getArr,
          frist:index
        })
      } else if (clickNum == 2) {
        that.activeSelect(index);
        let getArr = that.data.winGame;
        let arr = that.data.data[that.data.current].data[index];
        getArr.push(arr);
        if (getArr.length>=2){
          that.setData({
            winTwo: true,
            winGame: getArr,
            second: index
          })
        }else{
          that.setData({
            winOne: true,
            winGame: getArr,
            frist: index
          })
        }
        
      }
    }
    if (that.data.winGame.length==2){
      let current = that.data.current;
      that.changeStatus(current,true)
    }
    let pass = that.data.data.every(function (currentValue, index, arr) {
      return (currentValue.status == true);
    })
    if (pass){
      that.setData({ next: false})
    }
  },

  //显示选择完成
  changeStatus:function(index,status){
    let that=this;
    let data = that.data.data
    let win32 = that.data.win32
    win32[index] = that.data.winGame;
    data[index].status=status;
    that.setData({
      data: data,
      win32: win32
    })
    wx.setStorageSync("win32", that.data.win32)
    console.log(that.data.win32)
  },

  //判断选择项
  activeSelect:function(index){
    let that=this;
    if (index == 0) {
      that.setData({ select0: true })
    } else if (index == 1) {
      that.setData({ select1: true })
    } else if (index == 2) {
      that.setData({ select2: true })
    } else if (index == 3) {
      that.setData({ select3: true })
    }
  },

  //还原选择项
  homeSelect: function (index) {
    let that = this;
    let clickNum = that.data.clickNum;
    clickNum = (clickNum - 1 < 0) ? 0 : (clickNum - 1);
    console.log(clickNum)
    that.setData({
      index: -1,
      clickNum: clickNum
    })
    if (index == 0) {
      that.setData({ select0: false })
    } else if (index == 1) {
      that.setData({ select1: false })
    } else if (index == 2) {
      that.setData({ select2: false })
    } else if (index == 3) {
      that.setData({ select3: false })
    }
  },

  close1:function(){
    let that=this;
    let winGame = that.data.winGame;
    let len = winGame.length;
    let frist = that.data.frist;
    that.homeSelect(frist);
    if (len>1){
      winGame = winGame.splice(1, 1);
      that.setData({
        winOne: true,
        winTwo: false,
        winGame: winGame
      })
    }else{
      let second = that.data.second;
      that.homeSelect(second)
      winGame =[];
      that.setData({
        winOne: false,
        winTwo: false,
        winGame: winGame
      })
    }
    if (that.data.winGame.length < 2) {
      let current = that.data.current;
      that.changeStatus(current, false)
    }
  },

  close2:function(){
    let that=this;
    let winGame = that.data.winGame;
    let second = that.data.second;
    that.homeSelect(second);
    winGame = winGame.splice(0, 1);
    that.setData({
      winOne: true,
      winTwo: false,
      winGame: winGame
    })
    if (that.data.winGame.length < 2) {
      let current = that.data.current;
      that.changeStatus(current, false)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Url ="https://wdcup.chaosuduokai.com/index/api/rank";
    common.Get(Url).then(res => {
      let data=[{},{},{},{},{},{},{},{}];
      let arrindex=[];
      let arrval=[];
      let arr = res.data.data;
      for(let index in arr){
        arrindex.push(index)
        arrval.push(arr[index])
      }
      for(let i=0;i<arrindex.length;i++){
        data[i].index = arrindex[i]
        data[i].status = false
        data[i].data = arrval[i]
      } 
      console.log(data);
      this.setData({
        data: data
      })
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