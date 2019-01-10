import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateModal, addNote } from '../../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';

class AddModal extends Component {
	state = {
		name: ''
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.name.trim() === '' &&
			this.props.options &&
			prevProps.show === false
		) {
			this.setState({ name: this.props.options.suggestion });
		}
	}

	handleClose = () => {
		this.props.update(false);
	};

	handleChange = event => {
		this.setState({ name: event.target.value });
	};

	handleSubmit = event => {
		if (event.which === 13 /* Enter */) {
			event.preventDefault();
			this.addNote();
		}
	};

	handleAdd = () => {
		this.addNote();
	};

	addNote = () => {
		if (this.state.name.trim() === '') {
			toast.error('Note name cannot be empty');
			return;
		}
		axios
			.post(
				process.env.REACT_APP_API_URL + '/notes',
				{ name: this.state.name },
				{
					headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
				}
			)
			.then(res => {
				toast.success("Added note '" + this.state.name + "'");
				this.setState({ name: '' });
				this.props.update(false);
				this.props.addNote(res.data.note);
			})
			.catch(err => {
				console.log(err);
				toast.error('Error');
			});
	};

	render() {
		return (
			<Modal show={this.props.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add new note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onKeyPress={this.handleSubmit}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								value={this.state.name}
								onChange={this.handleChange}
								placeholder="Name"
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleClose}>Close</Button>
					<Button className="btn-success" onClick={this.handleAdd}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStatetoProps = state => {
	return {
		show: state.modals.add,
		options: state.modals.addOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		update: st => dispatch(updateModal('add', st)),
		addNote: note => dispatch(addNote(note))
	};
};

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(AddModal);
