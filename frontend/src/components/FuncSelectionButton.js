import './FuncSelectionButton.css'
import React from 'react'
import { Button } from 'antd'


function FuncSelectionButton(props) {

    const setWheel = () => {
        props.setFunc("Wheel")
        props.resetSelectedRestaurant();
    }

    const setNearby = () => {
        props.setFunc("Nearby")
        props.resetSelectedRestaurant();
    }

    return (
        <div className="FuncSelection">
            <Button className="WHEEL" type="primary" onClick={setWheel}> WHEEL </Button>
            <Button className="NEARBY" type="primary" onClick={setNearby}> NEARBY </Button>
        </div>
    ); 

};

export default FuncSelectionButton;