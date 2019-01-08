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

const initialState = {
	user: {},
	notes: [],
	note: {},
	modals: {
		add: false,
		addOptions: null,
		edit: false,
		editOptions: null,
		delete: false,
		deleteOptions: null
	}
};

function rootReducer(state = initialState, action) {
	let newState = { ...state };
	if (action.type === UPDATE_USER) {
		newState.user = action.user;
	}
	if (action.type === UPDATE_NOTES) {
		newState.notes = action.notes;
	}
	if (action.type === UPDATE_CURRENT_NOTE) {
		newState.note = action.note;
	}
	if (action.type === UPDATE_NOTE_IN_LIST) {
		let index = newState.notes.findIndex(obj => obj.id === action.note.id);
		newState.notes[index].body = action.note.body;
		newState.notes[index].name = action.note.name;
	}
	if (action.type === UPDATE_MODAL) {
		newState.modals[action.name] = action.st;
		newState.modals[action.name + 'Options'] = action.options;
	}

	if (action.type === ADD_NOTE) {
		newState.notes = [action.note, ...newState.notes];
	}

	if (action.type === DELETE_NOTE) {
		let index = newState.notes.findIndex(obj => obj.id === action.note.id);
		newState.notes.splice(index, 1);
	}

	if (action.type === LOGOUT) {
		newState.user = { auth: false };
	}
	return newState;
}

export default rootReducer;
