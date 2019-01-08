import {
	UPDATE_USER,
	UPDATE_NOTES,
	UPDATE_CURRENT_NOTE,
	UPDATE_NOTE_IN_LIST,
	UPDATE_MODAL,
	ADD_NOTE,
	DELETE_NOTE,
	LOGOUT
} from '../types';

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		user
	};
}

export function updateNotes(notes) {
	return {
		type: UPDATE_NOTES,
		notes
	};
}

export function updateCurrentNote(note, nullable = false) {
	return {
		type: UPDATE_CURRENT_NOTE,
		note: nullable ? null : note
	};
}

export function updateNoteInList(note) {
	return {
		type: UPDATE_NOTE_IN_LIST,
		note
	};
}

export function updateModal(name, st, options = null) {
	return {
		type: UPDATE_MODAL,
		name,
		st,
		options
	};
}

export function addNote(note) {
	return {
		type: ADD_NOTE,
		note
	};
}

export function deleteNote(note) {
	return {
		type: DELETE_NOTE,
		note
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
