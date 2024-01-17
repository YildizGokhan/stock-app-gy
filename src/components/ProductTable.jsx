import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useStockCalls from "../service/useStockCalls";


export default function ProductTable() {
  const { products } = useSelector((state) => state.stock)
  const { deleteStock } = useStockCalls()

  const getRowId = (row) => row._id
  console.log(products);


  const columns = [
    {
      field: "_id",
      headerName: "#",
      flex: 1.4,
      headerAlign: "center",
      sortable: false,
      align: "center",
      valueGetter: (params) => params.value.slice(-6),
    },
    {
      field: "categoryId",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        console.log(params);
        return params.row?.categoryId?.name
      },
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.row?.brandId?.name,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => deleteStock("products", params.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ]

  const rowStyle = (params) => ({
    fontWeight: params.row.quantity < 10 ? "bold" : "light",
    backgroundColor: params.row.quantity < 10 ? "#ffcccc" : "inherit",
  });

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.dark',
          },
        }}
        autoHeight
        rowStyle={rowStyle}
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  )
}
