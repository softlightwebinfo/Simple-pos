import {Component} from "react";
import * as React from "react";
import {connect} from 'react-redux';
// @ts-ignore
import {Route, Router} from '@routes';
import Login from "../../pages/login";

export function Auth(WrappedComponent) {
    @connect(state => ({
        auth: state.auth.auth,
        isLogin: state.auth.auth != null
    }))
    class Index extends Component<{
        isLogin: boolean;
        auth: any;
    }> {
        static async getInitialProps(ctx) {
            let store = ctx.store.getState();
            if (store.auth.auth && store.auth.auth.user.id != 1) {
                if (ctx.res) {
                    ctx.res.writeHead(302, {Location: '/'});
                    return ctx.res.end();
                } else {
                    Router.pushRoute("/");
                    return;
                }
            }
            return WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
        }

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            if (this.props.isLogin && this.props.auth.user.id != 1) {
                Router.pushRoute("/");
            }
        }

        render() {
            if (this.props.isLogin) {
                return <WrappedComponent {...this.props}/>
            }
            return <Login/>
        }
    }

    return Index;
}
