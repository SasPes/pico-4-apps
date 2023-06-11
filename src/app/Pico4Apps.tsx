import React from 'react';
import {getAppsName} from "../fetch/AppsName";
import {getAppLogo} from "../fetch/AppLogo";
import {getAppReview} from "../fetch/AppReview";

export type Pico4Apps = {
    name: string;
    steamApp: SteamApp;
};

export type SteamApp = {
    appid: number;
    name: string;
    logo: string;
    rating: string;
};

export const proxyURL = 'https://cors-proxy.fringe.zone/';
export const noLogo = "./img/none_184x69.jpg";

async function getPico4Apps() {
    let p4a: Pico4Apps[] = [];

    // all apps name
    let appsName = await getAppsName();

    appsName.map(async name => {
        // app logo
        let steamApp: SteamApp = await getAppLogo(name);
        if (steamApp.logo === noLogo) {
            steamApp = await getAppLogo(name.substring(0, name.lastIndexOf(" ")));
        }

        // app rating
        const rating = await getAppReview(steamApp.appid);
        if (rating !== undefined) {
            steamApp.rating = rating;
        }

        p4a.push({
            name: name,
            steamApp: steamApp
        });
    })
    return p4a;
}

export const pico4Apps = getPico4Apps();