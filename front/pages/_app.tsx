import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import wrapper from "../Framework/store/store";
import {authInitial} from "../Framework/store/dispatch/auth";
import {getAllBanner} from "../Framework/store/dispatch/banner";
import {changeLanguage} from "../Framework/store/dispatch/translate";
import 'react-hls/src/styles/index.scss'; // need to import basic styles

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const {store} = ctx;
        await store.dispatch(changeLanguage({language: "es"}));
        // @ts-ignore
        await store.dispatch(authInitial(ctx.req ? ctx.req.headers.cookie : undefined));
        if (!store.getState().banner.banners.length) {
            await store.dispatch(getAllBanner());
        }
        const pageProps = {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        };
        return {pageProps}
    }


    constructor(props) {
        super(props)
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <>
                <Head>
                    <title>My page</title>
                </Head>
                <Component {...pageProps}/>
            </>
        );
    }
}

export default wrapper.withRedux(MyApp)


