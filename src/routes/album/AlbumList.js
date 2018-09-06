/*
 * @Author: woden0415@163.com
 * @Date: 2018-09-05 22:54:31
 * @Description: 专辑列表页面，图片流形式展示
 */

import React, { PureComponent } from 'react'
import Swiper from '../../../node_modules/swiper/dist/js/swiper'
import { connect } from 'dva';
import Hammer from 'hammerjs';

import '../../assets/css/douswiper.css';
import './AlbumList.css'

class AlbumList extends PureComponent {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    let albumId = this.props.match.params.albumid;
    this.props.dispatch({
      type: 'album/fetchAlbumList',
      payload: {
        albumId
      }
    })
  }

  componentDidUpdate() {
    let albumId = this.props.match.params.albumid;
    let swiperIndex = Number(this.props.match.params.index) || 0
    // 初始化滚动
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy();
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs.listlun, {
      direction: 'vertical',
      initialSlide: swiperIndex,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2
      },
    });


    // 绑定点击心心事件
    let favorites = document.querySelectorAll('.class-favorite');
    for (let i = 0; i < favorites.length; i++) {
      let hammer = new Hammer(favorites[i]);
      hammer.on('doubletap', function(e) {
        e.target.classList.toggle('favorited');
      });
    }

    // 返回事件
    let domBtnGoBack = document.querySelector('.iconfont.icon-fanhui1');
    if (domBtnGoBack) {
      let hammerBack = new Hammer(domBtnGoBack);
      hammerBack.on('tap', (e) => {
        this.props.history.push(`/album/${albumId}`, { some: {
          albumId: albumId
        }})
      })
    }
  }

  render() {
    let { imgLists, id } = this.props.objAlbumInfo;
    return (
      <React.Fragment>
        <span className="iconfont icon-fanhui1 imglist js-goback" ref="btngoback"></span>
        <div className="swiper-container" ref='listlun'>
          <div className="swiper-wrapper">
          {imgLists.map((urlItem, index, arr) => {
            return (
              <div
                className="swiper-slide swiper-lazy imgBox swiper-zoom-container"
                key={index}
                data-albumid={id}
                data-index={index}
                data-background={`${urlItem}`}
              >
                <span className="class-favorite iconfont icon-xin2"></span>
                <div className="swiper-lazy-preloader"></div>
              </div>
            )
          })}
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(({ album }) => ({
  objAlbumInfo: album.objAlbumInfo
}))(AlbumList);