import {IBanner} from "../interfaces/IBannerReducer";
import {bannerDefault} from "settings";

export const getBanner = (store, page, callback?: (item: IBanner) => IBanner) => {
    const str = store.getState();
    let banner: IBanner = bannerDefault[page];
    if (str.banner.banners.length) {
        let bn = str.banner.banners.find(i => i.page == page && i.active);
        if (bn) {
            bn.imageURI = `/images/banners/${bn.image}`;
            banner = bn;
        }
    }
    if (callback) {
        return callback(banner);
    }
    return banner;
};
