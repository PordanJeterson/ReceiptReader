interface getStateByZip {
    (zipCode: string): { message: string, error: any } | { state: string }
}

const getStateByZip = (zipCode: string) => {
    // todo get the endpoint into a const
    const endpoint = `${window.location.origin}/api/state/${zipCode}`;
    console.log(endpoint);
    return fetch(endpoint)
        .then(
            (response) => (response.json())
        )
        .catch((error) => {
            console.log(`An error occurred!`, error);
        });
};

export { getStateByZip };