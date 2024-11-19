import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../../Components/AdminNavBar';
function ManageMembers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    address2: '',
    city: '',
    zipcode: '',
    selectedSkills: '',
    state: ''
  });
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited

  useEffect(() => {
    axios.get('http://localhost:3001/getAllUserProfiles')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [users,newUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleAddUser = () => {
    axios.post('http://localhost:3001/addUser', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({
          fullName: '',
          email: '',
          password: '',
          address: '',
          address2: '',
          city: '',
          zipcode: '',
          selectedSkills: '',
          state: ''
        });
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const handleDeleteUser = (userID) => {
    axios.delete(`http://localhost:3001/deleteprofile/${userID}`)
      .then(response => {
        setUsers(users.filter(user => user.userID !== userID));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user to edit
    setNewUser(user); // Pre-fill the form with user details
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:3001/updateprofile/${editingUser.userID}`, newUser)
      .then(response => {
        setUsers(users.map(user => user.userID === editingUser.userID ? response.data : user));
        setEditingUser(null); // Clear editing mode
        setNewUser({
          fullName: '',
          email: '',
          password: '',
          address: '',
          address2: '',
          city: '',
          zipcode: '',
          selectedSkills: '',
          state: ''
        }); // Reset form
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
        <AdminNavBar/>
        <div className="max-w-4xl mx-auto p-6">
        
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Manage Members</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editingUser ? 'Edit User' : 'Add New User'}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={newUser.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            value={newUser.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address2"
            value={newUser.address2}
            onChange={handleChange}
            placeholder="Address 2"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="city"
            value={newUser.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="zipcode"
            value={newUser.zipcode}
            onChange={handleChange}
            placeholder="Zipcode"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="selectedSkills"
            value={newUser.selectedSkills}
            onChange={handleChange}
            placeholder="Selected Skills"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            value={newUser.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={editingUser ? handleSaveEdit : handleAddUser}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.userID} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
              <div>
                <strong className="text-lg text-gray-800">{user.fullName}</strong>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDeleteUser(user.userID)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default ManageMembers;
