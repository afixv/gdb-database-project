import { useState } from "react";
import "../App.css";

import { Table, Modal } from "../components";

export function Book() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Admin",
      email: "jane.cooper@example.com",
    },
    {
      name: "John Doe",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Tester",
      email: "john.doe@example.com",
    },
    {
      name: "Veronica Lodge",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: " Software Engineer",
      email: "veronica.lodge@example.com",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, index) => {
            if (index !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue">
            {" "}
            Good Reading Bookstore{" "}
          </h1>
        </div>
        <div>
          <Table
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          >
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
        </div>
      </div>
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
//         <div className="text-4xl font-bold text-blue my-12 mx-auto">
//           <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue">
//             {" "}
//             Good Reading Bookstore{" "}
//           </h1>
//         </div>

//         {/* Memulai Pembuatan Tabel nya */}
//         {/* Mahasiswa di bebaskan untuk dapat berkreasi terhadap bentuk tabelnya */}

//         <div className="flex flex-col">
//           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//               <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Name
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Title
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Status
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Role
//                       </th>
//                       <th scope="col" className="relative px-6 py-3">
//                         <span className="sr-only">Edit</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {dummydata.map((person) => (
//                       <tr key={person.email}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {person.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {person.email}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {person.title}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {person.department}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className="px-2 inline-flex text-xs leading-5
//                       font-semibold rounded-full bg-green-100 text-green-800"
//                           >
//                             Active
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {person.role}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <a
//                             href="#"
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             Edit
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
