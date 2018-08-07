import React from "react";
import ReactDOM from "react-dom";

import Resource from "./components/Resource";

class Resources extends React.Component {
    render() {
        return (
            <div id="resources">
                <Resource id="time" name="Time">
                    <button id="start">Start</button>
                    <button id="pause">Pause</button>
                </Resource>
                <Resource id="trees" name="Trees">
                    <button className="take">Chop</button>
                </Resource>
                <Resource id="wood" name="Wood">
                </Resource>
                <Resource id="fire" name="Fire">
                    <button className="make">Make</button>
                </Resource>
                <Resource id="heat" name="Heat">
                </Resource>
                <Resource id="water" name="Water">
                </Resource>
                <Resource id="soup" name="Soup">
                    <button className="make">Make</button>
                </Resource>
            </div>
        );
    }
}

let App = document.getElementById("app");

ReactDOM.render(<Resources />, App);