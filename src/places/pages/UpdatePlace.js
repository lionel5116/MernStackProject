import React , {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

import './PlaceForm.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/util/Validators';
import { useForm } from '../../shared/hooks/form-hook';

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

function UpdatePlace() {
    const[isLoading,setIsLoading] = useState(true);

    const placeID = useParams().placeID
    
    const [formState,inputHandler,setFormData] =useForm( {
     title: {
       value: '',
       isValid:true
     },
     description: {
      value: '',
      isValid:true
    }
   },false)

   const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeID);
   
//watches for state changes and prevents infinite loop
useEffect(() => {
  
    if(identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
        value: identifiedPlace.description,
        isValid:true
      }
      },true);
    }
      setIsLoading(false)

    },[setFormData,identifiedPlace]

);
   

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

    if(!identifiedPlace) {
        return (
            <div className='center'>
              <Card>
              <h2>Could not find place!</h2>
              </Card>
            </div>
        )
    }


  if(isLoading) {
    return (
      <div className='center'>
      <h2>Loading .....</h2>
      </div>
    )
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace