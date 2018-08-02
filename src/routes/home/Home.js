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

  constructor(){
    super();
    this.state={}
  }

  componentWillMount(){

  }

  componentDidMount(){
    /**
     * @description 页面加载时绘制swiper
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

  componentDidUpdate(){
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy()
      this.swiper = null;
    }
    this.swiper = new Swiper(this.refs.lun, {
      direction: 'vertical',
      lazy: {
        loadPrevNext: true,
      },
    });
  }



  render() {
    let {
      arrImgUrls
    } = this.props.home;

    return (
      <div className="swiper-container" ref='lun'>
        <div className="swiper-wrapper">
        {arrImgUrls.map((urlItem, index, arr) => {
          return <div className="swiper-slide swiper-lazy imgBox" key={index} data-id={index} data-background={`${urlItem}`}><div className="swiper-lazy-preloader"></div></div>
        })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    )
  }
}

// export default Home;

export default connect(({ home }) => ({
  home,
}))(Home);
