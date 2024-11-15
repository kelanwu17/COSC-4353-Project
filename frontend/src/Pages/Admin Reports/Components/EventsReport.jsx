import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart } from "@mui/x-charts/BarChart";

const groupByEventTitle = (data) =>
  data.reduce((acc, event) => {
    const title = event.title;
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

function EventsReport({ api }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [userFilter, setUserFilter] = useState("");

  const downloadCSV = () => {
    axios({
        url: 'http://localhost:3001/download/csv/registered-events',
        method: 'GET',
        responseType: 'blob',
    })
    .then((response) => {
       
        const blob = response.data;
       
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); 
        link.download = 'registered_events_report.csv'; 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
    })
    .catch((error) => {
        console.error('Error downloading CSV:', error);
    });
  };

  const downloadPDF = () => {
    axios({
        url: 'http://localhost:3001/download/pdf/registered-events', 
        method: 'GET',
        responseType: 'blob', 
    })
    .then((response) => {
      
        const blob = response.data;
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); 
        link.download = 'registered_events_report.pdf'; 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
    })
    .catch((error) => {
        console.error('Error downloading PDF:', error);
    });
};


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

  
  const filterData = (range) => {
    if (range === "All") {
        console.log('runs')
        
        return allData;
    }
    let filteredData = allData.filter((event) => {
        const date = new Date(event.eventCreated); 
        const localDate = date.toLocaleDateString('en-CA');
      const matchesDate = range.includes(localDate);  
      console.log(range)
      const matchesUser = userFilter
        ? event.title.toLowerCase().includes(userFilter.toLowerCase())
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
        
        const result = await response.json();
        setAllData(result);
        setData(result); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

 
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
  }, [userFilter, selected]); 


  const groupedData = groupByEventTitle(data);

  const columns = [
    { field: "eventsID", headerName: "Event ID", flex: 1 },
    { field: "title", headerName: "Event Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "urgency", headerName: "Urgency", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    { field: "eventCreated", headerName: "Event Created", flex: 1 },
    { field: "registration_count", headerName: "Registration Count", flex: 1 },
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
        <InputLabel>Event Title</InputLabel>
        <Select
          value={userFilter}
          onChange={handleUserFilterChange}
          label="Event Title"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[...new Set(allData.map((item) => item.title))].map((title) => (
            <MenuItem key={title} value={title}>
              {title}
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
          series={[{ dataKey: "count", label: "Registration Count" }]}
          dataset={Object.entries(groupedData).map(([title, count]) => ({
            title,
            count,
          }))}
          width={900}
          height={300}
        />
      </Paper>
      <ButtonGroup variant="contained" sx={{ position: "fixed", bottom: 16, right: 16 }}>
  <Button onClick={downloadCSV}>Download CSV</Button>
  <Button onClick={downloadPDF}>Download PDF</Button>
</ButtonGroup>

     
      </div>
  );
}

export default EventsReport;
