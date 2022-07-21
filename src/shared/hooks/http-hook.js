import { useState, useCallback,useRef, useEffect} from "react"

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([])

  //use useCallback so the component never re-renders,re-created or infinte loops when used
  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    //setIsLoading(true);

    //just some cleanup code to control unwanted requests once you leave the page and and
    //navigate to another, it works with useEffect hook at the end
   const httpAbortCtrller = new AbortController();
   activeHttpRequests.current.push(httpAbortCtrller);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrller.signal
      });

      const responseData = await response.json();
      console.log(responseData);

    
    activeHttpRequests.current = activeHttpRequests.current.filter(
      reqCtrl => reqCtrl !== httpAbortCtrller
    );


      if (!response.ok) {
        //anything other than a 200+ throw regular built-in java Error handler
        throw new Error(response.message);
      }

      setIsLoading(false);
      
      return responseData;

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      //throw error;
    }
    setIsLoading(false);
   
  },[]);

 const clearError = () => {
    setError(null)
 }

 
 useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    }
 },[])


 return {isLoading,error,sendRequest,clearError}

};