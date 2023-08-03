import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function MailCard({ created, last_updated, delivered, date_created }) {
  return (
    <Card sx={{ maxWidth: "80vw", marginTop: "20px" }}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Created by:{created}</Typography>
            <Typography>Date created: {date_created}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Delivered to: {delivered}</Typography>
            <Typography>Last Updated: {last_updated}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MailCard;
