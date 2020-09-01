import * as React from "react";
import {BEM, ButtonIconComponent, IChildren, IconComponent, IProp} from "@codeunic/library-ui/build";
import {connect} from 'react-redux';
import {IBanner} from "../interfaces/IBannerReducer";
import {bannerActiveRequest, bannerDeleteRequest} from "../store/actions/banner";
// @ts-ignore
import {Router} from '@routes';

export interface IEditContainerBanner extends IProp {
    children: IChildren | IChildren[];
    dispatch?: any;
    banner: IBanner;
}

@connect()
export class EditContainerBanner extends React.Component<IEditContainerBanner> {
    constructor(props) {
        super(props);
    }

    render() {
        const bm = new BEM("editContainerBanner", {});
        const onClickActive = () => {
            this.props.dispatch(bannerActiveRequest(this.props.banner.id, this.props.banner.active));
        };
        const onClickEdit = () => {
            Router.pushRoute("dashboard-update-banner", {id: this.props.banner.id});
        };
        const onClickDelete = () => {
            if(confirm("do you want to remove the banner?")){
                this.props.dispatch(bannerDeleteRequest(this.props.banner.id, this.props.banner.image));
            }
        };
        return (
            <div className={bm.toString()} style={this.props.style}>
                <div className={bm.Children("tools")}>
                    <ButtonIconComponent style={{color: this.props.banner.active ? "green" : "red"}} onClick={onClickActive}>
                        <IconComponent icon={"eye"}/>
                    </ButtonIconComponent>
                    <ButtonIconComponent onClick={onClickEdit}>
                        <IconComponent icon={"pencil"}/>
                    </ButtonIconComponent>
                    <ButtonIconComponent onClick={onClickDelete}>
                        <IconComponent icon={"trash"}/>
                    </ButtonIconComponent>
                </div>
                {this.props.children}
            </div>
        )
    }
}
