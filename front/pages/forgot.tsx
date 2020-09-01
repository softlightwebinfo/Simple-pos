import React, {Component} from "react";
import {connect} from "react-redux";
import Head from "next/head";
import {translationRequest} from "../Framework/store/actions/translate";
import {AuthForgotLayout} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from '../routes';

//import {END} from "redux-saga";

class Forgot extends Component {
    static async getInitialProps(ctx) {
        const {isServer, store} = ctx;
        store.dispatch(translationRequest("es"));
        // if (ctx.req) {
        //     ctx.store.dispatch(END);
        //     await ctx.store.sagaTask.toPromise();
        // }
        return {isServer};
    }

    componentDidMount() {
        // @ts-ignore
        const {dispatch, isServer, translate} = this.props;

        if (isServer && !translate) {
            //dispatch(ActionCreator.translationRequest("es"));
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>My website</title>
                    <meta name="title" content="my website"/>
                </Head>
                <AuthForgotLayout
                    textOtherScreen={"Login"}
                    footerAccountText={"Remember your password?"}
                    onSubmit={() => {
                    }}
                    passwordValue={"1234"}
                    emailValue={"test@test.com"}
                    onChange={() => {
                    }}
                    subTitle={"Enter your email to get a password reset link"}
                    title={"Forgot Password?"}
                    logo={"https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"}
                    logoTitle={"Logo"}
                    routeLogo={"/"}
                    extras={[
                        {label: "Apply job"}
                    ]}
                    componentLinkOtherScreen={(_, children) => (
                        <Link to={"login"}>
                            <a>{children}</a>
                        </Link>
                    )}
                />
            </div>
        );
    }
}

export default connect()(Forgot);
