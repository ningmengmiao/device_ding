
import { ENV } from '../../profile.js'
Page({
  data: {
    promptZIndex: -1,

  },
  onLoad(option) {
    var that = this
    my.getStorage({
      key: 'user',
      success: (res) => {

        that.setData({
          user: res.data,

        })
      },
    })
    that.setData({

      item: JSON.parse(option.item),

    })

  },

  onAlterTap() {

    var json = JSON.stringify(this.data.item)
    my.navigateTo({
      url: '../deviceAlter/deviceAlter?item=' + json
    });
  },
  onSubmitTap() {
    var that = this
    my.httpRequest({

      url: ENV.domain + '/device/getRoleUser', // 目标服务器url
      data: {
        roleId: 561696995,
      },
      success: (res) => {


        that.setData({
          admin: res.data,
          promptZIndex: 5,
        })


      }
    })

  },
  onInputSubmit(e) {
    console.log(e)
    var that = this
    that.setData({
      promptInput: e.detail.value.promptInput,
    })
    my.httpRequest({

      url: ENV.domain + '/device/sendMessage', // 目标服务器url
      data: {
        adminId: that.data.admin[0].userid,
        opId: that.data.user.userid,
        opName: that.data.user.name,
        message: that.data.promptInput,
        item: JSON.stringify(that.data.item),
      },
      success: (res) => {




      }
    })


  },

  onPromptNTap() {
    this.setData({

      promptZIndex: -1,
    })
  },
});
