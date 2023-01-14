import MainCard from "components/MainCard";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Grid } from "@mui/material";
import exportCSVFile from "./export_to_csv";
import DownloadIcon from "@mui/icons-material/Download";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  // get current blog
  const indexOfLastBlog = currentPage * dataPerPage;
  const indexOfFirstBlog = indexOfLastBlog - dataPerPage;
  const currentData = students.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  var headers = {
    sid: "Roll Num",
    name: "Name",
    balance: "Balance",
    expense: "Expense",
  };
  useEffect(() => {
    try {
      (async () => {
        const data = await axios.get("http://localhost:5000/api/student");
        setStudents(data.data.students);
        // console.log(data.data.students);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  var fileTitle = "student_data"; // or 'my-unique-title'

  return (
    <MainCard>
      <Grid container justifyContent="end">
        <Button
          variant="outlined"
          color="warning"
          endIcon={<DownloadIcon />}
          onClick={() => exportCSVFile(headers, students, fileTitle)}
        >
          Export To CSV
        </Button>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Roll Num</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Balance</TableCell>
              <TableCell align="left">Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((x, y) => {
              return (
                <TableRow
                  key={y}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{x.id ? x.id : x.sid}</TableCell>
                  <TableCell align="left">{`${x.firstName} ${x.lastName}`}</TableCell>
                  <TableCell align="left">{x.balance}</TableCell>
                  <TableCell align="left">{x.expense}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: "2rem 0" }}>
        <Pagination
          count={Math.ceil(students.length / dataPerPage)}
          color="primary"
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </MainCard>
  );
};

export default AllStudents;
