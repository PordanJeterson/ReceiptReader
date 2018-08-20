import { AdResponse, Advertiser } from "../../interfaces";

class TakesALongTimeToRespond extends Advertiser {

    constructor() {
        super();
    }

    ads: AdResponse = {
        ads: [
            {
                "description": "It's good and it's cheap",
                "title": "Buy home Insurance"
            }
        ],
        advertiser: 789,
        types: [
            "home"
        ],
        zips: [
            "64108",
            "66212",
            "66062",
            "41018"
        ],
        bid: 1.25
    };


    getAds = async (zipCode: string, insuranceType: string) => {
        const timeout = (ms: number) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        await timeout(Math.random() * 2 * 1000);
        return this.filterAdsByZipAndType(zipCode, insuranceType, [this.ads]);
    };
}

const takesALongTimeToRespond = new TakesALongTimeToRespond();
export default takesALongTimeToRespond;