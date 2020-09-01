import {Settings} from "./Framework/models/Setting";
import {IBanner} from "./Framework/interfaces/IBannerReducer";
import React from "react";

export const API = "http://localhost:3000/api";
// export const API = "https://www.mallorcaliverecordingstudio.com/api";

export const getApi = (url: string): string => `${API}/${url}/`;
const setting = new Settings();
setting.appName = "SIMPLE POS";
setting.apiRoute = API;
setting.canonical = "https://www.mallorcaliverecordingstudio.com/";
setting.logo = "/static/images/logoText.png";
setting.phone = "+34 662 22 37 68"
setting.description = "En MLR Studio (Mallorca Live Recording Studio) nos dedicamos a la grabación de conciertos y sesiones en vivo por pistas simultáneas para poder mezclar y editar el contenido de cada pista de manera individual en nuestro Studio, para obtener la mayor calidad."
setting.email = "mallorcaliverecordingstudio@gmail.com";
setting.IO = "";
export {setting};

export const bannerDefault: { [p: string]: IBanner } = {
    home: {
        image: "/static/images/bg-hero.jpg",
        imageURI: "/static/images/bg-hero.jpg",
        title: `${setting.appName}<br/>Radio - Recording - ONLINE - Streaming`,
        subtitle: "Are you ready for a great experience?",
        button: "check out our studios",
        page: "home",
        route: "studios",
        id: 1,
        active: true
    },
    studios: {
        id: 2,
        page: "studios",
        title: "Rooms",
        image: "/static/images/bg_rooms.jpg",
        imageURI: "/static/images/bg_rooms.jpg",
        active: true,
    },
    recording: {
        id: 3,
        page: "recording",
        title: "Recording",
        image: "/static/images/bg_recording.jpg",
        imageURI: "/static/images/bg_recording.jpg",
        active: true,
    },
    rates: {
        id: 4,
        page: "rates",
        title: "Rates",
        image: "/static/images/bg_rates.jpg",
        imageURI: "/static/images/bg_rates.jpg",
        active: true,
    },
    events: {
        id: 5,
        page: "events",
        title: "Events",
        image: "/static/images/bg_rates.jpg",
        imageURI: "/static/images/bg_rates.jpg",
        active: true,
    },
    shop: {
        id: 6,
        page: "shop",
        title: "Shop",
        image: "/static/images/bg_rates.jpg",
        imageURI: "/static/images/bg_rates.jpg",
        active: true,
    },
    streams: {
        id: 7,
        page: "streams",
        title: "Streams",
        image: "/static/images/bg_rates.jpg",
        imageURI: "/static/images/bg_rates.jpg",
        active: true,
    }
};
export const menuLogin = [
    {value: 1, label: "My profile", icon: <i/>},
    {value: 2, label: "Settings", icon: <i/>},
    {value: 3, label: "Logout", icon: <i/>},
];
export const langData = [
    {value: 1, label: "English", icon: <i/>},
    {value: 2, label: "Spanish", icon: <i/>},
    {value: 3, label: "German", icon: <i/>},
    {value: 4, label: "French", icon: <i/>},
]
export const pagesOptions = [
    {value: "-", label: "Select page"},
    {value: "home", label: "Home"},
    {value: "studios", label: "Studios"},
    {value: "recording", label: "Recording"},
    {value: "rates", label: "Rates"},
    {value: "events", label: "Events"},
    {value: "shop", label: "Shop"},
];
export const liveDescription = `
El horario de transmisión de la radio es de lunes a viernes de 12:00 a 13:30h

El lunes empezaremos a retransmitir el directo en las 3 plataformas (twitch, youtube y Web)

Web:
https://www.mallorcaliverecordingstudio.com/live

twitch
https://www.twitch.tv/liverecordingstudio

En LR Studio (Live Recording Studio) nos dedicamos a la grabación de conciertos y sesiones
en vivo por pistas simultáneas para poder mezclar y editar el contenido de cada pista de
manera individual en nuestro Studio, para obtener la mayor calidad. 

Disponemos de material profesional adecuado para este tipo de grabacion, obteniendo resultados profesionales de
gran calidad. 

Cómo músicos y técnicos que somos, sabemos lo engorroso, pesado y frio que es
grabar en un studio, la pérdida de potencia y emociones que se obtienen de la grabación
individual por pistas de cada músico, por este mismo motivo, apostamos por un tipo de
grabación más natural, más orgánica, obteniendo la misma calidad de sonido que en un studio.

Pero dándole más emotividad, y frescura, para así lograr transmitir al oyente las emociones
que hay en un directo.

Facebook:
https://www.facebook.com/mallorca.live.recording.studio

Instagram:
https://www.instagram.com/mallorcaliverecordingstudio/

musicosdelmundo:
https://www.musicosdelmundo.com

Donaciones:
https://streamlabs.com/mallorcaliverecordingstudio
`;
export const posters = [
    'mallorca-live-recording-studio.jpg',
    'mallorca-live-recording-studio-discount.jpg',
    'mallorca-live-recording-studio-recording.jpg',
    'MLRS-Banners-radio-grabaciones.jpg',
];
// @ts-ignore