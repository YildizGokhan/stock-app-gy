import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useStockCalls from '../service/useStockCalls'
import { useSelector } from 'react-redux'
import FirmCard from '../components/FirmCard'
import NewFirmModal from '../components/NewFirmModal'

const Firms = () => {
  const { getStocks } = useStockCalls()
  const { firms } = useSelector(state => state.stock)

  useEffect(() => {
    getStocks("firms")
    getStocks("sales")
  }, [])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant='h4' color={"error"} mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>
      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {firms?.map((firm) => (
          <Grid item key={firm._id}>
            <FirmCard firm={firm} />
          </Grid>
        ))}
      </Grid>
      <NewFirmModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  )
}

export default Firms