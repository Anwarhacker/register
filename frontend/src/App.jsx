import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null); // Added error state for better UX

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/register");
      setUserData(response.data); // Changed from res2.data.users to response.data
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      setError(null); // Clear any previous errors
      setName(""); // Clear form fields
      setEmail("");
      setPassword("");
      await fetchUsers(); // Refresh user list
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      console.error("Registration failed:", errorMessage);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Added validation
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Added validation
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Added validation
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {userData.length > 0 ? (
        <div>
          <h2>Registered Users</h2>
          {userData.map((user) => (
            <div key={user._id || user.id}>
              {" "}
              {/* Changed to handle MongoDB _id */}
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No user data found!</p>
      )}
    </div>
  );
};

export default App;
