"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Assignment, Edit, Login, Menu, Close } from "@mui/icons-material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    {
      text: "Ver actividades",
      href: "/",
      icon: <Assignment />,
    },
    {
      text: "Registrar actividad",
      href: "/registro",
      icon: <Edit />,
    },
    {
      text: "Iniciar sesión",
      href: "/login",
      icon: <Login />,
    },
  ];

  const list = () => (
    <Box
      sx={{ width: { xs: "100vw", sm: 300 } }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              p: 0,
            }}
          >
            <ListItemButton
              component={NextLink}
              href={item.href}
            >
              <ListItemText primary={item.text} />
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h5">Menú</Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={toggleDrawer(false)}
            sx={{ mr: 3, ml: "auto" }}
          >
            <Close />
          </IconButton>
        </Box>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
