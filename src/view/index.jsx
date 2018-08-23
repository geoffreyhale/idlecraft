import React from "react";
import ReactDOM from "react-dom";

import Resources from "./components/Resources";

export default class View {
    render() {
        ReactDOM.render(
            <Resources />,
            document.getElementById("app")
        );
    }
}