import {
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
const MetaTags = () => {
  const [tag, setTag] = useState("");
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("_token");
  }, []);

  const [tagList, setTagList] = useState([{ name: "barber", id: 1 }]);
  const location = useLocation();
  const getTagList = () => axios.get("/accounts/meta-tags/0");
  // .then(res => setTagList(res.data));
  const onDelete = (id) =>
   {
    console.log(id)

     axios
      .delete("/accounts/meta-tags/"+ id)
      .then(() => setTagList(tagList.filter((tag) => tag.id !== id)));
    }

  const { data, isLoading, refetch } = useQuery("meta-tags", getTagList, {
    onSuccess: (res) => setTagList(res.data.data),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const tags = tag.split(",").map(tag => ({name : tag}))

    tags.forEach(tagObj => axios.post('/accounts/meta-tags', tagObj))
    
    // axios.post("/accounts/meta-tags", { array: tag.split(",") });
    // setTagList([...tagList, ...tags]);
    refetch()
    setTag("");
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h5" textTransform={"capitalize"} px={2} pt={2}>
          {location.pathname.slice(1).replaceAll("-", " ")}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Box
            p={2}
            gap={2}
            height="350px"
            sx={{ overflow: "auto", flexWrap: "wrap" }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {isLoading ? 'Loading Meta Tages...' : tagList.length > 0
                ? tagList.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      variant="outlined"
                      onDelete={() => onDelete(tag.id)}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))
                : "Add Meta tags"}
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} component={"form"} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Enter Meta Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            helperText="Enter comma(,) to separates tags."
          />
          <Button variant="contained" type="submit" size="large">
            <AddIcon />
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MetaTags;
