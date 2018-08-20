import { NewLeadErrorInterface, NewLeadInterface } from "../interfaces";
import { LeadType } from "../enums/LeadType";
import { ValidateFieldInterface } from "../interfaces";

const validateField: ValidateFieldInterface = {
        zipCode: (zipCode: string) => {
            return "string" == typeof zipCode && (/^\d{5}$/.test(zipCode));
        },
        firstName: (firstName: string) => {
            return "string" == typeof firstName && firstName.length >= 1;
        },
        lastName: (lastName: string) => {
            return "string" == typeof lastName && lastName.length >= 1;
        },
        state: (state: string) => {
            return "string" == typeof state && 2 === state.length;
        },
        leadType: (leadType: LeadType) => {
            return leadType !== LeadType.none;
        }
    }
;

// technically this only returns true or NewLeadErrorInterface, but can't specify that "false" can never occur
interface validateFormFunc {
    (lead: NewLeadInterface): NewLeadErrorInterface
}

let accumulator: NewLeadErrorInterface = {
    firstName: {
        isInvalid: true,
    },
    lastName: {
        isInvalid: true,
    },
    leadType: {
        isInvalid: true,
    },
    state: {
        isInvalid: true,
    },
    zipCode: {
        isInvalid: true,
    },
    dirty: {
        isInvalid: true,
        dirty: false
    }
};

let validateForm: validateFormFunc;
validateForm = (lead: NewLeadInterface) => {
    const validation = Object.keys(lead).reduce((acc, value) => {
        const isValid = validateField[value](lead[value]);
        acc[value].isInvalid = !isValid;
        return acc;
    }, accumulator);
    // if one is valid the form is invalid
    validation.dirty.isInvalid = Object.keys(validation).some((value) => {
        return validation[value].isInvalid;
    });
    return validation;
};

export { validateField, validateForm };