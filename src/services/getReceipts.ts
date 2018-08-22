import { values } from "node-persist";

const getReceipts = () => {
    // @ts-ignore
    return values();
};

export {getReceipts};