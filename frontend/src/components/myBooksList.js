import React from "react";

const MyBooksList = ({
  books,
  editBookId,
  editData,
  handleEditChange,
  defaultBookImage,
  setEditData,
  handleEditSave,
  setEditBookId,
  handleEditClick,
  updateAvailability,
  deleteBook,
}) => {
  return books.map((book) => (
    <div className="col-md-6 mb-3" key={book.id}>
      <div className="card h-100">
        <div className="card-body">
          {editBookId === book.id ? (
            <>
              <input
                className="form-control mb-2"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
              />
              <input
                className="form-control mb-2"
                name="author"
                value={editData.author}
                onChange={handleEditChange}
              />
              <textarea
                className="form-control mb-2"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />

              <input
                className="form-control mb-2"
                name="language"
                value={editData.language}
                onChange={handleEditChange}
              />

              <input
                className="form-control mb-2"
                type="number"
                name="availability_time"
                value={editData.availability_time}
                onChange={handleEditChange}
                placeholder="Availability Time (days)"
              />
              <div className="mb-2">
                <img
                  src={
                    editData.image instanceof File
                      ? URL.createObjectURL(editData.image)
                      : editData.image === null
                      ? defaultBookImage
                      : book.image
                      ? `/uploads/${book.image}`
                      : defaultBookImage
                  }
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {(book.image || editData.image) && (
                <button
                  className="btn btn-danger mb-2"
                  type="button"
                  onClick={() => setEditData({ ...editData, image: null })}
                >
                  Remove Picture
                </button>
              )}
              <input
                className="form-control mb-2"
                type="file"
                name="image"
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    image: e.target.files[0],
                  })
                }
                accept="image/*"
              />
              <button className="btn btn-success me-2" onClick={handleEditSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditBookId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h5>{book.title}</h5>
              <h6 className="text-muted">{book.author}</h6>
              <p>{book.description}</p>
              <div className="mb-2">
                <img
                  src={book.image ? `/uploads/${book.image}` : defaultBookImage}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <p>
                Book language: <strong>{book.language}</strong>
              </p>
              <p>
                Available for: <strong>{book.availability_time}</strong> days
              </p>
              <p>
                Status:{" "}
                <span
                  className={book.available ? "text-success" : "text-danger"}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </p>

              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handleEditClick(book)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-warning me-2"
                onClick={() => updateAvailability(book.id)}
              >
                {book.available ? "Mark Unavailable" : "Mark Available"}
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this book?")
                  ) {
                    deleteBook(book.id);
                  }
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  ));
};

export default MyBooksList;
