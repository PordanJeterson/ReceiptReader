const getStateByZip = async (zipCode: string) => {
    return fetch(`${window.location.origin}/api`)
        .then(
            (response) => (response.json())
        )
        .catch((error) => {
            console.log(`An error occurred!`, error);
        });
};

export { getStateByZip };