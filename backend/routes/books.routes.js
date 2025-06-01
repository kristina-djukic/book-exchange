const express = require("express");
const router = express.Router();
const bookService = require("../services/books.service");

router.post("/postBook", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const { title, author, description, availability_time } = req.body;
    const book = await bookService.createBook(
      title,
      author,
      description,
      availability_time || null,
      userId
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

router.put("/:id", async (req, res) => {
  try {
    const { title, author, description, availability_time } = req.body;
    const success = await bookService.updateBook(
      req.params.id,
      title,
      author,
      description,
      availability_time
    );
    if (!success) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update book", error: error.message });
  }
});

router.put("/:id/updateAvailability", async (req, res) => {
  try {
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
