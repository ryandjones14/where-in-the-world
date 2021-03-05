import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';

import Quiz from '../Quiz/Quiz';


export const PHOTO_LIST_DATA = gql`
  fragment PhotoFrag on Photo {
    id
    createdAt
    updatedAt
    width
    blurHash
    color
    location {
      name
      city
      country
    }
    urls {
      full
      regular
    }
    user {
      id
      username
      portfolioUrl
    }
  }
`;

export const GET_PHOTOS = gql`
  query GetRandomPhotos {
    photos {
      ...PhotoFrag
    }
  }
  ${PHOTO_LIST_DATA}
`;

export const GET_PHOTO = gql`
  query GetRandomPhoto {
    randomPhoto {
      ...PhotoFrag
    }
    score @client
  }
  ${PHOTO_LIST_DATA}
`;

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_PHOTOS);
  // const [ isLoading, setIsLoading ] = useState(false);
  // const [ hasError, setHasError ] = useState(false);
  // const [ photo, setPhoto ] = useState(null);
  // const [ score, setScore ] = useState(0);

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data || data.photos.length < 1) return <p>could not load</p>;
    
  return (
    <div className="App">
      <header className="header">
        <h1 className="title">where in the world?</h1>
      </header>
      <Quiz data={data} refetch={refetch}/>
    </div>
  );
      {/* {this.state && this.state.hasPhotos &&
        <div>
          <div>
            <div>{this.getEmoji()}score: {this.state.score}{this.getEmoji()}</div>
            <div>highest streak: {this.getHighScore()}</div>
          </div>
          {this.state && !this.state.isFetching && !this.state.hasError &&
            <div className="game">
              <Photo
                src={this.getCurrentImgSrc()}
                altText={this.getCurrentImgDesc()}
                borderColor={this.getCurrentImgColor()}
                user={this.getUser()}
              />
              <Quiz
                answerChoices={this.getAnswerChoices()}
                correctCountry={this.getCurrentCountry()}
                selectAnswer={this.selectAnswer}
              />
            </div>
          }
          {this.state && this.state.isFetching &&
            <div>
              <p>{this.state.message}</p>
            </div>
          }
        </div>
      }
      {this.state && this.state.hasError &&
        <div>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.getNewPhotos}>retry</button>
        </div>
      } */}
    // </div>
}
  
//   state = {
//     photos: [],
//     currentImg: 0,
//     hasPhotos: false,
//     countryList: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
//     score: 0,
//     hasError: false,
//   };

//   componentDidMount = () => {
//     this.getNewPhotos();
//   }
  
//   getNewPhotos = async () => {
//     let score = this.state.score || 0;
//     this.setState({
//       photos: [],
//       currentImg: 0,
//       hasPhotos: false,
//       isFetching: true,
//       message: 'getting some pics for u chill a bit',
//       score,
//     });
//     console.log('new photos');
//     await this.getRandomPhotos();
//       // .then(res => this.setState({
//       //   photos: res.filter(photo => photo.location && photo.location.country),
//       //   currentImg: 0,
//       //   hasPhotos: true,
//       //   message: 'getting some pics for u chill a bit',
//       //   isFetching: false
//       // }))
//       // .catch(err => console.log(err));
//     // if (!this.state.hasError && this.state.photos.length > 0) {
//       // fetch(this.state.photos[0].urls.full);
//       // fetch(this.state.photos[1].urls.full);    
//     // }
//   };

//   getRandomPhotos = async () => {
//     try {
//       console.log('get random photos');
//       const response = await fetch(`${URL}/pictures`);
//       // const response = {status: 400};
//       // const body = await response.json();
      
//       if (response.status === 200) {
//         this.setState({
//           hasPhotos: true,
//           photos: response,
//           isFetching: false
//         });
//       }
      
//       return true;
//     } catch (e) {
//       console.error(e);
//     }
//   };  

//   getNextImg = () => {
//     let nextImg = this.state.currentImg + 1;
//     if (nextImg === this.state.photos.length - 1) {
//       this.getNewPhotos();
//       return;
//     }
//     // fetch(this.state.photos[nextImg + 1].urls.full);
//     this.setState({ currentImg: nextImg, isFetching: true });
//     setTimeout(() => { 
//       this.setState({ isFetching: false });
//     }, 5000);
//   };

//   startNewGame = () => {
//     if (this.state.score > (localStorage && localStorage.getItem('highScore'))) {
//       localStorage.setItem('highScore', this.state.score);
//     }
//     this.getNewPhotos();
//     this.setState({score: 0});
//   };

//   getHighScore = () => {
//     return (localStorage && localStorage.getItem('highScore')) || 0;
//   };

//   getCurrentImgSrc = () => {
//     console.log('currentImg', this.state.currentImg);
//     if (this.state.currentImg === this.state.photos.length - 1) {
//       this.getNewPhotos();
//       return;
//     }
//     if (this.state.photos.length > 0 &&
//         !this.state.photos[this.state.currentImg].location) {
//       this.getNextImg();
//     }
//     return (this.state.photos.length > 0 &&
//            this.state.photos[this.state.currentImg].urls.full) || '';
//   };

//   getCurrentImgColor = () => {
//     return (this.state.photos.length > 0 && this.state.photos[this.state.currentImg].color) || '';
//   }

//   getCurrentImgDesc = () => {
//     return this.state.photos.length > 0 &&
//            this.state.photos[this.state.currentImg] ?
//            this.state.photos[this.state.currentImg].description : '';
//   }

//   getCurrentLocation = () => {
//     return this.state.photos.length > 0 &&
//            this.state.photos[this.state.currentImg].location ?
//            this.state.photos[this.state.currentImg].location : '';
//   };

//   getCurrentCountry = () => {
//     const location = this.getCurrentLocation();
//     return location.country;
//   }

//   getUser = () => {
//     return this.state.photos.length > 0 &&
//            this.state.photos[this.state.currentImg].user ?
//            this.state.photos[this.state.currentImg].user : '';
//   };

//   getAnswerChoices = () => {
//     const countryList = this.state.countryList;
//     let answerChoicesCopy = [];
//     let correctCountry = this.getCurrentCountry().toLowerCase();

//     for (let i = 0; i < 3; i++) {
//       let country = countryList[Math.floor(Math.random() * 203)];
//       if (country !== correctCountry && answerChoicesCopy.indexOf(country) < 0) {
//         answerChoicesCopy.push(country.toLowerCase());
//       }
//     }
//     answerChoicesCopy.splice(Math.floor(Math.random() * 3), 0, correctCountry);
//     return answerChoicesCopy;
//   };

//   selectAnswer = async (country) => {
//     let newScore = this.state.score;
//     let correctCountry = this.getCurrentCountry().toLowerCase();
//     if (country === correctCountry) {
//       newScore++;
//       await this.setState({
//         isFetching: true,
//         score: newScore,
//         message: 'yep w2g u did it'
//       });
//     } else {
//       this.setState({
//         isFetching: true,
//         message: `lol nope it was actually ${correctCountry}. time 4 a new game.`,
//       });
//       setTimeout(this.startNewGame, 3000);
//     }
//     if (this.state.currentImg === this.state.photos.length - 1) {
//       this.getNewPhotos();
//     } else {
//       this.getNextImg();
//     }
//   };

//   getEmoji = () => {
//     if (this.state.score > 4) {
//       return '🔥'.repeat(Math.floor(this.state.score/5));
//     }
//     return '';
//   };

//   render() {
//     return (
//       <div className="App">
//         <header className="header">
//           <h1 className="title">where in the world?</h1>
//         </header>
//         {this.state && this.state.hasPhotos &&
//           <div>
//             <div>
//               <div>{this.getEmoji()}score: {this.state.score}{this.getEmoji()}</div>
//               <div>highest streak: {this.getHighScore()}</div>
//             </div>
//             {this.state && !this.state.isFetching && !this.state.hasError &&
//               <div className="game">
//                 <Photo
//                   src={this.getCurrentImgSrc()}
//                   altText={this.getCurrentImgDesc()}
//                   borderColor={this.getCurrentImgColor()}
//                   user={this.getUser()}
//                 />
//                 <Quiz
//                   answerChoices={this.getAnswerChoices()}
//                   correctCountry={this.getCurrentCountry()}
//                   selectAnswer={this.selectAnswer}
//                 />
//               </div>
//             }
//             {this.state && this.state.isFetching &&
//               <div>
//                 <p>{this.state.message}</p>
//               </div>
//             }
//           </div>
//         }
//         {this.state && this.state.hasError &&
//           <div>
//             <p>{this.state.errorMessage}</p>
//             <button onClick={this.getNewPhotos}>retry</button>
//           </div>
//         }
//       </div>
//     );
//   }
// }

export default App;
