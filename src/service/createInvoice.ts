import { authApi } from "@/api/authApi";

interface ReceiptBillsDetail {
  moneyAmount: number;
  fee: number;
  posId: string;
  customerCardId: string;
}
interface InvoiceProps {
  receiptStatusEnum: string;
  shipmentFee: number;
  receiptBills: Array<ReceiptBillsDetail>;
}
export const fetchCreateInvoice = (props: InvoiceProps) => {
  const { receiptStatusEnum, shipmentFee, receiptBills } = props;
  const dataSend = {
    receiptStatusEnum,
    shipmentFee,
    receiptBills,
  };
  return authApi.post("/api/receipt", dataSend);
};

interface CustomerSearchProps {
  name: string
}
export const fetchCustomer = (props: CustomerSearchProps) => {
  return authApi.get(`/api/customers?name=${props}`)
}