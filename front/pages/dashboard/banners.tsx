import React, {Component, Fragment, ReactElement} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {IBanner} from "../../Framework/interfaces/IBannerReducer";
import {HeadBanner} from "@components/HeadBanner";
import {BannerTitle} from "@components/BannerTitle";
import {EditContainerBanner} from "@components/EditContainerBanner";
import {ButtonComponent} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from '@routes';

//import {END} from "redux-saga";

class Index extends Component<{
    banner: {
        banners: IBanner[];
    }
}> {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    render() {
        return (
            <Dashboard
                title={"Banners"}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Banners"},
                ]}
                extraTitle={(
                    <Link to={"dashboard-create-banner"}>
                        <a style={{textDecoration: "none"}}>
                            <ButtonComponent theme={"info"} variant={"outlined"}>
                                Create Banner
                            </ButtonComponent>
                        </a>
                    </Link>
                )}
            >
                {this.props.banner.banners.map((item, index) => {
                    let bnner: ReactElement = <Fragment/>;
                    if (!item.button && !item.route && !item.subtitle) {
                        bnner = <BannerTitle
                            banner={`/images/banners/${item.image}`}
                            title={item.title}
                        />
                    } else {
                        bnner = <HeadBanner
                            route={item.route || "index"}
                            banner={`/images/banners/${item.image}`}
                            title={item.title}
                            subTitle={item.subtitle || ""}
                            button={item.button || ""}
                        />
                    }
                    return (
                        <EditContainerBanner banner={item} key={index}>
                            {bnner}
                        </EditContainerBanner>
                    );
                })}
            </Dashboard>
        );
    }
}

export default connect(state => state)(Auth(Index));
