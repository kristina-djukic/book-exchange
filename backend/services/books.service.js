const repo = require("../repositories/books.repository");

const createBook = async (
  title,
  author,
  description,
  availability_time,
  user_id
) => {
  const newId = await repo.createBook(
    title,
    author,
    description,
    availability_time,
    user_id
  );
  return {
    id: newId,
    title,
    author,
    description,
    availability_time,
    user_id,
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
  availability_time
) => {
  return await repo.updateBook(
    id,
    title,
    author,
    description,
    availability_time
  );
};

const updateAvailability = async (id) => {
  return repo.updateAvailability(id);
};

module.exports = {
  createBook,
  getBooksByUserId,
  updateBook,
  updateAvailability,
};
