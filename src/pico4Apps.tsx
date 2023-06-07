import React from 'react';

type Pico4Apps = {
    name: string;
    logo: string;
};

const proxyURL = 'https://cors-proxy.fringe.zone/';
const appsUrl = 'https://picomyp.ml';
const steamUrl = 'https://steamcommunity.com/actions/SearchApps/';

const noLogo = "./img/none_184x69.jpg";

async function getPico4Apps() {
    let p4a: Pico4Apps[] = [];

    let appsName = await getAppsName();
    appsName.splice(0, 8)

    appsName.map(async name => {
        let appLogo = await getAppLogo(name);

        let newApp: Pico4Apps = {
            name: name,
            logo: appLogo
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
    let logo = (await (await fetch(proxyURL + steamUrl + name)).json());
    if (logo.length == 0) {
        return noLogo;
    }
    return logo[0].logo;
}

export const pico4Apps = getPico4Apps();