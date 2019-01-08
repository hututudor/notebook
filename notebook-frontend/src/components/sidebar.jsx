import React, { Component } from 'react';
import Item from './item';
import { connect } from 'react-redux';
import {
	updateCurrentNote,
	updateNoteInList,
	updateModal
} from '../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddModal from './modals/add';
import EditModal from './modals/edit';
import DeleteModal from './modals/delete';

class Sidebar extends Component {
	state = {
		search: ''
	};

	handleSearch = event => {
		this.setState({ search: event.target.value });
	};

	handleClick = note => {
		//check if it is needed to update the note
		if (this.props.note.id) {
			//save the cuurrent note

			//check if the note is changed
			let index = this.props.notes.findIndex(
				obj => obj.id === this.props.note.id
			);
			if (this.props.notes[index].body !== this.props.note.body) {
				axios
					.put(
						`/notes/${this.props.note.id}`,
						{
							name: this.props.note.name,
							body: this.props.note.body === null ? ' ' : this.props.note.body
						},
						{
							headers: {
								Authorization: 'Bearer ' + localStorage.getItem('token')
							}
						}
					)
					.then(res => {
						if (res.status === 200) {
							console.log(res);
							this.props.updateInList(res.data.note);
							toast.success(`Saved '${res.data.note.name}'`);
							this.props.updateNote(note);
						}
					})
					.catch(err => {
						console.log(err);
						toast.error('Error');
					});
			} else {
				this.props.updateNote(note);
			}
		} else {
			this.props.updateNote(note);
		}
	};

	handleAddButton = () => {
		this.props.showModal('add', {
			suggestion: this.state.search
		});
	};

	render() {
		console.log(this.props);
		return (
			<div className="main_sidebar">
				<AddModal />
				<EditModal />
				<DeleteModal />
				<div className="main_sidebar_item_search">
					<input
						type="text"
						className="main_sidebar_item_search_input"
						value={this.search}
						onChange={this.handleSearch}
						placeholder="Search notes"
					/>
					<button
						className="main_sidebar_item_search_button"
						onClick={this.handleAddButton}
					>
						+
					</button>
				</div>
				{this.props.notes
					.filter(
						obj =>
							obj.name
								.toLowerCase()
								.indexOf(this.state.search.toLowerCase()) !== -1
					)
					.map(note => (
						<Item
							onClick={() => this.handleClick(note)}
							key={note.id}
							note={note}
							active={note.id === this.props.note.id}
						/>
					))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		note: state.note,
		notes: state.notes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateNote: note => dispatch(updateCurrentNote(note)),
		updateInList: note => dispatch(updateNoteInList(note)),
		showModal: (name, op) => dispatch(updateModal(name, true, op))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar);
