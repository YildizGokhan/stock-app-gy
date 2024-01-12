import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useStockCalls from '../service/useStockCalls'
import { useSelector } from 'react-redux'
import NewFirmModal from '../components/NewFirmModal'
import BrandCard from '../components/BrandCard'
import BrandModal from '../components/BrandModal'

const Brands = () => {
  const { getStocks } = useStockCalls()
  const { brands } = useSelector(state => state.stock)

  useEffect(() => {
    getStocks("brands")
  }, [])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant='h4' color={"error"} mb={3}>
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Brands
      </Button>
      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {brands?.map((brand) => (
          <Grid item key={brand._id}>
            <BrandCard brand={brand} />
          </Grid>
        ))}
      </Grid>
      <BrandModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  )
}

export default Brands