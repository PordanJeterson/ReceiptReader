import { Receipt } from "../interfaces";

const submitReceipt = (receipt: Receipt) => {
    // todo get the endpoint into a const
    const endpoint = `${window.location.origin}/api/lead`;

    console.log(receipt);
    return fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(receipt),
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

export { submitReceipt };