var form = document.getElementById("dpForm");



 async function fetchCurrentUser() {

  try {
     
    return new Promise(async (resolve, reject) => {
      
      let apiURL = `${getAPIURL()}/user/current-user`;
      console.log(`URL : ${apiURL}`);
      
      const response = await axios.get(apiURL, getHeaders());
      console.log('--------------', response.data.data);
      
      resolve(response);

    })

  } catch (err) {
      console.log(err);
      reject(err); 
  }
  
}




//TODO - Fetching current user info
async function getCurrentUser() {

  try {
  
    let apiURL = `${getAPIURL()}/user/current-user`;
    console.log(`URL : ${apiURL}`);
   
    const response = await axios.get(apiURL, getHeaders());
   
    if (response.status === 200) {

      console.log(response.data.data);
      const userData = response.data.data;
      return userData;

    } else {
      throw new Error("No user-information to display.");
    }
  
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }
  
}






async function uploadProfilePicture(imgLocation) {
  
  try {

    const apiURL = `${getAPIURL()}/user/upload-dp`;
    console.log('URL : ', apiURL);

    const response = await axios.post(apiURL, { profilePicture: imgLocation }, getHeaders());
    console.log('Response:', response.data);
   
    return response.data.user.imgpath;
    
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }

}





form.addEventListener('submit', async(e) => {
  e.preventDefault();
  
  const dp = await uploadProfilePicture(imgInput.src);
  displayProfilePicture(dp);

});





function displayProfilePicture(profilePicture) {
 
  if(profilePicture === '' || profilePicture === null) {
    profilePicture = 'https://www.codewithfaraz.com/InstaPic.png';
  }
  
  const dpImg = document.querySelector('.dp');
  dpImg.src = profilePicture;
  dpImg.style.width = '50';
  dpImg.style.height = '50';

}





function displayUserProfile(userData) {
  
  const rightUpperRight = document.querySelector('.profile-data');

  rightUpperRight.innerHTML = `
    <div>
      <p>${userData.name}</p>
    </div>`;

    displayProfilePicture(userData.imgpath);

}





document.addEventListener("DOMContentLoaded", async function() {
    
  const profile = await getCurrentUser();
  displayUserProfile(profile);

});


