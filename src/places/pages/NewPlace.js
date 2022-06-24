import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import './PlaceForm.css'
import Button from '../../shared/components/FormElements/Button'
import {
   VALIDATOR_MINLENGTH, 
   VALIDATOR_REQUIRE} 
   from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'

function NewPlace() {

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


  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);  //send this to backend

  };
 
  //THE INPUT(S) ARE CUSTOM INPUTS THAT TAKE PROPS: VALIDATORS, CALLBACK METHOD (onInput) etc..
  return (
    <form
      className='place-form'
      onSubmit={placeSubmitHandler}>
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
  )
}

export default NewPlace