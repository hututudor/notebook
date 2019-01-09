import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	updateModal,
	updateCurrentNote,
	deleteNote
} from '../../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';

class DeleteModal extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.options && prevProps.show === false) {
			this.setState({ name: this.props.options.suggestion });
		}
	}

	handleClose = () => {
		this.props.update(false);
	};

	handleDelete = () => {
		console.log(this.props.options);
		this.deleteNote();
	};

	deleteNote = () => {
		axios
			.delete('/notes/' + this.props.options.note.id, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then(res => {
				toast.success("Deleted note '" + this.props.options.note.name + "'");
				this.props.deleteNote(this.props.options.note);
				this.props.update(false);
				this.props.updateCurrent();
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
					<Modal.Title>Delete note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						Are you sure you want to delete note '
						{this.props.options ? this.props.options.note.name : ''}'
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleClose}>No</Button>
					<Button className="btn-danger" onClick={this.handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStatetoProps = state => {
	return {
		show: state.modals.delete,
		options: state.modals.deleteOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		update: st => dispatch(updateModal('delete', st)),
		deleteNote: note => dispatch(deleteNote(note)),
		updateCurrent: () => dispatch(updateCurrentNote({}))
	};
};

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(DeleteModal);
