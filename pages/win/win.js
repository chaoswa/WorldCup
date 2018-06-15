const app = getApp();
const common = require('../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "https://cfy.chaosuduokai.com/wordcup2018/",
    win: [],
    hidden: true,
    nickname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let win = wx.getStorageSync("win")
    let imgUrl = this.data.imgUrl;
    let nickname = app.globalData.loginData.nickname;
    this.setData({
      win: win,
      nickname: nickname
    })



    let promise1 = new Promise(function (resolve, reject) {

      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: '../../images/road32/xxx.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });

    let promise2 = new Promise(function (resolve, reject) {
      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: `${imgUrl}${win[0].img}`,
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });

    let promise3 = new Promise(function (resolve, reject) {
      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: '../../images/road32/maer.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });

    let promise4 = new Promise(function (resolve, reject) {
      /* 获得要在画布上绘制的图片 */
      wx.getImageInfo({
        src: '../../images/road32/getwin2.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });



    Promise.all(
      [promise1, promise2, promise3, promise4]
    ).then(res => {
      console.log(res)
      wx.setStorageSync("img", res[1].path)
      /* 创建 canvas 画布 */
      const ctx = wx.createCanvasContext('shareImg')

      /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
      /* ps: 网络图片的话 就不用加../../路径了 反正我这里路径得加 */
      ctx.drawImage('../../' + res[0].path, 0, 0, 545, 771)
      ctx.drawImage('../../' + res[2].path, 360, 560, 100, 100)
      // ctx.drawImage('../../' + res[3].path, 165, 300, 230, 80)

      /* 绘制文字 位置自己计算 参数自己看文档 */
      ctx.setTextAlign('center')                        //  位置
      ctx.setFillStyle('#ffffff')                       //  颜色
      ctx.setFontSize(22)                               //  字号
      ctx.fillText(nickname, 545 / 2, 430)         //  内容  不会自己换行 需手动换行
      ctx.fillText('我支持的冠军之队是', 545 / 2, 470)  //  内容  不会自己换行 需手动换行
      ctx.setFillStyle('#000000')
      ctx.fillText(`${win[0].title}`, 545 / 2, 520)    //  内容
      ctx.setFontSize(15)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('长按识别二维码', 410, 680)

      ctx.beginPath();

      ctx.arc(160 / 2 + 192, 160 / 2 + 210, 160 / 2, 0, Math.PI * 2, false);

      ctx.clip();

      ctx.drawImage(res[1].path, 192, 210, 160, 160);

      // /* 绘制 */
      ctx.stroke()
      ctx.draw()

    })

  },


  save: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                hidden: true
              })
              wx.switchTab({
                url: '../index/index',
              });
            }
          }
        })
      }
    })
  },

  share: function () {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          prurl: res.tempFilePath,
          hidden: false,
        })
      },
      fail: function (res) {
        console.log(res)
      }
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
      title: `【${nickname}@我】参与世界杯冠军预测，领百万现金红包！`,
      imageUrl: '../../images/share1.jpg',
      path: '/pages/index/index'
    }
  }
})