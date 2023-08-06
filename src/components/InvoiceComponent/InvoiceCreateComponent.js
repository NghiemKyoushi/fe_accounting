import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import TableComponent from "@/components/TableComponent";
import Input from "../InputForm";
import InputComponent from "../InputComponent";
import Dropdown from "../Dropdown";
import styles from "./Invoices.module.scss";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { fetchCreateInvoice } from "@/service/createInvoice";
import { useStateContext } from "../../context";
import { useQuery, useMutation } from "react-query";
import {
  fetchCustomer,
  fetchPosSearch,
  fetcCardByCustomerId,
} from "@/service/createInvoice";
import { useQueryClient } from "react-query";

const EMPTY_ARR = [];

export const SumFooter = ({ typeOfInput, value, label }) => {
  const { values } = useFormikContext();

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

export const InputSearch = ({ name, indexx }) => {
  const { values, setFieldValue } = useFormikContext();
  console.log("index34343", indexx);
  const [result, setResult] = useState([]);
  // console.log("values333333333", values.invoices[0].pos);
  const handleChangePos = (valuePos, keyPos) => {
    setFieldValue(`${name}[${indexx}].pos`, valuePos || "");
    setFieldValue(`${name}[${indexx}].posId`,keyPos || "");
  };
  const { data } = useQuery({
    queryKey: ["searchPos", values.invoices[indexx]?.pos],
    queryFn: () => fetchPosSearch(values.invoices[indexx].pos),
    onSuccess: (data) => {
      if (data.data.length > 0) {
        const listPos = data.data.map((item) => {
          return {
            value: item.posCode,
            key: item.posId,
          };
        });
        console.log("listPos", listPos);
        setResult(listPos);
      }
    },
  });
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Input
        name={`${name}[${indexx}].pos`}
        search
        labelWidth={100}
        placeHoder=""
        handleChangePos={handleChangePos}
        results={result}
        label=""
        type={"text"}
      />
    </div>
  );
};
function InvoiceCreateComponent({ name, handleAdd, handleRemove }) {
  const { values, resetForm } = useFormikContext();
  console.log("values", values);
  const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;
  const [isShowFormAddCard, setIsShowFormAddCard] = useState(false);
  const [listByCusId, setListByCusId] = useState([]);
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
  //test
  const queryClient = useQueryClient();
  const [results, setResults] = useState([]);
  const [searchPort, setSearchPort] = useState([]);

  const { data } = useQuery({
    queryKey: ["searchCustomer", values.customerName],
    queryFn: () => fetchCustomer(values.customerName),
    onSuccess: (data) => {
      if (data.data.length > 0) {
        const listCustomer = data.data.map((item) => {
          return {
            value: item.customerName,
            key: item.customerId,
          };
        });
        setResults(listCustomer);
      }
    },
  });
  const cusId = useQuery({
    queryKey: ["CardTypeByCusId", values.customerId],
    queryFn: () => fetcCardByCustomerId(values.customerId),
    onSuccess: (data) => {
      const formatData = data.data.map((items) => {
        return {
          key: items.cardType.cardTypeName,
          value: items.customerCardId,
        };
      });
      console.log("formatData", formatData);
      setListByCusId(formatData);
    },
  });
  const mutation = useMutation({
    mutationFn: (invoiceInfo) => {
      return fetchCreateInvoice(invoiceInfo);
    },
    onSuccess: () => {
      enqueueSnackbar("Tao hóa đơn thành công!!", { variant: "success" });
      resetForm();
    },
    onError: (err) => {
      console.log("err", err);
      enqueueSnackbar("Tạo hóa đơn thất bại!", { variant: "error" });
    },
  });

  const handleShowFormAddCard = () => {
    setIsShowFormAddCard((isShowFormAddCard) => !isShowFormAddCard);
  };
  const handleSubmitInvoice = () => {
    const receiptArr = values.invoices.map((item) => {
      return {
        moneyAmmount: item.money,
        fee: item.fee,
        posId: item.posId,
        customerCardId: item.typeOfCard,
      };
    });
    const bodySend = {
      percentageFee: values.percentageFee,
      shipmentFee: values.shipFee,
      customerId: values.customerId,
      receiptBills: receiptArr,
    };
    console.log("bodySend", bodySend);
    mutation.mutate(bodySend);
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
        Cell: ({ row: { index }, row }) => {
          console.log("row", index);
          return (
            <InputSearch name={name} indexx={index} />
            // <div style={{ display: "flex", justifyContent: "center" }}>
            //   <Input
            //     name={`${name}[${index}].pos`}
            //     search
            //     labelWidth={100}
            //     placeHoder=""
            //     results={[]}
            //     label=""
            //     type={"text"}
            //   />
            // </div>
            // <Dropdown
            //   nameForm={`${name}[${index}].pos`}
            //   value={1}
            //   label=""
            //   items={[
            //     { key: "VP01", value: 1 },
            //     { key: "ABB-1-24", value: 2 },
            //     { key: "EXIM01-35", value: 3 },
            //   ]}
            // />
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
              value={null}
              label=""
              items={listByCusId}
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
    [listByCusId]
  );

  return (
    <div className="field">
      <h2 style={{ textAlign: "center" }}>FORM NHẬP HÓA ĐƠN</h2>
      <div style={{ marginBottom: 5 }}>
        <InputComponent
          isDisable={true}
          labelWidth={"30%"}
          placeHoder=""
          name="2"
          valueInput={stateContext.state.authUser?.username}
          label="Nhân viên GD: "
          type={"text"}
        />
        <Input
          name="customerName"
          search
          placeHoder="Tìm kiếm chủ thẻ"
          results={results}
          label="Tên chủ thẻ: "
          type={"text"}
          labelWidth={30}
        />
        <div className={styles.invoice_buttonAdd_container}>
          <Button
            onClick={handleShowFormAddCard}
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
          name="percentageFee"
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
