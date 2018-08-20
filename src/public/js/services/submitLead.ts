import { NewLeadInterface } from "../interfaces";

const submitLead = (lead: NewLeadInterface) => {
    // todo get the endpoint into a const
    const endpoint = `${window.location.origin}/api/lead`;
    console.log(endpoint);
    let formData = new FormData();
    Object.keys(lead).forEach((key) => {
        const value = lead[key];
        formData.append(key, value);
    });

    return fetch(endpoint, {
        method: "POST",
        body: formData
    })
        .then(
            (response) => (response.json())
        )
        .catch((error) => {
            console.log(`Failed to submit lead`, error);
        });
};

export { submitLead };