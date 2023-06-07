import {useEffect, useReducer, useState} from 'react'
import logo from './img/p4.png';
import './App.css';
import {pico4Apps} from './pico4Apps'

function App() {
    const [apps, setApps] = useState<any[]>([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        pico4Apps.then(apps => setApps(apps));
    }, [ignored]);

    function handleClick() {
        forceUpdate();
    }

    return (
        <div className="App">
            <header className="App-header">
                <button className="button" onClick={handleClick}>Refresh</button>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>List of Pico 4 Apps</p>
            </header>

            {
                apps.map(app => {
                    return <div className="Div-flex">
                        <div><img src={app.logo}/></div>
                        {app.name}
                        <br/><br/>
                    </div>;
                })
            }
        </div>
    )
}

export default App;
