import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

class Header extends Component {
	handleLogout = () => {
		localStorage.removeItem('token');
		this.props.logout();
	};

	render() {
		return (
			<div className="main_header">
				<p className="main_header_logo unselect">Notebook </p>
				<p className="main_header_title">
					{this.props.note ? this.props.note.name : ''}
				</p>
				<button className="main_header_button" onClick={this.handleLogout}>
					Logout
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		note: state.note
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
