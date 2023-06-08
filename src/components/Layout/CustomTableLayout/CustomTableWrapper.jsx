import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
import useCustomTable from "../../../hooks/useCustomTable";
import CustomTable from "../../CustomTable";

const CustomTableWrapper = ({
  setDefaultData,
  url,
  columns: _columns = [],
  onPostApi
}) => {
  const { deleteMutate } = useCustomTable({ url,onPostApi });
  const columns = useMemo(
    () => [
      ..._columns,
      {
        field: "actions",
        headerName: "Actions",
        width: 110,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={2}>
            <Typography
              color="primary.main"
              sx={{ cursor: "pointer" }}
              onClick={() => setDefaultData(row)}
            >
              Edit
            </Typography>
            <Typography
              color="error.main"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                deleteMutate(row.id, {
                  onSuccess: toast.success("Deleted Successfully"),
                })
              }
            >
              Delete
            </Typography>
          </Stack>
        ),
      },
    ],
    [_columns]
  );
  return <CustomTable url={url} columns={columns} />;
};

export default CustomTableWrapper;
