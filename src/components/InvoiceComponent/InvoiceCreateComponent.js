import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import TableComponent from "@/components/TableComponent";
import Input from "../InputForm";
import InputComponent from "../InputComponent";
import Dropdown from "../Dropdown";
import styles from "./Invoices.module.scss";
import { Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import { fetchCreateInvoice } from "@/service/createInvoice";
const EMPTY_ARR = [];

export const SumFooter = ({ typeOfInput, value, label }) => {
  const { values } = useFormikContext();
  const formatMoney = (valueFormat) => {
    const VND = new Intl.NumberFormat("vi-VN");
    return VND.format(valueFormat);
  };
  let total;
  const fee = values.invoices.reduce((total, { fee }) => (total += fee), 0);
  const money = values.invoices.reduce(
    (total, { money }) => (total += money),
    0
  );
  switch (typeOfInput) {
    case "fee":
      total = fee;
      break;
    case "money":
      total = money;
      break;
    case "feeafterpay":
      total = money - fee;
      break;
    case "sumTotalFee":
      total = money - fee - values.shipFee;
      break;
    default:
      total = value;
      break;
    // default statements
  }

  return (
    <InputComponent
      isDisable={label == "" && true}
      labelWidth={"30%"}
      name="3"
      label={label}
      valueInput={total}
      type={"number"}
    />
  );
};
function InvoiceCreateComponent({ name, handleAdd, handleRemove }) {
  const { values,resetForm } = useFormikContext();
  console.log("values", values);
  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;
  const [isShowFormAddCard, setIsShowFormAddCard] = useState(false);
  const onAdd = useCallback(() => {
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
      pos: 1,
      money: 0,
      typeOfCard: "",
      fee: 0,
      feeafterpay: 0,
      billcode: 1,
    };
    handleAdd(item);
  }, [handleAdd]);

  // const onRemove = useCallback();
  // (index) => {
  //   handleRemove(index);
  // },
  //   [handleRemove];
  const handleShowFormAddCard = () => {
    setIsShowFormAddCard((isShowFormAddCard) => !isShowFormAddCard);
  };
  const handleSubmitInvoice = () => {
    const receiptArr = values.invoices.map((item) => {
      return {
        moneyAmmount: item.money,
        fee: item.fee,
        posId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        customerCardId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };
    });
    const bodySend = {
      receiptStatusEnum: "PENDING",
      shipmentFee: values.shipFee,
      receiptBills: receiptArr,
    };
    resetForm()
    // console.log("bodySend", bodySend);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row: { index, original } }) => {
          return <div>{Number(index) + 1}</div>;
        },
        Footer: () => {
          return (
            <Button size="small" variant="contained" onClick={onAdd}>
              add
            </Button>
          );
        },
      },
      {
        Header: "MÃ POS",
        accessor: "pos",
        Cell: ({ row: { index } }) => {
          return (
            <Dropdown
              nameForm={`${name}[${index}].pos`}
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
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <h3>TỔNG</h3>
            </div>
          );
        },
      },
      {
        Header: "SỐ TIỀN",
        accessor: "money",
        Cell: ({ row: { index } }) => {
          return (
            <Input
              isDisable={false}
              type={"number"}
              name={`${name}[${index}].money`}
            />
          );
        },
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter typeOfInput={"money"} />
            </div>
          );
        },
      },
      {
        Header: "LOẠI THẺ",
        accessor: "typeOfCard",
        Cell: ({ row: { index } }) => {
          return (
            <Dropdown
              nameForm={`${name}[${index}].typeOfCard`}
              value={1}
              label=""
              items={[
                { key: "VISA", value: 1 },
                { key: "CREDIT", value: 2 },
                { key: "VISA0", value: 3 },
              ]}
            />
          );
        },
      },
      {
        Header: "TIỀN PHÍ",
        accessor: "fee",
        Cell: ({ row: { index, original } }) => (
          <Input
            isDisable={false}
            type={"number"}
            name={`${name}[${index}].fee`}
          />
        ),
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter typeOfInput={"fee"} />
            </div>
          );
        },
      },
      {
        Header: "TIỀN SAU PHÍ",
        accessor: "feeafterpay",
        Cell: ({ row: { original } }) => {
          const restOfFee = original.money - original.fee;
          return <SumFooter value={restOfFee} />;
        },
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter typeOfInput={"feeafterpay"} />
            </div>
          );
        },
      },
    ],
    []
  );
  const [results, setResults] = useState([]);
  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        // console.log("results", results);
        setResults(results);
      });
  };
  useEffect(() => {
    fetchData("n");
  }, []);
  return (
    <div className="field">
      <h2 style={{ textAlign: "center" }}>FORM NHẬP HÓA ĐƠN</h2>
      <div style={{ marginBottom: 5 }}>
        <Input
          isDisable={true}
          labelWidth={"30%"}
          placeHoder=""
          name="1"
          label="Mã Hóa Đơn: "
          type={"text"}
        />
        <Input
          isDisable={true}
          labelWidth={"30%"}
          placeHoder=""
          name="2"
          label="Nhân viên GD: "
          type={"text"}
        />
        <Input
          placeHoder=""
          name="customerName"
          search
          results={results}
          label="Tên chủ thẻ: "
          type={"text"}
        />
        <div
          onClick={handleShowFormAddCard}
          className={styles.invoice_buttonAdd_container}
        >
          <Button
            className={styles.invoice_buttonAdd}
            color="info"
            size="medium"
            variant="outlined"
          >
            Thêm mới
          </Button>
        </div>
        {isShowFormAddCard && (
          <div className={styles.invoice_customerInfo}>
            <Input
              isDisable={false}
              labelWidth={"30%"}
              placeHoder=""
              name="3"
              label="Số thẻ: "
              type={"text"}
            />
            <Input
              isDisable={false}
              labelWidth={"30%"}
              placeHoder=""
              name="4"
              label="Bank: "
              type={"text"}
            />
            <Input
              isDisable={false}
              labelWidth={"30%"}
              placeHoder=""
              name="5"
              label="Đại Lý: "
              type={"text"}
            />
          </div>
        )}
        <Input
          labelWidth={"30%"}
          placeHoder=""
          disable={true}
          name="6"
          label="% Phí: "
        />
      </div>
      <TableComponent
        data={formikSlice}
        pagination={true}
        columns={columns}
        rowKey="id"
      />
      <div style={{ marginTop: 5 }}>
        <Input
          isDisable={false}
          labelWidth={"30%"}
          name="shipFee"
          label="Tiền Ship: "
          type={"number"}
        />
        <SumFooter label="Tổng" typeOfInput={"sumTotalFee"} />
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
          Tải Ảnh Chứng từ
        </Button>
        <Button
          size="medium"
          style={{ marginLeft: 5 }}
          variant="contained"
          color="info"
          onClick={() => handleSubmitInvoice()}
        >
          Lưu Hóa Đơn
        </Button>
      </div>
    </div>
  );
}

export default React.memo(InvoiceCreateComponent);
