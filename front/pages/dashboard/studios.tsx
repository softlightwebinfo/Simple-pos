import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {
    ButtonComponent,
    ETableColumnType,
    ListApp,
    ProfileWidget,
    TableMessageAvatar
} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link, Router} from '@routes';
import {studiosAllRequest} from "../../Framework/store/dispatch/studio";
import {Auth} from "../../Framework/hoc/Auth";
import {IStudio} from "../../Framework/interfaces/IStudioReducer";

class Index extends Component<{
    studios: IStudio[];
}> {
    static async getInitialProps({store, req}) {
        if (!store.getState().studio.studios.length) {
            await store.dispatch(studiosAllRequest(req ? req.headers.cookie : undefined));
        }
        return {};
    }

    render() {
        const studios = this.props.studios;
        return (
            <Dashboard
                noTitle
                title={"Studios"}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Studios"},
                ]}
                extraTitle={(
                    <Link to={"dashboard-create-banner"}>
                        <a style={{textDecoration: "none"}}>
                            <ButtonComponent theme={"info"} variant={"outlined"}>
                                Create studio
                            </ButtonComponent>
                        </a>
                    </Link>
                )}
            >
                <ListApp
                    style={{
                        padding: 0,
                    }}
                    button={{
                        icon: "plus",
                        label: "Create Studio",
                        onClick(): any {
                            Router.pushRoute("dashboard-create-studio");
                        }
                    }}
                    rowElement={row => (
                        <ProfileWidget
                            category={row.title}
                            avatar={row.avatar}
                            name={row.title}
                        />
                    )}
                    rows={studios.map((studio) => ({
                        id: studio.id,
                        avatar: studio.image.length ? `/images/studios/${studio.image}` : "/static/images/badImage.png",
                        title: studio.title,
                    }))}
                    columns={[
                        {key: "name", data: "Title", type: ETableColumnType.MESSAGE_AVATAR},
                        {key: "id", data: "Studio ID", type: ETableColumnType.STRING},
                    ]}
                    breadcrumb={[
                        {label: "Dashboard", route: "/dashboard"},
                        {label: "Studios"},
                    ]}
                    tableData={props => ({
                        ...props,
                        name: new TableMessageAvatar(props.title, props.title, props.title, props.avatar),
                    })}
                    title={"Studios"}
                />
            </Dashboard>
        );
    }
}

export default connect(state => ({
    studios: state.studio.studios,
}))(Auth(Index));
