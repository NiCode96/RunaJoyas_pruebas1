
"use client";
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Enlaces externos (placeholder) para Ofertas y Más Vendidos
const OFERTAS_URL = 'https://plataforma-ofertas.ejemplo.com'; // TODO: Reemplazar cuando exista la plataforma real
const MAS_VENDIDOS_URL = 'https://plataforma-mas-vendidos.ejemplo.com'; // TODO: Reemplazar cuando exista la plataforma real

const CATEGORIES = [
    { label: 'Joyas', href: '/categoria/joyas' },
    { label: 'Collares', href: '/categoria/collares' },
    { label: 'Pulseras', href: '/categoria/pulseras' },
    { label: 'Aros', href: '/categoria/aros' },
    { label: 'Accesorios', href: '/categoria/accesorios' },
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElCategorias, setAnchorElCategorias] = React.useState(null);
    const [openCategoriasMobile, setOpenCategoriasMobile] = React.useState(false);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleMobileDrawer = () => setMobileOpen((prev) => !prev);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenCategorias = (event) => {
        setAnchorElCategorias(event.currentTarget);
    };
    const handleCloseCategorias = () => {
        setAnchorElCategorias(null);
    };
    const toggleCategoriasMobile = () => setOpenCategoriasMobile((prev) => !prev);

    const scrollToFooter = (e) => {
        if (e) e.preventDefault();
        const el = document.getElementById('footer');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'rgba(255, 255, 255, 0.6)',
                backgroundImage: 'radial-gradient(1200px 200px at 10% 0%, rgba(255,255,255,0.9), rgba(255,255,255,0)), radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7), rgba(240,240,240,0.4))',
                backdropFilter: 'blur(14px) saturate(160%)',
                WebkitBackdropFilter: 'blur(14px) saturate(160%)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                color: '#000',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Dancing Script, cursive',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#000',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'none' },
                        }}
                    >
                        RunaJoyas
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleMobileDrawer}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Drawer
                        anchor="left"
                        open={mobileOpen}
                        onClose={toggleMobileDrawer}
                        sx={{ display: { xs: 'block', lg: 'none' } }}
                    >
                        <Box sx={{ width: 280 }} role="presentation" onClick={toggleMobileDrawer} onKeyDown={toggleMobileDrawer}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                                <Typography sx={{ fontFamily: 'Dancing Script, cursive', fontWeight: 600, letterSpacing: '.05rem', color: '#000' }}>
                                    RunaJoyas
                                </Typography>
                                <IconButton aria-label="Cerrar menú">
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Divider />
                            <List>
                                {/* Categorías (colapsable en móvil) */}
                                <ListItem disablePadding>
                                    <ListItemButton onClick={toggleCategoriasMobile} aria-label="Abrir categorías">
                                        <ListItemText primary="Categorías" />
                                        {openCategoriasMobile ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={openCategoriasMobile} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {CATEGORIES.map((cat) => (
                                            <ListItem key={cat.label} disablePadding>
                                                <ListItemButton component={Link} href={cat.href} sx={{ pl: 4 }}>
                                                    <ListItemText primary={cat.label} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>

                                {/* Ofertas (link a otra plataforma - placeholder) */}
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href={OFERTAS_URL} target="_blank" rel="noopener noreferrer">
                                        <ListItemText primary="Ofertas" />
                                    </ListItemButton>
                                </ListItem>

                                {/* Más vendidos (link a otra plataforma - placeholder) */}
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href={MAS_VENDIDOS_URL} target="_blank" rel="noopener noreferrer">
                                        <ListItemText primary="Más vendidos" />
                                    </ListItemButton>
                                </ListItem>

                                {/* Contacto (lleva a /Footer) */}
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} href="/#footer">
                                        <ListItemText primary="Contacto" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Dancing Script, cursive',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#000',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'none' },
                        }}
                    >
                        RunaJoyas
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
                        {/* Botón Categorías (abre menú desplegable) */}
                        <Button
                            onClick={handleOpenCategorias}
                            sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                            aria-controls={Boolean(anchorElCategorias) ? 'menu-categorias' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElCategorias) ? 'true' : undefined}
                        >
                            Categorías
                        </Button>
                        <Menu
                            id="menu-categorias"
                            anchorEl={anchorElCategorias}
                            open={Boolean(anchorElCategorias)}
                            onClose={handleCloseCategorias}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            keepMounted
                        >
                            {CATEGORIES.map((cat) => (
                                <MenuItem key={cat.label} onClick={handleCloseCategorias} component={Link} href={cat.href}>
                                    {cat.label}
                                </MenuItem>
                            ))}
                        </Menu>

                        {/* Ofertas (enlace externo - placeholder) */}
                        <Button
                            component="a"
                            href={OFERTAS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                        >
                            Ofertas
                        </Button>

                        {/* Más vendidos (enlace externo - placeholder) */}
                        <Button
                            component="a"
                            href={MAS_VENDIDOS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                        >
                            Más vendidos
                        </Button>

                        {/* Contacto (lleva a /Footer) */}
                        <Button
                            component={Link}
                            href="/Footer"
                            sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                        >
                            Contacto
                        </Button>
                    </Box>
                    {/* Acciones a la derecha: carrito de compras */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                        <Tooltip title="Carrito">
                            <IconButton size="large" color="inherit" aria-label="Carrito de compras">
                                <Badge badgeContent={0} showZero overlap="circular" color="primary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
