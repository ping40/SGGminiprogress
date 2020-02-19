// pages/movies/movies.js
let movie_url = 'http://t.yushu.im/v2/movie/top250';
let appDatas = getApp();
console.log(appDatas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: movie_url,
      success:(res) => {
        console.log(res)
        // 更新状态值
        this.setData({
          moviesArr: res.data.subjects
        })
        appDatas.data.moviesArr = res.data.subjects
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

  }
})