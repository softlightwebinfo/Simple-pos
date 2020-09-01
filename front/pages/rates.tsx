import React, {Component} from "react";
import {connect} from "react-redux";
import Template from "@components/Template";
import {BannerTitle} from "@components/BannerTitle";
import SectionRates from "@components/SectionRates";
import {getBanner} from "../Framework/models/functions";
import {IBanner} from "../Framework/interfaces/IBannerReducer";
import {setting} from "@settings";
import {studiosAllRequest, studiosAllPricesRequest} from "../Framework/store/dispatch/studio";

class Rates extends Component<{
    banner: IBanner;
}> {
    static async getInitialProps(ctx) {
        const {isServer, store, req} = ctx;
        let banner = getBanner(store, "rates", item => {
            item.title = store.getState().translate.translation.rates;
            return item;
        });
        if (!store.getState().studio.studios.length) {
            await store.dispatch(studiosAllRequest(req ? req.headers.cookie : undefined));
        }
        if (!store.getState().studio.prices.length) {
            await store.dispatch(studiosAllPricesRequest(req ? req.headers.cookie : undefined));
        }
        return {isServer, banner};
    }

    componentDidMount() {
        // @ts-ignore
        const {dispatch, isServer, translate} = this.props;

        if (isServer && !translate) {
            //dispatch(ActionCreator.translationRequest("es"));
        }
    }

    render() {
        return (
            <Template
                title={"Rates"}
                description={setting.description}
            >
                <BannerTitle
                    title={this.props.banner.title}
                    banner={this.props.banner.imageURI}
                />
                <SectionRates/>
            </Template>
        );
    }
}

export default connect()(Rates);
