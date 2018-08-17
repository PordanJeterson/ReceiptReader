import { NewLead } from "../interfaces/NewLead";

const validate = {
        zipCode: function (zipCode: string) {
            return "string" == typeof zipCode && (/^\d{5}$/.test(zipCode) || 0 === zipCode.length);
        },
        firstName: function (firstName: string) {
            return "string" == typeof firstName && firstName.length > 1;
        },
        lastName: function (lastName: string) {
            return "string" == typeof lastName && lastName.length > 1;
        },
        state: function (state: string) {
            return "string" == typeof state && 2 === state.length || "string" == typeof state && 0 === state.length;
        }
    }
;


export const validateForm = (lead:NewLead) => {

};