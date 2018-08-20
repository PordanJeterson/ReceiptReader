interface Ad {
    description: string;
    title: string;
}

interface AdResponse {
    ads: Ad[];
    advertiser: number;
    types: string[];
    zips: string[];
    bid: number;
}


// this allows us to have any number of advertisers without changing our code
// ensures each one has the same return types so the loader will work
abstract class Advertiser {

    abstract async getAds(zipCode: string, insuranceType: string): Promise<AdResponse[]>;

    protected filterAdsByZipAndType = (zipCode: string, insuranceType: string, ads: AdResponse[]) => {
        const filteredByZip = this.filterByZip(zipCode, ads);
        return this.filterByType(insuranceType, filteredByZip);
    };

    protected filterByZip = (zipCode: string, ads: AdResponse[]): AdResponse[] => {
        return ads.filter((ad) => {
            return ad.zips.includes(zipCode);
        });
    };

    protected filterByType = (type: string, ads: AdResponse[]): AdResponse[] => {
        return ads.filter((ad) => {
            return ad.types.includes(type);
        });
    };
}

export { Ad, AdResponse, Advertiser };