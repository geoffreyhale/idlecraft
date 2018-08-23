import React from "react";
import PropTypes from 'prop-types';

export default function Resource(props) {
    return (
        <div id={props.id} className="resource-container">
            <div className="name">{props.name}</div>
            <div className="quantity"></div>
            <div className="buttons">
                {props.children}
            </div>
        </div>
    );
}

Resource.propTypes = {
    id: PropTypes.string.isRequired,
};