// this can be used by the form to ensure that ONLY these values are assigned to a Lead

import { LeadInterface } from "../interfaces";

enum LeadType {
    auto = "auto",
    health = "health",
    home = "home",
    life = "life",
}

const zipCode = (zipCode: string) => ("string" == typeof zipCode && (/^\d{5}$/.test(zipCode)));
const leadType = (leadType: string) => (Object.keys(LeadType).includes(leadType));
const firstName = (firstName: string) => (firstName.length > 0);
const lastName = (lastName: string) => (lastName.length > 0);
const state = (state: string) => (state.length === 2);

const validate = (lead: LeadInterface) => {
    return zipCode(lead.zipCode)
        && leadType(lead.leadType)
        && firstName(lead.firstName)
        && lastName(lead.lastName)
        && state(lead.state)
        ;
};

export { zipCode, leadType, validate };
