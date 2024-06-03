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
    // const response = await fetch(`http://localhost:4000/users?_page=${page}&_limit=10`);
      const data = await response.json();
      setUsers(data.users || []); // Adjust according to actual response structure
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

  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.ID}>{user.FirstNameLastName}</li> // Using `user.ID` as key
          ))}
        </ul>
        <div>
          <button onClick={handlePrev} disabled={page === 1}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div>
          <p>Page: {page}</p>
        </div>
      </div>
    )}
  </div>
  );
};

export default UserList;
