import React, { useState } from "react";
import Input from "../InputForm";
import TableComponent from "@/components/TableComponent";
import { Field, Form, Formik, getIn, useFormikContext } from "formik";
import { Button } from "@mui/material";
import CustomizedDialogs from "../DialogComponent";
import Dropdown from "../Dropdown";
import HeaderFilter from "../HeaderFilter/HeaderFilter";
interface MyFormValues {
  firstName: string;
}
function AccountingBookComponent() {
  const { values } = useFormikContext();
  const formikSlice = getIn(values, "") || [];
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };
  // const dataFake =[
  //   {
  //     date: '28/07/2023',
      
  //   }
  // ]
  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row: { index, original } }) => {
          return <div>{Number(index) + 1}</div>;
        },
      },
      {
        Header: "Ngày Tạo",
        Footer: () => {
          return <h4>TỔNG</h4>;
        },
      },
      {
        Header: "Mã Bút Toán",
      },
      {
        Header: "Định Khoản",
      },
      {
        Header: "Đã Thu",
        Footer: () => {
          return (
            <Input
              isDisable={false}
              type={"number"}
              name={`${name}.money`}
              label={""}
              search={false}
              results={[]}
              labelWidth={""}
            />
          );
        },
      },
      {
        Header: "Đã Chi",
        Footer: () => {
          return (
            <Input
              isDisable={false}
              type={"number"}
              name={`${name}.money`}
              label={""}
              search={false}
              results={[]}
              labelWidth={""}
            />
          );
        },
      },
      {
        Header: "Công Nợ ",
        Footer: () => {
          return (
            <Input
              isDisable={false}
              type={"number"}
              name={`${name}.money`}
              label={""}
              search={false}
              results={[]}
              labelWidth={""}
            />
          );
        },
      },
      {
        Header: "Thu Nợ ",
        Footer: () => {
          return (
            <Input
              isDisable={false}
              type={"number"}
              name={`${name}.money`}
              label={""}
              search={false}
              results={[]}
              labelWidth={""}
            />
          );
        },
      },
    ],
    []
  );
  const initialValues: MyFormValues = { firstName: "" };

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Button
          onClick={() => handleClickOpen()}
          variant="contained"
          size="medium"
        >
          Thêm
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 5,
        }}
      >
        <Input
          isDisable={false}
          type={"number"}
          name={`${name}.money`}
          label={"Số Dư Hiện Có"}
          search={false}
          results={[]}
          labelWidth={""}
        />
      </div>
      <div>
        <HeaderFilter/>
      </div>
      <TableComponent
        data={[]}
        pagination={true}
        columns={columns}
        rowKey="id"
      />
      <CustomizedDialogs
        size={"md"}
        open={open}
        title={"FORM NHẬP SỔ THU CHI: TÂY SƠN"}
        handleClickClose={handleClickClose}
      >
        <div className="app">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            <Form>
              <Dropdown
                nameForm={`pos`}
                label="Phân Loại"
                value={1}
                items={[
                  { key: "VP01", value: 1 },
                  { key: "ABB-1-24", value: 2 },
                  { key: "EXIM01-35", value: 3 },
                ]}
              />
              <Input
                isDisable={false}
                type={"number"}
                name={`${name}.money`}
                label={"Số Dư Hiện Có"}
                search={false}
                results={[]}
                labelWidth={""}
              />
              <Input
                isDisable={false}
                type={"number"}
                name={`${name}.money`}
                label={"Số Dư Hiện Có"}
                search={false}
                results={[]}
                labelWidth={""}
              />
              <Input
                isDisable={false}
                type={"number"}
                name={`${name}.money`}
                label={"Mã Bút Toán"}
                search={false}
                results={[]}
                labelWidth={""}
              />
              <Input
                isDisable={false}
                type={"number"}
                name={`${name}.money`}
                label={"Số Tiền"}
                search={false}
                results={[]}
                labelWidth={""}
              />
              <Input
                isDisable={false}
                type={"number"}
                name={`${name}.money`}
                label={"Diễn Giải"}
                search={false}
                results={[]}
                labelWidth={""}
              />{" "}
              <Button variant="contained" type="submit">
                Up Ảnh Chứng Từ
              </Button>
              <Button variant="contained" type="submit">
                Thêm
              </Button>
            </Form>
          </Formik>
        </div>
      </CustomizedDialogs>
    </>
  );
}

export default React.memo(AccountingBookComponent);
