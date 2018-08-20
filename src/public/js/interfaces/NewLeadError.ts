interface errorInterface {
    dirty?: boolean,
    isInvalid: boolean
}

export interface NewLeadErrorInterface {
    [index: string]: errorInterface

    leadType: errorInterface
    firstName: errorInterface
    lastName: errorInterface;
    zipCode: errorInterface;
    state: errorInterface;

    dirty: errorInterface;
}