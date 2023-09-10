import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import CustomizedDialogs from "@/components/DialogComponent";
import AccountingBookComponent from "@/components/Page/AccountingBookComponent/AccountingBookComponent";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "@mui/material";
const initialData={

}
export default function AccountingBookPage() {
  const [formData, setFormData] = useState(initialData);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (item: any) => {
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };
  return (
    <div>
      <DashboardLayout>
        <h3 style={{ textAlign: "center" }}>SỔ THU CHI: TÂY SƠN</h3>
          <AccountingBookComponent/>
        {/* <CustomizedDialogs
          size={"lg"}
          open={open}
          title={"Thông Tin Hóa Đơn"}
          handleClickClose={handleClickClose}
        ></CustomizedDialogs> */}
      </DashboardLayout>
    </div>
  );
}
