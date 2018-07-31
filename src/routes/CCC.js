import React, { Component } from 'react'
import { Link } from "dva/router";

class CCC extends Component {
  render(){
    return (
      <div>
        <p>
          CCC
        </p>
        <Link to={'/aaa'}>去AAA的页面</Link>
        <br/>
        <Link to={'/aaa/bbb'}>去BBB的页面</Link>
      </div>
    )
  }
}

export default CCC;
