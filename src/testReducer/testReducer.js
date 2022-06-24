import React from 'react'
import { useReducer } from 'react';


const initialState = { count: 0 }
 // The reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return {count: state.count = 0}
    default:
     return { count: state.count  }
  }
}

//below we use array descruturing to:
//state is mapped to initialState,
//dispach, "dispaches the reducer funtion"
//The action is like an instruction you pass to the reducer function. Based on the specified action, the reducer function executes the necessary state update.
const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      Count: {state.count}
       <br />
       <br/>
       <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
       <button onClick={() => dispatch({ type: 'decrement'})}>Decrement</button>
       <button onClick={() => dispatch({ type: 'reset'})}>Reset</button>
    </div>
  )
}

export default Counter