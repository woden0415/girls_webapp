/*
 * @Author: woden0415@163.com
 * @Date: 2018-07-23 23:55:27
 * @Description: 首页
 */

import React, { Component } from 'react';
import Swiper from 'swiper'
import { connect } from 'dva';

import './Home.css';

class Home extends Component {

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
          pageNo: Number.parseInt(Math.random() * 800, 10),
          pageSize: 100
        }
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.home.arrImgUrls) === JSON.stringify(nextProps.home.arrImgUrls)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(){
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy();
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs.lun, {
      direction: 'vertical',
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2
      },
    });
  }

  handleImgClick(imgUrl){
    console.log('object')
  }

  render() {
    console.log('Home')
    let {
      arrImgUrls
    } = this.props.home;

    return (
      <div className="swiper-container" ref='lun'>
        <div className="swiper-wrapper">
        {arrImgUrls.map((urlItem, index, arr) => {
          return (
            <div
              className="swiper-slide swiper-lazy imgBox"
              key={urlItem + index}
              data-id={index}
              data-background={`${urlItem}`}
              onClick={()=>{this.handleImgClick(urlItem)}}>
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
  home,
}))(Home);
