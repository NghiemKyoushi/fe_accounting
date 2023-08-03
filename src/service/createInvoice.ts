import axiosInstance from "../config";

export const fetchDataTest = () => {
  return axiosInstance.get("https://jsonplaceholder.typicode.com/posts/1");
};

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
  return axiosInstance.post("/api/receipt", dataSend);
};

interface CustomerSearchProps {
  name: string
}
export const fetchCustomer = () => {
  return axiosInstance.get(`/api/customers?name=nghiem`)
}