"use client";
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
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
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { toast } from 'react-hot-toast';
// Enlaces externos (placeholder) para Más Vendidos
// const OFERTAS_URL = 'https://plataforma-ofertas.ejemplo.com'; // TODO: Reemplazar cuando exista la plataforma real
const MAS_VENDIDOS_URL = 'https://plataforma-mas-vendidos.ejemplo.com'; // TODO: Reemplazar cuando exista la plataforma real



function ResponsiveAppBar() {

    const [listaCategorias, setListaCategorias] = React.useState([]);
    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    async function listarCategorias() {
        try {
            const res = await fetch(`${API}/categorias/seleccionarCategoria`,{
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            });

            if(!res.ok) {
                toast.error("No fue posible cargar las categorías. Consulte a Soporte Informático de NativeCode.cl");
                return;
            }else {
                const dataCategorias = await res.json();
                setListaCategorias(dataCategorias);
            }
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCategorias();
    },[])

    // const CATEGORIES = [{ label: 'Sin Categorioas', href: '/' },];

    const scrollToFooter = (e) => {
        if(e){
            e.preventDefault();
            const footerElement = document.getElementById("footer")
            if (footerElement){
                footerElement.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }
    }



    const [anchorElCategorias, setAnchorElCategorias] = React.useState(null);
    const [openCategoriasMobile, setOpenCategoriasMobile] = React.useState(false);

     const [mobileOpen, setMobileOpen] = React.useState(false);
     const toggleMobileDrawer = () => setMobileOpen((prev) => !prev);

    const handleOpenCategorias = (event) => {
         setAnchorElCategorias(event.currentTarget);
     };
     const handleCloseCategorias = () => {
         setAnchorElCategorias(null);
     };
     const toggleCategoriasMobile = () => setOpenCategoriasMobile((prev) => !prev);


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
                     <Box
                         component={Link}
                         href="/"
                         sx={{
                             mr: 2,
                             display: { xs: 'none', md: 'flex' },
                             alignItems: 'center',
                             textDecoration: 'none',
                             '&:hover': { textDecoration: 'none' },
                         }}
                         aria-label="Inicio Runa Joyas"
                     >
                         <Box sx={{ height: 40 }}>
                             <Image
                                 src="/runaJoyas.png"
                                 alt="Runa Joyas"
                                 width={160}
                                 height={60}
                                 priority
                                 style={{ height: '100%', width: 'auto' }}
                             />
                         </Box>
                     </Box>

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
                         <Box sx={{ width: 280 }} role="presentation">
                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                                 <Box sx={{ height: 28 }}>
                                     <Image
                                         src="/runaJoyas.png"
                                         alt="Runa Joyas"
                                         width={280}
                                         height={70}
                                         style={{ height: '100%', width: 'auto' }}
                                     />
                                 </Box>
                                 <IconButton aria-label="Cerrar menú" onClick={toggleMobileDrawer}>
                                     <CloseIcon />
                                 </IconButton>
                             </Box>
                             <Divider />
                             <List>
                                 {/* Categorías (colapsable en móvil) */}
                                 <ListItem disablePadding>
                                     <ListItemButton onClick={(e) => { e.stopPropagation(); toggleCategoriasMobile(); }} aria-label="Abrir categorías">
                                         <ListItemText primary="Categorías" />
                                         {openCategoriasMobile ? <ExpandLess /> : <ExpandMore />}
                                     </ListItemButton>
                                 </ListItem>
                                 <Collapse in={openCategoriasMobile} timeout="auto" unmountOnExit>
                                     <List component="div" disablePadding>
                                         {listaCategorias.map((cat) => (
                                             <ListItem key={cat.id_categoriaProducto} disablePadding>
                                                 <ListItemButton onClick={(e) => {
                                                     e.stopPropagation();
                                                     setMobileOpen(false);
                                                     router.push(`/catalogo?categoria=${cat.id_categoriaProducto}`)
                                                 }}>
                                                     <ListItemText primary={cat.descripcionCategoria} />
                                                 </ListItemButton>
                                             </ListItem>
                                         ))}
                                     </List>
                                 </Collapse>

                                 {/* Ofertas (link a otra plataforma - placeholder) */}
                                 <ListItem disablePadding>
                                     <ListItemButton   onClick={() => {router.push(`/catalogo?ofertas=true`); setMobileOpen(false);}}>
                                         <ListItemText primary="Ofertas" />
                                     </ListItemButton>
                                 </ListItem>

                                 {/* Más vendidos (link a otra plataforma - placeholder) */}
                                 <ListItem disablePadding>
                                     <ListItemButton  onClick={() => { router.push(`/catalogo?recientes=true`) ; setMobileOpen(false);}}>
                                         <ListItemText primary="Lo mas Nuevo" />
                                     </ListItemButton>
                                 </ListItem>

                                 {/* Contacto (lleva a /Footer) */}
                                 <ListItem disablePadding>
                                     <ListItemButton onClick={(e) => { scrollToFooter(e); toggleMobileDrawer(); }}>
                                         <ListItemText primary="Contacto" />
                                     </ListItemButton>
                                 </ListItem>
                             </List>
                         </Box>
                     </Drawer>
                     <Box
                         component={Link}
                         href="/"
                         sx={{
                             mr: 2,
                             display: { xs: 'flex', md: 'none' },
                             flexGrow: 1,
                             alignItems: 'center',
                             textDecoration: 'none',
                             '&:hover': { textDecoration: 'none' },
                         }}
                         aria-label="Inicio Runa Joyas"
                     >
                         <Box sx={{ height: 28 }}>
                             <Image
                                 src="/runaJoyas.png"
                                 alt="Runa Joyas"
                                 width={120}
                                 height={28}
                                 priority
                                 style={{ height: '100%', width: 'auto' }}
                             />
                         </Box>
                     </Box>
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
                             {listaCategorias.map((cat) => (
                                 <MenuItem key={cat.id_categoriaProducto} onClick={()=>{
                                     handleCloseCategorias();
                                     router.push(`/catalogo?categoria=${cat.id_categoriaProducto}`)
                                 }}>
                                     {cat.descripcionCategoria}
                                 </MenuItem>
                             ))}
                         </Menu>

                         {/* Ofertas (enlace externo - placeholder) */}
                         <Button
                             onClick={() => { router.push(`/catalogo?ofertas=true`)}}
                             sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                         >
                             Ofertas
                         </Button>

                         {/* Más recientes (enlace externo - placeholder) */}
                         <Button
                             onClick={() => { router.push(`/catalogo?recientes=true`)}}
                             sx={{ my: 1, px: 1.5, color: '#000', fontWeight: 600, textTransform: 'none', letterSpacing: '.02em', '&:hover': { color: '#b08968', backgroundColor: 'transparent' } }}
                         >
                            Recientes
                         </Button>

                         {/* Contacto (lleva a /Footer) */}
                         <Button
                             onClick={scrollToFooter}
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
