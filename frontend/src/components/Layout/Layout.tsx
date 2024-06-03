"use client";
import { Sidebar } from "@/components/Sidebar";
import { Content } from "@/components/Content";
import { ILayout } from "./Layout.types";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const Layout = ({ children, ...bodyProps }: ILayout) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box component="div" display="flex" flexDirection="row" {...bodyProps}>
        <ToastContainer />
        <Sidebar />
        <Content>{children}</Content>
      </Box>
    </QueryClientProvider>
  );
};

export { Layout };
