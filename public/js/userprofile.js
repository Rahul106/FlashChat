//const environment = "Local";
//const environment = "Production";


//const LOCAL_AWS_APIURL = 'http://44.212.45.234:4000';
//const LOCAL_WINDOWS_APIURL =  'http://localhost:3000';




//TODO - Fetching current user info
async function getCurrentUser() {

  try {
  
    let apiURL = `${getAPIURL()}/user/current-user`;
    console.log(`URL : ${apiURL}`);
  
    const response = await axios.get(apiURL, getHeaders());
  
    if (response.status === 200) {

      console.log(response.data.data);
      const userData = response.data.data;
      displayUserProfile(userData);

    } else {
      throw new Error("No user-information to display.");
    }
  
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }
  
}





function displayUserProfile(userData) {
  
  const rightUpperRight = document.querySelector('.profile-data');
  rightUpperRight.innerHTML = `
    <div>
      <p>${userData.name}</p>
    </div>`;

}




document.addEventListener("DOMContentLoaded", function() {
    
  getCurrentUser();

});
