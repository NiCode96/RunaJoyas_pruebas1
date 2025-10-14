'use client'

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Navbar minimalista y profesional para el Dashboard
// - Sin íconos
// - Botones claros para navegación principal
// - Menú compacto en mobile (usa un botón de texto "Menú")

export default function NavbarDashboard() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Branding / Título */}
          <Typography
            variant="h6"
            component={Link}
            href="/dashboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
            sx={{ fontWeight: 700, letterSpacing: '.08rem' }}
          >
            Administración
          </Typography>

          {/* Empuja el bloque de navegación a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navegación Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {/* Ruta a PEDIDOS */}
            {/* Reemplaza "/dashboard/pedidos" por la ruta real si es distinta */}
            <Button
              component={Link}
              href="/dashboard/categoriasProductos" // <- AQUÍ VA LA RUTA DE CATEGORIAS
              color="inherit"
            >
              Categorias
            </Button>

              <Button
                  component={Link}
                  href="/dashboard/publicaciones" // <- AQUÍ VA LA RUTA DE PUBLICACIONES
                  color="inherit"
              >
                  Publicaciones
              </Button>

            {/* Ruta a PRODUCTOS */}
            {/* Reemplaza "/dashboard/productos" por la ruta real si es distinta */}
            <Button
              component={Link}
              href="/dashboard/ingresoProductos" // <- AQUÍ VA LA RUTA DE PRODUCTOS
              color="inherit"
            >
              Productos
            </Button>

            {/* Ruta a EDICIÓN WEB */}
            {/* Reemplaza "/dashboard/edicion" por la ruta real si es distinta */}
            <Button
              component={Link}
              href="/dashboard/edicionPagina" // <- AQUÍ VA LA RUTA DE EDICIÓN WEB
              color="inherit"
            >
              Edición Web
            </Button>
          </Box>

          {/* Navegación Mobile (xs-sm) con botón de texto */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              aria-controls={Boolean(anchorElNav) ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElNav) ? 'true' : undefined}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              Menú
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/pedidos" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  {/* <- AQUÍ VA LA RUTA DE PEDIDOS */}
                  Pedidos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/productos" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  {/* <- AQUÍ VA LA RUTA DE PRODUCTOS */}
                  Productos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/edicion" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  {/* <- AQUÍ VA LA RUTA DE EDICIÓN WEB */}
                  Edición Web
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
