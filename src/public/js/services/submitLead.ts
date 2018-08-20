import { NewLeadInterface } from "../interfaces";

const submitLead = (lead: NewLeadInterface) => {
    // todo get the endpoint into a const
    const endpoint = `${window.location.origin}/api/lead`;

    console.log(lead);
    return fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(lead),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(
            (response) => (response.json())
        )
        .catch((error) => {
            console.log(`Failed to submit lead`, error);
        });
};

export { submitLead };