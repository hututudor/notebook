import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { updateNotes } from '../redux/actions';
import { CSSTransition } from 'react-transition-group';

class Main extends Component {
	state = {
		loading: true
	};

	componentDidMount() {
		document.title = 'Notebook';
		axios
			.get(process.env.REACT_APP_API_URL + '/notes', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
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
			<CSSTransition
				in={true}
				appear={true}
				timeout={1000}
				classNames="slide-big"
			>
				<div className="main">
					{this.state.loading ? (
						<div className="main_centered">
							<Loader type="TailSpin" color="#000" height="100" width="100" />
						</div>
					) : (
						<React.Fragment>
							<CSSTransition
								in={true}
								appear={true}
								timeout={1000}
								classNames="slide-long"
							>
								<Header />
							</CSSTransition>
							<CSSTransition
								in={true}
								appear={true}
								timeout={1000}
								classNames="zoom-content"
							>
								<Content notes={this.props.notes} />
							</CSSTransition>
							<CSSTransition
								in={true}
								appear={true}
								timeout={1000}
								classNames="slide-long"
							>
								<Footer />
							</CSSTransition>
						</React.Fragment>
					)}
				</div>
			</CSSTransition>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notes,
		user: state.user
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
