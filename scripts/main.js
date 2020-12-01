const state = {
  notes: [],
  lastId: 0,
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
};

const removeNote = (id) => {
  const newNotes = state.notes.filter((n) => n.id !== id);
  state.notes = newNotes;
  render();
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
      break;
    case 'remove-note-btn':
      removeNote(noteId);
      break;
    default:
      break;
  }
});
