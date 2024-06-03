"use client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { componentDrawer as Drawer } from "./Drawer";
import { NAVIGATION_MENU_OPTIONS } from "./constants";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const router = useRouter();

  const handleToggleDrawer = () => {
    setIsOpenDrawer((openState) => !openState);
  };

  const handleNavigate = (pathRoute: string) => {
    router.push(pathRoute);
  };

  return (
    <Box component="aside" sx={{ display: "flex", bgcolor: "primary.main" }}>
      <Drawer.default variant="permanent" open={isOpenDrawer}>
        <Drawer.header sx={{ backgroundColor: "primary.dark" }}>
          <IconButton onClick={handleToggleDrawer}>
            {isOpenDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Drawer.header>
        <Divider />
        <List>
          {NAVIGATION_MENU_OPTIONS.map((option, index) => (
            <ListItem
              key={option.label}
              disablePadding
              sx={{ display: "block", backgroundColor: "primary.main" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpenDrawer ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleNavigate(option.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenDrawer ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  color="text.primary"
                  sx={{ opacity: isOpenDrawer ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer.default>
    </Box>
  );
};

export { Sidebar };
