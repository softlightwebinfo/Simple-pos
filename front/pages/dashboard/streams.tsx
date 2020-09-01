import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {ButtonComponent, ETableColumnType, TableLayout,} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from '@routes';
import {Auth} from "../../Framework/hoc/Auth";
import {getApi} from "@settings";
import {IStream} from "../../Framework/interfaces/IStream";

class Index extends Component<{
    streams: IStream[];
}> {
    static async getInitialProps() {
        const res = await fetch(getApi("streams"));
        const ress = await res.json();
        return {
            streams: ress.streams || [],
        }
    }

    render() {
        const streams = this.props.streams;
        return (
            <Dashboard
                title={"Streams"}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Stream"},
                ]}
                extraTitle={(
                    <Link to={"dashboard-create-stream"}>
                        <a style={{textDecoration: "none"}}>
                            <ButtonComponent theme={"info"} variant={"outlined"}>
                                Create Stream
                            </ButtonComponent>
                        </a>
                    </Link>
                )}
            >
                <TableLayout
                    columns={[
                        {key: "id", data: "ID", type: ETableColumnType.STRING},
                        {key: "title", data: "Title", type: ETableColumnType.STRING},
                        {key: "description", data: "Description", type: ETableColumnType.STRING},
                        {key: "clicks", data: "Clicks", type: ETableColumnType.STRING},
                        {key: "views", data: "Views", type: ETableColumnType.STRING},
                        {key: "likes", data: "Likes", type: ETableColumnType.STRING},
                        {key: "dislikes", data: "Dislikes", type: ETableColumnType.STRING},
                    ]}
                    rows={streams}
                />
            </Dashboard>
        );
    }
}

export default connect()(Auth(Index));
