import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { btnStyle } from '../styles/globalStyles';
import useStockCalls from '../service/useStockCalls';
import NewFirmModal from './NewFirmModal';
import BrandModal from './BrandModal';

export default function BrandCard({ brand }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { image, name, _id } = brand
    const { deleteStock } = useStockCalls()

    return (
        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center", p: 2, width: "300px", height: "400px", justifyContent: "space-between" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                alt={name}
                height="140"
                image={image}
                sx={{ objectFit: "contain" }}
            />

            <CardActions >
                <DeleteOutlineIcon sx={btnStyle} onClick={() => deleteStock("brands", _id)} />
                <EditIcon sx={btnStyle} onClick={handleOpen} />

            </CardActions>
            <BrandModal handleOpen={handleOpen} handleClose={handleClose} open={open} brand={brand} />
        </Card>
    );
}