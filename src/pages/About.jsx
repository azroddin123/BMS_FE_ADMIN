import { Divider, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <div>
      <Typography variant={"subtitle1"} gutterBottom>
        "Everything starts out small, it's how we build from the ground up that
        matters. It is important to remember that everything has to start from
        somewhere! Everything starts out small, it's how we build from the
        ground up that matters."
      </Typography>
      <Divider />
      <br />
      <Typography variant={"subtitle1"} gutterBottom component="pre">
        v1.0 features :
      </Typography>
        {/* <Stack component="ul">
          <li>Udhari Management</li>
          <li>Customer Management</li>
          <li>Product Mangament</li>
        </Stack> */}
    </div>
  );
};

export default About;
