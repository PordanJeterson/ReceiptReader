import { NewLeadInterface } from "../interfaces/NewLead";
import { LeadType } from "../enums/LeadType";

const validate = {
        zipCode: (zipCode: string) => {
            return "string" == typeof zipCode && (/^\d{5}$/.test(zipCode) || 0 === zipCode.length);
        },
        firstName: (firstName: string) => {
            return "string" == typeof firstName && firstName.length > 1;
        },
        lastName: (lastName: string) => {
            return "string" == typeof lastName && lastName.length > 1;
        },
        state: (state: string) => {
            return "string" == typeof state && 2 === state.length || "string" == typeof state && 0 === state.length;
        },
        leadType: (leadType: LeadType) => {
            return leadType !== LeadType.none;
        }
    }
;


export const validateForm = (lead: NewLeadInterface) => {

};