import React, {Component} from "react";
import {connect} from "react-redux";
import {Dashboard} from "@components/Dashboard";
import {Auth} from "../../Framework/hoc/Auth";
import {IStudioReducer} from "../../Framework/interfaces/IStudioReducer";
// @ts-ignore
import {Router} from '@routes';
import {
    CardComponent,
    CardContentComponent,
    Form,
    FormGroupComponent,
    FormLayout, GridComponent,
    TypographyComponent,
    ButtonComponent
} from "@codeunic/library-ui/build";
import {updateStudioImageRequest} from "../../Framework/store/dispatch/studio";
import {withRouter} from "next/router";

export type CreateStudioImagesState = {
    images: string[];
    files: File[];
};

@connect(state => state)
// @ts-ignore
@Auth
// @ts-ignore
@withRouter
export default class Index extends Component<{
    dispatch: any;
    studio: IStudioReducer;
    router: any;
}, CreateStudioImagesState> {

    state: CreateStudioImagesState = {
        images: [],
        files: [],
    };

    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    get title() {
        return "Create new studio images";
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.studio.parseStudioLoaded && this.props.studio.parseStudioLoaded) {
            Router.pushRoute("dashboard-studio")
        }
    }

    get form() {
        const form = new Form("form", {
            card: false,
        });
        form.Add(
            form.Group()
                .Add(form.Component().Input({
                    type: "file",
                    id: "file",
                }))
        )
        return form;
    }

    save = async () => {
        await this.props.dispatch(updateStudioImageRequest(this.props.router.query.id, this.state.files));
    };

    render() {
        return (
            <Dashboard
                title={this.title}
                breadcrumb={[
                    {label: "Dashboard", route: "/dashboard"},
                    {label: "Create studio images"},
                ]}
            >
                <CardComponent style={{backgroundColor: "white", marginBottom: 40}}>
                    <CardContentComponent>
                        <FormGroupComponent>
                            <TypographyComponent color={"text-secondary"}>Select images</TypographyComponent>
                        </FormGroupComponent>
                        <FormGroupComponent form>
                            <FormLayout
                                onChange={(_, value) => {
                                    this.setState(e => ({
                                        images: [...e.images, value.url],
                                        files: [...e.files, value.file],
                                    }));
                                }}
                                form={this.form}
                            />
                        </FormGroupComponent>
                        <ButtonComponent onClick={this.save}>
                            Save
                        </ButtonComponent>
                    </CardContentComponent>
                </CardComponent>
                <GridComponent container spacing={4}>
                    {this.state.images.map((item, index) => (
                        <GridComponent item xs={12} sm={3} key={index}>
                            <img src={item} style={{width: "100%", display: "block"}}/>
                        </GridComponent>
                    ))}
                </GridComponent>
            </Dashboard>
        );
    }
}