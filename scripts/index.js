import createStore from './lib/satate-manager.js';

const notesMapping = {
  addNote(notes, action) {
    const { note } = action.payload;
    return [...notes, note];
  },
  removeNote(notes, action) {
    const { id } = action.payload;
    return notes.filter((n) => n.id !== id);
  },
  updateNote(notes, action) {
    const { id, text } = action.payload;
    return notes.map((n) => (n.id === id ? { ...n, text } : n));
  },
};

const notesReducer = (state, action) =>
  notesMapping[action.type](state, action);

const notesStore = createStore([], notesReducer);

notesStore.subscribe(() => console.log('new state => ', notesStore.getState()));

const addNote = (note) => ({
  type: 'addNote',
  payload: { note },
});

const removeNote = (id) => ({
  type: 'removeNote',
  payload: { id },
});

const updateNote = (id, text) => ({
  type: 'updateNote',
  payload: { id, text },
});

// add some notes
notesStore.dispatch(addNote({ id: 1, text: 'a' }));
notesStore.dispatch(addNote({ id: 2, text: 'b' }));
notesStore.dispatch(addNote({ id: 3, text: 'c' }));
notesStore.dispatch(addNote({ id: 4, text: 'd' }));

// remove some
notesStore.dispatch(removeNote(1));
notesStore.dispatch(removeNote(2));

// update one of the remaining
notesStore.dispatch(updateNote(3, 'three'));
notesStore.dispatch(updateNote(4, 'four'));
