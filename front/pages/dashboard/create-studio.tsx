import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {CreateStudio} from "../../Framework/containers/createStudio";
import {IStudioReducer} from "../../Framework/interfaces/IStudioReducer";
// @ts-ignore
import {Router} from '@routes';

export enum createStudioStep {
    INFO = 1,
    PRICES = 2,
    IMAGES = 3,
}

type CreateStudioState = {
    step: createStudioStep;
}

class Index extends Component<{
    dispatch: any;
    studio: IStudioReducer;
}, CreateStudioState> {
    state: CreateStudioState = {
        step: createStudioStep.INFO,
    };

    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    get title() {
        return "Create new Studio";
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.studio.parseStudioLoaded && this.props.studio.parseStudioLoaded) {
            Router.pushRoute("dashboard-create-studio-prices", {
                id: this.props.studio.selected,
            });
        }
    }

    render() {
        return (
            <Dashboard
                title={this.title}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Create studio"},
                ]}
            >
                <CreateStudio/>
            </Dashboard>
        );
    }
}

export default connect(state => state)(Auth(Index));
