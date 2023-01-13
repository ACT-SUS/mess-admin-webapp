import MainCard from "components/MainCard";
import React from "react";
import InventoryCard from "./InventoryCard";
import { Grid, Button, TextField } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const Inventory = () => {
  const [data, setData] = React.useState({
    item: "",
    quantity: "",
    price: "",
  });

  const handleAdd = () => {
    // console.log(data);
    setData({
        item: "",
        quantity: "",
        price: "",
      });
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            size="large"
            onClick={handleAdd}
            fullWidth
            endIcon={<AddBusinessIcon />}
          >
            Add Item To Inventory
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="dense"
            id="name"
            name="item"
            label="Item"
            maxWidth="lg"
            onChange={(e) => setData({ ...data, item: e.target.value })}
            fullWidth
            variant="outlined"
            value={data.item}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="dense"
            id="name"
            name="quantity"
            fullWidth
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            label="Quantity"
            value={data.quantity}
            maxWidth="lg"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="dense"
            id="name"
            fullWidth
            name="price"
            onChange={(e) => setData({ ...data, price: e.target.value })}
            label="Price"
            value={data.price}
            maxWidth="lg"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <br />
      <Grid container spacing={2} alignItems="center">
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
        <InventoryCard item="Wheat" qnty="10kg" rate="Rs.28/kg" />
      </Grid>
    </>
  );
};

export default Inventory;
