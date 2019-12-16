import { ENV } from '../../profile'
Page({
  data: {

  },

  onLoad() {
    var that = this

    my.getStorage({
      key: 'user',
      success: (result) => {
        that.setData({
          user: result.data,

        })
      }
    });
  },

  onAddTap() {
    my.navigateTo({
      url: '../newDevice/newDevice'
    })

  },
  onDownloadTap() {
    my.navigateTo({
      url: '../download/download'
    })

  },

  toDevice() {

    my.navigateTo({
      url: "../device/device",
    });

  },

}) 
