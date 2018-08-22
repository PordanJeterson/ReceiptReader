import { setItem } from "node-persist";
import { Receipt } from "../interfaces/Receipt";

const saveReceipt = (receipt: Receipt) => {
    setItem(receipt.id, receipt);
};

export { saveReceipt };