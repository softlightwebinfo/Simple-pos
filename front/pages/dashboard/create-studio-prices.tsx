import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {IStudioReducer} from "../../Framework/interfaces/IStudioReducer";
import {CreateStudioPrices} from "../../Framework/containers/CreateStudioPrices";
// @ts-ignore
import {Router} from '@routes';
import {withRouter} from 'next/router';

export type CreateStudioPriceState = {
    id: number;
};
@connect(state => state)
// @ts-ignore
@Auth
// @ts-ignore
@withRouter
export default class Index extends Component<{
    dispatch: any;
    studio: IStudioReducer;
    router: any;
}, CreateStudioPriceState> {
    state: CreateStudioPriceState = {
        id: this.props.router.query.id,
    };

    constructor(props) {
        super(props);
    }

    static async getInitialProps(ctx) {
        const {isServer, store} = ctx;
        let st = store.getState()
        if (!st.studio.studios.length) {

        }
        return {isServer};
    }

    get title() {
        return "Create new studio price";
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.studio.parseStudioLoaded && this.props.studio.parseStudioLoaded) {
            Router.pushRoute("dashboard-create-studio-images", {
                id: this.state.id,
            })
        }
    }

    render() {
        return (
            <Dashboard
                title={this.title}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Create studio price"},
                ]}
            >
                <CreateStudioPrices

                />
            </Dashboard>
        );
    }
}
