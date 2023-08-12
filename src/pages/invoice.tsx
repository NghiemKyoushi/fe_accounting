import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import InvoiceCreateComponent from "@/components/invoiceComponent/InvoiceCreateComponent";
import { Box, Paper } from "@mui/material";
const initialFormData = {
  customerName: "",
  customerId: "",
  percentageFee: 0,
  shipFee: 0,
  typeOfCard:'',
  typeOfCardId:'',
  invoices: [
    {
      id: 1,
      pos: "",
      posId: "",
      money: null,
      typeOfCard: 1,
      fee: null,
      feeafterpay: null,
      billcode: 1,
    },
    {
      id: 2,
      pos: "",
      posId: "",
      money: null,
      typeOfCard: 1,
      fee: null,
      feeafterpay: null,
      billcode: 1,
    },
    {
      id: 3,
      pos: "",
      posId: "",
      money: null,
      typeOfCard: 1,
      fee: null,
      feeafterpay: null,
      billcode: 1,
    },
  ],
};

export default function InvoicePage() {
  const [formData, setFormData] = useState(initialFormData);
  return (
    <>
      <main>
        <DashboardLayout>
          <Box>
            <Paper elevation={20}>
              <Formik initialValues={formData} enableReinitialize>
                <Form>
                  <FieldArray name="invoices">
                    {(arrayHelpers: any) => (
                      <InvoiceCreateComponent
                        name="invoices"
                        handleAdd={arrayHelpers.push}
                        handleRemove={arrayHelpers.remove}
                      />
                    )}
                  </FieldArray>
                </Form>
              </Formik>
            </Paper>
          </Box>

          {/* </div> */}
          {/* <TableComponent data ={dataFake} editTable={false}/> */}
        </DashboardLayout>
      </main>
    </>
  );
}
