'use client';

import { List, ListItem, ListItemButton, ListItemText, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/employer' },
  { name: 'Create Organization', icon: <BusinessIcon />, path: '/employer/create-organization' },
  { name: 'Create Job Posting', icon: <PostAddIcon />, path: '/employer/create-job' },
];

const EmployerSidebar = () => {
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

export default EmployerSidebar;
