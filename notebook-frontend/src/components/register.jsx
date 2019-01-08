import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUser } from '../redux/actions';
import { connect } from 'react-redux';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		nameError: '',
		emailError: '',
		passwordError: ''
	};

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.history.push('/');
		}
	}

	handleLogin = e => {
		e.preventDefault();
		if (
			this.validate('name', this.state.name) &&
			this.validate('email', this.state.email) &&
			this.validate('password', this.state.password)
		) {
			axios
				.post('/register', {
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				})
				.then(res => {
					console.log(res);
					localStorage.setItem('token', res.data.token);
					this.props.updateUser({ auth: true, ...res.data.user });
					this.props.history.push('/');
					toast.success('Registered successfully');
				})
				.catch(err => {
					console.log(err);
					toast.error('Credentials are incorrect');
				});
		}
	};

	validate = (name, value) => {
		if (value.trim() === '') {
			this.setState({ [name + 'Error']: `This field must not be empty` });
			return false;
		} else {
			this.setState({ [name + 'Error']: '' });
		}

		if (name === 'email') {
			if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
				this.setState({
					[name + 'Error']: `This field must be a valid email adress`
				});
				return false;
			} else {
				this.setState({ [name + 'Error']: '' });
			}
		}

		if (name === 'password') {
			if (value.length < 7) {
				this.setState({
					[name + 'Error']: `This field must have at least 6 characters`
				});
				return false;
			} else {
				this.setState({ [name + 'Error']: '' });
			}
		}

		return true;
	};

	handleChange = e => {
		this.validate(e.target.name, e.target.value);
		this.setState({ [e.target.name]: e.target.value });
	};

	errorMessage = name => {
		if (this.state[name + 'Error'] !== '') {
			return <p className="auth_error">{this.state[name + 'Error']}</p>;
		}
	};

	render() {
		return (
			<div className="auth">
				<h1 className="auth_logo">Notebook</h1>
				<h1 className="auth_title">Register</h1>
				<form className="auth_form">
					<input
						className={
							'auth_input ' + (this.state.nameError === '' ? '' : 'invalid')
						}
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						placeholder="Name"
					/>
					{this.errorMessage('name')}
					<input
						className={
							'auth_input ' + (this.state.emailError === '' ? '' : 'invalid')
						}
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						placeholder="E-mail"
					/>
					{this.errorMessage('email')}
					<input
						className={
							'auth_input ' + (this.state.passwordError === '' ? '' : 'invalid')
						}
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.handleChange}
						placeholder="Password"
					/>
					{this.errorMessage('password')}
					<br />
					<div className="auth_container">
						<Link className="auth_link" to="/login">
							Login
						</Link>
						<button onClick={this.handleLogin} className="auth_button">
							Register
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateUser: user => dispatch(updateUser(user))
	};
};

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
