interface GetLeads {
    (): Promise<{ message: string, error?: any }>
}

const getLeads: GetLeads = () => {
    // todo get the endpoint into a const
    const endpoint = `${window.location.origin}/api/lead/list`;
    return fetch(endpoint)
        .then(
            (response) => (response.json())
        )
        .then((jsonResponse) => {
            if (jsonResponse.error) {
                Promise.reject(jsonResponse.error);
            } else {
                return jsonResponse;
            }
        })
        .catch((error) => {
            console.log(`An error occurred!`, error);
        });
};

export { getLeads };