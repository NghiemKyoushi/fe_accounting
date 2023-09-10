import React, { useState } from "react";
import TableComponent from "@/components/TableComponent";
import { Button } from "@mui/material";
import HeaderFilter from "../../HeaderFilter/HeaderFilter";
import FormattedInputs from "@/components/InputComponents";
import moment from "moment";
import {
  ColumnType,
  CreateEntryParams,
  SORT,
  SORTDIRECTION,
  TYPE_BOOK,
  TYPE_PURPOSE,
} from "@/models/AccountingBookModel";
import { useForm } from "react-hook-form";
import { InsertBookDialogComponent } from "./InsertBookDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { useStateContext } from "@/context";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  confirmNewEntry,
  createNewEntry,
  fetchAccountingBook,
} from "@/service/accountingBook";
import _ from "lodash";
import { enqueueSnackbar } from "notistack";
import { STATUS_CODE } from "@/models/InvoiceManagement";

const rowActions = {
  CREATE: "CREATE",
  CONFIRM: "CONFIRM",
};
function AccountingBookComponent() {
  const [open, setOpen] = useState(false);
  const [isDetailDialog, setIsDetailDialog] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [accountingBookList, setAccountingBookList] = useState([]);
  const stateContext = useStateContext();

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen((open) => !open);
  };
  const handleClickClose = () => {
    setOpen((open) => !open);
  };
  const { control, handleSubmit, register, reset, getValues, setValue, watch } =
    useForm({
      defaultValues: {
        categoryAdd: TYPE_BOOK.INCOME,
        provisionsAdd: TYPE_PURPOSE.ADVANCE,
        numberMoney: 0,
        explanation: "",
      },
    });

  const initialInvoiceSearch = {
    branchId: stateContext.state?.authUser?.branches[0]?.branchId,
    entryBookDate: "10-09-2023",
    // entryCodeSearchKey: "",
    page: 0,
    pageSize: 10,
    sorter: SORT.CREATED_DATE,
    sortDirection: SORTDIRECTION.ASC,
  };
  const getAccountingBook = useQuery({
    queryKey: ["getEntryBook", initialInvoiceSearch],
    queryFn: () => fetchAccountingBook(initialInvoiceSearch),
    onSuccess: (data) => {
      const formatData = data.data.content.map((item: any) => {
        return {
          createdDate: item.createdDate,
          transactionTypeEnum: item.transactionTypeEnum,
          moneyAmount: item.moneyAmount,
          accountEntryCode: item.accountEntryCode,
          explanation: item.explanation,
          accountEntryStatus: item.accountEntryStatus,
          purpose: item.purpose,
          branchAccountEntryId: item.branchAccountEntryId,
          imageId: item?.receipt?.imageId,
        };
      });
      setAccountingBookList(formatData);
    },
  });
  const createEntry = useMutation({
    mutationFn: async (reason: CreateEntryParams) => {
      return createNewEntry(reason);
    },
    onSuccess: async () => {
      enqueueSnackbar("Tạo thành công!!", { variant: "success" });
      queryClient.invalidateQueries("getEntryBook");
      setOpen((open) => !open);
      reset();
    },
    onError: (err) => {
      enqueueSnackbar("Tạo thất bại!", { variant: "error" });
    },
  });
  const confirmEntry = useMutation({
    mutationFn: async (entryId: string) => {
      return confirmNewEntry(entryId);
    },
    onSuccess: async () => {
      enqueueSnackbar("Xác nhận thành công!!", { variant: "success" });
      queryClient.invalidateQueries("getEntryBook");
    },
    onError: (err) => {
      enqueueSnackbar("Xác nhận thất bại!", { variant: "error" });
    },
  });
  const handleConfirmEntry = (entryId: string) => {
    confirmEntry.mutate(entryId);
  };
  const handleConfirmInvoice = () => {
    const bodySend: CreateEntryParams = {
      transactionTypeEnum: watch().categoryAdd,
      moneyAmount: watch().numberMoney,
      purpose: watch().provisionsAdd,
      explanation: watch().explanation,
      branchId: stateContext.state?.authUser?.branches[0]?.branchId,
    };
    createEntry.mutate(bodySend);
  };
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
        accesser: "createdDate",
        Cell: ({ row: { original } }) => {
          return (
            <div>
              {moment(original?.createdDate).format("DD/MM/YYYY-h:mm:ss")}
            </div>
          );
        },
        Footer: () => {
          return <h4>TỔNG</h4>;
        },
      },
      {
        Header: "Mã Bút Toán",
        accesser: "accountEntryCode",
        w: 120,
        Cell: ({ row: { original } }) => {
          if (_.isEqual(original.accountEntryStatus, STATUS_CODE.PENDING)) {
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
          return <div>{original.accountEntryCode}</div>;
        },
      },
      {
        Header: "Định Khoản",
        accesser: "purpose",
        Cell: ({ row: { original } }) => {
          return <div>{original.purpose}</div>;
        },
      },
      {
        Header: "Đã Thu",
        accesser: "collected",
        Cell: ({ row: { original } }) => {
          if (_.isEqual(original.transactionTypeEnum, TYPE_BOOK.INCOME)) {
            return <div>{original.moneyAmount}</div>;
          }
          return <div></div>;
        },
        // Footer: () => {
        //   return <></>;
        // },
      },
      {
        Header: "Đã Chi",
        // accesser: "expenditure",
        Cell: ({ row: { original } }) => {
          if (_.isEqual(original.transactionTypeEnum, TYPE_BOOK.OUTCOME)) {
            return <div>{original.moneyAmount}</div>;
          }
          return <div></div>;
        },
        Footer: () => {
          return <></>;
        },
      },
      {
        Header: "Công Nợ ",
        accesser: "debt",
        Cell: ({ row: { original } }) => {
          if (_.isEqual(original.transactionTypeEnum, TYPE_BOOK.DEPT)) {
            return <div>{original.moneyAmount}</div>;
          }
          return <div></div>;
        },
        Footer: () => {
          return <></>;
        },
      },
      // {
      //   Header: "Thu Nợ ",
      //   accesser: "debtCollection",
      //   Footer: () => {
      //     return <h1></h1>;
      //   },
      // },
      {
        Header: "Thao Tác",
        id: "actions",
        Cell: ({ row: { index, original } }) => (
          <div>
            <IconButton color="info">
              <VisibilityIcon sx={{ fontSize: 18 }} />
            </IconButton>
            {_.isEqual(original.accountEntryStatus, STATUS_CODE.PENDING) ? (
              <IconButton
                onClick={() =>
                  handleConfirmEntry(original.branchAccountEntryId)
                }
                sx={{ marginLeft: 1, fontSize: 10 }}
                color="success"
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <IconButton sx={{ marginLeft: 1, fontSize: 10 }} color="info">
                <InfoIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <HeaderPage>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexDirection: "column",
            marginBottom: 5,
            marginLeft: "5%",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <Button
              onClick={() => handleClickOpen()}
              variant="outlined"
              size="small"
            >
              Thêm
            </Button>
          </div>
          <FormattedInputs
            type={"text"}
            disable={true}
            label={"Số Dư Hiện Có: "}
            width={"60%"}
            nameInput="restOfMoney"
            valueInput={"0"}
          />
        </div>
        <HeaderFilter />
      </HeaderPage>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%" }}>
          {!getAccountingBook.isLoading && (
            <TableComponent
              data={accountingBookList}
              pagination={true}
              columns={columns}
              isFooter={false}
            />
          )}
        </div>
      </div>

      <InsertBookDialogComponent
        handleConfirmInvoice={handleConfirmInvoice}
        control={control}
        handleClickClose={handleClickClose}
        openDialog={open}
      />
    </>
  );
}

export default React.memo(AccountingBookComponent);
