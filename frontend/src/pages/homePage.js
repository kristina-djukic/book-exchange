import React from "react";
import BookCard from "../components/bookCard";

const placeholderBooks = [
  {
    book_id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical novel about following your dreams.",
  },
  {
    book_id: 2,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
  },
  {
    book_id: 3,
    title: "Dune",
    author: "Frank Herbert",
    description: "Epic science fiction about politics, power, and spice.",
  },
];

const HomePage = () => {
  return (
    <div className="container mt-4">
      <h2>Welcome back!</h2>
      <p>Here are some books near you:</p>

      <div className="row">
        {placeholderBooks.map((book) => (
          <div className="col-md-4 mb-3" key={book.book_id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
