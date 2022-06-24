import React , {useState,useCallback, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Counter from './testReducer/testReducer';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {

  const [isLoggedIn,setisLoggedIn] = useState(false);
  
  const login = useCallback(() => {
    setisLoggedIn(true)
  },[])

  const logout = useCallback(() => {
    setisLoggedIn(false)
  },[])

  let routes;

  if(isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userID/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeID" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
   routes = (
     <Switch>
       <Route path="/:userID/places" exact>
         <UserPlaces />
       </Route>
       <Route path="/auth">
         <Auth />
       </Route>
       <Redirect to="/auth" />
     </Switch>
   );
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        login:login,
        logout:logout
     }
    }
    
    >
      <Router>
        <MainNavigation />
        <main>
            {/*
            <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userID/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeID" exact>
              <UpdatePlace />
            </Route>
            <Route path="/counter" exact>
              <Counter />
            </Route>
            <Route path="/Auth">
              <Auth />
            </Route>
            <Redirect to="/" />
            </Switch>
            */}
   
            {routes}
   
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
