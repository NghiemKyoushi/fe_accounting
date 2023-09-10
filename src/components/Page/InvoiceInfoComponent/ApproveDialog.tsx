import DropDown from "@/components/Dropdown";
import CustomizedDialogs from "../../DialogComponent";
import { FormCurrencyField } from "@/components/FormNumberField/FormNumberField";
import TextareaComponent from "@/components/TextAreaAutoSize/TextAreaAutoSize";
import { Divider } from "@mui/material";
import { Control, useController } from "react-hook-form";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InsertBookDialogProps {
  openDialog: boolean;
  handleClickClose: () => void;
  handleClickConfirm: () => void;
  control: Control<T>;
  // register: UseFormRegister<FieldValues>
}
export const ApproveDialogComponent = (props: InsertBookDialogProps) => {
  const { openDialog, handleClickClose, handleClickConfirm, control } = props;

  return (
    <CustomizedDialogs
      size={"sm"}
      open={openDialog}
      confirm={true}
      titleConfirmButton="Xác nhận"
      title={"FORM NHẬP SỔ THU CHI: TÂY SƠN"}
      handleClickClose={handleClickClose}
      handleClickConfirm={handleClickConfirm}
    >
      <div className="app">
        <DropDown
          control={control}
          name={"formConfirm.category1"}
          label="Phân Loại"
          // placeHolder="THU/CHI/CÔNG NỢ/THU NỢ"
          // value={"THU"}
          items={[
            { key: "THU", value: 1 },
            { key: "CHI", value: 2 },
            { key: "CÔNG NỢ", value: 3 },
            { key: "THU NỢ", value: 4 },
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
        <TextareaComponent
          control={control}
          valueInput={""}
          name={"formConfirm.explanation"}
          label={"Diễn Giải"}
          width={""}
          type={""}
          disable={false}
        />
      </div>
    </CustomizedDialogs>
  );
};
