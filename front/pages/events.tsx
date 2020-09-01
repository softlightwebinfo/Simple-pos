import React, {Component} from "react";
import {connect} from "react-redux";
import {translationRequest} from "../Framework/store/actions/translate";
import Template from "@components/Template";
import {BannerTitle} from "@components/BannerTitle";
import {Maintenance} from "@components/Maintenance";
import {getBanner} from "../Framework/models/functions";
import {IBanner} from "../Framework/interfaces/IBannerReducer";

//import {END} from "redux-saga";

class Index extends Component<{
    banner: IBanner;
}> {
    static async getInitialProps(ctx) {
        const {isServer, store} = ctx;
        store.dispatch(translationRequest("es"));
        let banner = getBanner(store, "events");
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
                title={"Events"}
                description={"live recording studio"}
            >
                <BannerTitle
                    title={this.props.banner.title}
                    banner={this.props.banner.imageURI}
                />
                <Maintenance/>
            </Template>
        );
    }
}

export default connect()(Index);
