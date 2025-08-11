const repo = require("../repositories/books.repository");

const createBook = async (
  title,
  author,
  description,
  language,
  availability_time,
  user_id,
  image
) => {
  const newId = await repo.createBook(
    title,
    author,
    description,
    language,
    availability_time,
    user_id,
    image
  );
  return {
    id: newId,
    title,
    author,
    description,
    language,
    availability_time,
    user_id,
    image,
    available: true,
  };
};

const getBooksByUserId = async (user_id) => {
  return await repo.getBooksByUserId(user_id);
};

const updateBook = async (
  id,
  title,
  author,
  description,
  language,
  availability_time,
  image
) => {
  const updated = await repo.updateBook(
    id,
    title,
    author,
    description,
    language,
    availability_time,
    image
  );
  if (!updated) return null;
  return {
    id,
    title,
    author,
    description,
    language,
    availability_time,
    image,
  };
};

const updateAvailability = async (id) => {
  return repo.updateAvailability(id);
};

const deleteBook = async (id) => {
  return await repo.deleteBook(id);
};

const getBooksByCity = async (city) => {
  return repo.getBooksByCity(city);
};

const getBooksByRating = async (city) => {
  return repo.getBooksByRating(city);
};

const searchBooks = async (searchTerm) => {
  return await repo.searchBooks(searchTerm);
};

const getBookReviews = async (bookId) => {
  return await repo.getBookReviews(bookId);
};

const addOrUpdateReview = async (bookId, userId, rating, comment) => {
  return await repo.addOrUpdateReview(bookId, userId, rating, comment);
};

const deleteReview = async (bookId, userId) => {
  return await repo.deleteReview(bookId, userId);
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
  deleteBook,
  getBooksByCity,
  getBooksByRating,
  searchBooks,
  getBookReviews,
  addOrUpdateReview,
  deleteReview,
};
