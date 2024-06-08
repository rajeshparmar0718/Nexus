"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavItemClick = (path: string) => {
    if (!isSignedIn) {
      localStorage.setItem('redirectAfterSignUp', path); // Store the intended destination
      router.push('/auth/signup'); // Redirect to the signup page
    } else {
      router.push(path); // Direct navigation
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/">Nexus</Link>
      </Typography>
      <Divider />
      <List>
        <ListItem key="ForEmployer" disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavItemClick('/employer')}>
            <ListItemText primary="ForEmployer" />
          </ListItemButton>
        </ListItem>
        <ListItem key="ForJobSeeker" disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavItemClick('/jobs/home')}>
            <ListItemText primary="ForJobSeeker" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          {isSignedIn ? (
            <UserButton showName />
          ) : (
            <Button color="inherit" href="/auth/signup">Sign Up</Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NEXUS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} onClick={() => handleNavItemClick('/employer')}>
              ForEmployer
            </Button>
            <Button sx={{ color: '#fff' }} onClick={() => handleNavItemClick('/jobs/home')}>
              ForJobSeeker
            </Button>
            {isSignedIn ? (
              <UserButton showName />
            ) : (
              <Button color="inherit" href="/auth/signup">Sign Up</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
