import React, { Component } from 'react';
import './Info.css';

class Info extends Component {
    constructor(props) {
        super(props);
    }
    getUserURL = () => {
        let username = this.props.user ? this.props.user.username : '';

        return `https://unsplash.com/@${username}`;
    }
    getCountryURL = () => {
        let country = this.props.location ? this.props.location.country : '';

        return `https://unsplash.com/${country}`;
    }
    render() {
        return (
            <div className="unsplash-info">
                <p>Photo by <a href={this.getUserURL()}>{this.props.user.name}</a></p>
                <a href={this.getCountryURL()}>{this.props.location.country}</a>
            </div>
        );
    }
}

export default Info;