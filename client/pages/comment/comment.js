// pages/comment/comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    commentValue: '',
  },

  addComment(event){
    let content = this.data.commentValue
    if(!content) return

    wx.showLoading({
      title: '正在提交…',
    })

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        content: content,
        product_id: this.data.product.id
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if(!data.code){
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }else {
          wx.hideLoading()
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      },
    })
  },

  onInput(event){
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = {
      id: options.id,
      name: options.name,
      price: options.price,
      image: options.image
    }
    this.setData({
      product: product
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