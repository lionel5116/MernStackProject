
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
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { Fragment } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'

const _PORT = '5000';
const _NODE_EXPRESS_SERVER = `http://localhost:${_PORT}/api/users`;

function Auth() {

  //state management
  const auth = useContext(AuthContext)
  const [isLoginMode,setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState();

  //const {isLoading,error,sendRequest,clearError} = useHttpClient();  //our custom hook

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

         setIsLoading(true);

         if(isLoginMode) {
        
            /*
            http://localhost:5000/api/users/login/
              slickrick@gmail.com
              conaine
            */
            
            /*
              SERVER_URL = _NODE_EXPRESS_SERVER +  '/login/';
            console.log(SERVER_URL);


            try {
              await sendRequest(
                //using a custom hook
                SERVER_URL,
                'POST',
                {
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value,
                },
                {
                  'Content-Type': 'application/json',
                }
              );
              auth.login();
            } catch (error) {
              //set error state set in custom hook
             
            }
            */

            
         try {

          setIsLoading(true);

          SERVER_URL = _NODE_EXPRESS_SERVER +  '/login/';
          console.log(SERVER_URL);
          
          const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            },
            body: JSON.stringify( {
              email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            })
          });

          const responseData = await response.json();
          if(!response.ok)  //anything other than a 200+ throw regular built-in java Error handler
          {
             throw new Error(response.message);
          }
          console.log(responseData);

          setIsLoading(false);
          auth.login();

        } catch (error) {
           console.log('Error signing in !!!')
           setIsLoading(false);
           setError(error.message || 'Something went wrong, please try again');
        }
            
         }
         else{

            //signup mode
          
            try {

              setIsLoading(true);

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
              if(!response.ok)  //anything other than a 200+ throw regular built-in java Error handler
              {
                 throw new Error(response.message);
              }
              console.log(responseData);

              setIsLoading(false);

              if(responseData.user.email.length > 0)
              {
                auth.login();
              }

            } catch (error) {
               console.log('Error signing up!!!')
               setIsLoading(false);
               setError(error.message || 'Something went wrong, please try again');
               return;
            }
                
         }
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

    
  const errorHandler = (e) => {
    e.preventDefault();
    setError(null)
  }
  


  return (
       <Fragment>
        <ErrorModal error={error} onClear={(e) => errorHandler(e)} />
       <form  className='place-form' onSubmit={authSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        </Fragment>
        )
 
}

export default Auth