import React, { Component } from 'react'
import { Link } from 'dva/router';


class AAA extends Component {
  render(){
    return (
      <div>
        <p>
          AAA
        </p>
        <Link to={'/aaa/bbb'}>去BBB页面</Link>
        <br />
        <Link to={'/ccc'}>去CCC页面</Link>
      </div>
    )
  }
}

export default AAA;
