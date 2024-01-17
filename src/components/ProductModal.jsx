import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useSelector } from "react-redux"

export default function ProductModal({ open, handleClose, info, setInfo }) {
  const { postStock } = useStockCalls()
  const { categories, brands } = useSelector(state => state.stock)

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  console.log(info)
  const handleSubmit = (e) => {
    e.preventDefault()
    postStock("products", info)
    handleClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >

            <FormControl fullWidth>
              <InputLabel id="categoryId">Category</InputLabel>
              <Select
                labelId="categoryId"
                id="categoryId"
                value={info.categoryId}
                label="Category"
                onChange={handleChange}
                name="categoryId"
              >
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                ))}
              </Select>

            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="brandId">Brands</InputLabel>
              <Select
                labelId="brandId"
                id="brandId"
                value={info.brandId}
                label="Brand"
                onChange={handleChange}
                name="brandId"
              >
                {brands.map((item, index) => (
                  <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Product Name"
                name="name"
                id="name"
                type="text"
                variant="outlined"
                value={info.name}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button type="submit" variant="contained" size="large">
              Add Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
