import React, { useCallback, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import TableComponent from "@/components/TableComponent";
import { Button } from "@mui/material";
import CustomizedDialogs from "@/components/DialogComponent";
import { Formik, Form, FieldArray } from "formik";
import { fetchDataTest } from "@/service/createInvoice";
import InvoiceInfoComponent from "@/components/InvoiceInfoComponent/InvoiceInfoComponent";
const initialFormData = {
  customerName: "",
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
    
  ],
};
export default function InvoiceManagementPage() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (item: any) => {
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };
  const formatMoney = (value: number) => {
    const VND = new Intl.NumberFormat("vi-VN", {});
    return VND.format(value);
  };
  const role = "employee";
  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row: { index } }) => {
          return <div>{Number(index) + 1}</div>;
        },
      },
      {
        Header: "Ngày Tạo Hóa Đơn",
        accessor: "date",
      },
      {
        Header: "Mã Hóa Đơn",
        accessor: "billCode",
      },
      {
        Header: "Số Tiền Giao Dịch",
        accessor: "totalMoney",
        Cell: ({ row: { values } }) => {
          return <>{formatMoney(values.totalMoney)}</>;
        },
      },
      {
        Header: "Thao Tác",
        id: "actions",
        Cell: ({ row: { index, original } }) => (
          <div>
            <Button
              onClick={() => handleClickOpen(original)}
              size="small"
              variant="outlined"
              color="info"
            >
              Xem
            </Button>
            {/* <Button sx={{marginLeft: 1}} size="small" variant="outlined" color="warning">Sửa</Button> */}
          </div>
        ),
      },
    ],
    []
  );
  const dataFake = [
    {
      date: "25/07/2023",
      billCode: "SON270823TS-1",
      totalMoney: 50000000,
    },
    {
      date: "25/07/2023",
      billCode: "SON270823TS-1",
      totalMoney: 50000000,
    },
    {
      date: "25/07/2023",
      billCode: "SON270823TS-1",
      totalMoney: 50000000,
    },
    {
      date: "25/07/2023",
      billCode: "SON270823TS-1",
      totalMoney: 50000000,
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  // console.log("first", fetchDataTest());
  useEffect(() => {
    fetchDataTest();
  }, []);
  return (
    <>
      <DashboardLayout>
        <div>
          <h2 style={{ textAlign: "center" }}>QUẢN LÝ HÓA ĐƠN: TÊN NV</h2>
          <TableComponent data={dataFake} columns={columns} pagination={true} />
        </div>
        <CustomizedDialogs
          size={"lg"}
          open={open}
          title={"Thông Tin Hóa Đơn"}
          handleClickClose={handleClickClose}
        >
          <div className="app">
            <Formik initialValues={formData} enableReinitialize>
              <Form>
                <FieldArray name="invoices">
                  {(arrayHelpers: any) => (
                    <InvoiceInfoComponent name="invoices" />
                  )}
                </FieldArray>
              </Form>
            </Formik>
          </div>
        </CustomizedDialogs>
      </DashboardLayout>
    </>
  );
}
