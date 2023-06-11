import {proxyURL} from "../app/Pico4Apps";

const appsUrl = 'https://picomyp.ml';
const alternativeAppsUrl = 'https://picop.ml';
export let fetchedUrl = appsUrl.replace('https://', '');

export async function getAppsName() {
    let html = (await (await fetch(proxyURL + appsUrl)).text());

    const parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    let pre = doc.querySelectorAll("a");
    let apps = Array.from(pre);

    if (apps.length === 2 && apps[1].innerHTML.startsWith('temporarily offline due to ddos')) {
        fetchedUrl = alternativeAppsUrl.replace('https://', '');
        html = (await (await fetch(proxyURL + alternativeAppsUrl)).text());
        doc = parser.parseFromString(html, "text/html");
        pre = doc.querySelectorAll("a");
        apps = Array.from(pre);
    }

    let toRemove: string[] = [];

    let appsName = apps.map(data => {
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