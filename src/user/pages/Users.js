import React from 'react'
import UserList from '../components/UserList'


function Users() {
  
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg',
      places: 3
      },

      {
        id:'u2', name:'David Jones', 
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WUrmhqVOrXiIIZtH5MfACTc2FIFblJBQEPCFZOlo228TNx86397EDdSm40Y6g9AGYbw&usqp=CAU',
        places:5
      },
    ];

  return (
    <UserList items={USERS} />
  )
}

export default Users