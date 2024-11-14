import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import VolunteerHistoryReport from "./Components/VolunteerHistoryReport";
import AdminNavBar from "../../Components/AdminNavBar";
function AdminReport() {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("volunteerHistory");

  const baseUrl = "http://localhost:3001";


  const apiEndpoints = {
    volunteerHistory: baseUrl + "/getAllProfiles",
    
  };

  const tableOptions = Object.keys(apiEndpoints).map((key) => ({
    value: key,
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()), // Converts camelCase to Title Case
  }));



  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };

  return (
    <div>
        <AdminNavBar/>
       <FormControl fullWidth margin="normal">
        <InputLabel id="table-select-label">Select Table</InputLabel>
        <Select
          labelId="table-select-label"
          value={selectedTable}
          onChange={handleChange}
        >
          {tableOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
     {selectedTable === "volunteerHistory" ? (
       <VolunteerHistoryReport api={apiEndpoints[selectedTable]} />
     ) :
     (null)

}
    </div>
  )
}


export default AdminReport
