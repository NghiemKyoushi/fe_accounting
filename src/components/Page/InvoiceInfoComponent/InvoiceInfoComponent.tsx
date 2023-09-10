import React, { useCallback, useState, useMemo, useEffect } from "react";
import TableComponent from "@/components/TableComponent";
// import styles from "./Invoices.module.css";
import { Button } from "@mui/material";
import { InvoiceDetail } from "@/models/InvoiceManagement";
import FormattedInputs from "@/components/InputComponents";
import ImageIcon from "@mui/icons-material/Image";
import _ from "lodash";
const EMPTY_ARR: never[] = [];

interface InvoiceInfoComponentProps {
  data: InvoiceDetail;
  name: string;
}
function InvoiceInfoComponent(props: InvoiceInfoComponentProps) {
  const { data, name } = props;
  const [isEdit, setIsEdit] = useState(true);
  const handleEdit = () => {
    setIsEdit((edit) => !edit);
  };
  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
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
        accessor: "posCode",
        // Cell: ({ row: { index, values } }) => {
        //   if (isEdit) {
        //     return (
        //       <React.Fragment>
        //       </React.Fragment>
        //     );
        //   }
        //   return (
        //     <>{values}</>
        //   );
        // },
      },
      {
        Header: "SỐ TIỀN",
        accessor: "moneyAmount",
        // Cell: ({ row: { index, values } }) => {
        //   return <>{values}</>;
        //   //   return <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].money`} />;
        // },
      },
      // {
      //   Header: "LOẠI THẺ",
      //   accessor: "typeOfCard",
      //   // Cell: ({ row: { index, values } }) => {
      //   //   return <>{values}</>;

      //   //   //   return <Input isDisable={isEdit} name={`${name}[${index}].typeOfCard`} />;
      //   // },
      // },
      {
        Header: "Tiền PHÍ",
        accessor: "fee",
        // Cell: ({ row: { index, values } }) => (
        //   <>{values}</>
        //   //   <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].feeAfter`} />
        // ),
      },
      {
        Header: "TIỀN SAU PHÍ",
        accessor: "restOfMoney",
        // Cell: ({ row: { index } }) => (
        //   <></>
        //   //   <Input isDisable={isEdit} type={"number"} name={`${name}[${index}].fee`} />
        // ),
      },
    ],
    [data?.bill]
  );
  return (
    <div className="field">
      <div style={{ minHeight: "30vh" }}>
        <TableComponent
          data={data?.bill}
          columns={columns}
          pagination={false}
          isFooter={false}
        />
        <Button
          size="small"
          style={{ fontSize: 12, marginTop: 2 }}
          variant="contained"
          color="warning"
        >
          <ImageIcon sx={{ fontSize: 18 }} />
          Xem Chứng từ
        </Button>
      </div>
      <div style={{ marginTop: 5 }}>
        {/* <div
          style={{ display: "flex", justifyContent: "center", marginLeft: 60 }}
        > */}
        <FormattedInputs
          valueInput={_.toString(data?.shipmentFee)}
          nameInput={"feeee"}
          label={"Tiền Ship:"}
          width={"40%"}
          type={"text"}
          disable={true}
        />
        <FormattedInputs
          valueInput={""}
          nameInput={"fee2"}
          label={"%Phí:"}
          width={"40%"}
          type={"text"}
          disable={true}
        />
        {/* </div> */}
        <FormattedInputs
          valueInput={_.toString(data?.sumInvoice)}
          nameInput={"summm"}
          label={"TỔNG:"}
          width={"40%"}
          type={"text"}
          disable={true}
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
        {/* <Button
          onClick={() => handleEdit()}
          size="medium"
          style={{ marginLeft: 5 }}
          variant="contained"
          color="success"
        >
          Sửa Hóa Đơn
        </Button> */}
      </div>
    </div>
  );
}

export default React.memo(InvoiceInfoComponent);
