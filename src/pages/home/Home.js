/*
 * @Author: woden0415@163.com
 * @Date: 2018-07-23 23:55:27
 * @Description: 首页
 */

import React, { Component } from 'react';
import axios from 'axios'
import Swiper from 'swiper'
// import Swiper from 'react-id-swiper/lib/custom';

import {
  imgList
} from '../../config/api'

import './Home.css';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      imgArr: []
    }
  }

  componentWillMount(){
    console.log(imgList)
    axios.get( imgList, {
      params: {
        // pageNo: Number.parseInt(Math.random() * 800),
        pageNo: 2,
        pageSize: 100
      }
    })
    .then((response) => {
      this.setState({
        imgArr: response.data.list
      })
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
      imgArr
    } = this.state;

    return (
      <div className="swiper-container" ref='lun'>
        <div className="swiper-wrapper">

        {imgArr.map((urlItem, index, arr) => {
          return <div className="swiper-slide swiper-lazy imgBox" key={index} data-id={index} data-background={`${urlItem}`}><div className="swiper-lazy-preloader"></div></div>
        })}

        </div>
        <div className="swiper-pagination"></div>
      </div>
    )
  }
}

export default Home;
