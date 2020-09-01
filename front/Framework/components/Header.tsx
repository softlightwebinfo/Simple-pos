import * as React from "react";
// @ts-ignore
import {Link, Router} from '@routes';
import {
    AvatarComponent,
    BEM,
    ButtonComponent,
    DropdownComponent,
    IconComponent
} from "@codeunic/library-ui/build";
import {setting} from "settings";
import {connect} from 'react-redux'
import {IAuthReducer} from "../interfaces/IAuthReducer";
import {useRouter} from "next/router";
import {authLogout} from "../store/dispatch/auth";
import {useState} from "react";

export interface IHeader {
    auth?: IAuthReducer,
    isLogin?: boolean;
    dispatch?: any;
    translation?: any;
}

export const menu = [
    {label: "live", route: "live"},
    {label: "streams", route: "streams"},
    {label: "studios", route: "studios"},
    {label: "recording", route: "recording"},
    {label: "rates", route: "rates"},
    {label: "events", route: "events"},
    {label: "shop", route: "shop"},
    {label: "contact", route: "contact"},
];
const Header = (props: IHeader) => {
    const bm = new BEM("header", {});
    const route = useRouter();
    const [open, setOpen] = useState()
    const menuItem = (
        <ul className={bm.Children("nav")}>
            {menu.map((item, index) => (
                <li key={index} itemScope itemType="https://www.schema.org/SiteNavigationElement">
                    <Link to={item.route}>
                        <a className={bm.Modifier("item", "active", route.route == `/${item.route}`)}
                           title={props.translation.menu[item.label]}>{props.translation.menu[item.label]}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
    return (
        <header className={bm.toString()}>
            <nav className={bm.Children("navBar")}>
                <Link to={"index"}>
                    <a title={setting.appName} className={bm.Children("brand")}>
                        <img className={bm.Children("logo")} src={setting.logo} alt={setting.appName}
                             title={setting.appName}/>
                    </a>
                </Link>
                {/*<Link to={"cart"}>*/}
                {/*    <a className={bm.Children("toggler")}>*/}
                {/*        <ButtonIconComponent>*/}
                {/*            <IconComponent icon={"cart"}/>*/}
                {/*        </ButtonIconComponent>*/}
                {/*    </a>*/}
                {/*</Link>*/}
                <button
                    // @ts-ignore
                    onClick={() => setOpen(!open)} className={bm.Children("toggler")} type="button"
                    aria-controls="navigation-primary"
                    aria-expanded="false" aria-label="Toggle navigation"
                >
                    <IconComponent icon={"menu"}/>
                </button>
                {open && (
                    <div className={bm.Children("menu-responsive")}>
                        {menuItem}
                    </div>
                )}
                <div className={bm.Children("collapse")}>
                    <div className={bm.Children("mx-auto")}>
                        {menuItem}
                    </div>
                </div>
                <div className={bm.Modifier("collapse", "right", true)}>
                    {/*<ul className={bm.Children("cart")}>*/}
                    {/*    <li>*/}
                    {/*        <a title="View your shopping cart">*/}
                    {/*            <div className={bm.Children("shopping-ico")}>*/}
                    {/*                <ButtonIconComponent>*/}
                    {/*                    <IconComponent icon={"cart"}/>*/}
                    {/*                </ButtonIconComponent>*/}
                    {/*                <span className={bm.Children("count")}>0</span>*/}
                    {/*            </div>*/}
                    {/*            <span className={bm.Children("amount")}> $0.00</span>*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*    /!*<li>*!/*/}
                    {/*    /!*<div className="widget woocommerce widget_shopping_cart">*!/*/}
                    {/*    /!*<div className="widget_shopping_cart_content">*!/*/}
                    {/*    /!*<p className="woocommerce-mini-cart__empty-message">No products in the cart.</p>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    /!*</li>*!/*/}
                    {/*</ul>*/}
                    {!props.isLogin && (
                        <Link to={"login"}>
                            <a style={{textDecoration: "none"}}>
                                <ButtonComponent
                                    variant={"outlined"}
                                    theme={"info"}
                                    style={{marginLeft: 20}}
                                >
                                    Login
                                </ButtonComponent>
                            </a>
                        </Link>
                    )}
                    {props.isLogin && (
                        <DropdownComponent
                            style={{marginLeft: 20}}
                            data={[
                                {value: 1, label: "Dashboard", icon: <i/>},
                                {value: 2, label: "My profile", icon: <i/>},
                                {value: 3, label: "Settings", icon: <i/>},
                                {value: 4, label: "Logout", icon: <i/>},
                            ]}
                            onChange={e => {
                                switch (e.value) {
                                    case 1: {
                                        Router.pushRoute("/dashboard");
                                        break;
                                    }
                                    case 4: {
                                        props.dispatch(authLogout());
                                        break;
                                    }
                                }
                            }}
                            trigger={(
                                <AvatarComponent
                                    mini
                                    user
                                    status={"online"}
                                    src={"https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"}
                                >
                                 <span style={{color: "black"}}>
                                        {
                                            // @ts-ignore
                                            props.auth.auth.user.name
                                        }
                                 </span>
                                </AvatarComponent>
                            )}
                        />
                    )}
                </div>
            </nav>
        </header>
    )
};
export default connect(state => ({
    auth: state.auth,
    isLogin: state.auth.auth != null,
    translation: state.translate.translation,
}))(Header);
