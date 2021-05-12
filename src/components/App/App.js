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
}

export default App;
