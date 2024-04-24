
const environment = "Local";
//const environment = "Production";


const LOCAL_AWS_APIURL = 'http://44.212.45.234:4000';
const LOCAL_WINDOWS_APIURL =  'http://localhost:3000';




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
  
  //const rightUpperLeft = document.querySelector('.right-upper-left');
  const rightUpperRight = document.querySelector('.profile-data');
  
  rightUpperRight.innerHTML = `
    <div>
      <p>${userData.name}</p>
    </div>`;

}





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




function  successAlertAwakeSleep() {
  document.querySelector("#successAlert").classList.toggle("hidden");
  setTimeout(function () {
    document.getElementById("successAlert").classList.toggle("hidden");
  }, 2000);
}




document.addEventListener("DOMContentLoaded", function() {
    
    getCurrentUser();
    createChatBoxes();

});


async function createChatBoxes() {

  try {
    
    let apiURL = `${getAPIURL()}/user/users-status`;
    console.log(`URL : ${apiURL}`);
  
    const response = await axios.get(apiURL, getHeaders());
    console.log('Response : ' , response.data.data);


    const chatList = document.querySelector('.chat-list');

    response.data.data.forEach(user => {

      const chatBox = document.createElement('div');
      chatBox.classList.add('chat-box');

      chatBox.innerHTML = `
        <div class="img-box">
          <img class="img-cover" src="/images/profile/profile1.webp" alt="profileImg">
        </div>

        <div class="chat-details">
          <div class="text-head">
            <h4>${user.name}</h4>
          </div>      
        </div>

        <div class="user-status ${user.status === 'online' ? 'online' : 'offline'}">
        </div>     
      `;

      const imgBoxDiv = chatBox.querySelector('.img-box');
      imgBoxDiv.addEventListener('click', () => {
        console.log('Clicked on img-box');
        showChatDetails(user.name, user.status);
      });

      // Add onclick event to the chat-details div
      const chatDetailsDiv = chatBox.querySelector('.chat-details');
      chatDetailsDiv.addEventListener('click', () => {
        console.log('Clicked on chat-details');
        showChatDetails(user.name, user.status);
      });

      // Add onclick event to the user-status div
      const userStatusDiv = chatBox.querySelector('.user-status');
      userStatusDiv.addEventListener('click', () => {
        console.log('Clicked on user-status');
        showChatDetails(user.name, user.status);
      });
  
      chatList.appendChild(chatBox);

    });
    
} catch (err) {
  document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
  alertAwakeSleep();
  throw new Error(err);
}

}


function showChatDetails(userName, status) {
  
  console.log(`Clicked on ${userName}`);
  
  const rightContainer = document.querySelector('.right-container');
  rightContainer.innerHTML = '';

  const header = document.createElement('div');
  header.classList.add('header');

  header.innerHTML = `
    <div class="img-text">
      <div class="user-img">
      <img class="dp" src="https://images.pexels.com/photos/2474307/pexels-photo-2474307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
    </div>
    <h4>${userName}<br><span>${status}</span></h4>
    </div>
    <div class="nav-icons">
      <li><i class="fa-solid fa-magnifying-glass"></i></li>
      <li><i class="fa-solid fa-ellipsis-vertical"></i></li>
    </div>
  `;
  rightContainer.appendChild(header);

  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chatContainer');

  chatContainer.innerHTML = `
  <div class="message-box my-message">
  <p>I've been waiting to see that show asap!<br><span>07:43</span></p>
</div>
<div class="message-box friend-message">
  <p>Ahh, I can't believe you do too!<br><span>07:45</span></p>
</div>
<div class="message-box friend-message">
  <p>The trailer looks good<br><span>07:45</span></p>
</div>
<div class="message-box friend-message">
  <p>I've been waiting to watch it!!<br><span>07:45</span></p>
</div>
<div class="message-box my-message">
  <p>😐😐😐<br><span>07:46</span></p>
</div>
<div class="message-box my-message">
  <p>Mee too! 😊<br><span>07:46</span></p>
</div>
<div class="message-box friend-message">
  <p>We should video chat to discuss, if you're up for it!<br><span>07:48</span></p>
</div>
<div class="message-box my-message">
  <p>Sure<br><span>07:48</span></p>
</div>
<div class="message-box my-message">
  <p>I'm free now!<br><span>07:48</span></p>
</div>
<div class="message-box friend-message">
  <p>Awesome! I'll start a video chat with you in a few.<br><span>07:49</span></p>
</div>

  `;

  rightContainer.appendChild(chatContainer);

  const chatboxinput = document.createElement('div');
  chatboxinput.classList.add('chatbox-input');

  chatboxinput.innerHTML = `
    <i class="fa-regular fa-face-grin"></i>
    <i class="fa-sharp fa-solid fa-paperclip"></i>
    <input type="text" placeholder="Type a message">
    <i class="fa-solid fa-microphone"></i>
  `;

  rightContainer.appendChild(chatboxinput);
      
}
