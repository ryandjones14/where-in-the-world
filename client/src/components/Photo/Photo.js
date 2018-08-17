import React, { Component } from 'react';
import './Photo.css';

class Photo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img className='unsplash-img' src={this.props.src} alt={this.props.altText} />
            </div>
        );
    }
}

export default Photo;
