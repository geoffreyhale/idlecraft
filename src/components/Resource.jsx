import React from "react";
import PropTypes from 'prop-types';

class Resource extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="resource-container">
                <div className="name">{this.props.name}</div>
                <div className="quantity"></div>
                <div className="buttons">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Resource.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Resource;