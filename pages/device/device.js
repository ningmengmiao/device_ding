import { ENV } from '../../profile.js'
Page({
  data: {
    zindex: -1,
    filtratePalceholder: "筛选",
  },
  onLoad() {
    var that = this
    my.httpRequest({

      url: ENV.domain + '/device/findAllDevice', // 目标服务器url
      data: {

      },
      success: (res) => {

        that.setData({
          deviceItems: res.data,
        })
      }
    })

  },

  onItemClick(e) {
    var item = this.data.deviceItems[e.index]
    var json = JSON.stringify(item)
    my.navigateTo({
      url: "../deviceDetail/deviceDetail?item=" + json,
    });


  },
  onFiltrateTap() {
    var that = this

    if (that.data.filtratePalceholder === "筛选") {
      that.setData({
        zindex: 2,

      })
    }
    else {
      that.onClear();
      that.setData({
        filtratePalceholder: "筛选"
      })
    }
  },

  onCancelBtnTap() {

    this.setData({

      zindex: -1,

    })
  },


  onConfirmBtnTap() {

    this.setData({

      zindex: -1,
      filtratePalceholder: "重置",

    })
  },

  search(e) {
    var that = this
    my.httpRequest({

      url: ENV.domain + '/device/searchDevice', // 目标服务器url
      data: {
        str: e,
      },
      success: (res) => {

        that.setData({
          deviceItems: res.data,
        })
      }
    })

  },

  onClear() {

    var that = this
    my.httpRequest({

      url: ENV.domain + '/device/findAllDevice', // 目标服务器url
      data: {

      },
      success: (res) => {

        that.setData({
          deviceItems: res.data,
        })
      }
    })
  },

  onCancel() {
    this.onClear();
  },
});
