import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FrontPage from '../pages/FrontPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FrontPage} />
    </Switch>
  </BrowserRouter>
)

export default App;
