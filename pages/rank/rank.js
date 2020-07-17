import * as echarts from '../../utils/ec-canvas/echarts';
let chart = null;
function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    var option = {
        grid: {
            top: 30,
            height: 75
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['09/16', '09/17', '09/18', '09/91', '09/20', '09/21', '09/22'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#ffffff',
                fontSize: 11,
                fontWeight: 300
            }
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [{
            data: [0, 2136, 1796, 100, 1869, 3589, 5000],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#ffffff',
                    lineStyle: {
                        color: "#FFFF00",
                        width: 1
                    }
                }
            },
            symbol: 'circle',
            symbolSize: 4,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(255,255,0,0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(255,255,0,0)'
                    }])
            },
            label: {
                show: true,
                fontSize: 10
            },
            markPoint: {     //显示一定区域内的最大值
                symbol: 'none',
                data: [
                    { type: 'max', name: '最大值' }
                ]
            }
        }]
    }
    chart.setOption(option)
    return chart;
}
Page({
    data: {
        ec: {
            onInit: initChart
        },
        bannerList: [
            {url: '../common/images/index/banner1.png'},
            {url: '../common/images/index/banner1.png'}
        ],
        shareImagePath: ''
    },
    onLoad: function (options) {
        this.getQrcode()
        this.share()
    },
    getQrcode: function(){
        let appid = 'wxf3882567445af4bd'
        let APPSECRET = 'e2c89a4c7c49b5827b09edf20cb1caf9'
        wx.request({
            url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${APPSECRET}`,
            method:  'POST',
            success: function(res){
               let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${res.access_token}`
                wx.request({
                    url: url,
                    data: {
                        // page:"pages/index",
                        // scene:"1234&123" // 参数
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    method:  'POST',
                    dataType: 'json',
                    success: function(res){
                        console.log(res, 11111)
                    },
                    fail: function(err){}
                })
            },
            fail: function(err){}
        })
    },
    // 生成海报
    share: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })
        var width = that.data.windowWidth - 30;
        const ctx = wx.createCanvasContext('shareCanvas')
        // 设置矩形边框
        ctx.setFillStyle('#fff')
        // 矩形填充色
        ctx.fillRect(0, 0, width, 500)
        // 图片引入
        let banner = '../common/images/index/run_bg.png';
        ctx.drawImage(banner, 0, 0, width, 300)
        ctx.restore()
        ctx.save()

        // 头像引入
        let headerImg = '../common/images/index/run_bg.png';
        // 控制头像为圆形
        ctx.setStrokeStyle('rgba(0,0,0,.2)') //设置线条颜色，如果不设置默认是黑色，头像四周会出现黑边框
        ctx.arc( 25, 325, 25 / 2, 0, 2 * Math.PI)
        ctx.stroke()
        //画完之后执行clip()方法，否则不会出现圆形效果
        ctx.clip()
        // 将头像画到画布上
        ctx.drawImage(headerImg, 12, 313, 25, 25)
        ctx.restore()
        ctx.save()

        // 设置文字
        ctx.fillStyle = '#666666';
        ctx.font = 'normal bold 14px sans-serif';
        ctx.fillText('墙脚下得泥坑tss', 45, 330)

        // 内容矩形-今日步数
        ctx.setStrokeStyle('#F5F5F5')
        ctx.setFillStyle('#FCFCFC')
        ctx.setLineJoin('round');  //交点设置成圆角
        // 矩形填充色
        ctx.fillRect(15, 350, 190, 60)
        // 设置矩形宽高
        ctx.strokeRect(15, 350, 190, 60)

        // 今日步数 - 统计数字
        ctx.fillStyle = '#4AC583';
        ctx.font = 'normal 800 25px sans-serif';
        ctx.fillText(13126, 35, 380)

        // 时间
        ctx.fillStyle = '#999999';
        ctx.font = 'normal 500 11px sans-serif';
        ctx.fillText('今日步数', 48, 398)

        // 内容矩形-时间
        ctx.setStrokeStyle('#F5F5F5')
        ctx.setFillStyle('#FCFCFC')
        ctx.setLineJoin('round');  //交点设置成圆角
        // 矩形填充色
        ctx.fillRect(130, 350, 75, 60)
        // 设置矩形宽高
        ctx.strokeRect(130, 350, 75, 60)

        // 今日步数 - 年份
        ctx.fillStyle = '#333333';
        ctx.font = 'normal 800 14px sans-serif';
        ctx.fillText('2019', 150, 380)

        // 今日步数-题目
        ctx.fillStyle = '#999999';
        ctx.font = 'normal 500 14px sans-serif';
        ctx.fillText('11/25', 150, 398)

        // 小程序二维码位置
        ctx.setStrokeStyle('#999999')
        // 设置矩形宽高
        ctx.strokeRect(265, 310, 65, 65)

        // 长按识别进入
        ctx.fillStyle = '#666666';
        ctx.font = 'normal 400 12px sans-serif';
        ctx.fillText('长按识别进入', 265, 395)
        // 健康竞走
        ctx.fillStyle = '#4AC583';
        ctx.font = 'normal 500 12px sans-serif';
        ctx.fillText('健康竞走', 275, 413)

        //绘制图片
        ctx.draw()
        ctx.save()
    },
   // 保存图片到本地
    save:function() {
        wx.showLoading({
            title: '正在保存...',
            mask: true
        })
        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'shareCanvas',
                success: function(res) {
                    wx.hideLoading()
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            wx.showModal({
                                content: '图片已保存到相册，赶紧晒一下吧~',
                                showCancel: false,
                                confirmText: '好的',
                                confirmColor: '#333',
                                success: function (res) {}
                            })
                        }
                    })
                },
                fail: function(res) {
                    console.log(res.errMsg, 3333)
                }
            }, this)
        }, 1000)
    }
})
