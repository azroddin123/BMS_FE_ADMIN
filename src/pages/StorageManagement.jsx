import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
const StorageManagement = () => {
  const [users, setUsers] = useState([]);
  const initial = {
    city: "",
    email: "",
    fb_link: null,
    first_name: "",
    free_space: 0,
    id: 0,
    ig_link: null,
    image: "",
    label: "",
    last_name: "",
    mob_num: "",
    starcount: 0,
    total_space: 0,
    used_space: 0,
  }
  const [user, setUser] = useState(initial);

  const {refetch} = useQuery("storage-user", () => axios.get("/accounts/register"), {
    onSuccess: (res) =>
      setUsers(
        res.data.data.map((u) => ({
          ...u,
          label: u.first_name + " " + u.last_name,
        }))
      ),
  });
  let value = (user?.used_space / user?.total_space) * 100 || 0;
  console.log({ value });

  const updateStorageByUserId = (id, value) => {
    axios.put('/accounts/register/'+ id,{total_space : Number(user?.total_space) + Number(value)})
    .then(res => toast.success("Storage Expanded Successfully"))
    .catch(() => toast.error('Something went wrong'))
    refetch();
    setUser(initial)
  }


  const showConfirmationToast = (value = 0) => {
    toast.info(
      <div style = {{ml : 2}} >
        <span>Are you sure to Expand Storage {value}GB+ ?</span>
        <br />
        <br />
        <Button variant="contained" sx = {{mr : 1}} onClick = {() => updateStorageByUserId(user?.id, value)} >Yes</Button>
        <Button variant="outlined">Decline</Button>
      </div>,
      {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000, // Automatically close the toast after 3 seconds
        hideProgressBar: true, // Hide the progress bar
      }
    );
  };

  const storageHandler = (e) => {
    const GB = e.target.dataset.gb
    console.log(e.target.dataset.gb);
    showConfirmationToast(GB);
  };
  return (
    <Paper
      sx={{ maxWidth: "900px", m: "4rem auto 0", minHeight: "300px", p: 4 }}
    >
      <Grid container spacing={4} mt={0}>
        {/* <Grid item xs={12} md={2}/> */}
        <Grid item xs={12} md={4}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            value={user}
            onChange={(e, v) => setUser(v)}
            renderInput={(params) => <TextField {...params} label="Users" />}
          />
          <Stack
            spacing={2}
            mt={5}
            style={{
              borderLeft: "8px whitesmoke solid",
              padding: "1rem",
            }}
          >
            {user?.first_name ? (
              <>
                <Typography variant="h4">
                  {(user?.first_name || "") + " " + (user?.last_name || "")}
                </Typography>
                <Typography variant="h6">{user?.mob_num}</Typography>
                <Typography variant="h6">{user?.email}</Typography>
                <div>
                  <Typography variant="caption">Update Storage</Typography>
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{
                      mt: 1,
                      "& > *": {
                        flex: "1",
                      },
                    }}
                  >
                    <Button data-gb={5} onClick={storageHandler}>
                      5GB+
                    </Button>
                    <Button data-gb={10} onClick={storageHandler}>
                      10GB+
                    </Button>
                    <Button data-gb={15} onClick={storageHandler}>
                      15GB+
                    </Button>
                  </ButtonGroup>
                </div>
              </>
            ) : (
              <Typography variant="h4">{"Select User"}</Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            position={"relative"}
            sx={{
              maxWidth: "fit-content",
              // border : '1px red solid',
              m: "auto",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={value}
              size={300}
              sx={{
                position: "relative",
                zIndex: "1",
              }}
            />
            <CircularProgress
              variant="determinate"
              value={100}
              size={300}
              sx={{
                color: "whitesmoke",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
            <Box
              textAlign={"center"}
              mt={4}
              sx={{
                position: "absolute",
                top: "25%",
                left: "25%",
              }}
            >
              <Typography variant="h4">{value}% used</Typography>
              <Typography variant="h6">
                {user?.used_space || 0} / {user?.free_space || 0} (GB)
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={6}/> */}
      </Grid>
    </Paper>
  );
};

export default StorageManagement;
