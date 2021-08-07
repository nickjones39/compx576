import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Assets from './assets/pages/Assets';
import NewAsset from './assets/pages/NewAsset';
import Users from './user/pages/Users';

const App = () => {
  return <Router>
    <Switch>
      <Route path="/" exact>
        <Assets />
      </Route>
      <Route path="/assets/new" exact>
        <NewAsset />
      </Route>
      <Redirect to="/" />
    </Switch>
  </Router>
};

export default App;
