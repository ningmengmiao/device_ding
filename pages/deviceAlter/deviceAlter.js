import { ENV } from '../../profile.js'
Page({
  data: {},
  onLoad(option) {
    var that = this

    that.setData({

      item: JSON.parse(option.item),

    })
    my.getStorage({
      key: 'user',
      success: (result) => {
        that.setData({
          user: result.data
        })
      }
    });

  },

  onSubmit(e) {
    var that = this
    this.setData({
      _item: e.detail.value,
    })

    my.httpRequest({

      url: ENV.domain + '/device/updateDevice', // 目标服务器url
      data: {
        opId: that.data.user.userid,
        ddeviceId: that.data.item.ddeviceId,
        ddeviceCid: that.data._item.ddeviceCid,
        ddeviceName: that.data._item.ddeviceName,
        ddeviceType: that.data._item.ddeviceType,
        dmanufacturer: that.data._item.dmanufacturer,
        dnote: that.data._item.dnote,
        dpic: that.data._item.dpic,
        dplant: that.data._item.dplant,
        dproductionTime: that.data._item.dproductionTime,
        dtestTime: that.data._item.dtestTime,
        dsite: that.data._item.dsite,
        dspace: that.data._item.dspace,


      },
      success: (res) => {
        if (res.status === 200) {
          if (res.data === 1) {
            my.alert({
              content: '修改成功'
            });
          }
          else if (res.data === 4) {
            my.alert({
              content: '填写的负责人不存在'
            });
          }
          else {
            my.alert({
              content: '未修改任何内容'
            });
 }
}
        else {
my.alert({
            content: '修改失败'
          });
        };
}
    })
 },
  onDelBtnTap() {
    var that = this

    my.confirm({
      content: '你确定要删除此设备吗？',
      success: (res) => {

        if (res.confirm) {

          my.httpRequest({

            url: ENV.domain + '/device/deleteDevice', // 目标服务器url
            data: {
              opId: that.data.user.userid,
              ddeviceId: that.data.item.ddeviceId,
            },
            success: (res) => {
              console.log(res)
              if (res.status === 200) {
                if (res.data === 1) {
                  my.alert({
                    content: '删除成功，如需恢复请联系管理员',
                    success: (res) => {
                      my.reLaunch({
                        url: '../device/device'
                      });
                    }
                  });

                }
                else {
                  my.alert({
                    content: '删除失败'
                  });
                }
              }
              else {
                my.alert({
                  content: '删除失败'
                });
              };
            }
          })
        }

      },
    });



  },


});
