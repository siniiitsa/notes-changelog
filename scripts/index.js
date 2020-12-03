import createStore from './lib/satate-manager.js';

// Counter store
{
  const counterMapping = {
    inc: (state) => state + 1,
    dec: (state) => state - 1,
  };

  const counterReducer = (state, action) => counterMapping[action.type](state);

  const counterStore = createStore(0, counterReducer);
  counterStore.subscribe(() =>
    console.log('new state => ', counterStore.getState())
  );

  const inc = () => ({ type: 'inc' });
  const dec = () => ({ type: 'dec' });
}

// Notes store
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
