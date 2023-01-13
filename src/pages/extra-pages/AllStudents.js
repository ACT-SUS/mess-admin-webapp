import MainCard from "components/MainCard";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { all_student_data } from "./all_student_data";

const AllStudents = () => {
  return (
    <MainCard>
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
            {all_student_data.map((x, y) => {
              return (
                <TableRow
                  key={y}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{x.sid}</TableCell>
                  <TableCell align="left">{`${x.firstName} ${x.lastName}`}</TableCell>
                  <TableCell align="left">{x.balance}</TableCell>
                  <TableCell align="left">{x.expense}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default AllStudents;
