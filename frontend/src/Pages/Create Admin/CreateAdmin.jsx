import { useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3001/admin/createAdmin', {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Admin created successfully!');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('Error creating admin. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="flex flex-col items-start p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <Typography variant="h4" align="left" gutterBottom>
            Create Admin
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
            Create Admin
          </Button>
      
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
