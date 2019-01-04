import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class ProtectedRoute extends Component {
  state = {
    done: false,
    good: false
  };

  componentDidMount() {
    axios
      .get('/user', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTU0NTg0MTc5MCwiZXhwIjoxNTYxMzkzNzkwLCJuYmYiOjE1NDU4NDE3OTAsImp0aSI6IndnTmUxdHBGVk91R3hxYzMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.KtyEzkWXEaNQCGX20NWlX6Pn2YMQ7_eCgfCDFhlefwQ'
        }
      })
      .then(res => {
        this.setState({ done: true, good: res.status === 200 });
      });
  }

  render() {
    const { path, component: Component, render, ...rest } = this.props;
    if (this.state.done === false) return <div>Loading</div>;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.good)
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;
