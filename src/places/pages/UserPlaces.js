import React from 'react'
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList'

import { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

/*
const DUMMY_PLACES = [
  
 {
   id:'p1',
   title:'Rick James Crib',
   description: ' I am Rick James B(*&***',
   imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuF2c-qbPJI9qV0HNzRYr3Mow-SRfHTLLOecBjm_Z480dE2vwdm_APPKOd7XaWfv7a6M&usqp=CAU',
   address:'1800 N Highland Ave, Los Angeles, CA 90028',
   location: {
     lat:34.1042985,
     lng:-118.3419484
   },
   creator:'u1'
 },
 {
  id:'p2',
  title:'50 Cent Crib',
  description: 'Player Pimp',
  imageUrl:'https://cdn.vox-cdn.com/thumbor/0iIjLw_QAQk-b_8HcGcN1FWSOdE=/0x0:1220x813/1400x1400/filters:focal(513x310:707x504):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56142171/curry1.0.jpg',
  address:'1755 N Highland Ave, Los Angeles, CA 90028',
  location: {
    lat:34.1042985,
    lng:-34.1042985
  },
  creator:'u2'
},

];
*/



function UserPlaces() {


  const [error,setError] = useState();
  const [loadedPlaces,setloadedPlaces] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const _PORT = '5000';
  const _NODE_EXPRESS_SERVER = `http://localhost:${_PORT}/api/places`;
  
  const userID = useParams().userID;


  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(_NODE_EXPRESS_SERVER + `/user/${userID}/`);
        const responsData = await response.json();

        /*
        if (!response.ok) {
          //anything other than a 200+ throw regular built-in java Error handler
          throw new Error(response.message);
        }
        */
        setIsLoading(false);
        setloadedPlaces(responsData.places);
        

      } catch (error) {
        setError(
          "Something went wrong with fetching the places " + error.message
        );
        setIsLoading(false);
      }
    };
    sendRequest();
  },[_NODE_EXPRESS_SERVER,userID]);


  const errorHandler = (e) => {
    e.preventDefault();
    setError(null)
  }

  return (
    <React.Fragment>
       <ErrorModal error={error} onClear={(e) => errorHandler(e)} />
       {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
       )}
       {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
    </React.Fragment>
         
  )
}

export default UserPlaces