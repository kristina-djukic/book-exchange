const repo = require("../repositories/books.repository");

const createBook = async (
  title,
  author,
  description,
  availability_time,
  user_id,
  image
) => {
  const newId = await repo.createBook(
    title,
    author,
    description,
    availability_time,
    user_id,
    image
  );
  return {
    id: newId,
    title,
    author,
    description,
    availability_time,
    user_id,
    image,
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
  availability_time,
  image
) => {
  return await repo.updateBook(
    id,
    title,
    author,
    description,
    availability_time,
    image
  );
};

const updateAvailability = async (id) => {
  return repo.updateAvailability(id);
};

const deleteBook = async (id) => {
  return await repo.deleteBook(id);
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
  deleteBook,
};
