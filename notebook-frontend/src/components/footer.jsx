import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div className="main_footer">
				<p className="unselect">Made by Hutu Tudor</p>
				<span className="unselect">
					{' '}
					Copyright &copy; {new Date().getFullYear()}
				</span>
			</div>
		);
	}
}

export default Footer;
