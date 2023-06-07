import {useEffect, useState} from 'react'
import logo from './img/p4.png';
import './App.css';
import {pico4Apps} from './pico4Apps'

function App() {
    const [apps, setApps] = useState<any[]>([]);

    useEffect(() => {
        pico4Apps.then(apps => setApps(apps));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>List of Pico 4 Apps</p>
            </header>

            {
                apps.map(app => {
                    return <div className="Div-flex">
                        <div><img src={app.logo}/></div>
                        {app.name}
                    </div>;
                })
            }
        </div>
    )
}

export default App;
