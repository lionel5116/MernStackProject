import React from 'react'
import UserList from '../components/UserList'
import { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


function Users() {

  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState();
  const [loadedUsers,setLoadedUsers] = useState([])

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try
      {
        const response = await fetch('http://localhost:5000/api/users');
        const responsData = await response.json();

        if(!response.ok)  //anything other than a 200+ throw regular built-in java Error handler
        {
           throw new Error(response.message);
        }

        setLoadedUsers(responsData.user);
        setIsLoading(false)
      }
      catch(error)
      {
        setError('Something went wrong with fetching the users ' + error.message)
       
      }
      setIsLoading(false)
    }
    sendRequest();
  },[])
  
  const errorHander = () => {
    setError(null);
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHander}/>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
       {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  )
}

export default Users