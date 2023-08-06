import { authApi } from "@/api/authApi";
import {InvoiceProps,CardByCusIdProps, PosSearchProps, CustomerSearchProps, fetchInvoiceInfoPrams } from './type'

export const fetchCreateInvoice = (props: InvoiceProps) => {
  const { percentageFee, customerId, shipmentFee, receiptBills } = props;
  const dataSend = {
    percentageFee,
    customerId,
    shipmentFee,
    receiptBills,
  };
  return authApi.post("/api/receipts", dataSend);
};


export const fetchInvoiceInfo = (param: fetchInvoiceInfoPrams) => {
  return authApi.get("/api/receipts", {
    params: param,
  });
};

export const fetcCardByCustomerId = (props: CardByCusIdProps) => {
  return authApi.get(`/api/customer-cards?customerId=${props}`);
};

export const fetchCustomer = (props: CustomerSearchProps) => {
  console.log("props", props)
  return authApi.get(`/api/customers/searchCustomerByName?name=${props}`);
};
export const fetchPosSearch = (props: PosSearchProps) => {
    return authApi.get(`/api/poses/searchByCode?searchKey=${props}`);
};

