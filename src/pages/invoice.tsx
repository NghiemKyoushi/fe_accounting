import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import TableComponent from "@/components/TableComponent";
import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import InvoiceCreateComponent  from "@/components/invoiceComponent/InvoiceCreateComponent";
import { fetchDataTest } from "@/service/createInvoice";
const initialFormData = {
  customerName: "",
  shipFee: 0,
  invoices: [
    {
      id: 1,
      pos: 1,
      money: 0,
      typeOfCard: "",
      fee: 0,
      feeafterpay: 0,
      billcode: 1,
    },
    {
      id: 2,
      pos: 1,
      money: 0,
      typeOfCard: "",
      fee: 0,
      feeafterpay: 0,
      billcode: 1,
    },
    {
      id: 3,
      pos: 1,
      money: 0,
      typeOfCard: "",
      fee: 0,
      feeafterpay: 0,
      billcode: 1,
    },
    // {
    //   id: 4,
    //   pos: 1,
    //   money: 0,
    //   typeOfCard: "",
    //   fee: 0,
    //   feeafterpay: 0,
    //   billcode: 1,
    // },
    // {
    //   id: 1000,
    //   pos: 1,
    //   money: 0,
    //   typeOfCard: "",
    //   fee: 0,
    //   feeafterpay: 0,
    //   billcode: 1,
    // },
    // {
    //   id: 3,
    //   pos: 1,
    //   money: 0,
    //   typeOfCard: "",
    //   fee: 0,
    //   feeafterpay: 0,
    //   billcode: 1,
    // },
    // {
    //   id: 4,
    //   pos: 1,
    //   money: 0,
    //   typeOfCard: "",
    //   fee: 0,
    //   feeafterpay: 0,
    //   billcode: 1,
    // },
  ],
};

export default function InvoicePage() {
  const [formData, setFormData] = useState(initialFormData);
  // console.log("first", fetchDataTest());
  useEffect(() => {
    fetchDataTest();
  }, []);
  return (
    <>
      <main>
      <DashboardLayout>
        <div className="app">
          <Formik initialValues={formData} enableReinitialize>
            <Form >
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
        </div>
        {/* <TableComponent data ={dataFake} editTable={false}/> */}
      </DashboardLayout>
      </main>
      
    </>
  );
}
