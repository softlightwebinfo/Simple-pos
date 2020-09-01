import React, {Component} from "react";
import {connect} from "react-redux";
import Head from "next/head";
import {AuthLoginLayout} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link, Router} from '../routes';
import {Preload} from "@components/Preload";
import {setting} from "settings";
import {auth} from "../Framework/store/dispatch/auth";

class Login extends Component<{
    dispatch: any;
    auth: {
        authLoaded: boolean;
        auth: any;
    }
}> {
    public state = {
        email: "",
        password: ""
    };

    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        if (ctx.store.getState().auth.auth) {
            if (ctx.res) {
                ctx.res.writeHead(302, {Location: '/dashboard'});
                return ctx.res.end();
            } else {
                Router.pushRoute("/");
                return;
            }
        }
        return {isServer};
    }

    componentDidMount() {
        if (this.props.auth.auth) {
            Router.pushRoute("/dashboard")
        }
    }

    onSubmit = async (e: any) => {
        e.preventDefault();
        const {email, password} = this.state;
        await this.props.dispatch(auth(email, password));
    };

    componentDidUpdate(prev): void {
        if (!prev.auth.auth && this.props.auth.auth) {
            Router.pushRoute("/dashboard")
        }
    }

    render() {
        //console.log(this.props.auth);
        return (
            <div>
                <Head>
                    <title>Login</title>
                    <meta name="title" content="my website"/>
                </Head>
                <Preload show={this.props.auth.authLoaded}/>
                <AuthLoginLayout
                    textOtherScreen={"Registrar"}
                    footerAccountText={"¿Aún no tienes una cuenta?"}
                    onSubmit={this.onSubmit}
                    passwordValue={this.state.password}
                    emailValue={this.state.email}
                    onChange={(e) => {
                        this.setState({
                            [e.target.id]: e.target.value,
                        })
                    }}
                    subTitle={"Acceso a nuestro tablero"}
                    title={"Login"}
                    logo={setting.logo}
                    logoTitle={"Logo"}
                    routeLogo={"/"}
                    componentLinkOtherScreen={(_, children) => (
                        <Link to={"register"}>
                            <a>{children}</a>
                        </Link>
                    )}
                    componentForgotPassword={(_, __) => (
                        <span>
                        {/*    <Link to={"forgot"}>*/}
                            {/*    <a>{children}</a>*/}
                            {/*</Link>*/}
                      </span>
                    )}
                />
            </div>
        );
    }
}

export default connect(state => ({auth: state.auth}))(Login);
