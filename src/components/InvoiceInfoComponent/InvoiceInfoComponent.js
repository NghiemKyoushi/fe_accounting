import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import TableComponent from "@/components/TableComponent";
import Input from "../InputForm";
import Dropdown from "../Dropdown";
// import styles from "./Invoices.module.css";
import { Button } from "@mui/material";
const EMPTY_ARR = [];

function InvoiceInfoComponent({ name }) {
  const { values } = useFormikContext();
  const [isEdit, setIsEdit] = useState(true);
  console.log("values", values);
  const handleEdit = () => {
    setIsEdit((edit) => !edit);
  };
  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;

  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row: { index, original } }) => {
          return <div>{Number(index) + 1}</div>;
        },
      },

      {
        Header: "MÃ POS",
        accessor: "pos",
        Cell: ({ row: { index, values } }) => {
          if (isEdit) {
            return (
              <React.Fragment>
                <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].pos`} />
              </React.Fragment>
            );
          }
          return (
            <Dropdown
              name={`${name}[${index}].pos`}
              value={+values.pos}
              label=""
              items={[
                { key: "VP01", value: 1 },
                { key: "ABB-1-24", value: 2 },
                { key: "EXIM01-35", value: 3 },
              ]}
            />
          );
        },
      },
      {
        Header: "SỐ TIỀN",
        accessor: "money",
        Cell: ({ row: { index } }) => {
          return <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].money`} />;
        },
      },
      {
        Header: "LOẠI THẺ",
        accessor: "typeOfCard",
        Cell: ({ row: { index, original } }) => {
          return <Input isDisable={isEdit} name={`${name}[${index}].typeOfCard`} />;
        },
      },
      {
        Header: "SAU PHÍ",
        accessor: "feeAfter",
        Cell: ({ row: { index, original } }) => (
          <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].feeAfter`} />
        ),
      },
      {
        Header: "TIỀN SAU PHÍ",
        accessor: "fee",
        Cell: ({ row: { index } }) => (
          <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].fee`} />
        ),
      },
      {
        Header: "MÃ BILL",
        accessor: "billcode",
        Cell: ({ row: { index, original } }) => {
          return (
            <Dropdown
              name={`${name}[${original.id}].billcode`}
              value={1}
              label=""
              items={[
                { key: "VP01", value: 1 },
                { key: "ABB-1-24", value: 2 },
                { key: "EXIM01-35", value: 3 },
              ]}
            />
          );
        },
      },
      //   {
      //     Header: "Actions",
      //     id: "actions",
      //     Cell: ({ row: { index } }) => (
      //       <button type="button" onClick={() => onRemove(index)}>
      //         delete
      //       </button>
      //     ),
      //   },
    ],
    [name, isEdit]
  );
  return (
    <div className="field">
      {/* <h2 style={{ textAlign: "center" }}>FORM NHẬP HÓA ĐƠN</h2> */}
      <TableComponent data={formikSlice} columns={columns} rowKey="id" pagination={true} />
      <div style={{ marginTop: 5 }}>
        <div
          style={{ display: "flex", justifyContent: "center", marginLeft: 60 }}
        >
          <Input
            isDisable={true}
            labelWidth={"50%"}
            placeHoder=""
            name="3"
            label="Tiền Ship: "
            type={"text"}
          />
          <Input
            isDisable={true}
            labelWidth={"50%"}
            placeHoder=""
            name="3"
            label="%Phí: "
            type={"text"}
          />
        </div>
        <Input
          isDisable={true}
          labelWidth={"40.5%"}
          placeHoder=""
          name="3"
          label="TỔNG: "
          type={"text"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10%",
          marginTop: 5,
        }}
      >
        <Button size="medium" variant="contained" color="warning">
          Xem Ảnh Chứng từ
        </Button>
        <Button
          onClick={() => handleEdit()}
          size="medium"
          style={{ marginLeft: 5 }}
          variant="contained"
          color="success"
        >
          Sửa Hóa Đơn
        </Button>
      </div>
    </div>
  );
}

export default React.memo(InvoiceInfoComponent);
