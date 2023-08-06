import React, { useCallback, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import TableComponent from "@/components/TableComponent";
import { Button } from "@mui/material";
import CustomizedDialogs from "@/components/DialogComponent";
import { Formik, Form, FieldArray } from "formik";
import { useQuery } from "react-query";
import InvoiceInfoComponent from "@/components/InvoiceInfoComponent/InvoiceInfoComponent";
import { fetchInvoiceInfo } from "@/service/createInvoice";
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
const enumSorter = {
  EMPLOYEE: "EMPLOYEE",
  CREATION_DATE: "CREATION_DATE",
  POS: "POS",
  CUSTOMER_CARD: "CUSTOMER_CARD",
};
const initialInvoiceSearch = {
  employeeId: '',
  customerCardId: '',
  posId: '',
  // startDate: '',
  // endDate: '',
  page: 0,
  pageSize: 10,
  sorter: enumSorter.EMPLOYEE,
  sortDirection: "ASC",
};
export default function InvoiceManagementPage() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [invoiceList, setInvoiceList] = useState([]);
  const getInvoice = useQuery(
    {
      queryKey: ["invoiceInfo", initialInvoiceSearch],
      queryFn: () => fetchInvoiceInfo(initialInvoiceSearch),
      onSuccess: (data) => {
        // console.log("data", data.data)
        const formatData = data.data.content.map((item: any ) => {
          let countInvoice = 0; 
          const sum = item.bills.map( (invoice: any) => {
              countInvoice = (+invoice.moneyAmount - +invoice.fee) + countInvoice;
           })
           return {
            createdDate: item.createdDate,
            receiptCode: item.receiptCode,
            sumInvoice: countInvoice
           }
        })
        setInvoiceList(formatData);
      }
    }
  );

  const handleClickOpen = (item: any) => {
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };

  const formatMoney = (value: number) => {
    const VND = new Intl.NumberFormat("vi-VN");
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
        accessor: "createdDate",
      },
      {
        Header: "Mã Hóa Đơn",
        accessor: "receiptCode",
      },
      {
        Header: "Số Tiền Giao Dịch",
        accessor: "sumInvoice",
        Cell: ({ row: { values } }) => {
          return <>{formatMoney(values.sumInvoice)}</>;
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
              sx={{ fontSize: 12 }}
            >
              Xem
            </Button>
            <Button
              sx={{ marginLeft: 1, fontSize: 12 }}
              size="small"
              variant="outlined"
              color="success"
            >
              Xác Nhận
            </Button>
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
  return (
    <>
      <DashboardLayout>
        <div>
          <h2 style={{ textAlign: "center" }}>QUẢN LÝ HÓA ĐƠN: TÊN NV</h2>
          <TableComponent data={invoiceList} columns={columns} pagination={true} />
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
