import { Grid } from "@mui/material";
import React from "react";
import GistCard from "../gistCard/GistCard";
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={2} justifyContent="center" direction="row">
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
          <Grid item>
            <GistCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
