import './App.css';
import NormalLoginForm from './components/NormalLoginForm'
import React from 'react'
import logo from './imgs/logo.png'

function App() {
    return (
        <React.Fragment>
            <div className="TitleBlock">
                <img className="logo" src={logo} alt="Logo"/>              
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
