// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
let appDatas = getApp(); 
console.log(appDatas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObbj: {},
    index: null,
    isCollection: false,
    isMusicPlay: false
  },
  handlerCollection () {
    let isCollection = !this.data.isCollection
    this.setData({
      isCollection
    })
    let title = isCollection ? '收藏成功': '取消收藏'
    wx.showToast({
      title,
      icon: 'success'
    })
    // 缓存数据到本地
    let { index } = this.data
    wx.getStorage({
      key: 'isCollection',
      success: (res) => {
        console.log('---------------res')
        console.log(res)
        let obj = res.data
        // 不可行，会覆盖之前的状态
        // let obj = {}
        obj[index] = isCollection
        wx.setStorage({
          key: 'isCollection',
          data: obj,
          success: (datas) => {
            console.log(datas)
          }
        }) 
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let index = options.index
    this.setData({
      detailObbj:datas.list_data[index],
      index
    })
    // 根据本地缓存的数据判断那用户是否收藏当前文章
    let detailStorage = wx.getStorageSync('isCollection');
    console.log(detailStorage)
    if (!detailStorage) {
      // 在缓存中初始化对象
      wx.setStorageSync('isCollection',{})
    } 
    // 判断是否收藏
    if (detailStorage[index]) { // 收藏过
      this.setData({
        isCollection: true
      })
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放')
      this.setData({
        isMusicPlay: true
      })
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    })
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusicPlay: true
      })
    }
    // 音乐暂停
    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停')
      this.setData({
        isMusicPlay: false
      })
      appDatas.data.isPlay = false
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
  handlerMusicPlay () {
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })
    // 控制音乐播放
    if (isMusicPlay) {
      let { dataUrl, title} = this.data.detailObbj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      wx.pauseBackgroundAudio()

    }
  },
  handleShare () {
    wx.showActionSheet({
      itemList: ['分享朋友圈','分享朋友'],
    })
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