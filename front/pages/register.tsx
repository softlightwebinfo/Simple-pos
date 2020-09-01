import React, {Component} from "react";
import {connect} from "react-redux";
import Head from "next/head";
import {AuthRegisterLayout} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from '../routes';
import {setting} from "@settings";
import {authRegister} from "../Framework/store/dispatch/auth";
// @ts-ignore
import {Router} from "@routes";

class Register extends Component<{ dispatch: any; auth: any; }> {
    static async getInitialProps(ctx) {
        const {isServer} = ctx;
        if (ctx.store.getState().auth.auth) {
            if (ctx.res) {
                ctx.res.writeHead(302, {Location: '/dashboard'});
                return ctx.res.end();
            } else {
                Router.pushRoute("/");
                return;
            }
        }
        return {isServer};
    }

    componentDidMount() {
        if (this.props.auth.auth) {
            Router.pushRoute("/dashboard")
        }
    }

    componentDidUpdate(prev): void {
        if (!prev.auth.auth && this.props.auth.auth) {
            Router.pushRoute("/dashboard")
        }
    }

    public state = {
        name: "",
        email: "",
        password: "",
        repeat_password: "",
    };

    render() {
        // return (
        //     <Template
        //         title={"Register"}
        //         description={"Register"}
        //     >
        //         <Maintenance/>
        //     </Template>
        // )
        return (
            <div>
                <Head>
                    <title>Register</title>
                    <meta name="title" content="Register"/>
                </Head>
                <AuthRegisterLayout
                    textOtherScreen={"Iniciar sesión"}
                    footerAccountText={"¿Ya tienes una cuenta?"}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!this.state.email.length ||
                            !this.state.password.length ||
                            !this.state.repeat_password.length ||
                            !this.state.name.length) {
                            alert("Error, todos los campos son obligatorios");
                        } else {
                            const {email, password, name, repeat_password} = this.state;
                            if (password != repeat_password) {
                                alert("Error, las contraseñas no son iguales");
                                return;
                            }
                            await this.props.dispatch(authRegister({
                                data: {
                                    email,
                                    password,
                                    active: true,
                                    name,
                                    phone: "",
                                }
                            }));
                        }
                    }}
                    passwordValue={this.state.password}
                    emailValue={this.state.email}
                    onChange={(e) => {
                        this.setState({
                            [e.target.id]: e.target.value,
                        })
                    }}
                    subTitle={"Acceso a nuestro tablero"}
                    title={"Crear una nueva cuenta"}
                    logo={setting.logo}
                    logoTitle={"Logo"}
                    routeLogo={"/"}
                    extras={[
                        // {label: "Apply job"}
                    ]}
                    repeatPasswordValue={this.state.repeat_password}
                    nameValue={this.state.name}
                    textButton={"Crear cuenta"}
                    componentLinkOtherScreen={(_, children) => (
                        <Link to={"login"}>
                            <a>{children}</a>
                        </Link>
                    )}
                />
            </div>
        );
    }
}

export default connect(state => ({auth: state.auth}))(Register);
