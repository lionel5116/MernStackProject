import React , {useState,useCallback} from 'react';
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
import SandBoxPage from './shared/components/TestCodeSandbox/SandBoxPage'

function App() {

  const [isLoggedIn,setisLoggedIn] = useState(false);
  const [userId,setUserId] = useState(null);
  
  const login = useCallback((uid) => {
    setisLoggedIn(true);
    setUserId(uid);
  },[])

  const logout = useCallback(() => {
    setisLoggedIn(false)
    setUserId(null);
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


        
       <Route path="/SandBoxPage">
         <SandBoxPage />
       </Route>
       <Route path="/Counter">
         <Counter />
       </Route>

       <Redirect to="/auth" />

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

       <Route path="/SandBoxPage">
         <SandBoxPage />
       </Route>
       <Route path="/Counter">
         <Counter />
       </Route>

       <Redirect to="/auth" />

     </Switch>
   );
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        userId:userId,
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
