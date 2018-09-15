/*
 * @Author: woden0415@163.com
 * @Date: 2018-07-23 23:55:27
 * @Description: 首页
 */

import React, { PureComponent } from 'react';
import Swiper from '../../../node_modules/swiper/dist/js/swiper'
import { connect } from 'dva';
import Hammer from 'hammerjs';

import { setStorage, getStorage, setPageIndex } from '../../utils/tools'

import './Home.css';
import '../../assets/css/douswiper.css'

class Home extends PureComponent {

  constructor(props){
    super();
    this.state={

    };
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  componentWillMount() {
    /**
     * @description 页面加载时请求数据
     */
    let pageNo = Number(getStorage('pageNo')) || Number.parseInt(Math.random() * 748, 10);
    let pageSize = Number(getStorage('pageSize')) || 10;
    let albumIndex = Number(getStorage('albumIndex')) || 0;
    this.props.dispatch({
      type: 'home/fetchImgsUrl',
      payload: {
        params: {
          pageNo: pageNo,
          pageSize: pageSize
        }
      }
    })
    setPageIndex(pageNo, pageSize, albumIndex)
  }

  componentDidMount() {

  }

  componentDidUpdate(){

    // 初始化滚动
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy();
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs.lun, {
      direction: 'vertical',
      initialSlide: Number(getStorage('albumIndex')) || 0,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2
      },
    });

    // 给屏幕添加左滑事件，左滑大于二分之一宽度时，进入下一个路由
    let lunSwiper = this.refs.lun;
    let hammerLun = new Hammer(lunSwiper);
    hammerLun.on('panleft', (e) => {
      lunSwiper.style.transition = 'transform 0s';
      lunSwiper.style.transform = `translateX(${e.deltaX}px)`
    })
    hammerLun.on('panend', (e) => {
      let clientW = document.documentElement.clientWidth;
      if (Math.abs(e.deltaX) > 0.2 * clientW) {
        setStorage('albumIndex', e.target.dataset.index)
        this.props.history.push(`/album/${e.target.dataset.albumid}`, {some: ''})
      } else {
        lunSwiper.style.transition = 'transform 0.2s';
        lunSwiper.style.transform = `translateX(0px)`
      }
    })

    // 绑定点击心心事件
    let favorites = document.querySelectorAll('.class-favorite');
    for (let i = 0; i < favorites.length; i++) {
      let hammer = new Hammer(favorites[i]);
      hammer.on('doubletap', function(e) {
        e.target.classList.toggle('favorited');
      });
    }
  }

  handleImgClick(e, imgUrl){
    console.log(e.clientX, e.clientY)
  }

  render() {
    console.log('Home')
    let {
      arrImgUrls
    } = this.props;

    return (
      <div className="swiper-container" ref='lun'>
        <div className="swiper-wrapper">
        {arrImgUrls.map((urlItem, index, arr) => {
          return (
            <div
              className="swiper-slide swiper-lazy imgBox swiper-zoom-container"
              key={urlItem.coverUrl}
              data-albumid={urlItem.albumId}
              data-index={index}
              data-background={`${urlItem.coverUrl}`}
              onDoubleClick={(e)=>{this.handleImgClick(e, urlItem.coverUrl)}}>
              <span className="class-favorite iconfont icon-xin2"></span>
              <div className="swiper-lazy-preloader"></div>
            </div>
          )
        })}
        </div>
      </div>
    )
  }
}

// export default Home;

export default connect(({ home }) => ({
  arrImgUrls: home.arrImgUrls
}))(Home);
