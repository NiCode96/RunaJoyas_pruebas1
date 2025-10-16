import * as React from 'react';
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
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const pages = ['Categorías', 'Ofertas', 'Más vendidos'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleMobileDrawer = () => setMobileOpen((prev) => !prev);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                                {pages.map((page) => (
                                    <ListItem key={page} disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={page} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center', gap: 2 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {/* Acciones a la derecha: carrito de compras */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0, md: 'auto' } }}>
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
