import { LeadType } from "../enums/LeadType";

export interface NewLeadInterface extends FormData {
    [key: string]: any;

    zipCode: string;
    firstName: string;
    lastName: string;
    leadType: LeadType;
    state: string;
}