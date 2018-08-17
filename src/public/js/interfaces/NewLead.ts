import { LeadType } from "../enums/LeadType";

export interface NewLeadInterface {
    zipCode: string;
    firstName: string;
    lastName: string;
    leadType: LeadType;
    state: string;
}