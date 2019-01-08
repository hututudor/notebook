import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends Component {
  state = {
    done: false,
    good: false
  };

  render() {
    const { path, component: Component, render, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (!this.props.user.auth)
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

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(ProtectedRoute);
