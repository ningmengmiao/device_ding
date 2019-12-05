Page({
  data: {


  },
  onLoad(option) {
    var that = this

    that.setData({

     item: JSON.parse(option.item),

    })
    console.log(that.data.deviceItem)
  },
});
