import {useEffect, useReducer, useState} from 'react'
import logo from '../img/p4.png';
import '../css/App.css';
import {pico4Apps} from './Pico4Apps'
import {fetchedUrl} from "../fetch/AppsName";

const steamUrl = "https://store.steampowered.com/app/";
const filterButton = ['All', '9+', '8+', '7+', '6+', '5+', '4+', 'NaN'];
let numberOfApps = 0;

function App() {
    const [apps, setApps] = useState<any[]>([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            pico4Apps.then(apps => setApps(apps));
        }, 2500);
    }, []);

    function handleClick() {
        forceUpdate();
        numberOfApps = 0;
    }

    const handleFilterClick = (value: number) => {
        setActiveIndex(value);
        numberOfApps = 0;
    }

    const openInNewTab = (url: string) => {
        window.open(steamUrl + url, '_blank', 'noreferrer');
    };

    return (
        <div className="app">
            <header className="app-header">
                <a href="https://www.picoxr.com/uk/products/pico4" target='_blank'><img src={logo} className="app-logo" alt="logo"/></a>
                <div>
                    <p style={{display: "inline-block"}}>Pico 4 Apps</p>
                    <button style={{display: "inline-block"}} className="btn-apps" onClick={handleClick}>{numberOfApps}</button>
                    <p style={{display: "inline-block"}}>{fetchedUrl}</p>
                </div>
            </header>

            {apps && apps.length ? "" : (
                <div className="lds-facebook">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}

            <div>
                <button className="btn" onClick={handleClick}>⟳</button>
                {
                    filterButton.map((text, index) => {
                            return <button onClick={() => handleFilterClick(index)} className={index === activeIndex ? "btn active" : "btn"} id={`button-${index}`}>{text}</button>
                        }
                    )
                }
            </div>

            {
                apps.map(app => {
                    let show = false;
                    if (activeIndex === 0) {
                        show = true;
                    } else {
                        if (app.steamApp.rating.startsWith(filterButton[activeIndex].substring(0, 1))) {
                            show = true;
                        }
                    }

                    if (show) {
                        numberOfApps++;
                        return <div className="div-flex">
                            <div className="badge_div">
                            <span className="badge">
                              <span className="badge_icon">
                                <b><i className="material-icons">{app.steamApp.rating}</i></b>
                              </span>
                            </span>
                            </div>
                            <br/>
                            <div>
                                <img src={app.steamApp.logo} className="pointer-click" onClick={() => openInNewTab(app.steamApp.appid)}/>
                            </div>
                            <div>{app.name}</div>
                            <br/>
                        </div>
                    }
                })
            }

            <footer className="footer">
                <div className="footer-div">
                    <a target="_blank" href="https://github.com/SasPes/pico-4-apps">
                        <div className="icon github"></div>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/SasPes">
                        <div className="icon youtube"></div>
                    </a>
                    <a target="_blank" href="https://discordapp.com/users/442800871257145345">
                        <div className="icon discord"></div>
                    </a>
                </div>
                <p className="copyright">SasPes © 2023</p>
            </footer>
        </div>
    )
}

export default App;
