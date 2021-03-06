import React, { Component } from 'react';
import './Photo.css';
import Info from '../Info/Info';

class Photo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='photo'>
                <img className='unsplash-img' src={this.props.src} alt={this.props.altText} style={{ borderStyle: 'solid', borderColor: this.props.borderColor, borderWidth: '1px' }}/>
                <Info user={this.props.user} />
            </div>
        );
    }
}

export default Photo;
