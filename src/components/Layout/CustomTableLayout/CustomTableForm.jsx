import { Box, Button, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect } from "react";
import useCustomTable from "../../../hooks/useCustomTable";
const CustomTableForm = ({
  form,
  defaultData,
  resetDefaultDataHandler,
  url,
  formProps = {},
  isFormData = false,
  putFormData = null,
  updateDataBeforePost,
  onPostApi
}) => {
  const [key,setKey] = useState(Math.random(5))
  const { formData, resetFormData, setFormData } = formProps;
  useEffect(() => {
    defaultData ? setFormData(defaultData) : resetFormData();
    console.log({formData,defaultData})
  }, [defaultData]);

  const { mutate } = useCustomTable({ defaultData, url, onPostApi });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let fd = formData;
    if(isFormData) {
      fd = new FormData();
      Object.keys(formData).forEach(f => fd.append(f,formData[f]));
    }
let data = putFormData || fd;
if(updateDataBeforePost) {
  data = updateDataBeforePost(data) || data
}
    mutate(data, {
      onSuccess: async () => {
        toast.success(`${defaultData ? "Edited" : "Added"} Successfully`);
        resetFormData();
        resetDefaultDataHandler();
        setKey(Math.random(7))
      },
      onError: () => toast.error("Something went wrong!"),
    });
  };

  return (
    <Box component={Paper} p={2} height="100%">
      <Stack component="form" spacing={2} onSubmit={onSubmitHandler} key = {key} >
        {form}
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" sx={{ flex: 1 }}>
            {defaultData ? "Edit" : "Add"} 
            {/* {url.slice(0, -1)} */}
          </Button>
          {defaultData !== null && (
            <Button
              variant="outlined"
              onClick={() => resetDefaultDataHandler()}
              startIcon={<RestartAltIcon />}
            >
              to add
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default React.memo(CustomTableForm);
