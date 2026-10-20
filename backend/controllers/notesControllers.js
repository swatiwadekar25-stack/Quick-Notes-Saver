
import mongoose from "mongoose";
import Note from "../models/Note.js";

// CREATE a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
    });

    console.log("Note created:", note._id);

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating note",
    });
  }
};

// READ all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error("GET NOTES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching notes",
    });
  }
};

// READ a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("GET NOTE BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching note",
    });
  }
};

// UPDATE a note by ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    if (
      (title !== undefined &&
        (typeof title !== "string" || !title.trim())) ||
      (content !== undefined &&
        (typeof content !== "string" || !content.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Title and content cannot be empty",
      });
    }

    const updates = {};

    if (title !== undefined) {
      updates.title = title.trim();
    }

    if (content !== undefined) {
      updates.content = content.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide a title or content to update",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating note",
    });
  }
};

// DELETE a note by ID
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    console.log("Note deleted:", deletedNote._id);

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting note",
    });
  }
};
