interface validateFunc {
    (toValidate: string): boolean
}

interface ValidateFieldInterface {
    [index: string]: any;

    zipCode: validateFunc,
    firstName: validateFunc,
    lastName: validateFunc,
    state: validateFunc,
    leadType: validateFunc
}

export { validateFunc, ValidateFieldInterface };