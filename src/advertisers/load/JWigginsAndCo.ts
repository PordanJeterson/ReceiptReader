import { AdResponse, Advertiser } from "../../interfaces";

class JWigginsAndCo extends Advertiser {

    constructor() {
        super()
    }


    ads: AdResponse = {
        "ads": [
            {
                "description": "It's good and it's cheap",
                "title": "Buy our Insurance"
            }
        ],
        "advertiser": 123,
        "types": [
            "home",
            "health",
            "auto",
            "life"
        ],
        "zips": [
            "64108",
            "66212",
            "66062",
            "41018"
        ],
        "bid": 3.00
    };


    getAds = async (zipCode: string, insuranceType: string) => {
        return this.filterAdsByZipAndType(zipCode, insuranceType, [this.ads]);
    };
}

const jWigginsAndCo = new JWigginsAndCo();
export default jWigginsAndCo;