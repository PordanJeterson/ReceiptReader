import {values} from "node-persist";
import { LeadInterface } from "../interfaces";

const getLeads = (): LeadInterface[] => {
    // @ts-ignore
    return values()
};

export {getLeads}