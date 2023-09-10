import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import React from "react";
import InvoiceCreateComponent from "@/components/Page/InvoiceComponent/InvoiceCreateComponent";
import { Box, Paper } from "@mui/material";
export default function InvoicePage() {
  return (
    <>
      <main>
        <DashboardLayout>
          <Box>
            <Paper elevation={20}>
              <InvoiceCreateComponent />
            </Paper>
          </Box>
        </DashboardLayout>
      </main>
    </>
  );
}
