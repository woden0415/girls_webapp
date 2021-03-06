import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import Navigator from './components/navigator/Navigator';


import {config} from './utils'
const { menuGlobal } = config


function RouterConfig({ history, app }) {

  return (
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <Router history={history}>
        <Switch>
          {
            menuGlobal.map(({path, ...dynamics}, index) => (
              <Route
              key={index}
              path={path}
              exact
              component={dynamic({ app, ...dynamics })}
              />
            ))
          }
        </Switch>
      </Router>
      <Navigator />
    </div>
  );
}

export default RouterConfig;

