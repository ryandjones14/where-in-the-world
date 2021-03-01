import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = (props) => {
    function handleClick(country) {
        props.selectAnswer(country);
    }
    console.log('answer choices', props.answerChoices);
    return (
        <div className='quiz'>
            <button className="option" id="1" onClick={() => handleClick(props.answerChoices[0])}>{props.answerChoices[0]}</button>
            <button className="option" id="2" onClick={() => handleClick(props.answerChoices[1])}>{props.answerChoices[1]}</button>
            <button className="option" id="3" onClick={() => handleClick(props.answerChoices[2])}>{props.answerChoices[2]}</button>
            <button className="option" id="4" onClick={() => handleClick(props.answerChoices[3])}>{props.answerChoices[3]}</button>
        </div>
    );
};

export default Quiz;
