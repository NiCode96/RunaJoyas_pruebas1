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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');
      `}</style>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{
        bgcolor: 'transparent',
        color: '#0A2540',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundImage: 'linear-gradient(135deg, #DCEBFF 0%, #E8F0FE 40%, #F2F7FF 100%)',
        boxShadow: '0 8px 24px rgba(10, 37, 64, 0.08)',
        backdropFilter: 'saturate(1.2) blur(4px)'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Branding / Título */}
          <Typography
            variant="h6"
            component={Link}
            href="/dashboard"
            style={{ textDecoration: 'none', color: 'inherit' }}
            sx={{ fontFamily: 'Michroma, sans-serif', fontWeight: 800, letterSpacing: '.12rem', color: '#0A2540' }}
          >
         RunaJoyas
          </Typography>

          {/* Empuja el bloque de navegación a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navegación Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              component={Link}
              href="/dashboard/categoriasProductos"
              color="inherit"
              disableRipple
              sx={{ fontFamily: 'Michroma, sans-serif', textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 2.5, color: '#0A2540', border: '1px solid transparent', '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' } }}
            >
              Categorías
            </Button>

            <Button
              component={Link}
              href="/dashboard/publicaciones"
              color="inherit"
              disableRipple
              sx={{ fontFamily: 'Michroma, sans-serif', textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 2.5, color: '#0A2540', border: '1px solid transparent', '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' } }}
            >
              Publicaciones
            </Button>




              <Button
                  component={Link}
                  href="/dashboard/gestionStock"
                  color="inherit"
                  disableRipple
                  sx={{ fontFamily: 'Michroma, sans-serif', textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 2.5, color: '#0A2540', border: '1px solid transparent', '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' } }}
              >
                  Inventario
              </Button>

            <Button
              component={Link}
              href="/dashboard/ingresoProductos"
              color="inherit"
              disableRipple
              sx={{ fontFamily: 'Michroma, sans-serif', textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 2.5, color: '#0A2540', border: '1px solid transparent', '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' } }}
            >
              Productos
            </Button>

            <Button
              component={Link}
              href="/dashboard/edicionPagina"
              color="inherit"
              disableRipple
              sx={{ fontFamily: 'Michroma, sans-serif', textTransform: 'none', fontWeight: 600, borderRadius: '12px', px: 2.5, color: '#0A2540', border: '1px solid transparent', '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' } }}
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
              sx={{ fontFamily: 'Michroma, sans-serif' }}
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
                <Link href="/dashboard/categoriasProductos" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  Categorías
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/publicaciones" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  Publicaciones
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/ingresoProductos" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  Productos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href="/dashboard/edicionPagina" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  Edición Web
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
