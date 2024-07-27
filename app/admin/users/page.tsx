"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/admin/sidebar/sidebar";
import { format } from "date-fns";
import { getAllRegistrants } from "@/lib/actions/registry.action";

interface User {
  _id: string;
  address: string;
  registeredAt: string;
}

const users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { registrants } = await getAllRegistrants();
        setUsers(registrants as User[]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Registry</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Wallet Address</th>
                    <th className="py-3 px-6 text-left">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1 + indexOfFirstUser}</td>
                      <td className="py-3 px-6 text-left">
                        <span className="font-mono text-xs break-all">
                          {user.address}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {format(new Date(user.registeredAt), "dd MMM yyyy, HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center">
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default users;