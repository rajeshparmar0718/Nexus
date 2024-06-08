'use client';

import { List, ListItem, ListItemButton, ListItemText, Box, Typography, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import ExploreIcon from '@mui/icons-material/Explore';
import RedeemIcon from '@mui/icons-material/Redeem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', icon: <HomeIcon />, path: '/jobs/home' },
  { name: 'Profile', icon: <PersonIcon />, path: '/jobs/profile' },
  { name: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { name: 'Applied', icon: <CheckCircleIcon />, path: '/jobs/applications' },
  { name: 'Refer a friend', icon: <RedeemIcon />, path: '/jobs/refer' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box sx={{ width: 240, bgcolor: '#e3f2fd', height: '100vh', position: 'fixed', top: 0, left: 0, pt: 8 }}>
    
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} href={item.path} selected={pathname === item.path} sx={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
              <ListItemText primary={item.name} sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          {/* Add UserButton or Sign Up button here based on authentication status */}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
