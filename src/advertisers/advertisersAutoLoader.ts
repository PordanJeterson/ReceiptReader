import { sync } from "glob";
import { resolve } from "path";
import { AdResponse, Advertiser } from "../interfaces";
import settle from "../services/promiseSettle";

interface SettleInterface extends Promise<any> {
    settle: Function;
}

// doing some crazy stuff with adding onto Promises here, typescript does NOT like this
// @ts-ignore
const promise: SettleInterface = Promise;
// @ts-ignore
promise.settle = settle;

class AdvertisersAutoLoader {
    providers: Advertiser[];

    constructor() {
        this.providers = [];
        this.loadAdvertisers();
    }

    private loadAdvertisers = () => {
        sync(resolve(__dirname, "load", "*.js"))
            .forEach((advertiser) => {
                const loaded = require(resolve(advertiser));
                this.providers.push(loaded.default);
            }, this);
        // would be cool if we could hot load these, requires a restart right now
    };

    public getAds = async (type: string, zipCode: string): Promise<AdResponse[]> => {
        const adsArray = this.providers.map((provider) => {
            return provider.getAds(zipCode, type);
        });
        const ads = await this.resolvePromises(adsArray);
        return this.sortByBid(ads);
    };

    private resolvePromises = async (adsArray: Promise<AdResponse[]>[]): Promise<AdResponse[]> => {
        return promise.settle(adsArray).then(
            (results: Promise<AdResponse[]>[]) => {
                let adsResolved: Promise<AdResponse[]>[] = [];
                results.forEach((result) => {
                    // @ts-ignore
                    if (result.isFulfilled()) {
                        // @ts-ignore
                        adsResolved = adsResolved.concat(result.value());
                    }
                });
                return adsResolved;
            }
        );
    };

    private sortByBid = (ads: AdResponse[]): AdResponse[] => {
        const prices = ads.sort((a, b) => {
            if (a.bid > b.bid) {
                return -1;
            } else if (a.bid < b.bid) {
                return 1;
            }
            return 0;
        });
        return prices;
    };
}

export const advertisersAutoLoader = new AdvertisersAutoLoader();