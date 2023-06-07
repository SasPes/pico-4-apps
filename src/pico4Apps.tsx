import React from 'react';

type Pico4Apps = {
    name: string;
    steamApp: SteamApp;
};

type SteamApp = {
    appid: number;
    name: string;
    logo: string;
    review: string;
};

type SteamAppReview = {
    query_summary: SteamAppQuerySummary;
};

type SteamAppQuerySummary = {
    total_positive: number;
    total_reviews: number;
};

const proxyURL = 'https://cors-proxy.fringe.zone/';
const appsUrl = 'https://picomyp.ml';
const steamUrl = 'https://steamcommunity.com/actions/SearchApps/';
const steamReviewUrl = 'https://store.steampowered.com/appreviews/'; // 2151960?json=1

const noLogo = "./img/none_184x69.jpg";

async function getPico4Apps() {
    let p4a: Pico4Apps[] = [];

    let appsName = await getAppsName();
    appsName.splice(0, 8)

    appsName.map(async name => {
        let steamApp: SteamApp = await getAppLogo(name);
        if (steamApp.logo === noLogo) {
            steamApp = await getAppLogo(name.substring(0, name.lastIndexOf(" ")));
        }

        let review = await getAppReview(steamApp.appid);
        if (review !== undefined) {
            steamApp.review = review;
        }

        let newApp: Pico4Apps = {
            name: name,
            steamApp: steamApp
        }
        p4a.push(newApp);
    })
    return p4a;
}

async function getAppsName() {
    let html = (await (await fetch(proxyURL + appsUrl)).text());

    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let pre = doc.querySelectorAll("a");

    let appsName = Array.from(pre).map(data => {
        let name = data.innerHTML
            .replace('.zip', '')
            .replace('.apk', '')
            .replaceAll('_', ' ');

        let text = name.split(' ');
        let remove = " " + text[text.length - 2] + " " + text[text.length - 1];

        return name.replace(remove.toString(), '');
    })
    return appsName;
}

async function getAppLogo(name: string) {
    let logos: SteamApp[] = (await (await fetch(proxyURL + steamUrl + name)).json());
    if (logos.length === 0) {
        return {
            appid: 0,
            name: name,
            logo: noLogo,
            review: "NaN"
        };
    } else if (logos.length === 1) {
        return logos[0];
    } else {
        const selected = Object.values(logos).find(e => e.name === name);
        if (selected !== undefined) {
            return selected;
        }

        while (name.length !== 0) {
            for (let i = 0; i < logos.length; i++) {
                if (logos[i].name.startsWith(name)) {
                    return logos[i];
                }
            }
            name = name.substring(0, name.lastIndexOf(" "));
        }
        return logos[0];
    }
}

async function getAppReview(appid: number) {
    if (appid !== 0) {
        let review: SteamAppReview = (await (await fetch(proxyURL + steamReviewUrl + appid + "?json=1")).json());
        return (review.query_summary.total_positive * 10 / review.query_summary.total_reviews).toFixed(1);
    }
}

export const pico4Apps = getPico4Apps();