import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {ButtonComponent, ETableColumnType, ListApp, ProfileWidget, TableMessageAvatar} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link, Router} from '@routes';
import {userAllRequest} from "../../Framework/store/dispatch/user";
import {Auth} from "../../Framework/hoc/Auth";
import {IUser} from "../../Framework/interfaces/IUserReducer";

class Index extends Component<{
    users: IUser[];
}> {
    static async getInitialProps({store, req}) {
        await store.dispatch(userAllRequest(req ? req.headers.cookie : undefined));
        return {};
    }

    render() {
        const users = this.props.users;
        return (
            <Dashboard
                noTitle
                title={"Users"}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Users"},
                ]}
                extraTitle={(
                    <Link to={"dashboard-create-banner"}>
                        <a style={{textDecoration: "none"}}>
                            <ButtonComponent theme={"info"} variant={"outlined"}>
                                Create User
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
                        label: "New User",
                        onClick(): any {
                            Router.pushRoute("register");
                        }
                    }}
                    rowElement={row => (
                        <ProfileWidget
                            category={row.category}
                            avatar={row.avatar}
                            name={row.name}
                        />
                    )}
                    rows={users.map((user) => ({
                        id: user.id,
                        avatar: "https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg",
                        name: user.name,
                        category: user.updatedAt,
                        email: user.email,
                        date: user.updatedAt,
                    }))}
                    columns={[
                        {key: "name", data: "Name", type: ETableColumnType.MESSAGE_AVATAR},
                        {key: "id", data: "Employee ID", type: ETableColumnType.STRING},
                        {key: "email", data: "Email", type: ETableColumnType.STRING},
                        {key: "phone", data: "Phone", type: ETableColumnType.STRING},
                        {key: "date", data: "Join Date", type: ETableColumnType.DATE, format: "DD/MM/YYYY"},
                        {key: "", data: "Action", type: ETableColumnType.ACTION, align: "right"},
                    ]}
                    breadcrumb={[
                        {label: "Dashboard", route: "/dashboard"},
                        {label: "Users"},
                    ]}
                    tableData={props => ({
                        ...props,
                        name: new TableMessageAvatar(props.name, props.name, props.category, props.avatar),
                    })}
                    title={"Users"}
                />
            </Dashboard>
        );
    }
}

export default connect(state => ({
    users: state.user.users,
}))(Auth(Index));
