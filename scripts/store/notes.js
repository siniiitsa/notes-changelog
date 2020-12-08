// Constants
const ADD_NOTE = 'notes/note-added';
const REMOVE_NOTE = 'notes/note-removed';
const UPDATE_NOTE = 'notes/note-updated';

// Actions
export const addNote = (text) => ({
  type: ADD_NOTE,
  payload: { text },
});

export const removeNote = (id) => ({
  type: REMOVE_NOTE,
  payload: { id },
});

export const updateNote = (id, text) => ({
  type: UPDATE_NOTE,
  payload: { id, text },
});

// Reducer
const mapping = {
  [ADD_NOTE](state, action) {
    const { text } = action.payload;
    const id = Math.max(0, ...state.notes.map((n) => n.id)) + 1;
    const notes = [...state.notes, { id, text }];
    return { ...state, notes };
  },
  [REMOVE_NOTE](state, action) {
    const { id } = action.payload;
    const notes = state.notes.filter((n) => n.id !== id);
    return { ...state, notes };
  },
  [UPDATE_NOTE](state, action) {
    const { id, text } = action.payload;
    const notes = state.notes.map((n) => (n.id === id ? { ...n, text } : n));
    return { ...state, notes };
  },
};

const notesReducer = (state, action) => mapping[action.type](state, action);

export default notesReducer;
