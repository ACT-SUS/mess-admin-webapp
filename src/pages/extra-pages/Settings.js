import MainCard from "components/MainCard";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import Typography from "@mui/material/Typography";

import { useState } from "react";
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Button } from "@mui/material";
import veg_dish from "../../assets/images/images/veg_dish.jpg";
import nonveg_dish from "../../assets/images/images/nonveg_dish.jpg";
import TextField from "@mui/material/TextField";


import MenuTableComponent from "./MenuTableComponent";

const Settings = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    setState([item.selection]);
    console.log(state);
  };

  //sem cycle, menu - price veg non veg, notify students
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MainCard title="Set Semester Cycle">
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <p>{`Selected Cycle: ${state.endDate} to ${state.startDate}`}</p>
          <p>{`Current Cycle: ${state.endDate} to ${state.startDate}`}</p>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={8}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={veg_dish}
                  alt="green iguana"
                />
                <Box
                  sx={{
                    backgroundColor: "#F2E4DF",
                    padding: "1rem",
                  }}
                >
                  <Typography variant="h5" component="div">
                    Veg Dishes - ₹70
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={nonveg_dish}
                  alt="green iguana"
                />
                <Box
                  sx={{
                    backgroundColor: "#F2E4DF",
                    padding: "1rem",
                  }}
                >
                  <Typography variant="h5" component="div">
                    Non Veg Dishes - ₹100
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MainCard>
              <Typography variant="h5" gutterBottom>
                Send Notification!
              </Typography>
              <TextField
                label="Write Notification"
                multiline
                rows={4}
                fullWidth
                defaultValue=""
                variant="outlined"
                gutterBottom
              />
              <Typography variant="h5" gutterBottom></Typography>
              <Button variant="contained" color="warning">
                Send Notification
              </Button>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <MainCard>
          <MenuTableComponent />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Settings;
