import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import useStockCalls from "../service/useStockCalls";

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

export default function EditNewModal({ handleClose, open, firm }) {
    const { name, phone, address, image, _id } = firm
    const { updateStock } = useStockCalls()
    const [data, setData] = React.useState({
        _id,
        name,
        phone,
        address,
        image,
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStock("firms", _id, data)
        handleClose();
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box component={"form"} sx={style} onSubmit={handleSubmit}>
                        <FormControl sx={{ width: "100%" }}>
                            <TextField
                                label="Firma Adı"
                                name="name"
                                id="name"
                                type="text"
                                variant="outlined"
                                value={data.name}
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
                                value={data.phone}
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
                                value={data.address}
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
                                value={data.image}
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