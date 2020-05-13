//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    countnum: 6,//最大图片数量
    imgs: [],//图片数组
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },
  //选择图片
  chooseImgnum: function (e) {
    console.log(e);
    var images = this.data.imgs;
    for (var index in e.detail) {
      var item = Object();
      item.imgurl = e.detail[index];//本地图片地址或者网络图片地址
      item.isupload = 1;//是否上传
      item.id = "";//网络图片id
      images.push(item);
    }
    this.setData({
      imgs: images
    })
  }
  ,
  deleteImgnum: function (e) {
    console.log("删除");
    console.log(e);
    if (e.detail.isupload==0){
      //本地删除
      console.log("本地删除不做审核修改");
    }
    else{
      //已经上传的图片网络处理逻辑
      console.log("处理网络图片的问题");

    }

  },
  //上传图片
  uploadImgs: function (e) {
    console.log(list);
    var list = this.data.imgs;
    // 过滤未上传的图片
    list = list.filter(function (element, index, array) { return element.isupload == 0 });
    var tempFilePaths = list;
    var nowTime = util.formatDate(new Date());
    //支持多图上传
    for (var i = 0; i < list.length; i++) {
      //显示消息提示框
      wx.showLoading({
        title: '上传中' + (i + 1) + '/' + list.length,
        mask: true
      })
      //你的域名下的/apppic文件下的/当前年-月-日文件下/图片.png
      //图片路径可自行修改
      let filepath = list[i].imgurl;
      uploadImage(filepath, 'apppic/' + nowTime + '/',
        function (result) {
          console.log("======上传成功图片地址为：", result);
          wx.hideLoading();
        }, function (result) {
          console.log("======上传失败======", result);
          wx.hideLoading()
        }
      )
    }
  }



})
