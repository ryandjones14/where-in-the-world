import React, { Component } from 'react';
import './App.css';
import Photo from '../Photo/Photo';
import Info from '../Info/Info';
import Quiz from '../Quiz/Quiz';

const access_key = '09ce42f77007d00a8005202f9eb969492e925a57fcb58f7ae0061874283ad225';
const api = 'https://api.unsplash.com';
// const secret_key = ENV['UNSPLASH_SECRET_KEY'];

class App extends Component {
  
  state = {
    photos: [],
    currentImg: 0,
    hasPhotos: false,
    countryList: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
    score: 0,
  };

  componentDidMount = () => {
    this.getNewPhotos();
  }
  
  getNewPhotos = () => {
    this.setState({
      photos: [],
      currentImg: 0,
      hasPhotos: false,
      isFetching: true,
      message: 'getting some pics for u chill a bit',
      score: 0,
    })
    console.log('new photos');
    this.getRandomPhotos()
      .then(res => this.setState({
        photos: res.filter(photo => photo.location && photo.location.country),
        currentImg: 0,
        hasPhotos: true,
        isFetching: false
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
    // if (this.state.currentImg === 3) {
    //   this.startNewGame();
    //   return;
    // }
    let nextImg = this.state.currentImg + 1;
    this.setState({ currentImg: nextImg, isFetching: true });
    setTimeout(() => { 
      this.setState({ isFetching: false });
    }, 5000);
  };

  startNewGame = () => {
    if (this.state.score > (localStorage && localStorage.getItem('highScore'))) {
      localStorage.setItem('highScore', this.state.score);
    }
    this.getNewPhotos();
    this.setState({score: 0});
  };

  getHighScore = () => {
    return (localStorage && localStorage.getItem('highScore')) || 0;
  };

  getCurrentImgSrc = () => {
    console.log('currentImg', this.state.currentImg);
    // if (this.state.currentImg === 3) {
    //   this.startNewGame();
    // }
    if (this.state.photos.length > 0 &&
        !this.state.photos[this.state.currentImg].location) {
      this.getNextImg();
    }
    return (this.state.photos.length > 0 &&
           this.state.photos[this.state.currentImg].urls.full) || '';
  };

  getCurrentImgColor = () => {
    return (this.state.photos.length > 0 && this.state.photos[this.state.currentImg].color) || '';
  }

  getCurrentImgDesc = () => {
    return this.state.photos.length > 0 &&
           this.state.photos[this.state.currentImg] ?
           this.state.photos[this.state.currentImg].description : '';
  }

  getCurrentLocation = () => {
    return this.state.photos.length > 0 &&
           this.state.photos[this.state.currentImg].location ?
           this.state.photos[this.state.currentImg].location : '';
  };

  getCurrentCountry = () => {
    const location = this.getCurrentLocation();
    return location.country;
  }

  getUser = () => {
    return this.state.photos.length > 0 &&
           this.state.photos[this.state.currentImg].user ?
           this.state.photos[this.state.currentImg].user : '';
  };

  getAnswerChoices = () => {
    const countryList = this.state.countryList;
    let answerChoicesCopy = [];
    let correctCountry = this.getCurrentCountry().toLowerCase();

    for (let i = 0; i < 3; i++) {
      let country = countryList[Math.floor(Math.random() * 203)];
      if (country !== correctCountry && answerChoicesCopy.indexOf(country) < 0) {
        answerChoicesCopy.push(country.toLowerCase());
      }
    }
    answerChoicesCopy.splice(Math.floor(Math.random() * 3), 0, correctCountry);
    return answerChoicesCopy;
  };

  selectAnswer = (country) => {
    let newScore = this.state.score;
    let correctCountry = this.getCurrentCountry().toLowerCase();
    if (country === correctCountry) {
      newScore++;
      this.setState({
        isFetching: true,
        score: newScore,
        message: 'yep w2g u did it'
      });
    } else {
      this.setState({
        isFetching: true,
        message: `lol nope it was actually ${correctCountry}. time 4 a new game.`,
      });
      setTimeout(this.startNewGame, 3000);
    }
    this.getNextImg();
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="title">where in the world?</h1>
          <button onClick={this.getNewPhotos}>new game</button>          
        </header>
        {this.state && this.state.hasPhotos &&
          <div>
            <div>score: {this.state.score}</div>
            <div>hot streak: {this.getHighScore()}</div>
          {this.state && !this.state.isFetching &&
            <div>
              <Photo src={this.getCurrentImgSrc()} altText={this.getCurrentImgDesc()} borderColor={this.getCurrentImgColor()}/>
              <Quiz answerChoices={this.getAnswerChoices()} correctCountry={this.getCurrentCountry()} selectAnswer={this.selectAnswer}/>
            <Info user={this.getUser()} country={this.getCurrentCountry()} country={this.getCurrentCountry()}/>
            </div>
          }
          {this.state && this.state.isFetching &&
            <div>
              <p>{this.state.message}</p>
            </div>
          }
          </div>
        }
      </div>
    );
  }
}

export default App;
