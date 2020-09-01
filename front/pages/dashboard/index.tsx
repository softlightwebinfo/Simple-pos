import React, {Component} from "react";
import {connect} from "react-redux";
import DashboardHomePage from "@components/DashboardHomePage";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";

//import {END} from "redux-saga";

class Index extends Component {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    render() {
        return (
            <Dashboard
                breadcrumb={[]}
                title={""}
            >
                <DashboardHomePage/>
            </Dashboard>
        );
    }
}

export default connect(state => state)(Auth(Index));
