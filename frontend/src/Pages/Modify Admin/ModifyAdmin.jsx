import { useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const storedAdminId = sessionStorage.getItem('adminID');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`http://localhost:3001/admin/updateAdmin/${storedAdminId} `, {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Admin updated successfully!');
        setEmail('');
        setPassword('');
      }
      navigate('/')
    } catch (err) {
      setError('Error updating admin. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/admin/deleteAdmin/${storedAdminId}`)

      if (response.status === 200) {
        setSuccess('Admin deleted successfully!');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('Error deleting admin. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="flex flex-col items-start p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <Typography variant="h4" align="left" gutterBottom>
            Update Admin
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          
          <div className="mb-2">
            <TextField
              type="email"
              id="email"
              name="email"
              required
              label="Email"
              placeholder="Enter email"
              maxLength={50}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              type="password"
              id="password"
              name="password"
              required
              label="Password"
              placeholder="Enter password"
              maxLength={50}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
            />
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            className="mt-2"
          >
            Update Admin
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleDelete} 
            className="mt-2 ml-2"
          >
            Delete Admin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModifyAdmin;
