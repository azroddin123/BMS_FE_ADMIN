import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BrushIcon from "@mui/icons-material/Brush";
import {
  FormatQuote,
  Store,
  Translate,
  ViewCarousel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
const Dashboard = () => {

  // axios.defaults.baseURL = 'http://127.0.0.1:8000/';
  const navigate = useNavigate();
  const [data, setData] = useState({
    artist: 0,
    parlour: 0,
    banner: 0,
    testimonial: 0,
    metaTags: 0,
  });

  const {data : ac} = useQuery('a-c',()=>
  axios.get('/accounts/register'))
  const {data : pc} = useQuery('p-c',()=>
  axios.get('/accounts/parlours/0'))
  console.log(ac?.data?.data)
  const {data : bc} = useQuery('b-c',()=>
  axios.get('/accounts/banners'))
  const {data : tc} = useQuery('t-c',()=>
  axios.get('/accounts/testimonials/0'))
  const {data : mc} = useQuery('m-c',()=>
  axios.get('/accounts/meta-tags/0'))

  console.log(data)
  return (
    <div className="dashboard-page">
      <Typography variant="h4">Dashboard</Typography>

      <Grid container spacing={2} sx={{ maxWidth: "900px", m: "auto" }}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <Box display={"flex"} gap={2} mb={3}>
                <BrushIcon
                  sx={{
                    fontSize: "6rem",
                    color: "primary",
                  }}
                />
                <Box>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Total Artists
                  </Typography>
                  <Typography variant="h3">{ac?.data?.data?.length}</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={() => navigate("/makeup-artists")}
              >
                {" "}
                See Artists
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <Box display={"flex"} gap={2} mb={3}>
                <Store
                  sx={{
                    fontSize: "6rem",
                  }}
                />
                <Box>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Total Parlours
                  </Typography>
                  <Typography variant="h3">{pc?.data?.data?.length}</Typography>
</Box>
              </Box>

              <Button variant="contained" onClick={() => navigate("/parlours")}>
                {" "}
                See Parlours
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <Box display={"flex"} gap={2} mb={3}>
                <ViewCarousel
                  sx={{
                    fontSize: "6rem",
                  }}
                />
                <Box>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Total Banners
                  </Typography>
                  <Typography variant="h3">{bc?.data?.data?.length}</Typography>
</Box>
              </Box>

              <Button variant="contained" onClick={() => navigate("/banners")}>
                {" "}
                See Banners
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <Box display={"flex"} gap={2} mb={3}>
                <FormatQuote
                  sx={{
                    fontSize: "6rem",
                  }}
                />
                <Box>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Total Testimonials
                  </Typography>
                  <Typography variant="h3">{tc?.data?.data?.length}</Typography>
</Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/testimonials")}
              >
                {" "}
                See Testimonials
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={2}>
              <Box display={"flex"} gap={2} mb={3}>
                <Translate
                  sx={{
                    fontSize: "6rem",
                  }}
                />
                <Box>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Total Meta Tags
                  </Typography>
                  <Typography variant="h3">{mc?.data?.data?.length}</Typography>
  </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/meta-tags")}
              >
                {" "}
                See Meta Tags
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
