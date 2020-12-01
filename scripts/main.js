const getState = () => {
  const state = localStorage.getItem('notes-changelog-state');
  return state
    ? JSON.parse(state)
    : {
        notes: [],
        lastId: 0,
      };
};

// Example Redux action
action = {
  type: 'addNote',
  payload: {
    note: { id: 2, text: 'b' },
  },
};

// Experimental code begin

const noteActions = {
  addNote: (state, payload) => {
    const { noteId, text } = payload;
    state.push({ id: noteId, text });
    return state;
  },
  updateNote: (state, payload) => {
    const { noteId, text } = payload;
    const note = state.find((n) => n.id === noteId);
    note.text = text;
    return state;
  },
  removeNote: (state, payload) => {
    const { noteId } = payload;
    return state.filter((n) => n.id !== noteId);
  },
};

const reducer = (prevState, change) =>
  noteActions[change.type](prevState, change.payload);

const initState = {
  changes: [
    {
      id: 1,
      type: 'addNote',
      timestamp: 1729834797,
      payload: { noteId: 2, text: 'b' },
    },
    {
      id: 3,
      type: 'updateNote',
      timestamp: 17298347974,
      payload: { noteId: 2, text: 'c' },
    },
    {
      id: 4,
      type: 'addNote',
      timestamp: 172983479744,
      payload: { noteId: 5, text: 'e' },
    },
  ],
};

const calcState = (timestamp) => {
  const targetChanges = initState.changes.filter(
    (c) => c.timestamp <= timestamp
  );

  const newState = targetChanges.reduce((acc, change) => {
    return reducer(acc, change);
  }, []);

  console.log(newState);
};

calcState(17298347974);

// Experimental code end

const state = getState();

const saveState = () => {
  localStorage.setItem('notes-changelog-state', JSON.stringify(state));
};

const elements = {
  newNoteForm: document.querySelector('#new-note-field'),
  notesContainer: document.querySelector('#notes'),
};

const stringifyNote = (note) => `
  <li data-id="${note.id}" class="note">
    <p class="note-text">${note.text}</p>
    <div class="note-btns">
      <button class="edit-note-btn">✏️</button>
      <button class="remove-note-btn">❌</button>
    </div>
  </li>
`;

const render = () => {
  const notesHTML = state.notes.map(stringifyNote).join('');
  elements.notesContainer.innerHTML = notesHTML;
  console.log(state.notes);
  saveState();
};

const removeNote = (id) => {
  const newNotes = state.notes.filter((n) => n.id !== id);
  state.notes = newNotes;
  render();
};

const updateNote = (id, text) => {
  const note = state.notes.find((n) => n.id === id);
  note.text = text;
  render();
};

const makeEditable = (id) => {
  const textEl = elements.notesContainer.querySelector(
    `.note[data-id="${id}"] .note-text`
  );
  textEl.contentEditable = true;
  textEl.focus();
  textEl.onkeydown = (e) => {
    if (e.key === 'Enter') {
      const text = textEl.innerText;
      updateNote(id, text);
    }
  };
};

const addNote = (e) => {
  const formData = new FormData(e.target);
  const note = { text: formData.get('text'), id: ++state.lastId };
  state.notes.push(note);
  const input = e.target.text;
  input.value = '';
  render();
};

elements.newNoteForm.addEventListener('submit', addNote);

elements.notesContainer.addEventListener('click', (e) => {
  const targetClass = e.target.className;
  const noteId = +e.target.closest('.note').dataset.id;
  switch (targetClass) {
    case 'edit-note-btn':
      makeEditable(noteId);
      break;
    case 'remove-note-btn':
      removeNote(noteId);
      break;
    default:
      break;
  }
});

render();
