import { LeadType } from "../enums/LeadType";

export interface NewLead {
    zipCode: string;
    firstName: string;
    lastName: string;
    leadType: LeadType
}