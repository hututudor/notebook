import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentNote } from '../redux/actions';

class Textbox extends Component {
	handleChange = event => {
		let newNote = { ...this.props.note };
		newNote.body = event.target.value;
		this.props.updateNote(newNote);
	};

	render() {
		return (
			<div className="main_textbox">
				{this.props.note.id ? (
					<textarea
						onChange={this.handleChange}
						value={this.props.note.body ? this.props.note.body : ''}
						autoComplete="off"
						autoCorrect="on"
						autoCapitalize="on"
						spellCheck="false"
					/>
				) : (
					''
				)}
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		note: state.note
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateNote: note => dispatch(updateCurrentNote(note))
	};
};

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(Textbox);
