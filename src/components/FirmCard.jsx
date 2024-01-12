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

export default function FirmCard({ firm }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { address, image, name, phone, _id } = firm
  const { deleteStock } = useStockCalls()

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center", p: 2, width: "300px", height: "400px", justifyContent: "space-between" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {phone}
        </Typography>
      </CardContent>
      <CardActions >
        <DeleteOutlineIcon sx={btnStyle} onClick={() => deleteStock("firms", _id)} />
        <EditIcon sx={btnStyle} onClick={handleOpen} />

      </CardActions>
      <NewFirmModal handleOpen={handleOpen} handleClose={handleClose} open={open} firm={firm} />
    </Card>
  );
}