import { ValidationError, Receipt } from "../interfaces";

interface ValidateFunc {
    (toValidate: any): boolean
}

interface ValidateField {
    [key: string]: ValidateFunc
}

const validateField: ValidateField = {
        receipt: (receipt: Receipt) => {return true}
    }
;

// technically this only returns true or NewLeadErrorInterface, but can't specify that "false" can never occur
interface validateFormFunc {
    (lead: Receipt): ValidationError
}

let accumulator: ValidationError = {
    fields: []
};

let validateForm: validateFormFunc;
validateForm = (lead: Receipt) => {
    const validation = Object.keys(lead).reduce((acc, value) => {
        const isValid = validateField[value](lead[value]);
        acc[value].isInvalid = !isValid;
        return acc;
    }, accumulator);
    // if one is valid the form is invalid
    validation.dirty.isInvalid = Object.keys(validation).some((value) => {
        if (value === "dirty") {
            return false;
        }
        return validation[value].isInvalid;
    });
    return validation;
};

export { validateField, validateForm };