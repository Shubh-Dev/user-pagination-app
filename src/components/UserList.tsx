import React, { useState, useEffect } from 'react';

interface User {
  ID: string;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
}

const PAGE_DISPLAY_COUNT = 5;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const startPage = Math.max(1, page - Math.floor(PAGE_DISPLAY_COUNT / 2));
  const pageNumbers = Array.from({ length: PAGE_DISPLAY_COUNT }, (_, index) => startPage + index);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Job Title</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Phone</th>
                <th className="px-6 py-3 border-b">Company</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.ID} className="hover:bg-gray-50 odd:bg-blue-50 cursor-pointer">
                  <td className="px-4 py-3 border-b">{user.ID}</td>
                  <td className="px-4 py-3 border-b">{user.FirstNameLastName}</td>
                  <td className="px-4 py-3 border-b">{user.JobTitle}</td>
                  <td className="px-4 py-3 border-b">{user.EmailAddress}</td>
                  <td className="px-4 py-3 border-b">{user.Phone}</td>
                  <td className="px-4 py-3 border-b">{user.Company}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 mx-1 ${
                    page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  } rounded hover:bg-blue-400 hover:text-white`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;





