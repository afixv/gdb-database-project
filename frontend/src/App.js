import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Book, Customer, Purchase, Staff, Store, NoPage, Author, Publisher } from "./pages";
import { CustomNavbar } from "./components";
import "./index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="book" element={<Book />} />
          <Route path="author" element={<Author />} />
          <Route path="publisher" element={<Publisher />} />
          <Route path="customer" element={<Customer />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="staff" element={<Staff />} />
          <Route path="store" element={<Store />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
