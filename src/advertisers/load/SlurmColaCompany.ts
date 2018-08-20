import { AdResponse, Advertiser } from "../../interfaces";

class SlurmColaCompany extends Advertiser {

    constructor() {
        super()
    }

    ads: AdResponse = {
        ads: [
            {
                "description": "It's good for your health",
                "title": "Buy some Insurance"
            }
        ],
        advertiser: 456,
        types: [
            "health",
            "home"
        ],
        zips: [
            "41018"
        ],
        bid: 2.50
    };


    getAds = async (zipCode: string, insuranceType: string) => {
        return this.filterAdsByZipAndType(zipCode, insuranceType, [this.ads]);
    };
}

const slurmColaCompany = new SlurmColaCompany();
export default slurmColaCompany;