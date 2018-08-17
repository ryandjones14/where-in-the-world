import React, { Component } from 'react';
import './App.css';
import Photo from '../Photo/Photo';
import Info from '../Info/Info';

const access_key = '';
const api = 'https://api.unsplash.com';
// const secret_key = ENV['UNSPLASH_SECRET_KEY'];

class App extends Component {
  state = {
    photos: [],
    currentImg: 0,
  };

  componentDidMount = () => {
    this.getRandomPhotos()
      .then(res => this.setState({
        photos: res,
        currentImg: 0,
      }))
      .catch(err => console.log(err));
  }
  
  getNewPhotos = () => {
    console.log('new photos');
    this.getRandomPhotos()
      .then(res => this.setState({
        photos: res,
      }))
      .catch(err => console.log(err));
  }

  getRandomPhotos = async () => {
    const response = await fetch(`${api}/photos/random?client_id=${access_key}&count=30&orientation=landscape`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };  

  getNextImg = () => {
    let nextImg = this.state.currentImg + 1;
    this.setState({ currentImg: nextImg, className: 'loading' });
    setTimeout(() => { 
      this.setState({ className: 'main' });
    }, 3000);
  }

  getImgSrc = () => {
    console.log('currentImg', this.state.currentImg);
    if (this.state.currentImg === 10) {
      this.getNewPhotos();
    }
    if (this.state.photos.length > 0 && !this.state.photos[this.state.currentImg].location) {
      this.getNextImg();
    }
    return this.state.photos.length > 0  ? this.state.photos[this.state.currentImg] ? this.state.photos[this.state.currentImg].urls.full : '' : '';
  }

  getImgDesc = () => {
    return this.state.photos.length > 0  ? this.state.photos[this.state.currentImg] ? this.state.photos[this.state.currentImg].description : '' : '';
  }

  getLocation = () => {
    return this.state.photos.length > 0  ? this.state.photos[this.state.currentImg].location ? this.state.photos[this.state.currentImg].location || '' : '' : '';
  };

  getUser = () => {
    return this.state.photos.length > 0 ? this.state.photos[this.state.currentImg].user ? this.state.photos[this.state.currentImg].user || '' : '' : '';
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">where in the world?</h1>
          <button onClick={this.getNewPhotos}>new game</button>          
        </header>
        <div className={this.state.className}>
          <Photo src={this.getImgSrc()} altText={this.getImgDesc()} />
          <Info user={this.getUser()} location={this.getLocation()} />
          <button onClick={this.getNextImg}>next</button>
        </div>
      </div>
    );
  }
}

export default App;
