import { Avatar, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import ImageInput from "../components/formUI/ImageInput";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import currencyHandler from "../utils/currency-handler";

const Products = () => {
  const intialState = { name: "", price: "",image : null };
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
      width: 210,
      renderCell : ({row}) => <Avatar   width='50px' height='50px' style = {{borderRadius : '50%',ObjectFit :'cover'}} src={row.image} alt={row.first_name + ' ' + row.last_name + ' profile picture'} />
    },
    {
      field: "name",
      headerName: "Name",
      width: 310,
    },
    {
      field: "price",
      headerName: "Price",
      width: 60,
      renderCell: ({ row }) => currencyHandler(row.price),
    },
  ];

  let fd = new FormData();

  Object.keys(formData).forEach(f => 
    typeof formData[f] == 'string' &&
    f == 'image' ? null :
    fd.append(f,formData[f]) 
  );

  return (
    <CustomTableLayout
      url="accounts/products"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
      isFormData = {true}
      putFormData = {fd} > 
      <TextField
        required
        label="Name"
        name="name"
        value={formData.name}
        onChange={formDataHandler}
      />
      <TextField
        required
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={formDataHandler}
      />
         <ImageInput 
      name = "Product"
      profile={formData.image}
      onChange = {e => setFormData({...formData,image : e.target.files[0]})}
    />
    </CustomTableLayout>
  );
};

export default Products;
