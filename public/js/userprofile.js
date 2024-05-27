var form = document.getElementById("dpForm");
let imgInput1 = document.querySelector(".img1");
let file1 = document.getElementById("imgInput1");




//todo - handle file input change
file1.onchange = function() {
  
  if(file1.files[0].size < 1000000) {  // 1MB = 1000000
    
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      imgUrl = e.target.result
      imgInput1.src = imgUrl
    }
    fileReader.readAsDataURL(file1.files[0]);

  } else {
      alert("This file is too large!")
  }

}




//todo - fetching current user info
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




//todo - upload profile picture
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




//todo - display profile picture
function displayProfilePicture(profilePicture) {
 
  if(profilePicture === '' || profilePicture === null) {
    profilePicture = 'https://www.codewithfaraz.com/InstaPic.png';
  }
  
  const dpImg = document.querySelector('.dp');
  dpImg.src = profilePicture;
  dpImg.style.width = '50';
  dpImg.style.height = '50';

}




//todo - display user profile
function displayUserProfile(userData) {
  
  const rightUpperRight = document.querySelector('.profile-data');

  rightUpperRight.innerHTML = `
    <div>
      <p>${userData.name}</p>
    </div>`;

  displayProfilePicture(userData.imgpath);

}




//todo - fetch current user
async function fetchCurrentUser() {

  try {
     
    return new Promise(async (resolve, reject) => {
      
      let apiURL = `${getAPIURL()}/user/current-user`;
      console.log(`URL : ${apiURL}`);
      
      const response = await axios.get(apiURL, getHeaders());
      console.log('Current-User : ', response.data.data);
      
      resolve(response);

    })

  } catch (err) {
    console.log(err);
    reject(err); 
  }
  
}




//todo - handle form submit
form.addEventListener('submit', async(e) => {
  e.preventDefault();
  
  const dp = await uploadProfilePicture(imgInput1.src);
  displayProfilePicture(dp);

});



//todo - initialize user profile on load
document.addEventListener("DOMContentLoaded", async function() {
    
  const profile = await getCurrentUser();
  displayUserProfile(profile);

});