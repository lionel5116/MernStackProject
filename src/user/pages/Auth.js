
import React, {useState,useContext} from 'react'
import './Auth.css'
//import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_EMAIL, 
         VALIDATOR_MINLENGTH,
        VALIDATOR_REQUIRE} from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import '../../places/pages/PlaceForm.css'
import { AuthContext } from '../../shared/context/auth-context'

const _PORT = '5000';
const _NODE_EXPRESS_SERVER = `http://localhost:${_PORT}/api/users`;


function Auth() {

  //state management
  const auth = useContext(AuthContext)

  const [isLoginMode,setIsLoginMode] = useState(true);

    const [formState,inputHandler,setFormData] =  useForm({ 
        email: {
            value:'',
            isValid: false
        },
        password: {
          value:'',
          isValid: false
      }
      } ,false)

     const authSubmitHandler = async (event)=>{
         event.preventDefault();
         let SERVER_URL;
         if(isLoginMode) {
       
         }
         else{
            //signup mode
            try {
              SERVER_URL = _NODE_EXPRESS_SERVER +  '/signup/';
              console.log(SERVER_URL);
              const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                'Content-Type':'application/json'
                },
                body: JSON.stringify( {
                  name : formState.inputs.name.value,
                  email : formState.inputs.email.value,
                  password : formState.inputs.password.value,
                })
              });

              const responseData = await response.json();
              
              console.log(responseData);

            } catch (error) {
               console.log('Error signing up!!!')
               return;
            }
         }

         //useContext
         auth.login();
     }
     
    const switchModeHandler = (e) => {
      e.preventDefault();
      if(!isLoginMode) {
        setFormData({
          ...formState.inputs,
          name: undefined
        },formState.inputs.email.isValid && formState.inputs.password.isValid)
      } 
      else{
        setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },false);
      }
      setIsLoginMode(prevMode => !prevMode)
    };



  return (
       <form  className='place-form' onSubmit={authSubmitHandler}>
        <h2>
            Login Required
        </h2>
        <hr />
        {!isLoginMode && <Input   
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />}
          <Input 
            element = "input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            >
          </Input>
          <Input 
            element = "input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
            >
          </Input>
          <Button
            type="submit"
            disabled={!formState.isValid}>
             {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          <hr></hr>
          <Button inverse onClick={(e) => switchModeHandler(e)}>SWITCH TO  {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
        </form>
        )
 
}

export default Auth