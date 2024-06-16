"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RedeemIcon from "@mui/icons-material/Redeem";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", icon: <HomeIcon />, path: "/jobs/home" },
  { name: "Profile", icon: <PersonIcon />, path: "/jobs/profile" },
  { name: "Jobs", icon: <WorkIcon />, path: "/jobs" },
  { name: "Applied", icon: <CheckCircleIcon />, path: "/jobs/applications" },
  { name: "Refer a friend", icon: <RedeemIcon />, path: "/jobs/refer" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 200, // Adjust width to fit icons and text
        bgcolor: "#e3f2fd",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: 4, // Rounded corners
        boxShadow: 1,
        pt: 8, // Adjust padding for spacing from top
      }}
    >
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                minHeight: 48, // Ensuring clickable area
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "primary.dark",
                },
                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
            >
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
