import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Book, Customer, Purchase, Staff, Store, NoPage, Author, Publisher } from "./pages";
import { CustomNavbar } from "./components";
import "./index.css";

function App() {
  const routes = [
    {
      path: "book",
      element: <Book />,
      children: [
        { path: "author", element: <Author /> },
        { path: "publisher", element: <Publisher /> },
      ],
    },
    { path: "customer", element: <Customer /> },
    { path: "purchase", element: <Purchase /> },
    { path: "staff", element: <Staff /> },
    { path: "store", element: <Store /> },
    { path: "*", element: <NoPage /> },
  ];

  return (
    <div>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route index element={<Book />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
