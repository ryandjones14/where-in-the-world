import React, { Fragment, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import './Photo.css';
import Info from '../Info/Info';

const Photo = ({ photo }) => {
  console.log(`photo: ${photo.location.country}`);
  return (
      <Fragment>
          <div className='photo'>
            {/* <p>this is where the photo should go</p> */}
            <img className='unsplash-img' src={photo.urls.regular} alt={photo.description} style={{ borderStyle: 'solid', borderColor: photo.color, borderWidth: '1px' }}/>
              <Info user={photo.user} />
          </div>
      </Fragment>
  );
};

export default Photo;
