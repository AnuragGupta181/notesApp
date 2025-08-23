import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/add-note', middleware, async (req, res) => {
  const { title, description } = req.body;

  const newNote = new Note({
    title,
    description,
    userId: req.user.id,
    createdAt: new Date(),
  });

  try {
    await newNote.save();

    return res.status(201).json({ success: true, message: 'Note added successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});




router.get('/get-notes', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message});
  }
});



router.put('/update-note/:id', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Both title and description are required" });
    }

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.status(200).json({ success: true, message: 'Note updated successfully', data: updated });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});




router.delete('/delete-note/:id', middleware, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});



export default router;