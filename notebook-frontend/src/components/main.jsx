import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateNotes } from '../redux/actions';
import { Slide, Zoom } from 'react-reveal';

class Main extends Component {
	state = {
		loading: true
	};

	componentDidMount() {
		axios
			.get('/notes', {
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					console.log(res.data);
					this.props.updateNotes(res.data.notes);
					this.setState({ loading: false });
				}
			})
			.catch(err => {
				console.log(err);
				toast.error('Could not retrieve notes');
			});
	}

	render() {
		return (
			// <Zoom>
			<div className="main">
				{this.state.loading ? (
					<div className="main_centered">
						<Loader type="TailSpin" color="#000" height="100" width="100" />
					</div>
				) : (
					<React.Fragment>
						<Header />
						<Content notes={this.props.notes} />
						<Footer />
					</React.Fragment>
				)}
			</div>
			// {/* </Zoom> */}
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateNotes: notes => {
			dispatch(updateNotes(notes));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
