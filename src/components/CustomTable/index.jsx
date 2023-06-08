import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useCustomTable from "../../hooks/useCustomTable";
import { useDemoData } from '@mui/x-data-grid-generator';
import LinearProgress from '@mui/material/LinearProgress';
export default function CustomTable({ columns = null, url, maxWidth }) {
  const { tableData } = useCustomTable({ url });
  const { rows, length, setLength,isLoading, page, setPage } = tableData;
// console.log({rows})

  return (
    <div style={{ height: "70vh", width: maxWidth || "100%" }}>
      <DataGrid
        components={{ Toolbar: GridToolbar }}
        rows={rows || []}
        columns={columns}
        rowCount={length || 0}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        pagination  
        page={page}
        pageSize={10}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onPageSizeChange={(newPageSize) => setLength(newPageSize)}


        // new
        
        // pageSize={pageSize}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // rowsPerPageOptions={[5, 10, 20]}
        // pagination
        // {...data}
      />
    </div>
  );
}
