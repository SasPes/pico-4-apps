import React from 'react';

type Pico4Apps = {
    name: string;
    logo: string;
};

const appsUrl = 'https://picomyp.ml';
const steamUrl = 'https://steamcommunity.com/actions/SearchApps/';
const proxyURL = 'https://cors-proxy.fringe.zone/';

async function getPico4Apps() {
    let html = (await (await fetch(proxyURL + appsUrl)).text());

    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let pre = doc.querySelectorAll("a");

    const appsName = Array.from(pre).map(data => {
        let name = data.innerHTML
            .replace('.zip', '')
            .replace('.apk', '')
            .replaceAll('_', ' ');

        let text = name.split(' ');
        let remove = " " + text[text.length - 2] + " " + text[text.length-1];

        return name.replace(remove.toString(), '');
    })

    let p4a = appsName.map((str) => ({ name: str}));

    return p4a.splice(8, p4a.length) as Pico4Apps[];
}

export const pico4Apps = getPico4Apps();