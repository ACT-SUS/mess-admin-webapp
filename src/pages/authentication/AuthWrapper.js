// material-ui
import { Box, Grid } from "@mui/material";

import chef from "../../assets/images/logo/Chef-bro.png";

// project import
import AuthCard from "./AuthCard";
import useMediaQuery from "@mui/material/useMediaQuery";

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //
const AuthWrapper = ({ children }) => {
  const matches = useMediaQuery("(max-width:700px)");

  return (
    <Box sx={{ height: "100vh", overflow: "clip" }}>
      <img
        src={chef}
        alt="chef"
        style={{
          width: !matches ? "350px" : "250px",
          position: "fixed",
          zIndex: "10000",
          top: !matches ? "0" : "100px",
          left: "40vw",
        }}
      ></img>
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        minHeight="100vh"
        paddingTop="100px"
        overflow="clip"
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;
