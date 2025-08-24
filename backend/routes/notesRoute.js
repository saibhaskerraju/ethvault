const express = require("express");

const {
  getNoteById,
  getAllNotes,
  createNote,
  updateNoteById,
  patchNoteById,
  deleteNoteById
} = require("../controllers/notesController");

const router = express.Router();


router.route("/notes").get(getAllNotes);
router.route("/notes/:id").get(getNoteById);
router.route("/notes").post(createNote);
router.route("/notes/:id").put(updateNoteById);
router.route("/notes/:id").patch(patchNoteById);
router.route("/notes/:id").delete(deleteNoteById);
module.exports = router;