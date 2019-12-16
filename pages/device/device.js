import { ENV } from '../../profile.js'
Page({
  data: {
    filtrateDisable: true,
    filtratePalceholder: "筛选",
    btn1Placeholder: "负责人",
    filterShow: false,
    filterItems: [],
    down: "/icon/arrow_down.svg",
    up: "/icon/arrow_up.svg",
    picId: "",
    plant: "",
    deviceName: "",
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
    this.onMaskTap();

  },


  onBtn1Tap() {
    var that = this
    this.setData({
      filterItems: [],
      btnIcon3: this.data.down,
      btnIcon2: this.data.down,
      filterShow: false,
    })
    dd.complexChoose({
      title: "选择责任人",            //标题
      multiple: false,            //是否多选
      responseUserOnly: true,        //返回人，或者返回人和部门
      success: function (res) {

        that.setData({
          picId: res.users[0].userId,
          btn1Placeholder: res.users[0].name,
        })

        that.filterDevice()

      },

    })
  },
  onBtn2Tap() {
    var that = this
    this.setData({
      filterItems: [],

      btnIcon3: this.data.down,
    })
    if (that.data.btnIcon2 === that.data.down) {
      my.httpRequest({
        url: ENV.domain + '/device/findPlant', // 目标服务器url
        success: (res) => {
          console.log(res)
          for (var i = 0; i < res.data.length; i++) {
            that.data.filterItems.push({
              "id": res.data[i].d_plant,
              "item": res.data[i].d_plant,
            })
          }
          that.data.filterItems.unshift({
            "id": "",
            "item": "无",
          }),
            that.data.filterItems.unshift({
              "name": "plant",
            }),

            that.setData({
              filterItems: that.data.filterItems,
              btnIcon2: that.data.up,
            })
        },
      });

      that.setData({
        filterShow: true,
      })
    }
    else {
      that.onMaskTap();
    }
  },

  onBtn3Tap() {
    var that = this
    this.setData({
      filterItems: [],
      btnIcon2: this.data.down,
    })
    if (that.data.btnIcon3 === that.data.down) {
      my.httpRequest({
        url: ENV.domain + '/device/findDeviceName', // 目标服务器url
        success: (res) => {
          console.log(res)
          for (var i = 0; i < res.data.length; i++) {
            that.data.filterItems.push({
              "id": res.data[i].d_device_name,
              "item": res.data[i].d_device_name,
            })
          }
          that.data.filterItems.unshift({
            "id": "",
            "item": "无",
          }),
            that.data.filterItems.unshift({
              "name": "deviceName",
            }),

            that.setData({
              filterItems: that.data.filterItems,
              btnIcon3: that.data.up,
            })
        },
      });

      that.setData({
        filterShow: true,
      })
    }
    else {
      that.onMaskTap();
    }
  },


  filterDevice() {
    var that = this
    my.httpRequest({
      url: ENV.domain + '/device/filterDevice',
      data: {
        picId: this.data.picId,
        plant: this.data.plant,
        deviceName: this.data.deviceName,
      },
      success: (res) => {
        that.setData({
          deviceItems: res.data
        })
      }
    })
  },
  handleCallBack(res) {


    this.setData({
      [this.data.filterItems[0].name]: res[0].id,

    })
    this.filterDevice();
    this.onMaskTap();
  },
  onMaskTap() {
    this.setData({
      filterShow: false,
      filterItems: [],
      btnIcon1: this.data.down,
      btnIcon2: this.data.down,
      btnIcon3: this.data.down,
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
        filtrateDisable: false,
        filtratePalceholder: "重置"
      })
    }
    else {
      var that = this
      my.httpRequest({
        url: ENV.domain + '/device/findAllDevice', // 目标服务器url
        data: {
        },
        success: (res) => {
          that.setData({
            deviceItems: res.data,
            btn1Placeholder: "负责人",
          })
        }
      })
      that.onMaskTap()

    }

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

  onTitleClick() {

    my.pageScrollTo({
      scrollTop: 0
    });
  }
});
