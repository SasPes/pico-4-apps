import {useEffect, useReducer, useState} from 'react'
import logo from './img/p4.png';
import './App.css';
import {pico4Apps} from './pico4Apps'

function App() {
    const [apps, setApps] = useState<any[]>([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        setTimeout(() => {
            pico4Apps.then(apps => setApps(apps));
        }, 1000);
    }, []);

    function handleClick() {
        forceUpdate();
    }

    return (
        <div className="App">
            <header className="App-header">
                <button className="button" onClick={handleClick}>Load more</button>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>List of Pico 4 Apps [{apps.length}]</p>
            </header>

            {apps && apps.length ? "" : (
                <div className="lds-facebook">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}

            {
                apps.map(app => {
                    return <div className="Div-flex">
                        <div className="badge_div">
                            <span className="badge">
                              <span className="badge_icon">
                                <b><i className="material-icons">{app.steamApp.review}</i></b>
                              </span>
                            </span>
                        </div>
                        <br/>
                        <div><img src={app.steamApp.logo}/></div>
                        <div>{app.name}</div>
                        <br/>
                    </div>;
                })
            }
        </div>
    )
}

export default App;
