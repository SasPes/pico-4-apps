import {proxyURL} from "../app/Pico4Apps";

const appsUrl = 'https://picomyp.ml';

export async function getAppsName() {
    const html = (await (await fetch(proxyURL + appsUrl)).text());

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const pre = doc.querySelectorAll("a");

    let toRemove: string[] = [];

    let appsName = Array.from(pre).map(data => {
        const nameOrg: string = data.innerHTML;
        if (nameOrg.endsWith("/")) {
            toRemove.push(nameOrg);
            return nameOrg;
        } else {
            const name = nameOrg
                .replace('.zip', '')
                .replace('.apk', '')
                .replaceAll('_', ' ');

            const text = name.split(' ');
            const remove = " " + text[text.length - 2] + " " + text[text.length - 1];

            return name.replace(remove.toString(), '');
        }
    })
    appsName = appsName.filter((el) => !toRemove.includes(el));
    return appsName;
}