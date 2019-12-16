import { ENV } from '../../profile.js'
Page({
  data: {

    zindex0: -1,
    zindex1: -1,
    zindex2: -1,
    devices: ["装调车间重要设备", "装调车间信息化设备", "装调车间办公设备"],
    pickerPlaceholder: "选择设备类型",
  },
  onLoad() {
    var that = this
    my.getStorage({
      key: 'user',
      success: (result) => {
        that.setData({
          user: result.data
        })
      }
    });
  },

  onPickerTap() {
    var that = this
    my.showActionSheet({
      title: '选择分类',
      items: that.data.devices,
      success: (res) => {
        console.log(res)
        if (res.index === 0) {
          that.setData({
            zindex0: 1,
            zindex1: -1,
            zindex2: -1,
            pickerPlaceholder: that.data.devices[0]
          })
        }
        else if (res.index === 1) {
          that.setData({
            zindex0: -1,
            zindex1: 1,
            zindex2: -1,
            pickerPlaceholder: that.data.devices[1]
          })
        }
      },
    });
  },
  onSubmit(e) {
    var that = this
    that.newDevice(e)
  },
  newDevice(e) {
    var that = this
    this.setData({
      deviceItem: e.detail.value,
    })

    my.httpRequest({

      url: ENV.domain + '/device/newDevice', // 目标服务器url
      data: {
        opId: that.data.user.userid,

        ddeviceCid: that.data.deviceItem.ddeviceCid,
        ddeviceName: that.data.deviceItem.ddeviceName,
        ddeviceType: that.data.deviceItem.ddeviceType,
        dmanufacturer: that.data.deviceItem.dmanufacturer,
        dnote: that.data.deviceItem.dnote,
        dpic: that.data.deviceItem.dpic,
        dplant: that.data.deviceItem.dplant,
        dproductionTime: that.data.deviceItem.dproductionTime,
        dtestTime: that.data.deviceItem.dtestTime,
        dsite: that.data.deviceItem.dsite,
        dspace: that.data.deviceItem.dspace,


      },
      success: (res) => {
        if (res.status === 200) {
          if (res.data === 1) {
            my.alert({
              content: '添加成功'
            });
            that.setData({
              deviceItem: "",
            })
          }
          else if (res.data === 4) {
            my.alert({
              content: '填写的负责人不存在'
            });
          }
          else {
            my.alert({
              content: '添加失败'
            });
          }
        }
        else {
          my.alert({
            content: '添加失败'
          });
        };
      }
    })
  },
});
