import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/add-note', middleware, async (req, res) => {
  const { title, description, userId, createdAt } = req.body;

  const newNote = new Note({
    title,
    description,
    userId: userId || req.user.id,
    createdAt: createdAt || new Date(),
  });

  try {
    await newNote.save();

    return res.status(201).json({ success: true, message: 'Note added successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;