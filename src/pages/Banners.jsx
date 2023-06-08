import { Avatar, InputAdornment, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import ImageInput from "../components/formUI/ImageInput";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import currencyHandler from "../utils/currency-handler";
import { YouTube } from "@mui/icons-material";

const Banners = () => {
  const intialState = {
    image: null,
    end_date: "",
    description: "",
    video_url : ""
  };
  const [formData, setFormData] = useState(intialState);

  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFormData = () => setFormData(intialState);

  const columns = [
    {
      field: "",
      headerName: "ID",
      width: 110,
      renderCell: ({ row }) => row.id,
    },
    {
      field: "image",
      headerName: "Image",
      width: 520,
      renderCell: ({ row }) => (
        <a href={row.image} target="new">
          {" "}
          <img
            width="100%"
            height="300px"
            style={{
              borderRadius: "20px",
              ObjectFit: "contain",
              paddingBottom: "20px",
            }}
            src={row.image}
          />
        </a>
      ),
    },
    // {
    //   field: "start_date",
    //   headerName: "Start Date",
    //   width: 100,
    //   renderCell: ({ row: { start_date } }) => (
    //     <span>{moment(start_date).format("DD/MM/YY")}</span>
    //   ),
    // },
    {
      field: "end_date",
      headerName: "End Date",
      width: 100,
      renderCell: ({ row: { end_date } }) => (
        <span>{moment(end_date).format("MM/DD/YY")}</span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
  ];

  let fd = new FormData();

  Object.keys(formData).forEach((f) =>
    typeof formData[f] == "string" && f == "image"
      ? null
      : fd.append(f, formData[f])
  );

  return (
    <CustomTableLayout
      sx={{
        "& .MuiDataGrid-row": {
          minHeight: "300px !important",
          "& .MuiDataGrid-cell": {
            minHeight: "300px !important",
          },
        },
      }}
      url="accounts/banners"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
      isFormData={true}
      putFormData={fd}
    >
      <ImageInput
        name="Banner"
        profile={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      />
      {/* <DatePicker
        label="Start Date"
        name="start_date"
        profile={formData.start_date}
        onChange={(e) => setFormData({ ...formData, start_date: e.$d })}
      />*/}
        <p style = {{
        fontSize : '0.65rem',
        color : 'gray',
        marginBottom : '0.1rem'
      }} >Expiry Date of Banner : {moment(formData.end_date).format('DD-MM-YYYY') === "Invalid date" ? '---' : moment(formData.end_date).format('DD-MM-YYYY')}</p>
      <DatePicker
        label="End Date"
        name="end_date"
        profile={new Date(formData.end_date)}
        // onChange={(e) => console.log({  })}
        onChange={(e) => setFormData({ ...formData, end_date: moment(e.$d).format('YYYY-MM-DD') })}
      /> 
    
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={formDataHandler}
      />
        <TextField
      required
        label="Youtube URL"
        name="video_url"
        value={formData.video_url}
        onChange={formDataHandler}
        type = "url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <YouTube />
          </InputAdornment>
          ),
        }}
      />
    </CustomTableLayout>
  );
};

export default Banners;
