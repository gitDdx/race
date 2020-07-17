Page({
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
        }
    },
    data: {
        pkNoticeList: [
            {title: '恭喜你在昨日与蔷薇花的PK中获胜获', url: 'https://www.baidu.com/'},
            {title: '恭喜你在昨日与蔷薇花的PK中获胜获', url: 'https://www.baidu.com/'}
        ],
        teamNoticeList: [
            {title: '蔷薇花发起组团赛—总奖金5元总奖金', url: 'https://www.baidu.com/'},
            {title: '蔷薇花发起组团赛—总奖金5元总奖金', url: 'https://www.baidu.com/'}
        ],
        bannerList: [
            {url: '../common/images/index/banner1.png'},
            {url: '../common/images/index/banner1.png'}
        ]
    }
})
