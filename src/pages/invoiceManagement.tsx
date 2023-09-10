import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import InvoiceManagement from "@/components/Page/InvoiceInfoComponent/InvoiceManagement";

export default function InvoiceManagementPage() {
  
  return (
    <>
      <DashboardLayout>
        <InvoiceManagement/>
      </DashboardLayout>
    </>
  );
}
