import React, { useState, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

import Photo from '../Photo/Photo';
import './Quiz.css';

import { stateOps } from "../../cache";



const Quiz = ({ data, refetch }) => {
    // function handleClick(country) {
    //     props.selectAnswer(country);
    // }
    const [countryList] = useState(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]);
    // let displayedPhotoIDs = [];

    let displayPhoto = useReactiveVar(stateOps.photoVar);
    let score = useReactiveVar(stateOps.scoreVar);
    let answerChoices = useReactiveVar(stateOps.answerChoicesVar);
    let usedPhotoCount = useReactiveVar(stateOps.usedPhotoCountVar);
    let allDone;

    const getPhoto = () => {
        console.log('getPhoto')
        // let index = Math.floor(Math.random() * data.photos.length);
        let photo = data.photos[usedPhotoCount];
        // if (photo.location.country === null ||
        //     photo.location.country === "" ||
        //     displayedPhotoIDs.includes(photo.id)) {
        //     photo = getPhoto();
        // }
        // let newDisplayedPhotoIDs = displayedPhotoIDs.concat([photo.id]);
        stateOps.usedPhotoCountVar(usedPhotoCount + 1);
        // stateOps.changePhoto(photo);
        // console.log(`\n\n photos: ${data.photos} \n\n`)
        // data.photos.splice(index, 1);
        // displayPhoto = photo;
        // return photo;
        stateOps.photoVar(photo);
        // displayPhoto = useReactiveVar(stateOps.photoVar);
        return photo;
    };

    const getAnswerChoices = () => {
        const newAnswerChoices = new Array(4).fill(null);
        const correctIndex = Math.floor(Math.random() * 4);
        // const photo = await getPhoto();
        // const photo = data.randomPhoto[0];
        newAnswerChoices[correctIndex] = displayPhoto && displayPhoto.location.country.toLowerCase();
        newAnswerChoices.forEach((choice, i) => {
            const randomIdx = Math.floor(Math.random() * countryList.length);
            if (choice === null) {
                newAnswerChoices[i] = countryList[randomIdx].toLowerCase();
            }
        });
        stateOps.answerChoicesVar(newAnswerChoices);
    };

    const selectAnswer = async (choice) => {
        console.log(`choice selected: ${choice}`);
        // let photo = data.randomPhoto[0];
        if (choice === (displayPhoto && displayPhoto.location.country).toLowerCase()) {
            // let score = useReactiveVar(stateOps.scoreVar);
            score++;
            stateOps.scoreVar(score);
        }
        // refetch();
        if (usedPhotoCount === data.photos.length) {
            // stateOps.isCompleteVar(true);
            // allDone = <p>You're all done! refresh to start again</p>;
            refetch();
        } else {
            stateOps.photoVar(null);
            stateOps.answerChoicesVar([]);
        }
        // await getPhoto();
        // await getAnswerChoices();
    };

    if (displayPhoto === null) getPhoto();
    if (displayPhoto !== null && answerChoices.length === 0) getAnswerChoices();

    return (
        <div className='quiz'>
            <p>current score: {useReactiveVar(stateOps.scoreVar)}</p>
            {allDone}
            <Photo photo={useReactiveVar(stateOps.photoVar)} />
            <button className="option" id="1" onClick={() => selectAnswer(stateOps.answerChoicesVar()[0])}>{useReactiveVar(stateOps.answerChoicesVar)[0]}</button>
            <button className="option" id="2" onClick={() => selectAnswer(stateOps.answerChoicesVar()[1])}>{useReactiveVar(stateOps.answerChoicesVar)[1]}</button>
            <button className="option" id="3" onClick={() => selectAnswer(stateOps.answerChoicesVar()[2])}>{useReactiveVar(stateOps.answerChoicesVar)[2]}</button>
            <button className="option" id="4" onClick={() => selectAnswer(stateOps.answerChoicesVar()[3])}>{useReactiveVar(stateOps.answerChoicesVar)[3]}</button>
        </div>
    );
};

export default Quiz;
