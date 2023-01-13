import axios from "axios";
import MainCard from "components/MainCard";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { menu_data } from "./menu_data";

const MenuPage = () => {
    const [menu_data, setMenuData] = useState({});

    useEffect(() => {
        (async () => {
            const data = await axios.get("http://localhost:5000/api/setting/menu");
            const menu = data.data;
            // console.log(menu);
            setMenuData(menu);
        })();
    }, []);

    return (
        <MainCard>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day/Meal</TableCell>
                            <TableCell align="left">Breakfast</TableCell>
                            <TableCell align="left">Lunch</TableCell>
                            <TableCell align="left">Dinner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(menu_data).map(([key, val], i) => (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <b>{key}</b>
                                </TableCell>
                                <TableCell align="left">{val.breakfast.dish}</TableCell>
                                <TableCell align="left">{val.lunch.dish}</TableCell>
                                <TableCell align="left">{val.dinner.dish}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default MenuPage;
