import React from 'react'
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList'


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

function UserPlaces() {
  const userID = useParams().userID;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userID)
  return <PlaceList items={loadedPlaces}/>
}

export default UserPlaces