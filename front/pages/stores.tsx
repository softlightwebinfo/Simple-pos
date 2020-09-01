import React, {Component} from "react";
import {connect} from "react-redux";
import {IBanner} from "../Framework/interfaces/IBannerReducer";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../Framework/hoc/Auth";
import {TableLayout} from "@codeunic/library-ui";
import {
    ButtonComponent,
    ButtonIconComponent,
    CardComponent,
    ETableColumnType,
    IconComponent
} from "@codeunic/library-ui/build";
import {getAllStores} from "../Framework/store/dispatch/store";
import {IStore} from "../Framework/interfaces/IStoreReducer";
// @ts-ignore
import {Link} from "@routes";
class Index extends Component<{
    banner: IBanner;
    stores: IStore[];
    translation: any;
}> {
    static async getInitialProps(ctx) {
        const {isServer, store, req} = ctx;

        await store.dispatch(getAllStores(req.headers.cookie));

        return {
            isServer,
        };
    }

    componentDidMount() {
        // @ts-ignore
        const {isServer, translate} = this.props;

        if (isServer && !translate) {
            //dispatch(ActionCreator.translationRequest("es"));
        }
    }

    render() {
        return (
            <Dashboard
                title={this.props.translation.title.stores}
                breadcrumb={[
                    {label: "Dashboard"},
                    {label: "Tiendas"},
                ]}
                extraTitle={(
                    <Link route={"new-store"}>
                        <a>
                            <ButtonComponent variant={"outlined"} theme={"success"}>
                                Crear nueva tienda
                            </ButtonComponent>
                        </a>
                    </Link>
                )}
            >
                <CardComponent>
                    <TableLayout
                        columns={[
                            {key: "name", data: "Nombre", type: ETableColumnType.STRING},
                            {key: "code", data: "Codigo", type: ETableColumnType.STRING},
                            {key: "phone", data: "Telefono", type: ETableColumnType.STRING},
                            {key: "email", data: "Email", type: ETableColumnType.STRING},
                            {key: "address", data: "Dirección", type: ETableColumnType.STRING},
                            {key: "actions", data: "Actions", type: ETableColumnType.COMPONENT},
                        ]}
                        data={(props) => ({
                            ...props,
                            actions: (
                                <>
                                    <ButtonIconComponent hover>
                                        <IconComponent icon={"pencil"} style={{color: "black", width: 20, height: 20}}/>
                                    </ButtonIconComponent>
                                    <ButtonIconComponent hover>
                                        <IconComponent icon={"trash"} style={{color: "black", width: 20, height: 20}}/>
                                    </ButtonIconComponent>
                                </>
                            )
                        })}
                        rows={this.props.stores}
                    />
                </CardComponent>
            </Dashboard>
        );
    }
}

export default connect(state => ({
    stores: state.store.stores,
    translation: state.translate.translation,
}))(Auth(Index));