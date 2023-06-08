import { TextField } from "@mui/material";
import { useState } from "react";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import currencyHandler from "../utils/currency-handler";

const Customers = () => {
  const intialState = { phone: "", name: "", city: "" };
  const [formData, setFormData] = useState(intialState);

  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFormData = () => setFormData(intialState);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
      renderCell: ({ row }) => row.id,
    },
    {
      field: "name",
      headerName: "Name",
      width: 210,
    },
    {
      field: "total_udhari",
      headerName: "Total Udhari",
      width: 210,
      renderCell: ({ row }) => {
        const totalUdhari = row.udharis
          .map((u) => u.amount)
          .reduce((a, c) => a + c, 0);
        return totalUdhari ? currencyHandler(totalUdhari) : "No Udhari";
      },
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 110,
    },
    {
      field: "city",
      headerName: "City",
      width: 210,
      flex: 1,
    },
  ];
  return (
    <CustomTableLayout
      url="customers"
      columns={columns}
      formProps={{ formData, resetFormData, setFormData, formDataHandler }}
    >
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={formDataHandler}
      />
      <TextField
        label="Phone"
        type="number"
        name="phone"
        value={formData.phone}
        onChange={formDataHandler}
      />{" "}
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={formDataHandler}
      />
    </CustomTableLayout>
  );
};

export default Customers;
