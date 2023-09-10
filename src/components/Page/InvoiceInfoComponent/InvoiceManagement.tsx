import React, { useCallback, useState, useMemo, useEffect } from "react";

import TableComponent from "@/components/TableComponent";
import { Button, IconButton } from "@mui/material";
import CustomizedDialogs from "@/components/DialogComponent";
import { useQuery, useMutation, useQueryClient } from "react-query";
import InvoiceInfoComponent from "@/components/Page/InvoiceInfoComponent/InvoiceInfoComponent";
import { fetchInvoiceInfo } from "@/service/createInvoice";
import { conrimInvoiceApi } from "@/service/invoiceManagement";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useStateContext } from "@/context";
import {
  BillInfo,
  InvoiceConfirmParams,
  InvoiceDetail,
  STATUS_CODE,
} from "@/models/InvoiceManagement";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ApproveDialogComponent } from "./ApproveDialog";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import _ from "lodash";
const RECEIPT_STATUS = {
  PENDING: "PENDING",
  APPROVE: "APPROVE",
};
const enumSorter = {
  EMPLOYEE: "EMPLOYEE",
  CREATION_DATE: "CREATION_DATE",
  POS: "POS",
  CUSTOMER_CARD: "CUSTOMER_CARD",
};
const initialInvoiceSearch = {
  employeeId: "",
  customerCardId: "",
  posId: "",
  title: "",
  // startDate: '',
  // endDate: '',
  page: 0,
  pageSize: 10,
  sorter: enumSorter.EMPLOYEE,
  sortDirection: "ASC",
};
const InvoiceManagement = () => {
  const [open, setOpen] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState<InvoiceDetail>({});
  const [openApprovingDialog, setOpenApprovingDialog] = useState(false);
  const stateContext = useStateContext();

  const queryClient = useQueryClient();

  const { control, handleSubmit, register, reset, getValues, setValue, watch } =
    useForm({
      defaultValues: {
        formConfirm: {
          receiptId: "",
          category1: 1,
          explanation: "",
        },
      },
    });
  console.log("watch", watch());
  const getInvoice = useQuery({
    queryKey: ["invoiceInfo", initialInvoiceSearch],
    queryFn: () => fetchInvoiceInfo(initialInvoiceSearch),
    onSuccess: (data) => {
      const formatData = data.data.content.map((item: any) => {
        let countInvoice = 0;
        const sum = item.bills.map((invoice: any) => {
          countInvoice = +invoice.moneyAmount - +invoice.fee + countInvoice;
        });
        return {
          createdDate: item.createdDate,
          receiptCode: item.receiptCode,
          sumInvoice: countInvoice - item.shipmentFee,
          shipmentFee: item.shipmentFee,
          percentageFee: item.percentageFee,
          receiptId: item.receiptId,
          receiptStatus: item.receiptStatus,
          bill: item.bills,
        };
      });
      setInvoiceList(formatData);
    },
  });
  // useEffect(() => {}, [invoiceList]);
  const confirmInvoice = useMutation({
    mutationFn: async (reason: InvoiceConfirmParams) => {
      return conrimInvoiceApi(reason);
    },
    onSuccess: async () => {
      enqueueSnackbar("Xác nhận thành công!!", { variant: "success" });
      queryClient.invalidateQueries("invoiceInfo");
      setOpenApprovingDialog(!openApprovingDialog);
    },
    onError: (err) => {
      enqueueSnackbar("Xác nhận thất bại!", { variant: "error" });
    },
  });
  const handleConfirmInvoice = () => {
    const bodySend: InvoiceConfirmParams = {
      receiptId: watch().formConfirm.receiptId,
      explanation: watch().formConfirm.explanation,
    };
    confirmInvoice.mutate(bodySend);
  };
  const handleClickOpen = (item: any) => {
    const formatBill = item.bill.map((value: any) => {
      const checkFomrmat: BillInfo = {
        fee: value.fee,
        posCode: value.pos.posCode,
        restOfMoney: value.moneyAmount - value.fee,
        moneyAmount: value.moneyAmount,
      };
      return checkFomrmat;
    });
    const invoiceDialog: InvoiceDetail = {
      sumInvoice: item.sumInvoice,
      shipmentFee: item.shipmentFee,
      receiptCode: item.receiptCode,
      percentageFee: item.percentageFee,
      receiptId: item.receiptId,
      receiptStatus: item.receiptStatus,
      bill: formatBill,
    };
    setInvoiceDetail(invoiceDialog);
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };

  const handleOpenApproveDialog = (info: any) => {
    setValue("formConfirm.receiptId", info.receiptId);
    setOpenApprovingDialog(!openApprovingDialog);
  };
  const handleCloseApproveDialog = () => {
    setOpenApprovingDialog(!openApprovingDialog);
  };
  const formatMoney = (value: number) => {
    const VND = new Intl.NumberFormat("vi-VN");
    return VND.format(value);
  };

  useEffect(() => {}, [invoiceList]);
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
        Cell: ({ row: { original } }) => {
          return (
            <div>
              {moment(original?.createdDate).format("DD/MM/YYYY-h:mm:ss")}
            </div>
          );
        },
      },
      {
        Header: "Mã Hóa Đơn",
        accessor: "receiptCode",
        Cell: ({ row: { original } }) => {
          if (_.isEqual(original.receiptStatus, STATUS_CODE.PENDING)) {
            return (
              <Button
                style={{
                  fontSize: 13,
                  fontStyle: "italic",
                  textTransform: "lowercase",
                }}
                variant="outlined"
                color="warning"
              >
                chờ duyệt
              </Button>
            );
          }
          return <div>{original.receiptCode}</div>;
        },
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
            <IconButton onClick={() => handleClickOpen(original)} color="info">
              <VisibilityIcon sx={{ fontSize: 18 }} />
            </IconButton>
            {original?.receiptStatus === RECEIPT_STATUS.PENDING ? (
              <IconButton
                onClick={() => handleOpenApproveDialog(original)}
                sx={{ marginLeft: 1, fontSize: 10 }}
                color="success"
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <></>
              // <IconButton
              //   onClick={() => handleOpenApproveDialog(original)}
              //   sx={{ marginLeft: 1, fontSize: 10 }}
              //   color="success"
              // >
              //   <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              // </IconButton>
            )}
          </div>
        ),
      },
    ],
    [invoiceList]
  );
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        QUẢN LÝ HÓA ĐƠN: {stateContext.state.authUser?.username.toUpperCase()}
      </h3>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%" }}>
          {!getInvoice.isLoading && (
            <TableComponent
              data={invoiceList}
              columns={columns}
              pagination={true}
              isFooter={false}
            />
          )}
        </div>
      </div>
      <CustomizedDialogs
        titleConfirmButton="Sửa hóa đơn"
        confirm={true}
        size={"md"}
        open={open}
        title={"Thông Tin Hóa Đơn"}
        handleClickClose={handleClickClose}
      >
        <div className="app">
          <InvoiceInfoComponent data={invoiceDetail} name="invoices" />
        </div>
      </CustomizedDialogs>
      <ApproveDialogComponent
        control={control}
        handleClickClose={handleCloseApproveDialog}
        handleClickConfirm={handleConfirmInvoice}
        openDialog={openApprovingDialog}
      />
    </>
  );
};

export default InvoiceManagement;
