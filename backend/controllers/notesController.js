const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");

// In-memory storage for notes
let notes = [
  {
    id: "1",
    title: "Meeting Notes",
    author: "John Doe",
    createdBy: "Jane Smith",
    content: "Discussed project timeline and resource allocation."
  },
  {
    id: "2",
    title: "Brainstorming Session",
    author: "Alice Johnson",
    createdBy: "Bob Williams",
    content: "Generated new ideas for product development."
  },
  {
    id: "3",
    title: "Code Review",
    author: "David Brown",
    createdBy: "Carol Davis",
    content: "Reviewed code changes and provided feedback."
  }
];

// Get Single Note Details
exports.getNoteById = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json({ data: note });
});


// Get All notes
exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ data: notes });
});

// Create a New Note
exports.createNote = asyncErrorHandler(async (req, res, next) => {
  const newId = notes.length > 0 ? (parseInt(notes[notes.length - 1].id) + 1).toString() : "1"; // Generate a new ID
  const newNote = {
    id: newId,
    title: req.body.title,
    author: req.body.author,
    createdBy: req.body.createdBy,
    content: req.body.content
  };

  notes.push(newNote);
  res.status(201).json({ message: 'Note created successfully', data: newNote });
});

// Update a Note by ID
exports.updateNoteById = asyncErrorHandler(async (req, res, next) => {
  const noteIndex = notes.findIndex((n) => n.id === req.params.id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const updatedNote = {
    id: notes[noteIndex].id, // Ensure ID remains unchanged
    title: req.body.title || notes[noteIndex].title,
    author: req.body.author || notes[noteIndex].author,
    createdBy: req.body.createdBy || notes[noteIndex].createdBy,
    content: req.body.content || notes[noteIndex].content
  };

  notes[noteIndex] = updatedNote;
  res.status(200).json({ message: 'Note updated successfully', data: updatedNote });
});

// Partially Update a Note by ID
exports.patchNoteById = asyncErrorHandler(async (req, res, next) => {
  const noteIndex = notes.findIndex((n) => n.id === req.params.id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const patchedNote = {
    ...notes[noteIndex],
    ...req.body // Merge only provided fields
  };

  notes[noteIndex] = patchedNote;
  res.status(200).json({ message: 'Note patched successfully', data: patchedNote });
});

// Delete a Note by ID
exports.deleteNoteById = asyncErrorHandler(async (req, res, next) => {
  const initialLength = notes.length;
  notes = notes.filter((n) => n.id !== req.params.id);

  if (notes.length === initialLength) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json({ message: 'Note deleted successfully' });
});
