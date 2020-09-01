/* eslint-disable react/no-danger, import/no-unresolved */
import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="es">
            <Head>
                <meta charSet="utf-8"/>
                <link href="/static/css/index.css" rel="stylesheet"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}
