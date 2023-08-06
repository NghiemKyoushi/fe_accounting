export interface ReceiptBillsDetail {
  moneyAmount: number;
  fee: number;
  posId: string;
  customerCardId: string;
}
export interface InvoiceProps {
  percentageFee: number;
  customerId: string;
  shipmentFee: number;
  receiptBills: Array<ReceiptBillsDetail>;
}
export interface CustomerSearchProps {
  name: string;
}
export interface PosSearchProps {
  posName: string;
}
export interface CardByCusIdProps {
  customerId: string;
}


export interface fetchInvoiceInfoPrams {
  employeeId?: string;
  customerCardId?: string;
  posId?: string;
  startDate?: string;
  endDate?: string;
  page : Number;
  pageSize: Number;
  sorter: string;
  sortDirection: string;
}