/*
 * @Author: woden0415@163.com
 * @Date: 2018-07-23 23:55:27
 * @Description: 首页
 */

import React, { PureComponent } from 'react';
import Swiper from '../../../node_modules/swiper/dist/js/swiper'
import { connect } from 'dva';

import './Home.css';

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
    this.props.dispatch({
      type: 'home/fetchImgsUrl',
      payload: {
        params: {
          pageNo: Number.parseInt(Math.random() * 112, 10),
          pageSize: 10
        }
      }
    })
  }

  componentDidUpdate(){
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy();
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs.lun, {
     zoom: {
        toggle: false,
      },
      direction: 'vertical',
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2
      },
    });
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
              key={urlItem + index}
              data-id={index}
              data-background={`${urlItem}`}
              onDoubleClick={(e)=>{this.handleImgClick(e, urlItem)}}>
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
