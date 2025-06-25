import { useEffect, useState } from 'react';
import './App.css';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success") {
          setUsers(data.data);
        }
      })
      .catch(err => console.error("Failed to fetch users:", err));
  }, [API_URL]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Directory</h1>
        <table className="User-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
