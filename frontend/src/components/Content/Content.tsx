"use client";
import { Box, useTheme } from "@mui/material";

const Content = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  console.log("theme", theme);

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100%",
        padding: "16px",
      }}
      bgcolor="background.default"
      color="common.white"
    >
      {children}
    </Box>
  );
};

export { Content };
