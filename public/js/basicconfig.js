const environment = "Local";
//const environment = "Production";


const LOCAL_AWS_APIURL = 'http://44.212.45.234:4000';
const LOCAL_WINDOWS_APIURL =  'http://localhost:3000';





//!Homework - Make Below Code Modular
//TODO - set headers and token
const getHeaders = () => {

    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };
  
    return headers;
  };
  
  
    
    
    
  //TODO - check Local/Production
  const getAPIURL = () => {
    
      if (environment.toUpperCase() === 'LOCAL') {
        return LOCAL_WINDOWS_APIURL;
      } else if (environment.toUpperCase() === 'PRODUCTION') {
        return LOCAL_AWS_APIURL;
      } else {
        throw new Error('Invalid environment specified');
      }
    
  };
  
  
  
  
  
  function alertAwakeSleep() {
      
      document.querySelector("#errorAlert").classList.toggle("hidden");
      
      setTimeout(function () {
        document.getElementById("errorAlert").classList.toggle("hidden");
      }, 1500);
  
  }
  
  
  
  
  
  function successAlertAwakeSleep() {
  
    document.querySelector("#successAlert").classList.toggle("hidden");
    
    setTimeout(function () {
      document.getElementById("successAlert").classList.toggle("hidden");
    }, 2000);
  
  }
  
  
