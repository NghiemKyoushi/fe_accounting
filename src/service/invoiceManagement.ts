import { authApi } from "@/api/authApi";
import { InvoiceConfirmParams } from "@/models/InvoiceManagement";
export const conrimInvoiceApi = (reason: InvoiceConfirmParams) => {
  return authApi.post("/api/branch-account-entry/confirm-receipt-entry", reason);
};
