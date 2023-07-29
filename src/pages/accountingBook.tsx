import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import CustomizedDialogs from "@/components/DialogComponent";
import AccountingBookComponent from "@/components/AccountingBookComponent/AccountingBookComponent";
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
        <h2 style={{ textAlign: "center" }}>SỔ THU CHI: TÂY SƠN</h2>
        <Formik initialValues={formData} enableReinitialize>
          <Form>
          <AccountingBookComponent/>
            {/* <FieldArray name="invoices"> */}
              {/* {(arrayHelpers: any) => <AccountingBook />} */}
            {/* </FieldArray> */}
          </Form>
        </Formik>
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
