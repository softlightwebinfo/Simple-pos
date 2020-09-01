import {
    ButtonIconComponent,
    DashboardApp,
    IconComponent,
} from "@codeunic/library-ui/build";
import React, {Component, ReactElement} from "react";
import Head from "next/head";
import {langData, menuLogin, setting} from "settings";
import {authLogout} from "../store/dispatch/auth";
import {connect} from 'react-redux';
// @ts-ignore
import {Router} from '@routes';
import {IBreadcrumbComponentPropsData} from "@codeunic/library-ui/build/components/BreadcrumbComponent/BreadcrumbComponent.types";
import moment from "moment";

export interface IDashboard {
    title: string;
    extraTitle?: ReactElement;
    breadcrumb: IBreadcrumbComponentPropsData[];
    auth?: any;
    dispatch?: any;
    noTitle?: boolean;
}

@connect(state => ({
    auth: state.auth,
}))
export class Dashboard extends Component<IDashboard> {
    state = {
        time: moment(),
    }
    private interval: any;

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({time: moment()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    get time() {
        //Fri 28 Aug 2020 04:58 PM
        return this.state.time.format("dddd DD MMMM YYYY HH:mm:ss")
    }

    render() {
        return (
            <>
                <Head>
                    <title>{this.props.title} - {setting.appName}</title>
                    <meta name="title" content={setting.appName}/>
                </Head>
                <DashboardApp
                    header={{
                        actions: [
                            <span style={{color: "white", marginRight: 10}} key={1}>{this.time}</span>,
                            <ButtonIconComponent
                                key={2}
                            >
                                <IconComponent icon={"dashboard"} style={{color: "white"}}/>
                            </ButtonIconComponent>,
                            <ButtonIconComponent
                                key={2}
                            >
                                <IconComponent icon={"setting"} style={{color: "white"}}/>
                            </ButtonIconComponent>,
                            <ButtonIconComponent
                                key={3}
                            >
                                <IconComponent icon={"menu"} style={{color: "white"}}/>
                            </ButtonIconComponent>
                        ],
                        title: setting.appName,
                        logo: setting.logo,
                        routeLogo: "/",
                        langData: langData,
                        menuLogin: menuLogin,
                        isLogin: !!this.props.auth.auth,
                        lang: 2,
                        login: {
                            avatar: "https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg",
                            name: this.props.auth.auth.user.name,
                            status: "online",
                            onChange: async (e) => {
                                switch (e.value) {
                                    case 3: {
                                        await this.props.dispatch(authLogout());
                                        break;
                                    }
                                }
                            }
                        }
                    }}
                    onClickItemSidebar={value => {
                        if (value.id) {
                            Router.pushRoute(value.id);
                        }
                    }}
                    menu={[
                        {name: "Main", menu: [], header: true},
                        {id: "/", name: "Dashboard", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "POS", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Products", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Categories", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Sales", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Purchases", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Gift Card", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "People", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Settings", icon: <IconComponent icon={"menu"}/>, menu: [],},
                        {id: "/", name: "Reports", icon: <IconComponent icon={"menu"}/>, menu: [],},
                    ]}
                    title={!this.props.noTitle ? {
                        extra: this.props.extraTitle,
                        title: this.props.title || "Welcome Admin!",
                        breadcrumb: this.props.breadcrumb || [
                            {label: "Dashboard", route: "/"},
                        ],
                    } : undefined}
                >
                    {this.props.children}
                </DashboardApp>
            </>
        );
    }
}
