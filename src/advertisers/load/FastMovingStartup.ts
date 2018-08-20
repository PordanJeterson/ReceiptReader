import { Advertiser } from "../../interfaces";

class FastMovingStartup extends Advertiser {

    constructor() {
        super();
    }

    getAds = async (zipCode: string, insuranceType: string) => {
        return Promise.reject("We got bought by Google and shut down! We'll be in Fiji if you need us.");
    };
}

const fastMovingStartup = new FastMovingStartup();
export default fastMovingStartup;