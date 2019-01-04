import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import Main from './components/main';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="main_container">
          <Switch>
            <ProtectedRoute path="/" exact component={Main} />
            <Route path="/login" exact render={<div>done</div>} />
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
