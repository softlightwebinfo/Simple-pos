import * as React from "react";
import {
    BEM,
    ButtonComponent,
    InputLabelComponent,
    ContainerComponent,
    FormGroupComponent,
    GridComponent,
    TextFieldComponent,
    TypographyComponent,
} from "@codeunic/library-ui/build";
import {connect} from 'react-redux';
import {getApi, setting} from "@settings";

@connect(state => ({
    translation: state.translate.translation,
}))
export class Contact extends React.Component<{
    dispatch?: any;
    translation?: any;
}> {
    state = {
        email: "",
        name: "",
        phone: "",
        message: "",
        success: false,
    };

    onChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value;
        this.setState(item => ({
            ...item,
            [id]: value,
        }));
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            success: false,
        });
        try {
            await fetch(getApi("contact"), {
                body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.name,
                    phone: this.state.phone,
                    message: this.state.message,
                }),
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            this.setState({
                success: true,
                email: "",
                name: "",
                phone: "",
                message: "",
            })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const {state, onChange, onSubmit} = this;
        const bm = new BEM("contact", {});
        return (
            <section className={bm.toString()}>
                <ContainerComponent fixed maxWidth={"lg"}>
                    <TypographyComponent component={"h4"} variant={"h5"}>
                        {this.props.translation.reachOut}
                    </TypographyComponent>
                    <TypographyComponent
                        style={{marginTop: 10, marginBottom: 20}} component={"p"} variant={"body1"}
                        color={"gray"}>
                        {this.props.translation.contactSub}
                    </TypographyComponent>
                    <GridComponent container spacing={10}>
                        <GridComponent item xs={12} sm={12} md={6}>
                            <form onSubmit={onSubmit}>
                                {this.state.success && (
                                    <div style={{
                                        color: "white",
                                        backgroundColor: "green",
                                        padding: 5,
                                        borderRadius: 10,
                                        marginBottom: 20,
                                        paddingLeft: 40,
                                        paddingRight: 40,
                                    }}>
                                        <p>Se ha enviado correctamente</p>
                                    </div>
                                )}
                                <FormGroupComponent form>
                                    <InputLabelComponent>Name:</InputLabelComponent>
                                    <TextFieldComponent
                                        id={"name"}
                                        name={"name"}
                                        placeholder={"Name"}
                                        value={state.name}
                                        onChange={onChange}
                                        required
                                        outline
                                    />
                                </FormGroupComponent>
                                <FormGroupComponent form>
                                    <InputLabelComponent>Phone:</InputLabelComponent>
                                    <TextFieldComponent
                                        id={"phone"}
                                        name={"phone"}
                                        placeholder={"Phone"}
                                        value={state.phone}
                                        onChange={onChange}
                                        outline
                                        required
                                    />
                                </FormGroupComponent>
                                <FormGroupComponent form>
                                    <InputLabelComponent>Email:</InputLabelComponent>
                                    <TextFieldComponent
                                        id={"email"}
                                        name={"email"}
                                        placeholder={"Email"}
                                        value={state.email}
                                        onChange={onChange}
                                        outline
                                        required
                                    />
                                </FormGroupComponent>
                                <FormGroupComponent form>
                                    <InputLabelComponent>Message:</InputLabelComponent>
                                    <TextFieldComponent
                                        className={bm.Children("message")}
                                        id={"message"}
                                        name={"message"}
                                        placeholder={"Message"}
                                        value={state.message}
                                        onChange={onChange}
                                        outline
                                        multiline
                                        rows={10}
                                        style={{height: "auto"}}
                                        required
                                    />
                                </FormGroupComponent>
                                <ButtonComponent type={"submit"} variant={"outlined"} theme={"success"}>
                                    Submit
                                </ButtonComponent>
                            </form>
                        </GridComponent>
                        <GridComponent item xs={12} sm={12} md={6}>
                            <TypographyComponent variant={"body1"} style={{marginBottom: 20}}>
                                {this.props.translation.whyChooseSub}
                            </TypographyComponent>
                            <GridComponent container spacing={4}>
                                <GridComponent item xs={12} sm={6} className={bm.Children("contactItem")}>
                                    <div>
                                        <TypographyComponent
                                            variant={"h6"}>{this.props.translation.address}</TypographyComponent>
                                        <TypographyComponent component={"p"} variant={"body1"} color={"gray"}>
                                            <>
                                                Inca - Mallorca - España
                                                <br/>
                                                Inca, Mallorca
                                                <br/>
                                                07300
                                            </>
                                        </TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent
                                            variant={"h6"}>{this.props.translation.phone}</TypographyComponent>
                                        <TypographyComponent component={"p"} variant={"body1"} color={"gray"}>
                                            {setting.phone}
                                        </TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent
                                            variant={"h6"}>{this.props.translation.email}</TypographyComponent>
                                        <TypographyComponent component={"div"} variant={"body1"} color={"gray"}>
                                            <>
                                                {this.props.translation.forSupport}
                                                <br/>
                                                {setting.email}
                                            </>
                                        </TypographyComponent>
                                    </div>
                                </GridComponent>
                                <GridComponent item xs={12} sm={6} className={bm.Children("contactItem")}>
                                    <div>
                                        <TypographyComponent
                                            variant={"h6"}>{this.props.translation.openingHours}</TypographyComponent>
                                        <TypographyComponent component={"p"} variant={"body1"} color={"gray"}>
                                            {this.props.translation.pleaseNote}
                                        </TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent variant={"h6"}>Radio</TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent variant={"h6"}>Lunes - Viernes</TypographyComponent>
                                        <TypographyComponent component={"p"} variant={"body1"} color={"gray"}>
                                            12:00h - 13:30h
                                        </TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent variant={"h6"}>Grabaciones</TypographyComponent>
                                    </div>
                                    <div>
                                        <TypographyComponent variant={"h6"}>Lunes - Domingo</TypographyComponent>
                                        <TypographyComponent component={"p"} variant={"body1"} color={"gray"}>
                                            10:00h - 23:50h
                                        </TypographyComponent>
                                    </div>
                                </GridComponent>
                            </GridComponent>
                        </GridComponent>
                    </GridComponent>
                </ContainerComponent>
            </section>
        )
    }
}
