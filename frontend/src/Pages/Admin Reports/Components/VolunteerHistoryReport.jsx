import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Correct import for Grid
import { DataGrid } from "@mui/x-data-grid";
import { BarChart } from "@mui/x-charts/BarChart";

// Helper function to group data by event title
const groupByEventTitle = (data) =>
  data.reduce((acc, volunteer) => {
    const title = volunteer.title;
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

function VolunteerHistoryReport({ api }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [userFilter, setUserFilter] = useState(""); // New state for user filter

  // Generate a range of dates for filtering
  const getDateRange = (days) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      dates.push(currentDate.toISOString().split("T")[0]);
    }
    return dates.reverse();
  };

  const last7days = getDateRange(7);
  const lastMonth = getDateRange(30);
  const lastQuarter = getDateRange(90);

  // Filter the data by the selected date range and user
  const filterData = (range) => {
    let filteredData = allData.filter((volunteer) => {
      const date = volunteer.startTime?.split("T")[0];
      const matchesDate = range.includes(date);
      const matchesUser = userFilter
        ? volunteer.fullName.toLowerCase().includes(userFilter.toLowerCase())
        : true;
      return matchesDate && matchesUser;
    });
    return filteredData;
  };

  const handleClick = (index) => {
    let filteredData;
    switch (index) {
      case 0:
        filteredData = filterData(last7days);
        break;
      case 1:
        filteredData = filterData(lastMonth);
        break;
      case 2:
        filteredData = filterData(lastQuarter);
        break;
      default:
        filteredData = filterData(lastQuarter); 
    }
    setData(filteredData);
    setSelected(index);
  };

  const handleUserFilterChange = (event) => {
    setUserFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error("Failed to fetch data");
        console.log(response);
        const result = await response.json();
        setAllData(result);
        setData(result); // Initialize with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  // Update filtered data whenever userFilter or selected (date range) changes
  useEffect(() => {
    let filteredData;
    switch (selected) {
      case 0:
        filteredData = filterData(last7days);
        break;
      case 1:
        filteredData = filterData(lastMonth);
        break;
      case 2:
        filteredData = filterData(lastQuarter);
        break;
      default:
        filteredData = filterData(lastQuarter);
    }
    setData(filteredData);
  }, [userFilter, selected]); // Dependencies: userFilter and selected (date range)

  // Group data by event title
  const groupedData = groupByEventTitle(data);

  const columns = [
    { field: "userID", headerName: "User ID", flex: 1 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "title", headerName: "Event Title", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
  ];

  return (
    <div>
      <ButtonGroup variant="contained">
        {["7 Days", "30 Days", "90 Days", "All"].map((label, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index)}
            color={selected === index ? "primary" : "inherit"}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>User</InputLabel>
        <Select
          value={userFilter}
          onChange={handleUserFilterChange}
          label="User"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[...new Set(allData.map((item) => item.fullName))].map((user) => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper sx={{ height: 500, width: "100%", marginTop: 2 }}>
        <DataGrid
          rows={data.map((row, index) => ({ id: index, ...row }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
        />
      </Paper>

      <Paper sx={{ marginTop: 2 }}>
        <Typography variant="overline">Event Title Distribution</Typography>
        <BarChart
          xAxis={[{ dataKey: "title", scaleType: "band" }]}
          series={[{ dataKey: "count", label: "Volunteers" }]}
          dataset={Object.entries(groupedData).map(([title, count]) => ({
            title,
            count,
          }))}
          width={900}
          height={300}
        />
      </Paper>
    </div>
  );
}

export default VolunteerHistoryReport;
