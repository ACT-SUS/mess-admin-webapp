import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Grid, Typography, ListItemIcon } from "@mui/material";

// project imports
import MainCard from "../MainCard";

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: "5rem", color: "#FAAD14" }} />
  ) : (
    false
  );

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
    console.log(item);
  });

  // only used for component demo breadcrumbs
  if (location.pathname === "/breadcrumbs") {
    location.pathname = "/dashboard/analytics";
  }

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";

  // collapse item
  if (main && main.type === "collapse") {
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: "none" }}
        color="textSecondary"
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === "item") {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          border={false}
          sx={{ mb: 3, bgcolor: "transparent" }}
          {...others}
          content={false}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={8} sm={11}>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography
                  component={Link}
                  to="/"
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: "none" }}
                >
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
              <Typography variant="h5" gutterBottom></Typography>
              <Typography variant="h5">{item.title}</Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
              <ListItemIcon>{itemIcon}</ListItemIcon>
            </Grid>
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
