import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import useStockCalls from "../service/useStockCalls";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default function MediaCard() {
  const { firms } = useSelector((state) => state.stock);
  const { getFirms } = useStockCalls();
  
  useEffect(() => {
    getFirms();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {firms.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Stack sx={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', spacing: 2 }}>
            <Card sx={{ maxWidth: 500, height: 450 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ height: 50 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ height: 100 }}>
                  {item.address}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={item.image}
                title={item.name}
                sx={{ objectFit: 'contain', minHeight: 140, height: 140, width: '100%' }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.phone}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
