import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	updateModal,
	updateNoteInList,
	updateCurrentNote
} from '../../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';

class AddModal extends Component {
	state = {
		name: ''
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.options && prevProps.show === false) {
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
			this.editNote();
		}
	};

	handleEdit = () => {
		console.log(this.props.options);
		this.editNote();
	};

	editNote = () => {
		if (this.state.name.trim() === '') {
			toast.error('Note name cannot be empty');
			return;
		}
		axios
			.put(
				process.env.REACT_APP_API_URL + '/notes/' + this.props.options.note.id,
				{ name: this.state.name, body: this.props.options.note.body },
				{
					headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
				}
			)
			.then(res => {
				toast.success("Saved note '" + this.state.name + "'");
				this.setState({ name: '' });
				this.props.update(false);
				this.props.updateNote(res.data.note);
				this.props.updateCurrentNote({});
				this.props.updateCurrentNote(res.data.note);
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
					<Modal.Title>Edit note</Modal.Title>
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
					<Button className="btn-success" onClick={this.handleEdit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStatetoProps = state => {
	return {
		show: state.modals.edit,
		options: state.modals.editOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		update: st => dispatch(updateModal('edit', st)),
		updateNote: note => dispatch(updateNoteInList(note)),
		updateCurrentNote: note => dispatch(updateCurrentNote(note))
	};
};

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(AddModal);
