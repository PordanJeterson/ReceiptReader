import { LeadInterface } from "../interfaces";
import { setItem } from "node-persist";

const saveLead = (lead: LeadInterface) => {
    setItem(lead.firstName, lead);
};

export { saveLead };