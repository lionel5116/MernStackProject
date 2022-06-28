import React from 'react'

const SandBoxPage = () => {


  function getCustomDateFormat(theDate) {
    if(theDate === undefined || theDate === '') return '';
    let oldDate = Date.parse('01/02/1900');
    if (theDate === undefined || theDate == '' || theDate < oldDate) return '';
    let  validDate = new Date(theDate);
    let yyyy = validDate.getFullYear().toString();
    let mm = (validDate.getMonth() + 1).toString();
    let dd = validDate.getDate().toString();
    return (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + '-' + yyyy; 
}

const testSomething =(e)=> {
  e.preventDefault();
  //2022-07-29
  var correctedDate = getCustomDateFormat('2022-07-29');
   console.log(correctedDate)
}

  return (
    <div>
      <h1>
        Some Test Code
      </h1>
    <p>
      <button
       onClick={(e) => testSomething(e)}
      >
       Test
      </button>
    </p>
    </div>
    
  )
}



export default SandBoxPage