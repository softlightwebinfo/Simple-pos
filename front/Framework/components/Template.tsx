import React from "react";
import {ITemplate} from "../props/ITemplate";
import Head from "next/head";
import {setting} from "settings";
import {Preload} from "@components/Preload";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Template = (props: ITemplate) => (
    <div className={"template"}>
        <Head>
            <title>{`${props.title} - ${setting.appName}`.slice(0, 72)}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="profile" href="https://gmpg.org/xfn/11"/>
            <link rel="shortcut icon" href="/static/images/logoIcon.png" type="image/x-icon"/>
            <meta name="description" content={`${setting.appName} - ${props.description}`.slice(0, 172)}/>
            <link rel="canonical" href={setting.canonical}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={`${props.title} - ${setting.appName}`}/>
            <meta property="og:description" content={`${setting.appName} - ${props.description}`}/>
            <meta property="og:url" content={setting.canonical}/>
            <meta property="og:site_name" content={setting.appName}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:description" content={`${setting.appName} - ${props.description}`}/>
            <meta name="twitter:title" content={`${props.title} - ${setting.appName}`}/>
            <meta name="twitter:image" content="/static/images/logoIcon.png"/>
            <script
                type="application/ld+json"
                className="yoast-schema-graph yoast-schema-graph--main"
                dangerouslySetInnerHTML={{
                    __html: `
                {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${setting.canonical}/#organization",
      "name": "ThemeCube",
      "url": "${setting.canonical}",
      "sameAs": [

      ],
      "logo": {
        "@type": "ImageObject",
        "@id": "${setting.canonical}/#logo",
        "url": "https://www.mallorcaliverecordingstudio.com/static/images/logoIcon.png",
        "width": 180,
        "height": 180,
        "caption": "Mallorca live recording studio"
      },
      "image": {
        "@id": "${setting.canonical}static/images/logoIcon.png"
      }
    },
    {
      "@type": "WebSite",
      "@id": "${setting.canonical}#website",
      "url": "${setting.canonical}",
      "name": "${props.title} - ${setting.appName}",
      "publisher": {
        "@id": "${setting.canonical}#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${setting.canonical}?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ImageObject",
      "@id": "${setting.canonical}#primaryimage",
      "url": "${setting.canonical}static/images/logoIcon.png",
      "width": 1920,
      "height": 1080
    },
    {
      "@type": "WebPage",
      "@id": "${setting.canonical}#webpage",
      "url": "${setting.canonical}",
      "inLanguage": "en-US",
      "name": "${props.title} - ${setting.appName}",
      "isPartOf": {
        "@id": "${setting.canonical}#website"
      },
      "about": {
        "@id": "${setting.canonical}#organization"
      },
      "primaryImageOfPage": {
        "@id": "${setting.canonical}#primaryimage"
      },
      "datePublished": "2018-12-18T17:18:21+00:00",
      "dateModified": "2019-02-09T11:39:08+00:00",
      "description": "${setting.appName} - ${props.description}"
    }
  ]
}
                `
                }}
            />
            {/*<link rel="alternate" type="application/rss+xml" title="Rehearsal » Comments Feed" href="http://wpthemecube.com/rehearsal/comments/feed/">*/}
            {/*<link rel="alternate" type="text/calendar" title="Rehearsal » iCal Feed" href="http://wpthemecube.com/rehearsal/events/?ical=1">*/}
            <link rel="https://api.w.org/" href={`${setting.canonical}/wp-json/`}/>
            <link rel="shortlink" href={setting.canonical}/>
        </Head>
        <Preload/>
        <Header/>
        <main className={"template-content"}>
            {props.children}
        </main>
        <footer className={"template-footer"}>
            <Footer/>
        </footer>
    </div>
);
export default Template;