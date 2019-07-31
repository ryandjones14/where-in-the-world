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
        let country = this.props.country ? this.props.country : '';

        return `https://unsplash.com/${country}`;
    }
    render() {
        return (
            <div className="unsplash-info">
                <p>Photo by <a href={this.getUserURL()}>{this.props.user.name}</a></p>
                <p>{this.props.country}</p>
                
            </div>
        );
    }
}

export default Info;