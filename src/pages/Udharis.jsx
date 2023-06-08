import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CustomTableLayout from "../components/Layout/CustomTableLayout";
import currencyHandler from "../utils/currency-handler";
import { baseUrl } from "../utils/urls";

const Udharis = () => {
  const intialState = {
    amount: "",
    paid: 0,
    customerId: { name: "", id: "" },
    customer: { name: "", phone: "" },
  };
  const [formData, setFormData] = useState(intialState);

  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFormData = () => setFormData(intialState);
  const { isLoading, data } = useQuery("customer-list", () =>
    axios.get(baseUrl + "/customers")
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
      renderCell: ({ row }) => row.id,
    },

    {
      field: "customer.name",
      headerName: "Customer Name",
      width: 210,
      renderCell: ({ row }) => <span>{row.customer?.name}</span>,
    },
    {
      field: "customer.phone",
      headerName: "Customer Phone",
      width: 210,
      renderCell: ({ row }) => <span>{row.customer?.name}</span>,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 210,
      renderCell: ({ row }) => currencyHandler(row.amount),
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 110,
      renderCell: ({ row }) => currencyHandler(row.paid),
    },
    {
      field: "unpaid",
      headerName: "Unpaid",
      width: 110,
      renderCell: ({ row }) => currencyHandler(Math.abs(row.paid - row.amount)),
    },
  ];
  return (
    <CustomTableLayout
      url="udharis"
      columns={columns}
      formProps={{
        formData: { ...formData, customerId: formData.customerId?.id },
        resetFormData,
        setFormData,
        formDataHandler,
      }}
    >
      {data?.data?.data !== null && (
        <Autocomplete
          required
          disablePortal
          id="combo-box-demo"
          options={data?.data?.data.map((c) => ({ ...c, label: c.name })) || []}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Customer" />}
          name="customerId"
          value={formData.customerId?.name || formData?.customer?.name}
          label="Customer"
          onChange={(e, data) => {
            formDataHandler({ target: { name: "customerId", value: data } });
          }}
          noOptionsText={
            <span>
              {" "}
              Oh! New Customer?, go to <b>Customers</b> and add it!
            </span>
          }
          clearOnBlur={false}
          loading={isLoading}
        />
      )}
      {console.log({ formData })}
      <TextField
        required
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={formDataHandler}
      />
      <TextField
        label="Paid"
        type="number"
        name="paid"
        value={formData.paid}
        onChange={formDataHandler}
      />{" "}
    </CustomTableLayout>
  );
};

export default Udharis;
