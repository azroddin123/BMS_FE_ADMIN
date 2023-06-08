import { Autocomplete, Avatar, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import ImageInput from "../components/formUI/ImageInput";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import currencyHandler from "../utils/currency-handler";
import { useQuery } from "react-query";
import axios from "axios";

const Testimonials = () => {
  const intialState = {
    profile_pic: null,
    name: "",
    address: "",
    description: "",
  };
  const [formData, setFormData] = useState(intialState);

  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFormData = () => setFormData(intialState);

  const {data, isLoading} = useQuery('artist-list-for-testimonials',() => axios.get('/accounts/register'))

  const list = data?.data?.data.map(l => ({...l, label : l.first_name + ' ' + l.last_name})) || []

  const currentArtist = list.find(a => a.id == formData.user || a.id == formData.user?.id)


console.log({currentArtist})
  const columns = [
    {
      field: "",
      headerName: "ID",
      width: 110,
      renderCell: ({ row }) => row.id,
    },
    {
      field: "artust_name",
      headerName: "Artist",
      width: 220,
      renderCell: ({ row }) => (
        <span>{row.user.first_name + ' ' +row.user?.last_name}</span>
      ),
    },
    {
      field: "description",
      headerName: "Testimonial",
      width: 240,
    },
  ];
  console.log(999999);
  console.log(formData.user || currentArtist)
  console.log(999999);
  let fd = new FormData();

  Object.keys(formData).forEach((f) =>
    typeof formData[f] == "string" && f == "profile_pic"
      ? null
      : fd.append(f, formData[f])
  );

  return (
    <CustomTableLayout
      url="accounts/testimonials"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
      isFormData={true}
      putFormData={fd}
    >
           <p style = {{
        fontSize : '0.65rem',
        color : 'gray',
        marginBottom : '0.1rem'
      }} >Current Artist : {(formData.user?.first_name || '--') + ' ' + (formData.user?.last_name || '--')}</p>
      <Autocomplete
        name="artist"
        onChange= {(e, v) => {
          formDataHandler({ target: { name: "user", value: v.id } });
        }}
        disablePortal
        required
        id="combo-box-demo"
        options={list}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Artist"
            helperText="If Artist not found, Visit Artist page to create it."
          />
        )}
      />
      <TextField
        required
        label="Description"
        name="description"
        value={formData.description}
        onChange={formDataHandler}
      />
    </CustomTableLayout>
  );
};

export default Testimonials;
