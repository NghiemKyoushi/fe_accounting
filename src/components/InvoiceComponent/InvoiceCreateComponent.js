import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import TableComponent from "@/components/TableComponent";
import Input from "../Input";
import Dropdown from "../Dropdown";
import styles from "./Invoices.module.scss";
import { Button } from "@mui/material";
const EMPTY_ARR = [];

function InvoiceCreateComponent({ name, handleAdd, handleRemove }) {
  const { values } = useFormikContext();
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
    // const index = values.invoices.length - 1;
    handleAdd( item);
  }, [handleAdd]);
  const onRemove = useCallback();
  (index) => {
    handleRemove(index);
  },
    [handleRemove];

  const handleShowFormAddCard = () => {
    setIsShowFormAddCard((isShowFormAddCard) => !isShowFormAddCard);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row: { index, original } }) => {
          // if (+original.id === 1000) {
          //   return (
          //     <Button size="small" variant="contained" onClick={onAdd}>
          //       add
          //     </Button>
          //   );
          // }
          return <div>{Number(index) + 1}</div>;
        },
        Footer: () => {
          return (
            <Button size="small" variant="contained" onClick={onAdd}>
              add
            </Button>
          )
        }
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
          return (<h4>TỔNG</h4>)
        }
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
          return (<Input
            isDisable={false}
            type={"number"}
            name={`${name}.money`}
          />)
        }
      },
      {
        Header: "LOẠI THẺ",
        accessor: "typeOfCard",
        Cell: ({ row: { index, original } }) => {
          if (+original.id === 1000) {
            return "";
          }
          return (
            <Input isDisable={false} name={`${name}[${index}].typeOfCard`} />
          );
        },
      },
      {
        Header: "Tiền PHÍ",
        accessor: "fee",
        Cell: ({ row: { index, original } }) => (
          <Input
            isDisable={false}
            type={"number"}
            name={`${name}[${index}].fee`}
          />
        ),
        Footer: () => {
          return (<Input
            isDisable={false}
            type={"number"}
            name={`${name}.fee`}
          />)
        }
      },
      {
        Header: "TIỀN SAU PHÍ",
        accessor: "feeAfter",
        Cell: ({ row: { index } }) => (
          <Input
            isDisable={false}
            type={"number"}
            name={`${name}[${index}].feeAfter`}
          />
        ),
        Footer: () => {
          return (<Input
            isDisable={false}
            type={"number"}
            name={`${name}.feeAfter`}
          />)
        }
      },
      {
        Header: "MÃ BILL",
        accessor: "billcode",
        Cell: ({ row: { index, original } }) => {
          return (
            <Dropdown
              nameForm={`${name}[${index}].billcode`}
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
    [name]
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
        console.log("results", results);
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
      <TableComponent data={formikSlice} pagination={true} columns={columns} rowKey="id" />
      <div style={{ marginTop: 5 }}>
        <Input
          isDisable={true}
          labelWidth={"30%"}
          name="3"
          label="Tiền Ship: "
          type={"text"}
        />
        <Input
          isDisable={true}
          labelWidth={"30%"}
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
          Tải Ảnh Chứng từ
        </Button>
        <Button
          size="medium"
          style={{ marginLeft: 5 }}
          variant="contained"
          color="info"
        >
          Lưu Hóa Đơn
        </Button>
      </div>
    </div>
  );
}

export default React.memo(InvoiceCreateComponent);
