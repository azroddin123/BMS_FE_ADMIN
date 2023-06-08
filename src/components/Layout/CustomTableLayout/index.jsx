import { Search } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useCustomTable from "../../../hooks/useCustomTable";
import CustomTableForm from "./CustomTableForm";
import CustomTableWrapper from "./CustomTableWrapper";

const CustomTableLayout = ({
  url,
  columns,
  children,
  formProps,
  isFormData = false,
  putFormData = null,
  onPostApi = null,
  sx = {},
  updateDataBeforePost = null,
  bulkUploadUrl = "",
  bulkUpload = false,
  addSearch = false,
}) => {
  const [defaultData, setDefaultData] = useState(null);
  const [search, setSearch] = useState("");
  const resetDefaultDataHandler = () => setDefaultData(null);
  const { uploadMutate, searchMutate,refetch, getSearch } = useCustomTable({
    search,
    url,
    bulkUploadUrl,
  });
  const location = useLocation();

  let fileRef = useRef(null);
  const uploadBulkHandler = (e) => {
    console.log(e.target.files);
    uploadMutate(e.target.files, {
      onSuccess: () => {
        console.log("red");
        setTimeout(() => window.location.reload(), 1000);
      },
    });
    e.target.files = null;
    fileRef.current.target.files = null;

    // console.log(fileRef.current.target.files)
  };

  const searchHandler = () => {
    // refetch()
    getSearch(search)
    // searchMutate(search, {
    //   onSuccess: () => setSearch(""),
    // });
  };
  useEffect(
    () => {
      searchHandler()
    },[search]
  )

  return (
    <>
      <Box
        display="flex"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        flexDirection={{ xs: "column", sm: "row", gap: "1rem" }}
        mb={2}
      >
        <Typography variant="h5" textTransform={"capitalize"} mb={0}>
          {location.pathname.slice(1).replaceAll("-", " ")}
        </Typography>
        {addSearch == true && (
          <Stack
            direction={"row"}
            spacing={1}
            sx={{
              width: "auto",
              flex: "1",
              border: "1px transparent solid",
              borderRadius: "8px",
              p: 0,
            }}
          >
            <TextField
              label="Search"
              sx={{ flex: "1" }}
              variant="standard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <FormControl sx={{ flex: "0.3" }}>
              <InputLabel id="demo-simple-select-label">By :</InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                {columns.map(({ field, headerName }) => (
                  <MenuItem value={field} key={field}>
                    {headerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <IconButton sx={{ width: "60px" }} onClick={searchHandler}>
              <Search />
            </IconButton>
          </Stack>
        )}
        <Button
          variant="contained"
          component="label"
          sx={{
            display: !bulkUpload ? "none" : "inline-block",
            ml : 'auto'
          }}
        >
          Bulk Upload
          <input
            hidden
            type="file"
            onChange={uploadBulkHandler}
            ref={fileRef}
          />
        </Button>
      </Box>

      <Grid
        container
        spacing={2}
        flexDirection={{ xs: "column-reverse", sm: "row", ...sx }}
      >
        <Grid item xs={12} sx={{ order: { xs: "2", sn: "0" } }}></Grid>
        <Grid item xs={12} sm={8}>
          <CustomTableWrapper
            url={url}
            columns={columns}
            setDefaultData={setDefaultData}
            onPostApi={onPostApi}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTableForm
            onPostApi={onPostApi}
            putFormData={putFormData}
            isFormData={isFormData}
            formProps={formProps}
            form={children}
            url={url}
            defaultData={defaultData}
            resetDefaultDataHandler={resetDefaultDataHandler}
            updateDataBeforePost={updateDataBeforePost}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomTableLayout;
