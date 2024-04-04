import { PUT } from "api";
import dayjs from "dayjs";

export const updateInvoice = async (invcUkey, bodyData) => {
  return await PUT(`/invc/issuedInfo`, bodyData);
};

export const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
