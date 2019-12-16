import { ENV } from '../../profile.js'
Page({
  data: {

    form: ["装调车间重要设备台账"],
    to: "",
    loading1: false,
    loading2: false,
  },
  onLoad() {
    var that = this

    my.getStorage({
      key: 'email',
      success: (res) => {

        that.setData({
          to: res.data.email,

        })
      }
    });

    my.httpRequest({

      url: ENV.domain + '/device/exportExcel', // 目标服务器url
      success: (res) => {

        console.log(res)
      }
    })

  },

  downLocalhost() {
    dd.downloadFile({
      url: ENV.domain + '/file/装调车间重要设备台账.xls',
      success({ filePath }) {
        dd.alert({
          content: "下载成功，文件保存在" + filePath,
        })

      },
      fail(res) {

        dd.alert({
          content: "下载失败",
        });
      },
    });

  },

  openFile() {


    dd.saveFileToDingTalk({
      url: ENV.domain + '/file/装调车间重要设备台账.xls',
      name: "装调车间重要设备台账.xls",
      success: (res) => {
        console.log(res)

        dd.previewFileInDingTalk({

          spaceId: res.data[0].spaceId,
          fileId: res.data[0].fileId,
          fileName: res.data[0].fileName,
          fileSize: res.data[0].fileSize,
          fileType: res.data[0].fileType,
        })
      },
      fail: (err) => {
        dd.alert({
          content: "打开失败，请稍后再试"
        })
      }
    })

  },
  sendEmail() {
    var that = this
    if (this.data.to === "") {

      dd.alert({
        title: '',
        content: '请先填写邮箱地址',

      });
    }
    else {
      that.setData({

        loading2: true,
      })
      my.httpRequest({

        url: ENV.domain + '/device/sendMail', // 目标服务器url
        data: {
          to: that.data.to
        },
        success: (res) => {

          that.setData({
            loading2: false
          })
          if (res.data === "200") {
            dd.alert({
              title: '',
              content: '发送成功',

            });


          }
          else {
            dd.alert({
              title: '',
              content: '发送失败',

            });
          }
        },
      });
    }
  },

  onBlur(e) {
    this.setData({
      to: e.detail.value
    })

    my.setStorage({
      key: "email",
      data: {
        email: e.detail.value,
      }
    });

  },
});
