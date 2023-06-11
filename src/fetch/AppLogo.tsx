import {noLogo, proxyURL, SteamApp} from "../app/Pico4Apps";

const steamUrl = 'https://steamcommunity.com/actions/SearchApps/';

export async function getAppLogo(name: string) {
    const logos: SteamApp[] = (await (await fetch(proxyURL + steamUrl + name)).json());
    if (logos.length === 0) {
        return {
            appid: 0,
            name: name,
            logo: noLogo,
            rating: "NaN"
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