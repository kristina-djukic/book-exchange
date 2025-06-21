const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const bookService = require("../services/books.service");
const getMulterUpload = require("../functions/imageStorage");

const upload = getMulterUpload();

router.post("/postBook", upload.single("image"), async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const { title, author, description, language, availability_time } =
      req.body;
    const imagePath = req.file ? req.file.filename : null;
    const book = await bookService.createBook(
      title,
      author,
      description,
      language,
      availability_time || null,
      userId,
      imagePath || null
    );

    res.status(201).json({ message: "Book created", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create book", error: error.message });
  }
});

router.get("/userBooks", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const books = await bookService.getBooksByUserId(userId);
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user's books", error: error.message });
  }
});

router.put("/:id/updateBook", upload.single("image"), async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const { title, author, description, language, availability_time } =
      req.body;
    const imagePath = req.file
      ? req.file.filename
      : req.body.removeImage === "true"
      ? null
      : req.body.image || null;

    const success = await bookService.updateBook(
      req.params.id,
      title,
      author,
      description,
      language,
      availability_time,
      imagePath
    );

    if (!success) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book updated", book: success });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
});

router.put("/:id/updateAvailability", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const success = await bookService.updateAvailability(req.params.id);
    if (!success) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Availability updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update availability", error: error.message });
  }
});

router.delete("/:id/deleteBook", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const success = await bookService.deleteBook(req.params.id);
    if (!success) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted", id: req.params.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete book", error: error.message });
  }
});

module.exports = router;
