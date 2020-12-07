import createStore from './lib/state-manager.js';
import reducer, { addNote, removeNote, updateNote } from './store/notes.js';

const initialState = {
  notes: [],
  povTimestamp: 0,
};

const saveHistory = (history) => {
  localStorage.setItem('notes-changelog-history', JSON.stringify(history));
};

const loadHistory = () =>
  JSON.parse(localStorage.getItem('notes-changelog-history') || '[]');

const store = createStore({ initialState, loadHistory, saveHistory, reducer });
const { dispatch, getState, subscribe } = store;

const elements = {
  newNoteForm: document.querySelector('#new-note-field'),
  notesContainer: document.querySelector('#notes'),
};

const render = (state) => {
  const notesHTML = state.notes.map(stringifyNote).join('');
  elements.notesContainer.innerHTML = notesHTML;
};

subscribe(() => render(getState()));
subscribe(() => {
  console.log('State => ', getState());
});

const stringifyNote = (note) => `
  <li data-id="${note.id}" class="note">
    <p class="note-text">${note.text}</p>
    <div class="note-btns">
      <button class="edit-note-btn">✏️</button>
      <button class="remove-note-btn">❌</button>
    </div>
  </li>
`;

const handleMakeEditable = (id) => {
  const textEl = elements.notesContainer.querySelector(
    `.note[data-id="${id}"] .note-text`
  );
  textEl.contentEditable = true;
  textEl.focus();
  textEl.onkeydown = (e) => {
    if (e.key === 'Enter') {
      const text = textEl.innerText;
      dispatch(updateNote(id, text));
    }
  };
};

const handleAddNote = () => {
  const formData = new FormData(elements.newNoteForm);
  const text = formData.get('text');
  dispatch(addNote(text));
  const input = elements.newNoteForm.text;
  input.value = '';
};

elements.newNoteForm.addEventListener('submit', handleAddNote);

elements.notesContainer.addEventListener('click', (e) => {
  const targetClass = e.target.className;
  const noteId = +e.target.closest('.note').dataset.id;
  switch (targetClass) {
    case 'edit-note-btn':
      handleMakeEditable(noteId);
      break;
    case 'remove-note-btn':
      dispatch(removeNote(id));
      break;
    default:
      break;
  }
});

render(getState());
