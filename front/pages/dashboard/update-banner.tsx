import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {Form, FormLayout, GridComponent} from "@codeunic/library-ui/build";
import {bannerUpdateRequest} from "../../Framework/store/actions/banner";
import {IBanner} from "../../Framework/interfaces/IBannerReducer";
import {HeadBanner} from "@components/HeadBanner";
import {BannerTitle} from "@components/BannerTitle";
// @ts-ignore
import {Router} from '@routes';
import {Preload} from "@components/Preload";

//import {END} from "redux-saga";

class Index extends Component<{
    dispatch: any;
    parseBannerLoaded: boolean;
    bannerLoaded: boolean;
    banner: IBanner;
}> {
    public state = {
        review: null,
        image: `/images/banners/${this.props.banner.image}`,
    };

    static async getInitialProps(ctx) {
        const {isServer, store} = ctx;
        const state = store.getState();
        const banner = state.banner.banners.find(i => i.id == ctx.query.id);
        return {isServer, banner};
    }

    componentDidUpdate(prevProps): void {
        if (!prevProps.parseBannerLoaded && this.props.parseBannerLoaded) {
            Router.pushRoute("dashboard-banners");
        }
    }

    render() {
        const banner = this.props.banner;
        const form = new Form("form-layout", {
            card: true,
        });
        const component = form.Component();
        form
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Pages"}))
                    .Add(component.Select({
                        id: "page",
                        value: banner.page,
                        options: [
                            {value: "-", label: "Select page"},
                            {value: "home", label: "Home"},
                            {value: "studios", label: "Studios"},
                            {value: "recording", label: "Recording"},
                            {value: "rates", label: "Rates"},
                            {value: "events", label: "Events"},
                            {value: "shop", label: "Shop"},
                        ],
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Title"}))
                    .Add(component.Input({
                        value: banner.title,
                        id: "Title", outline: true,
                        placeholder: "Title"
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Subtitle"}))
                    .Add(component.Input({
                        value: banner.subtitle,
                        id: "Subtitle", outline: true,
                        placeholder: "Subtitle",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Route"}))
                    .Add(component.Input({
                        value: banner.route,
                        id: "Route", outline: true,
                        placeholder: "Route",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Button"}))
                    .Add(component.Input({
                        value: banner.button,
                        id: "Button", outline: true,
                        placeholder: "Button",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Image"}))
                    .Add(component.Input({
                        id: "File",
                        outline: true,
                        type: "file"
                    }))
            )
            .Add(
                component.Button({children: "Submit", style: {width: 'min-content'}, type: "submit", variant: "outlined", theme: "success"})
            );
        const {review, image} = this.state;
        return (
            <Dashboard
                title={"Update banner"}
                breadcrumb={[
                    {route: "/dashboard", label: "Dashboard"}
                ]}
            >
                <Preload show={this.props.bannerLoaded}/>
                <GridComponent container spacing={4}>
                    <GridComponent item xs={12} sm={6} md={12} lg={4}>
                        <FormLayout
                            form={form}
                            onChange={(_, __, values) => {
                                this.setState({
                                    review: values,
                                })
                            }}
                            onSubmit={values => {
                                this.props.dispatch(bannerUpdateRequest(banner.id, values));
                            }}
                        />
                    </GridComponent>
                    <GridComponent item xs={12} sm={6} md={12} lg={8}>
                        <>
                            {review && (
                                <>
                                    {
                                        // @ts-ignore
                                        (!review.Route && !review.Button && !review.Subtitle) ? (
                                            // @ts-ignore
                                            <BannerTitle banner={image} title={review.Title}/>
                                        ) : (
                                            <HeadBanner
                                                // @ts-ignore
                                                route={review.Route || "index"}
                                                // @ts-ignore
                                                button={review.Button}
                                                banner={image}
                                                // @ts-ignore
                                                title={review.Title}
                                                // @ts-ignore
                                                subTitle={review.Subtitle}
                                            />
                                        )
                                    }
                                </>
                            )}
                        </>
                    </GridComponent>
                </GridComponent>
            </Dashboard>
        );
    }
}

export default connect(state => ({
    parseBannerLoaded: state.banner.parseBannerLoaded,
    bannerLoaded: state.banner.bannerLoaded,
}))(Auth(Index));
