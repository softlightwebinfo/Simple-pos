import React, {Component} from "react";
import {Form, FormLayout} from "@codeunic/library-ui/build";
import {createStudioRequest} from "../store/dispatch/studio";
import {connect} from 'react-redux';

@connect()
export class CreateStudio extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const form = new Form("form-layout", {
            card: true,
        });
        const component = form.Component();
        form
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Title"}))
                    .Add(component.Input({
                        id: "title", outline: true,
                        placeholder: "Title"
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Description"}))
                    .Add(component.Input({
                        id: "description", outline: true,
                        placeholder: "Description",
                        multiline: true,
                        rows: 0,
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Size"}))
                    .Add(component.Input({
                        id: "size", outline: true,
                        placeholder: "300x200",
                        value: "300x200",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Capacity"}))
                    .Add(component.Input({
                        id: "capacity", outline: true,
                        type: "number",
                        placeholder: "4",
                        value: "4",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Price from"}))
                    .Add(component.Input({
                        id: "priceFrom", outline: true,
                        type: "text",
                        placeholder: "Price from",
                        value: "4.4",
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Is hour"}))
                    .Add(component.Checkbox({
                        id: "isPrice",
                        name: "isPrice",
                    }, "Is hour"))
            )
            .Add(
                component.Button({
                    children: "Submit",
                    style: {width: 'min-content'},
                    type: "submit",
                    variant: "outlined",
                    theme: "success"
                })
            );
        return (
            <FormLayout
                form={form}
                onSubmit={values => {
                    this.props.dispatch(createStudioRequest(values));
                }}
            />
        )
    }
}