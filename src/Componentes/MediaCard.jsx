import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({titulo, valor, descripcion, imagenProducto, boton1 , boton2}) {
 
  return (
    <Card
      sx={{
        maxWidth: 280,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 3,
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
      }}
    >
      <CardMedia
        sx={{ height: { xs: 180, sm: 220, md: 240 }, objectFit: 'cover' }}
        image={imagenProducto}
        title={titulo}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          title={titulo}
        >
          {titulo}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
         <label>Precio: </label> {valor}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          title={descripcion}
        >
          {descripcion}
        </Typography>
      </CardContent>
      {(boton1 || boton2) && (
        <CardActions sx={{ mt: 'auto', px: 2, pb: 2, justifyContent: 'space-between' }}>
          {boton1 && (
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {boton1}
            </Button>
          )}
          {boton2 && (
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {boton2}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}