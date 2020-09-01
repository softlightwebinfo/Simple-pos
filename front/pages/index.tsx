import React, {Component} from "react";
import {connect} from "react-redux";
import {IBanner} from "../Framework/interfaces/IBannerReducer";
import {IStudio} from "../Framework/interfaces/IStudioReducer";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../Framework/hoc/Auth";
import {
    CardLayout, CardStadisticLayout,
    CardWidgetLayout,
    CardWidgetProgressLayout,
    GridComponent,
    ListComponent, NotificationListComponent, QuickLinkComponent, StatsInfoComponent, TableLayout
} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from "@routes";
class Index extends Component<{
    banner: IBanner;
    studios: IStudio[];
    translation: any;
}> {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
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
                title={this.props.translation.title.home}
                breadcrumb={[
                    {label: "Dashboard"},
                    {label: "Home"},
                ]}
            >
                <GridComponent container spacing={4}>
                    <GridComponent item xs={12}>
                        <CardLayout title={"Acceso rapido"} style={{backgroundColor: "white"}}>
                            <GridComponent container spacing={1}>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"menu"}
                                        title={"POS"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"cart"}
                                        title={"Productos"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"cart"}
                                        title={"Ventas"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Opened bills"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Categorias"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Grift Card"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Settings"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Reports"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Users"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <QuickLinkComponent
                                        icon={"user"}
                                        title={"Backups"}
                                    />
                                </GridComponent>
                                <GridComponent item>
                                    <Link route={"stores"}>
                                        <a>
                                            <QuickLinkComponent
                                                icon={"user"}
                                                title={"Stores"}
                                            />
                                        </a>
                                    </Link>
                                </GridComponent>
                            </GridComponent>
                        </CardLayout>
                    </GridComponent>
                </GridComponent>
                <GridComponent
                    container
                    spacing={4}
                >
                    <GridComponent
                        item
                        xs={12}
                    >
                        <GridComponent
                            container
                            spacing={4}
                        >
                            <GridComponent
                                item
                                xs={3}
                            >
                                <CardWidgetLayout
                                    icon="alarm"
                                    subTitle="Project"
                                    title="112"
                                />
                            </GridComponent>
                            <GridComponent
                                item
                                xs={3}
                            >
                                <CardWidgetLayout
                                    icon="alarm"
                                    subTitle="Project"
                                    title="112"
                                />
                            </GridComponent>
                            <GridComponent
                                item
                                xs={3}
                            >
                                <CardWidgetLayout
                                    icon="alarm"
                                    subTitle="Project"
                                    title="112"
                                />
                            </GridComponent>
                            <GridComponent
                                item
                                xs={3}
                            >
                                <CardWidgetLayout
                                    icon="alarm"
                                    subTitle="Project"
                                    title="112"
                                />
                            </GridComponent>
                        </GridComponent>
                    </GridComponent>
                    <GridComponent
                        item
                        xs={12}
                    >
                        <ListComponent
                            horizontal
                            style={{
                                width: '100%'
                            }}
                        >
                            <CardWidgetProgressLayout
                                lastValue={200}
                                progress={79}
                                subTitle="Previous Month"
                                title="New Employees"
                                value={150}
                            />
                            <CardWidgetProgressLayout
                                lastValue={200}
                                progress={79}
                                subTitle="Previous Month"
                                title="New Employees"
                                value={150}
                            />
                            <CardWidgetProgressLayout
                                lastValue={200}
                                progress={79}
                                subTitle="Previous Month"
                                title="New Employees"
                                value={150}
                            />
                            <CardWidgetProgressLayout
                                lastValue={200}
                                progress={79}
                                subTitle="Previous Month"
                                title="New Employees"
                                value={150}
                            />
                        </ListComponent>
                    </GridComponent>
                    <GridComponent
                        item
                        sm={4}
                        xs={12}
                    >
                        <CardLayout
                            style={{
                                backgroundColor: 'white'
                            }}
                            title="Statistics"
                        >
                            <ListComponent>
                                <StatsInfoComponent
                                    title="Total leave"
                                    total={100}
                                    value={20}
                                />
                                <StatsInfoComponent
                                    title="Total leave"
                                    total={100}
                                    value={20}
                                />
                                <StatsInfoComponent
                                    title="Total leave"
                                    total={100}
                                    value={20}
                                />
                                <StatsInfoComponent
                                    title="Total leave"
                                    total={100}
                                    value={20}
                                />
                                <StatsInfoComponent
                                    title="Total leave"
                                    total={100}
                                    value={20}
                                />
                            </ListComponent>
                        </CardLayout>
                    </GridComponent>
                    <GridComponent
                        item
                        sm={4}
                        xs={12}
                    >
                        <CardStadisticLayout
                            data={[
                                {
                                    color: 'success',
                                    subTitle: '166',
                                    title: 'Completed Tasks'
                                },
                                {
                                    color: 'gray',
                                    subTitle: '115',
                                    title: 'Completed Tasks'
                                },
                                {
                                    color: 'info',
                                    subTitle: '31',
                                    title: 'Completed Tasks'
                                },
                                {
                                    color: 'warning',
                                    subTitle: '47',
                                    title: 'Completed Tasks'
                                },
                                {
                                    color: 'danger',
                                    subTitle: '5',
                                    title: 'Completed Tasks'
                                }
                            ]}
                            progress={[
                                {
                                    color: 'success',
                                    value: 10
                                },
                                {
                                    color: 'primary',
                                    value: 40
                                },
                                {
                                    color: 'secondary',
                                    value: 20
                                },
                                {
                                    color: 'gray',
                                    value: 5
                                },
                                {
                                    color: 'success',
                                    value: 25
                                }
                            ]}
                            stadistics={[
                                {
                                    title: 'Total tasks',
                                    value: 385
                                },
                                {
                                    title: 'Overdue Task',
                                    value: 19
                                }
                            ]}
                            style={{
                                backgroundColor: 'white',
                                color: 'black'
                            }}
                            title="Task Stadistics"
                        />
                    </GridComponent>
                    <GridComponent
                        item
                        sm={4}
                        xs={12}
                    >
                        <CardLayout
                            style={{
                                backgroundColor: 'white'
                            }}
                            title="Messages"
                        >
                            <NotificationListComponent
                                data={[
                                    {
                                        avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg',
                                        date: 'now',
                                        description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                        name: 'Name 1'
                                    },
                                    {
                                        avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg',
                                        date: 'now',
                                        description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                        name: 'Name 2'
                                    },
                                    {
                                        avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg',
                                        date: 'now',
                                        description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                        name: 'Name 3'
                                    },
                                    {
                                        avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg',
                                        date: 'now',
                                        description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                        name: 'Name 4'
                                    },
                                    {
                                        avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg',
                                        date: 'now',
                                        description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                        name: 'Name 5'
                                    }
                                ]}
                            />
                        </CardLayout>
                    </GridComponent>
                    <GridComponent
                        item
                        sm={6}
                        xs={12}
                    >
                        <CardLayout
                            style={{
                                backgroundColor: 'white'
                            }}
                            title="Invoices"
                        >
                            <TableLayout
                                columns={[
                                    {
                                        data: 'Invoice ID',
                                        key: 'id',
                                        type: 5
                                    },
                                    {
                                        data: 'Client',
                                        key: 'client',
                                        type: 5
                                    },
                                    {
                                        data: 'Due Date',
                                        key: 'date',
                                        type: 7
                                    },
                                    {
                                        data: 'Total',
                                        key: 'total',
                                        type: 5
                                    },
                                    {
                                        data: 'Status',
                                        key: 'status',
                                        type: 0
                                    }
                                ]}
                                rows={[
                                    {
                                        client: 'Name 0',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0000',
                                        status: {
                                            name: 'label 0',
                                            theme: 'orange'
                                        },
                                        total: '0€'
                                    },
                                    {
                                        client: 'Name 1',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0001',
                                        status: {
                                            name: 'label 1',
                                            theme: 'orange'
                                        },
                                        total: '3€'
                                    },
                                    {
                                        client: 'Name 2',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0002',
                                        status: {
                                            name: 'label 2',
                                            theme: 'orange'
                                        },
                                        total: '94€'
                                    }
                                ]}
                            />
                        </CardLayout>
                    </GridComponent>
                    <GridComponent
                        item
                        sm={6}
                        xs={12}
                    >
                        <CardLayout
                            style={{
                                backgroundColor: 'white'
                            }}
                            title="Payments"
                        >
                            <TableLayout
                                columns={[
                                    {
                                        data: 'Invoice ID',
                                        key: 'id',
                                        type: 5
                                    },
                                    {
                                        data: 'Client',
                                        key: 'client',
                                        type: 5
                                    },
                                    {
                                        data: 'Payment type',
                                        key: 'payment',
                                        type: 5
                                    },
                                    {
                                        data: 'Due Date',
                                        key: 'date',
                                        type: 7
                                    },
                                    {
                                        data: 'Total',
                                        key: 'total',
                                        type: 5
                                    }
                                ]}
                                rows={[
                                    {
                                        client: 'Name 0',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0000',
                                        payment: 'Paypal',
                                        total: '0€'
                                    },
                                    {
                                        client: 'Name 1',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0001',
                                        payment: 'Paypal',
                                        total: '500€'
                                    },
                                    {
                                        client: 'Name 2',
                                        date: '2020-10-08 10:20',
                                        id: '#INV-0002',
                                        payment: 'Paypal',
                                        total: '224€'
                                    }
                                ]}
                            />
                        </CardLayout>
                    </GridComponent>
                </GridComponent>
            </Dashboard>
        );
    }
}

export default connect(state => ({
    studios: state.studio.studios,
    translation: state.translate.translation,
}))(Auth(Index));