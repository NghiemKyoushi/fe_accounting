import React, { useCallback, useState, useMemo, useEffect } from "react";
import TableComponent from "@/components/TableComponent";
import SelectSearchComponent from "../../SelectSearchComponent/SelectSearchComponent";
import styles from "./Invoices.module.scss";
import { Button, Fab } from "@mui/material";
import { useSnackbar } from "notistack";
import { fetchCreateInvoice, fetchSaveImage } from "@/service/createInvoice";
import { useStateContext } from "@/context/index";
import { useQuery, useMutation } from "react-query";
import {
  fetchCustomer,
  fetchPosSearch,
  fetcCardByCustomerId,
  deleteImage,
} from "@/service/createInvoice";
import FormattedInputs from "@/components/InputComponents";
import { IconButton } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FormCurrencyField } from "@/components/FormNumberField/FormNumberField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Uploader from "@/components/Uploader/Uploader";
import HeaderPage from "@/components/HeaderPage/HeaderPage";

export const SumFooter = ({ typeOfInput, value, label, width, watch }) => {
  let total;
  let money, fee;
  if (watch("invoices") !== undefined) {
    money = watch("invoices").reduce((total, { money }) => (total += money), 0);
    fee = watch().invoices.reduce((total, { fee }) => (total += fee), 0);
  }
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
      if (watch().percentageFee === undefined || watch().percentageFee === 0) {
        total = money - fee - watch().shipFee;
      } else if (watch().shipFee === undefined || watch().shipFee === 0) {
      } else {
        total =
          (money - fee) - (money - fee) * (+watch().percentageFee/100) - +watch().shipFee;
      }

      break;
    default:
      total = value;
      break;
  }
  return (
    <FormattedInputs
      disable={true}
      type="number"
      label={label}
      width={width}
      name="typeOfInput"
      valueInput={total}
    />
  );
};

export const InputSearchPos = ({ name, index, setValue, watch, control }) => {
  const [result, setResult] = useState([]);
  const { data } = useQuery({
    queryKey: ["searchPos", watch().posSearch],
    queryFn: () => fetchPosSearch(watch().posSearch),
    enabled: !!watch().posSearch,
    onSuccess: (data) => {
      if (data.data.length > 0) {
        const listPos = data.data.map((item) => {
          return {
            values: item.posCode,
            key: item.posId,
          };
        });
        setResult(listPos);
      }
    },
  });
  return (
    <div>
      <SelectSearchComponent
        control={control}
        nameOnChange="posSearch"
        name={name}
        placeHoder=""
        results={result}
        label=""
        type={"text"}
        setValue={setValue}
        labelWidth={"100"}
      />
    </div>
  );
};
function InvoiceCreateComponent() {
  const stateContext = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isShowFormAddCard, setIsShowFormAddCard] = useState(false);
  const [listByCusId, setListByCusId] = useState([]);
  const { control, handleSubmit, getValues, reset, setValue, watch } = useForm({
    shouldUnregister: false,
    defaultValues: {
      customerInfo: "",
      customerSearch: "",
      image_Id: "",
      posSearch: "",
      percentageFee: 0,
      shipFee: 0,
      typeOfCard: "",
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
    },
  });
  const { fields: invoicesField, append } = useFieldArray({
    control,
    name: "invoices",
  });
  const onAdd = () => {
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
      pos: 1,
      money: null,
      typeOfCard: "",
      fee: null,
      feeafterpay: null,
      billcode: 1,
    };
    append(item);
  };
  const [results, setResults] = useState([]);
  const { data } = useQuery({
    queryKey: ["searchCustomer", watch().customerSearch],
    queryFn: () => fetchCustomer(watch().customerSearch),
    enabled: !!watch().customerSearch,
    onSuccess: (data) => {
      if (data.data.length > 0) {
        const listCustomer = data.data.map((item) => {
          return {
            values: item.customerName,
            key: item.customerId,
          };
        });
        setResults(listCustomer);
      }
    },
  });
  const cusId = useQuery({
    queryKey: ["CardTypeByCusId", watch().customerInfo.key],
    queryFn: () => fetcCardByCustomerId(watch().customerInfo.key),
    enabled: !!watch().customerInfo.key,
    onSuccess: (data) => {
      const formatData = data.data.map((items) => {
        return {
          values: items.cardType.cardTypeName,
          key: items.customerCardId,
        };
      });
      setListByCusId(formatData);
    },
  });
  const mutation = useMutation({
    mutationFn: async (invoiceInfo) => {
      return fetchCreateInvoice(invoiceInfo);
    },
    onSuccess: () => {
      enqueueSnackbar("Tao hóa đơn thành công!!", { variant: "success" });
      reset();
    },
    onError: (err) => {
      enqueueSnackbar("Tạo hóa đơn thất bại!", { variant: "error" });
    },
  });
  const sendImage = useMutation({
    mutationFn: async (file) => {
      return fetchSaveImage(file);
    },
    onSuccess: async (response) => {
      setValue("image_Id", response.data);
      enqueueSnackbar("Tải chứng từ thành công!!", { variant: "success" });
    },
    onError: (err) => {
      enqueueSnackbar("Tải chứng từ thất bại!", { variant: "error" });
    },
  });
  const deleteImages = useMutation({
    mutationFn: async (fileId) => {
      return deleteImage(fileId);
    },
    onSuccess: async () => {
      setValue("image_Id", "");
      enqueueSnackbar("Xóa chứng từ thành công!!", { variant: "success" });
    },
    onError: (err) => {
      enqueueSnackbar("Xóa chứng từ thất bại!", { variant: "error" });
    },
  });
  const handleSaveImage = (file) => {
    sendImage.mutate(file[0]);
  };
  const handleDeleteImage = () => {
    deleteImages.mutate(watch().image_Id);
  };
  const handleShowFormAddCard = () => {
    setIsShowFormAddCard((isShowFormAddCard) => !isShowFormAddCard);
  };
  const handleSubmitInvoice = () => {
    const receiptArr = watch().invoices.map((item) => {
      return {
        moneyAmount: item.money,
        fee: item.fee,
        posId: item.pos.key,
      };
    });
    const bodySend = {
      percentageFee: watch().percentageFee,
      shipmentFee: watch().shipFee,
      customerCardId: watch().typeOfCard.key,
      imageId: watch().image_Id,
      branchId: stateContext.state?.authUser?.branches[0]?.branchId,
      receiptBills: receiptArr,
    };
    mutation.mutate(bodySend);
    // reset()
  };
  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
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
            <IconButton
              size="small"
              variant="contained"
              color="info"
              onClick={onAdd}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          );
        },
      },
      {
        Header: "MÃ POS",
        accessor: "pos",
        Cell: ({ row: { index, original }, row }) => {
          return (
            <InputSearchPos
              index={index}
              name={`invoices[${index}].pos`}
              setValue={setValue}
              watch={watch}
              control={control}
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
        Cell: ({ row: { index, original } }) => {
          return (
            <FormCurrencyField
              name={`invoices[${index}].money`}
              control={control}
              key={original.id}
            />
          );
        },
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter watch={watch} value={0} typeOfInput={"money"} />
            </div>
          );
        },
      },
      {
        Header: "TIỀN PHÍ",
        accessor: "fee",
        Cell: ({ row: { index, original } }) => (
          <FormCurrencyField
            name={`invoices[${index}].fee`}
            control={control}
            key={original.id}
            // rules={{ required: true }}
          />
        ),
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter watch={watch} value={0} typeOfInput={"fee"} />
            </div>
          );
        },
      },
      {
        Header: "TIỀN SAU PHÍ",
        accessor: "feeafterpay",
        Cell: ({ row: { original, index }, row }) => {
          const restOfFee =
            watch(`invoices[${index}].money`) - watch(`invoices[${index}].fee`);
          return <SumFooter watch={watch} value={restOfFee} />;
        },
        Footer: () => {
          return (
            <div className={styles.div_custom_display}>
              <SumFooter watch={watch} typeOfInput={"feeafterpay"} />
            </div>
          );
        },
      },  return (
    <form onSubmit={handleSubmit(handleSubmitInvoice)}>
      <h3 style={{ textAlign: "center" }}>FORM NHẬP HÓA ĐƠN</h3>
      <HeaderPage>
        <FormattedInputs
          type={"text"}
          disable={true}
          label={"Nhân viên GD: "}
          width={"30%"}
          name="nameOfEmployee"
          valueInput={stateContext.state.authUser?.username}
        />
        <SelectSearchComponent
          nameOnChange="customerSearch"
          control={control}
          name="customerInfo"
          placeHoder="Tìm kiếm chủ thẻ"
          results={results}
          label="Tên chủ thẻ: "
          type={"text"}
          setValue={setValue}
          labelWidth={30}
        />

        {/* <div className={styles.invoice_buttonAdd_container}>
          <Button
            onClick={handleShowFormAddCard}
            className={styles.invoice_buttonAdd}
            color="info"
            size="small"
            variant="outlined"
          >
            Thêm mới
          </Button>
        </div> */}
        {isShowFormAddCard && (
          <>
            <FormattedInputs
              type={"text"}
              label={"Số thẻ: "}
              width={"15%"}
              name="cardNumber"
              valueInput={""}
            />
            <FormattedInputs
              type={"text"}
              label={"Bank: "}
              width={"15%"}
              name="bank"
              valueInput={stateContext.state.authUser?.username}
            />
            <FormattedInputs
              type={"text"}
              label={"Đại Lý: "}
              width={"15%"}
              name="location"
              valueInput={stateContext.state.authUser?.username}
            />
          </>
        )}

        <SelectSearchComponent
          nameOnChange=""
          name="typeOfCard"
          placeHoder="Tìm kiếm loại thẻ"
          results={listByCusId}
          label="Thẻ: "
          type={"text"}
          labelWidth={30}
          control={control}
        />
        <FormCurrencyField
          name="percentageFee"
          control={control}
          label="% Phí: "
          InputWidth={"30%"}
        />
      </HeaderPage>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%", display: "flex", flexDirection: "column" }}>
          <Uploader
            isImageId={watch().image_Id !== "" ? true : false}
            handleSaveImage={handleSaveImage}
            handleDeleteImage={handleDeleteImage}
          />
          <TableComponent
            data={invoicesField}
            pagination={false}
            columns={columns}
            updateMyData={updateMyData}
            rowKey="id"
            isFooter={true}
          />
        </div>
      </div>
      <div>
        <div style={{ marginTop: 5 }}>
          <FormCurrencyField
            name={"shipFee"}
            control={control}
            label="Tiền Ship: "
            InputWidth={"30%"}
          />
          <SumFooter
            width="30%"
            watch={watch}
            label="Tổng"
            typeOfInput={"sumTotalFee"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2%",
          marginTop: 5,
          paddingBottom: 15,
        }}
      >
        <Button
          size="medium"
          style={{ marginLeft: 5 }}
          variant="contained"
          color="info"
          onClick={() => handleSubmitInvoice()}
        >
          Tạo Hóa Đơn
        </Button>
      </div>
    </form>
  );
}

export default React.memo(InvoiceCreateComponent);
