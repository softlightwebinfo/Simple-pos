import {
    CardLayout,
    CardStadisticLayout,
    CardWidgetLayout,
    CardWidgetProgressLayout,
    ETableColumnType,
    GridComponent,
    ListComponent,
    NotificationListComponent,
    randIncluded,
    StatsInfoComponent,
    TableGroupSmall,
    TableLabel,
    TableLayout,
    TableMessageAvatar,
    TableProgress
} from "@codeunic/library-ui/build";
import React, {Component} from "react";
import {connect} from 'react-redux';

@connect()
export default class DashboardHomePage extends Component {
    render() {
        return <GridComponent container spacing={4}>
            <GridComponent item xs={12}>
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
            <GridComponent item xs={12}>
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
            <GridComponent item xs={12} sm={4}>
                <CardLayout title={"Statistics"} style={{backgroundColor: "white"}}>
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
            <GridComponent item xs={12} sm={4}>
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
                        color: 'black',
                    }}
                    title="Task Stadistics"
                />
            </GridComponent>
            <GridComponent item xs={12} sm={4}>
                <CardLayout title={"Messages"} style={{backgroundColor: "white"}}>
                    <NotificationListComponent
                        data={[...new Array(5)].map((_, index) => ({
                            name: `Name ${index + 1}`,
                            avatar: "https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg",
                            date: "now",
                            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        }))}
                    />
                </CardLayout>
            </GridComponent>
            <GridComponent item xs={12} sm={6}>
                <CardLayout title={"Invoices"} style={{backgroundColor: "white"}}>
                    <TableLayout
                        columns={[
                            {key: "id", data: "Invoice ID", type: ETableColumnType.STRING},
                            {key: "client", data: "Client", type: ETableColumnType.STRING},
                            {key: "date", data: "Due Date", type: ETableColumnType.DATE},
                            {key: "total", data: "Total", type: ETableColumnType.STRING},
                            {key: "status", data: "Status", type: ETableColumnType.LABEL},
                        ]}
                        rows={[...new Array(3)].map((_, index) => ({
                            id: `#INV-000${index}`,
                            client: `Name ${index}`,
                            date: `2020-10-08 10:20`,
                            total: `${index * randIncluded(0, 1000)}€`,
                            status: new TableLabel(`label ${index}`, "orange"),
                        }))}
                    />
                </CardLayout>
            </GridComponent>
            <GridComponent item xs={12} sm={6}>
                <CardLayout title={"Payments"} style={{backgroundColor: "white"}}>
                    <TableLayout
                        columns={[
                            {key: "id", data: "Invoice ID", type: ETableColumnType.STRING},
                            {key: "client", data: "Client", type: ETableColumnType.STRING},
                            {key: "payment", data: "Payment type", type: ETableColumnType.STRING},
                            {key: "date", data: "Due Date", type: ETableColumnType.DATE},
                            {key: "total", data: "Total", type: ETableColumnType.STRING},
                        ]}
                        rows={[...new Array(3)].map((_, index) => ({
                            id: `#INV-000${index}`,
                            client: `Name ${index}`,
                            date: `2020-10-08 10:20`,
                            total: `${index * randIncluded(0, 1000)}€`,
                            payment: "Paypal",
                        }))}
                    />
                </CardLayout>
            </GridComponent>
            <GridComponent item xs={12} sm={6}>
                <CardLayout title={"Clients"} style={{backgroundColor: "white"}}>
                    <TableLayout
                        columns={[
                            {
                                data: 'Name',
                                key: 'name_data',
                                type: 8
                            },
                            {
                                data: 'Email',
                                key: 'email',
                                type: 5
                            },
                            {
                                data: 'Status',
                                key: 'status',
                                type: 9
                            },
                            {
                                align: 'right',
                                data: 'Action',
                                key: 'role',
                                type: 3
                            }
                        ]}
                        data={props => ({
                            ...props,
                            name_data: new TableMessageAvatar(props.name, props.name, props.role, "https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg")
                        })}
                        rows={[
                            {
                                email: 'barrycuda@example.com',
                                name: 'Barry Cuda',
                                role: 'CEO1',
                                status: true
                            },
                            {
                                email: 'barrycuda@example1.com',
                                name: 'Barry Cuda1',
                                role: 'CEO2',
                                status: true
                            },
                            {
                                email: 'barrycuda@example2.com',
                                name: 'Barry Cuda2',
                                role: 'CEO3',
                                status: true
                            },
                            {
                                email: 'barrycuda@example3.com',
                                name: 'Barry Cuda3',
                                role: 'CEO4',
                                status: true
                            },
                            {
                                email: 'barrycuda@example4.com',
                                name: 'Barry Cuda4',
                                role: 'CEO5',
                                status: true
                            },
                            {
                                email: 'barrycuda@example5.com',
                                name: 'Barry Cuda5',
                                role: 'CEO6',
                                status: true
                            },
                            {
                                email: 'barrycuda@example6.com',
                                name: 'Barry Cuda6',
                                role: 'CEO7',
                                status: true
                            }
                        ]}
                    />
                </CardLayout>
            </GridComponent>
            <GridComponent item xs={12} sm={6}>
                <CardLayout title={"Clients"} style={{backgroundColor: "white"}}>
                    <TableLayout
                        columns={[
                            {
                                data: 'Project Name',
                                key: 'projectName',
                                type: 1
                            },
                            {
                                data: 'Progress',
                                key: 'progress',
                                type: 2
                            },
                            {
                                align: 'right',
                                data: 'Action',
                                key: '',
                                type: 3
                            }
                        ]}
                        data={props => ({
                            ...props,
                            projectName: new TableGroupSmall("Office Management", [
                                {number: 1, label: "open tasks"},
                                {number: 10, label: "tasks completed"},
                            ]),
                            progress: new TableProgress(randIncluded(0, 100), "info"),
                        })}
                        rows={[
                            {
                                email: 'barrycuda@example.com',
                                name: 'Office Management',
                                role: 'CEO1',
                                status: true,
                                value: 12
                            },
                            {
                                email: 'barrycuda@example1.com',
                                name: 'Office Management',
                                role: 'CEO2',
                                status: true,
                                value: 32
                            },
                            {
                                email: 'barrycuda@example2.com',
                                name: 'Office Management',
                                role: 'CEO3',
                                status: true,
                                value: 42
                            },
                            {
                                email: 'barrycuda@example3.com',
                                name: 'Office Management',
                                role: 'CEO4',
                                status: true,
                                value: 60
                            },
                            {
                                email: 'barrycuda@example4.com',
                                name: 'Office Management',
                                role: 'CEO5',
                                status: true,
                                value: 2
                            },
                            {
                                email: 'barrycuda@example5.com',
                                name: 'Office Management',
                                role: 'CEO6',
                                status: true,
                                value: 0
                            },
                            {
                                email: 'barrycuda@example6.com',
                                name: 'Office Management',
                                role: 'CEO7',
                                status: true,
                                value: 92
                            }
                        ]}
                    />
                </CardLayout>
            </GridComponent>
        </GridComponent>;
    }
}
