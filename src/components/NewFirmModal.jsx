import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import useStockCalls from "../service/useStockCalls";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewFirmModal({ handleClose, open, firm }) {
  const { addStock, updateStock } = useStockCalls()

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const [data1, setData1] = useState({
    name: firm ? firm.name : "",
    phone: firm ? firm.phone : "",
    address: firm ? firm.address : "",
    image: firm ? firm.image : "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setData1({ ...data1, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firm) {
      updateStock("firms", firm._id, data1);
    } else {
      addStock("firms", data);
    }
    handleClose();
    setData({
      name: "",
      phone: "",
      address: "",
      image: "",
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slot={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box component={"form"} sx={style} onSubmit={handleSubmit} slot={{ backdrop: Backdrop }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                label="Firma Adı"
                name="name"
                id="name"
                type="text"
                variant="outlined"
                value={open ? (firm ? data1.name : data.name) : ""}
                sx={{ marginTop: "1rem" }}
                onChange={handleChange}
                required
              />
              <TextField
                label="Telefon"
                name="phone"
                id="phone"
                type="text"
                variant="outlined"
                value={open ? (firm ? data1.phone : data.phone) : ""}
                sx={{ marginTop: "1rem" }}
                onChange={handleChange}
                required
              />
              <TextField
                label="Adres"
                name="address"
                id="address"
                type="text"
                variant="outlined"
                value={open ? (firm ? data1.address : data.address) : ""}
                sx={{ marginTop: "1rem" }}
                onChange={handleChange}
                required
              />
              <TextField
                label="Resim"
                name="image"
                id="image"
                type="text"
                variant="outlined"
                value={open ? (firm ? data1.image : data.image) : ""}
                sx={{ marginTop: "1rem" }}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" size="large" sx={{ marginTop: "1rem" }}>
                Gönder
              </Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}