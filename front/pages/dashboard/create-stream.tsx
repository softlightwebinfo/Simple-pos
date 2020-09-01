import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {IStudioReducer} from "../../Framework/interfaces/IStudioReducer";
// @ts-ignore
import {Router} from '@routes';
import {CreateStream} from "../../Framework/containers/CreateStream";

class Index extends Component<{
    dispatch: any;
    studio: IStudioReducer;
}, any> {

    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    get title() {
        return "Create new Stream";
    }

    render() {
        return (
            <Dashboard
                title={this.title}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Create Stream"},
                ]}
            >
                <CreateStream/>
            </Dashboard>
        );
    }
}

export default connect(state => state)(Auth(Index));
