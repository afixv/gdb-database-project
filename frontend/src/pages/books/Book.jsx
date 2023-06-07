import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

import { Table, Modal } from "../../components";

export function Book() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex, bookID) => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    adminApi.delete(`/books/${bookID}`).then((res) => {
      alert(res.data.message);
    });
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleSubmit = (newRow, mode) => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001", // Ganti dengan URL backend yang sesuai
    });

    if (mode === "add") {
      adminApi
        .post("/books", newRow)
        .then((res) => {
          alert(res.data.message);
          window.location.reload(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (mode === "edit") {
      adminApi
        .put(`/books/${newRow?.bookID}`, newRow)
        .then((res) => {
          alert(res.data.message);
          window.location.reload(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    adminApi.get("/books/publisher").then((res) => {
      const publishers = res.data.data.rows;
      setPublishers(publishers.map((publisher) => ({ id: publisher.publisherID, name: publisher.name })));
    });
    adminApi.get("/books/category").then((res) => {
      const categories = res.data.data.rows;
      setCategories(categories.map((category) => ({ id: category.categoryID, name: category.name })));
    });
    adminApi.get("/books/author").then((res) => {
      const authors = res.data.data.rows;
      setAuthors(authors.map((author) => ({ id: author.authorID, name: author.firstName + " " + author.lastName })));
    });
    adminApi.get("/books").then((res) => {
      setRows(res.data.data.rows);
      console.log(res.data.data.rows);
    });
  }, []);

  const columns = [
    { value: "name", name: "name", label: "Title", type: "text" },
    { value: "page", name: "page", label: "Pages", type: "text" },
    { value: "authorName", name: "authorID", label: "Author Name", type: "select", options: [" ", ...authors] },
    { value: "publisherName", name: "publisherID", label: "Publisher Name", type: "select", options: [" ", ...publishers] },
    { value: "publicationYear", name: "publicationYear", label: "Publication Year", type: "text" },
    { value: "categoryName", name: "categoryID", label: "Category", type: "select", options: [" ", ...categories] },
  ];

  return (
    <>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue"> Book List </h1>
        </div>
        <div>
          <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} columns={columns} pk="bookID" />
          <button onClick={() => setModalOpen(true)} className="mt-4 mb-10 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md">
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              formFields={columns}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
              mode={rowToEdit !== null ? "edit" : "add"}
            />
          )}
        </div>
      </div>
    </>
  );
}
