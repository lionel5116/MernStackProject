import React, {useState,useContext} from 'react'

import Input from '../../shared/components/FormElements/Input'
import './PlaceForm.css'
import Button from '../../shared/components/FormElements/Button'
import {
   VALIDATOR_MINLENGTH, 
   VALIDATOR_REQUIRE} 
   from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'


const _PORT = '5000';
const _NODE_EXPRESS_SERVER = `http://localhost:${_PORT}/api/places`;

function NewPlace() {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState();


const [formState,InputHandler] = useForm({
    title: {
     value: '',
     isValid:false
    },
    description: {
      value: '',
      isValid:false
     },
     address: {
      value: '',
      isValid:false
     }
},false);


const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    //console.log(formState.inputs);  //send this to backend
    let SERVER_URL;
    try {

      setIsLoading(true);

      SERVER_URL = _NODE_EXPRESS_SERVER;
      console.log(SERVER_URL);
      
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
        'Content-Type':'application/json'
        },
        body: JSON.stringify( {
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId
        })
      });

      const responseData = await response.json();
      /*
      if(!response.ok)  //anything other than a 200+ throw regular built-in java Error handler
      {
         throw new Error(response.message);
      }
      */
      console.log(responseData);

      setIsLoading(false);
      history.push('/')

    } catch (error) {
       console.log('Error Posting a new Place!!!!')
       setIsLoading(false);
       setError(error.message || 'Something went wrong, please try again');
    }
  };

     
  const errorHandler = (e) => {
    e.preventDefault();
    setError(null)
  }
 
  //THE INPUT(S) ARE CUSTOM INPUTS THAT TAKE PROPS: VALIDATORS, CALLBACK METHOD (onInput) etc..
  return (
    <Fragment>
      <ErrorModal error={error} onClear={(e) => errorHandler(e)} />
    <form
      className='place-form'
      onSubmit={placeSubmitHandler}
      >
      {isLoading && <LoadingSpinner asOverlay />}
      <Input 
          id="title"
          element='input' 
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput = {InputHandler}
          />
       <Input 
          id="description"
          element='textarea' 
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5),]}
          errorText='Please enter a valid description (at least 5 characters).'
          onInput = {InputHandler}
          />
           <Input 
            id="address"
            element='input' 
            label="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address.'
            onInput = {InputHandler}
          />
          <Button
           type='submit'
           disabled={!formState.isValid}
          >ADD PLACE
          </Button>
    </form>
    </Fragment>
  )
}

export default NewPlace