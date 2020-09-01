export interface IBannerReducer {
    parseBannerLoaded: boolean,
    bannerLoaded: boolean,
    banners: IBanner[],
    error: boolean,
    errorMessage: string
}

export interface IBanner {
    id: number;
    title: string;
    subtitle?: string;
    page: string;
    route?: string;
    button?: string;
    image: string;
    imageURI: string;
    active: boolean;
}
