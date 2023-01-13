import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { menu_data } from "./menu_data";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Button, TextField, MenuItem, Select, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import axios from 'axios'
const MenuTableComponent = () => {
    const [menu_data, setMenuData] = useState({});
    const [open, setOpen] = React.useState(false);
    const [day, setDay] = React.useState("Monday");
    const [data, setData] = React.useState({
        day: "",
        breakfast: "",
        lunch: "",
        dinner: "",
    });

    const handleChange = (event) => {
        setDay(event.target.value);
        console.log(event.target.value);
        setData({
            day: event.target.value,
            breakfast: menu_data[event.target.value].breakfast,
            lunch: menu_data[event.target.value].lunch,
            dinner: menu_data[event.target.value].dinner,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        setData({ ...data, day: day });
        (async () => {
            const newMenu = {
                ...menu_data,
                [day]: {
                    breakfast: data['breakfast'],
                    lunch: data['lunch'],
                    dinner: data['dinner']
                }
            }
            await axios.put('http://localhost:5000/api/setting/menu', newMenu);
            const data2 = await axios.get("http://localhost:5000/api/setting/menu");
            const menu = data2.data;
            console.log(menu);
            setMenuData(menu);
            setData({
                day: day,
                breakfast: menu[day].breakfast,
                lunch: menu[day].lunch,
                dinner: menu[day].dinner,
            });
        })()
        // console.log(menu_data);
        // console.log(data);
    };

    useEffect(() => {
        (async () => {
            const data = await axios.get("http://localhost:5000/api/setting/menu");
            const menu = data.data;
            console.log(menu);
            setMenuData(menu);
            setData({
                day: day,
                breakfast: menu[day].breakfast,
                lunch: menu[day].lunch,
                dinner: menu[day].dinner,
            });
        })();
    }, [])

    return (
        <>
            <TableContainer>
                <Grid container alignItems="center">
                    <Button onClick={handleClickOpen} variant="contained" color="warning">
                        Edit
                    </Button>
                    <p style={{ margin: "0 10px" }}>for</p>
                    <Select value={day} label="Age" onChange={handleChange} gutterBottom>
                        <MenuItem value={"Monday"}>Monday</MenuItem>
                        <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                        <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                        <MenuItem value={"Thursday"}>Thursday</MenuItem>
                        <MenuItem value={"Friday"}>Friday</MenuItem>
                        <MenuItem value={"Saturday"}>Saturday</MenuItem>
                        <MenuItem value={"Sunday"}>Sunday</MenuItem>
                    </Select>
                </Grid>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day/Meal</TableCell>
                            <TableCell align="left">Breakfast</TableCell>
                            <TableCell align="left">Lunch</TableCell>
                            <TableCell align="left">Dinner</TableCell>
                            <TableCell align="left"></TableCell>
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
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {menu_data[day] && menu_data[day].breakfast && <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Menu</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        name="breakfast"
                        label="Breakfast"
                        fullWidth
                        onChange={(e) => setData({
                            ...data, breakfast: {
                                type: "veg",
                                dish: e.target.value
                            }
                        })}
                        defaultValue={menu_data[day].breakfast.dish}
                        maxWidth="lg"
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        name="lunch"
                        label="Lunch"
                        fullWidth
                        onChange={(e) => setData({
                            ...data, lunch: {
                                type: "veg",
                                dish: e.target.value
                            }
                        })}
                        defaultValue={menu_data[day].lunch.dish}
                        maxWidth="lg"
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        name="dinner"
                        id="name"
                        label="Dinner"
                        fullWidth
                        defaultValue={menu_data[day].dinner.dish}
                        onChange={(e) => setData({
                            ...data, dinner: {
                                type: "veg",
                                dish: e.target.value
                            }
                        })}
                        maxWidth="lg"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

export default MenuTableComponent;
