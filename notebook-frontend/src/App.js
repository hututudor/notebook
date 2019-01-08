import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import Main from './components/main';
import { ToastContainer } from 'react-toastify';
import Register from './components/register';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Login from './components/login';

library.add(faEdit);
library.add(faTrash);

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<main className="main_container">
					<ToastContainer />
					<Switch>
						<ProtectedRoute path="/" exact component={Main} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Redirect to="/" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
