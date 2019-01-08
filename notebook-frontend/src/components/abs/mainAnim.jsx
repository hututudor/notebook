import React, { Component } from 'react';
import { Slide, Zoom } from 'react-reveal';
import Main from '../main';

class MainAnim extends Component {
	render() {
		return (
			<React.Fragment>
				<Zoom>
					<Main />
				</Zoom>
			</React.Fragment>
		);
	}
}

export default MainAnim;
