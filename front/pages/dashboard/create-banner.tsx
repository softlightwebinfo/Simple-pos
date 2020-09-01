import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {Form, FormLayout} from "@codeunic/library-ui/build";
import {bannerRequest} from "../../Framework/store/actions/banner";

//import {END} from "redux-saga";

class Index extends Component<{
    dispatch: any;
}> {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    render() {
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
                        id: "Title", outline: true,
                        placeholder: "Title"
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Subtitle"}))
                    .Add(component.Input({
                        id: "Subtitle", outline: true,
                        placeholder: "Subtitle",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Route"}))
                    .Add(component.Input({
                        id: "Route", outline: true,
                        placeholder: "Route",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Button"}))
                    .Add(component.Input({
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
        return (
            <Dashboard
                title={"Create new banner"}
                breadcrumb={[]}
            >
                <FormLayout
                    form={form}
                    onSubmit={values => {
                        this.props.dispatch(bannerRequest(values));
                    }}
                />
            </Dashboard>
        );
    }
}

export default connect(state => state)(Auth(Index));
