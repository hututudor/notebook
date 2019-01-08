import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { updateUser } from './redux/actions';
import './main.scss';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

window.store = store;

// The render function
const rend = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
};

// Verify the JWT token and update the store
let token = localStorage.getItem('token');
if (token) {
	axios
		.get('/user', { headers: { Authorization: 'Bearer ' + token } })
		.then(res => {
			if (res.status === 200) {
				console.log(res.data.user);
				store.dispatch(updateUser({ auth: true, ...res.data.user }));
			}
			rend();
		})
		.catch(err => {
			store.dispatch(updateUser({ auth: false }));
			rend();
		});
} else {
	store.dispatch(updateUser({ auth: false }));
	rend();
}
