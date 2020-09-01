import React, {Component} from "react";
import {Form, FormLayout} from "@codeunic/library-ui/build";
import {connect} from 'react-redux';
import moment from 'moment';
import {getApi, liveDescription} from "@settings";
import {Preload} from "@components/Preload";
// @ts-ignore
import {Router} from "@routes";

@connect()
export class CreateStream extends Component<any, any> {
    state = {
        file: null,
        loading: false,
    };

    constructor(props) {
        super(props);
    }

    onSubmit = async (values) => {
        let data = new FormData();
        Object.keys(values).forEach(value => {
            data.append(value, values[value]);
        })
        data.append("file", this.state.file || "");
        try {
            this.setState({loading: true})
            const res = await fetch(getApi(`stream`), {
                body: data,
                method: "POST",
            });
            await res.json();
            Router.pushRoute("dashboard-streams");
        } catch (err) {
            console.error(err)
        }
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
                        placeholder: "Title",
                        value: `Radio Mallorca Live Recording Studio - ${moment().format("DD-MM-YYYY")}`,
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
                        value: liveDescription.trim(),
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Clicks"}))
                    .Add(component.Input({
                        id: "clicks",
                        outline: true,
                        placeholder: "Clicks",
                        type: "number",
                        value: "0",
                        rows: 0,
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Views"}))
                    .Add(component.Input({
                        id: "views",
                        outline: true,
                        placeholder: "Views",
                        type: "number",
                        value: "10",
                        rows: 0,
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Likes"}))
                    .Add(component.Input({
                        id: "likes",
                        outline: true,
                        placeholder: "Views",
                        type: "number",
                        value: "4",
                        rows: 0,
                    }))
            )
            .Add(
                form.Group({form: true})
                    .Add(component.FormLabel({children: "Dislikes"}))
                    .Add(component.Input({
                        id: "dislikes",
                        outline: true,
                        placeholder: "Views",
                        type: "number",
                        value: "0",
                        rows: 0,
                    }))
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
            <>
                <Preload show={this.state.loading}/>
                <FormLayout
                    form={form}
                    onSubmit={async values => {
                        await this.onSubmit(values);
                    }}
                />
                <input type={"file"} accept="video/mp4,video/x-m4v,video/*"
                       onChange={e => this.setState({file: e.target.files && e.target.files[0]})}/>
            </>
        )
    }
}