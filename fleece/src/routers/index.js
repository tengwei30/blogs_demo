import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from 'views/index'

const Routes = () => {
  return (
    <Router>
      <Route path="/" component={ App }></Route>
    </Router>
  )
}

export default Routes;
