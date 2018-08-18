import fetch from "node-fetch";

interface ItaSource {
    source: string;
    source_last_updated: string;
    last_imported: string;
}

interface ItaResult {
    id: string;
    post: string;
    zip_code: string;
    state: string;
    office_name: string;
    address: string[];
    country: string;
    post_city: string | null;
    email: string;
    fax: string;
    mail_instructions: string;
    phone: string;
}

interface ItaDataFormat {
    total: number;
    offset: number;
    sources_used: ItaSource[];
    search_performed_at: string;
    results: ItaResult[];
}


const getStateByZipCode = (zipCode: string) => {
    if (/^\d{5}$/.test(zipCode)) {
        return fetch(`${process.env.ZIP_API_URL}?api_key=${process.env.ZIP_API_KEY}&zip_codes=${zipCode}`)
            .then((res) => (res.json()))
            .then((res) => {
                const usState = (res as ItaDataFormat).results[0].state;
                return {state: usState};
            })
            .catch((error) => {
                console.log(error);
                return {message: "an error occurred", error: error};
            });
    }
    const errorMessage = `bad ZIP code ${zipCode}`;
    return Promise.reject({message: errorMessage});
};

export { getStateByZipCode };