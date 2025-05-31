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

module.exports = {
  createBook,
};
