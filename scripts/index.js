import createStore from './lib/satate-manager.js';

const notesMapping = {
  addNote(notes, action) {
    return [...notes, action.payload.note];
  },
};

const notesReducer = (state, action) =>
  notesMapping[action.type](state, action);

const notesStore = createStore([], notesReducer);

notesStore.subscribe(() => console.log('new state => ', notesStore.getState()));

const addNote = (payload) => ({
  type: 'addNote',
  payload: { note: { id: 1, text: 'a' } },
});

notesStore.dispatch(addNote({ id: 1, text: 'a' }));
notesStore.dispatch(addNote({ id: 2, text: 'b' }));
notesStore.dispatch(addNote({ id: 3, text: 'c' }));
