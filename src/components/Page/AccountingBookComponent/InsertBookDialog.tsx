import DropDown from "@/components/Dropdown";
import CustomizedDialogs from "../../DialogComponent";
import { FormCurrencyField } from "@/components/FormNumberField/FormNumberField";
import TextareaComponent from "@/components/TextAreaAutoSize/TextAreaAutoSize";
import { Divider } from "@mui/material";
import { Control } from "react-hook-form";
import { TYPE_BOOK, TYPE_PURPOSE } from "@/models/AccountingBookModel";

interface InsertBookDialogProps {
  openDialog: boolean;
  handleClickClose: () => void;
  handleConfirmInvoice: () => void;
  control: Control<T>;
}
export const InsertBookDialogComponent = (props: InsertBookDialogProps) => {
  const { openDialog, handleClickClose,handleConfirmInvoice, control } = props;
  return (
    <CustomizedDialogs
      size={"sm"}
      open={openDialog}
      confirm={true}
      titleConfirmButton="Thêm bút toán"
      title={"FORM NHẬP SỔ THU CHI: TÂY SƠN"}
      handleClickClose={handleClickClose}
      handleClickConfirm={handleConfirmInvoice}
    >
      <div className="app">
        <form>
          <DropDown
            name={"categoryAdd"}
            label="Phân Loại"
            control={control}
            // placeHolder="THU/CHI/CÔNG NỢ/THU NỢ"
            items={[
              { key: "THU", value: TYPE_BOOK.INCOME },
              { key: "CHI", value: TYPE_BOOK.OUTCOME },
              { key: "CÔNG NỢ", value: TYPE_BOOK.DEPT },
              { key: "THU NỢ", value: TYPE_BOOK.CREDIT },
            ]}
          />
          <DropDown
            name={"provisionsAdd"}
            label="Định Khoản"
            // placeHolder="ĐẢO RÚT/TẠM ỨNG/CÔNG NỢ/THU NỢ"
            control={control}
            items={[
              { key: "ĐẢO RÚT", value: TYPE_PURPOSE.WITHDRAW },
              { key: "TẠM ỨNG", value: TYPE_PURPOSE.ADVANCE },
              { key: "CÔNG NỢ", value: TYPE_PURPOSE.DEPT },
              { key: "THU NỢ", value: TYPE_PURPOSE.CREDIT },
            ]}
          />
          <Divider
            sx={{
              borderBottomWidth: 2,
              borderStyle: "dashed",
              backgroundColor: "grey",
              margin: "13px 13px",
            }}
          />
          <FormCurrencyField
            name={"numberMoney"}
            control={control}
            InputWidth="70%"
            label="Số Tiền "
            // {...rest}
            // rules={{ required: true }}
          />
          <TextareaComponent
            control={control}
            valueInput={""}
            name={"explanation"}
            label={"Diễn Giải"}
            width={""}
            type={""}
            disable={false}
          />
        </form>
      </div>
    </CustomizedDialogs>
  );
};
