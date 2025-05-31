const express = require("express");
const router = express.Router();
const bookService = require("../services/books.service");
const e = require("express");

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

module.exports = router;
