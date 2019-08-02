import React, { useState, useEffect } from 'react';
import './Quiz.css';

export default function Quiz(props) {
    // const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    // const [answerChoices, setAnswerChoices] = useState([]);
    // const [questionNumber, setQuestionNumber] = useState(props.questionNumber);
    // const [hasCorrectCountry, setHasCorrectCountry] = useState(false);

    // componentDidMount = () => {
    //     let countriesCopy = answerChoices;
    //     if (props.correctCountry) {
    //         countriesCopy.push(props.correctCountry);
    //         setAnswerChoices({
    //             answerChoices: countriesCopy,
    //         });
    //     }
    // }

    // useEffect(() => {
    //     getAnswerChoices();
    // });

    // componentDidUpdate = () => {
    //     this.getAnswerChoices();
    // }

    // function getAnswerChoices() {
    //     // if (answerChoices.length > 0) return;

    //     let answerChoicesCopy = [];
    //     for(let i = 0; i < 3; i++){
    //         let country = countryList[Math.floor(Math.random() * 205)];
    //         if (country && answerChoicesCopy.indexOf(country) < 0) {
    //             answerChoicesCopy.push(country.toLowerCase());
    //         }
    //     }
    //     answerChoicesCopy.splice(Math.floor(Math.random() * 3), 0, props.correctCountry.toLowerCase());
    //     setAnswerChoices(answerChoicesCopy);
    // }

    // function getCountry() {
    //     if (!hasCorrectCountry) {
    //         return;
    //     }
    //     let countries = [...new Set(props.countries)];
    //     let count = countries && countries.length;
    //     let country = countries && countries[Math.floor(Math.random() * count)];

    //     if (country && answerChoices.indexOf(country) < 0) {
    //         let countryChoicesCopy = answerChoices;
    //         countryChoicesCopy.push(country);
    //         console.log('country', country);
    //         setAnswerChoices({ answerChoices: countryChoicesCopy });
    //     }
    //     return country;
    // }

    // render() {
    function handleClick(country) {
        props.selectAnswer(country);
    }
    return (
        <div className='quiz'>
            <button className="option" id="1" onClick={() => handleClick(props.answerChoices[0])}>{props.answerChoices[0]}</button>
            <button className="option" id="2" onClick={() => handleClick(props.answerChoices[1])}>{props.answerChoices[1]}</button>
            <button className="option" id="3" onClick={() => handleClick(props.answerChoices[2])}>{props.answerChoices[2]}</button>
            <button className="option" id="4" onClick={() => handleClick(props.answerChoices[3])}>{props.answerChoices[3]}</button>
        </div>
    );
    // }
}
