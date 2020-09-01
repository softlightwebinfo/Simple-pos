import React, {Component} from "react";
import {connect} from "react-redux";
import Template from "@components/Template";
import {MapContact} from "@components/MapContact";
import {Contact} from "@components/Contact";
import {Gallery} from "@components/Gallery";

class Index extends Component<{
    translation: any;
}> {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        return {isServer};
    }

    componentDidMount() {
        // @ts-ignore
        const {dispatch, isServer, translate} = this.props;

        if (isServer && !translate) {
            //dispatch(ActionCreator.translationRequest("es"));
        }
    }

    render() {
        return (
            <Template
                title={this.props.translation.contact}
                description={"contacta con nosotros para tener mas información sobre conciertos en streaming, radio online, Grabaciones multipistas, etc"}
            >
                <MapContact/>
                <Contact/>
                <Gallery/>
            </Template>
        );
    }
}

export default connect(state => ({
    translation: state.translate.translation,
}))(Index);
