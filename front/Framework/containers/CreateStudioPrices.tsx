import React, {Component} from "react";
import {connect} from 'react-redux';
import {IStudioPrices} from "../interfaces/IStudioPrices";
import {
    FormGroupComponent,
    GridComponent,
    TextFieldComponent,
    ButtonIconComponent,
    IconComponent,
    TypographyComponent,
    CheckboxComponent, FormControlLabelComponent, ButtonComponent,
} from "@codeunic/library-ui/build";
import {updateStudioPriceRequest} from "../store/dispatch/studio";
import {withRouter} from "next/router";

export interface ICreateStudioPrices {
    prices: IStudioPrices[];
}

@connect(state => state)
// @ts-ignore
@withRouter
export class CreateStudioPrices extends Component<{
    studio?: any
    dispatch?: any
    router?: any
}, ICreateStudioPrices> {
    state: ICreateStudioPrices = {
        prices: [
            {
                fkStudio: this.props.studio.selected || this.props.router.query.id,
                title: "",
                description: "",
                price: 0,
                id: 1,
                isHour: false,
            },
        ],
    }

    constructor(props) {
        super(props);
    }

    add = () => {
        this.setState(e => ({
            prices: [...e.prices, {
                id: e.prices.length + 1,
                title: "",
                description: "",
                isHour: false,
                price: 0,
                fkStudio: this.props.studio.selected || this.props.router.query.id,
            }]
        }))
    };

    remove = (id) => {
        this.setState(e => ({
            prices: e.prices.filter(i => i.id != id).map((item, index) => ({...item, id: index + 1})),
        }))
    };

    save = () => {
        this.props.dispatch(updateStudioPriceRequest(this.props.studio.selected || this.props.router.query.id, this.state.prices));
    };

    render() {
        return (
            <div>
                {this.state.prices.map((item, index) => (
                    <GridComponent container spacing={4} key={item.id}>
                        <GridComponent item xs={11}>
                            <FormGroupComponent form>
                                <TypographyComponent>Price number {(++index).toString()}</TypographyComponent>
                            </FormGroupComponent>
                            <FormGroupComponent form>
                                <TextFieldComponent
                                    outline
                                    id={"title"}
                                    placeholder={"Title"}
                                    value={item.title}
                                    onChange={e => {
                                        item.title = e.target.value;
                                        this.setState({prices: this.state.prices})
                                    }}
                                />
                            </FormGroupComponent>
                            <FormGroupComponent form>
                                <TextFieldComponent
                                    outline
                                    id={"price"}
                                    placeholder={"Price"}
                                    type={"number"}
                                    value={item.price.toString()}
                                    onChange={e => {
                                        item.price = Number(e.target.value);
                                        this.setState({prices: this.state.prices})
                                    }}
                                />
                            </FormGroupComponent>
                            <FormGroupComponent form>
                                <TextFieldComponent
                                    outline
                                    multiline
                                    value={item.description}
                                    placeholder={"Description"}
                                    id={"description"}
                                    onChange={e => {
                                        item.description = e.target.value;
                                        this.setState({prices: this.state.prices})
                                    }}
                                />
                            </FormGroupComponent>
                            <FormGroupComponent form>
                                <FormControlLabelComponent
                                    control={<CheckboxComponent
                                        checked={item.isHour}
                                        onChange={checked => {
                                            item.isHour = checked;
                                            this.setState({prices: this.state.prices})
                                        }} id={"checkbox"}/>}
                                    label={"Is price"}
                                />
                            </FormGroupComponent>
                        </GridComponent>
                        <GridComponent item xs={1}>
                            <ButtonIconComponent style={{color: "black"}} hover onClick={this.add}>
                                <IconComponent icon={"plus"}/>
                            </ButtonIconComponent>
                            <ButtonIconComponent
                                style={{color: "black", opacity: (this.state.prices.length > 1) ? 1 : 0.2}}
                                hover onClick={() => (this.state.prices.length > 1) && this.remove(item.id)}
                            >
                                <IconComponent icon={"trash"}/>
                            </ButtonIconComponent>
                        </GridComponent>
                    </GridComponent>
                ))}
                <ButtonComponent onClick={this.save}>
                    Save
                </ButtonComponent>
            </div>
        )
    }
}
