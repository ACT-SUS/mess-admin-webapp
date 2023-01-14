import { Grid, Paper, Box, Typography, IconButton } from "@mui/material";
import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const InventoryCard = ({ item, quantity, rate, index }) => {
  const handleDelete = () => {
    console.log(index);
  };

  return (
    <>
      <Grid item xs={6} sm={4} md={3}>
        <Paper>
          <Box
            sx={{
              padding: "1rem",
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={10} sm={10}>
                <Typography variant="h5">{item}</Typography>
                <Typography variant="h6">{`${quantity} - ${rate}`}</Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <IconButton size="small" color="warning">
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={handleDelete}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default InventoryCard;
