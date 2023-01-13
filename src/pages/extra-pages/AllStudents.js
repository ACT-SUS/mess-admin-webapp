import MainCard from "components/MainCard";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { all_student_data } from "./all_student_data";
import axios from 'axios'

const AllStudents = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        try {
            (async () => {
                const data = await axios.get('http://localhost:5000/api/student')
                setStudents(data.data.students);
                console.log(data.data.students);
            })()
        } catch (error) {
            console.error(error);
        }
    }, [])

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
                        {students.map((x, y) => {
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
        </MainCard>
    );
};

export default AllStudents;
