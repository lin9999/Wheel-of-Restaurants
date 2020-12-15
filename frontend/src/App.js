import './App.css';
import NormalLoginForm from './components/NormalLoginForm'
import React from 'react'
function App() {
    return (
        <React.Fragment>
            <div className="TitleBlock">
                <div className="TextBlock">
                    <h1 className="titleCap" id="W">W</h1>
                    <h1 className="titleLow" id="here">here's</h1>
                </div>
                <div className="TextBlock">
                    <h1 className="titleCap" id="T">T</h1>
                    <h1 className="titleLow" id="o">he</h1>
                </div>
                <div className="TextBlock">
                    <h1 className="titleCap" id="F">F</h1>
                    <h1 className="titleLow" id="east">ood</h1>
                </div>                  
            </div>
            <div className="Form">
                <NormalLoginForm></NormalLoginForm>
            </div>
            <div className="LeftBlock"></div>
            <div className="FooterBlock"></div>
        </React.Fragment>
    );
}

export default App;
