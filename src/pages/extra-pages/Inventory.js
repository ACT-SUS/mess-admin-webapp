import React from "react";
import InventoryCard from "./InventoryCard";
import { Grid, Button, TextField } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { inventory_array } from "./inventory_array";

const Inventory = () => {
  const [data, setData] = React.useState({
    item: "",
    quantity: "",
    price: "",
  });

  var inventory_array_new = inventory_array;

  const handleAdd = () => {
    // console.log(data);
    setData({
      item: "",
      quantity: "",
      price: "",
    });

    inventory_array_new.push(data);
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
        {inventory_array_new.map((x, y) => {
          return <InventoryCard array={inventory_array_new} view={x.view} key={y} index={y} item={x.item} quantity={x.quantity} rate={x.price} />;
        })}
      </Grid>
    </>
  );
};

export default Inventory;
