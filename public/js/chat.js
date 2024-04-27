
async function displayUserStatus() {

    try {
  
      let apiURL = `${getAPIURL()}/user/users-status`;
      console.log(`URL : ${apiURL}`);
    
      const response = await axios.get(apiURL, getHeaders());
      console.log('Response : ' , response.data.data);
  
      createChatBoxes(response.data);
  
    } catch (err) {
      document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
      alertAwakeSleep();
      throw new Error(err);
    }
    
    }
  
  
  
  
  async function createChatBoxes(resp) {
    
    try {
      
      const chatList = document.querySelector('.chat-list');
      console.log('Response: ' + resp);
      
      chatList.innerHTML = '';

      resp.data.forEach(user => {
        const chatBox = createChatBoxElement(user);
        attachEventListeners(chatBox, user.name, user.status);
        chatList.appendChild(chatBox);
      });
  
    } catch (err) {
      document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
      alertAwakeSleep();
      throw new Error(err);
    }
  
  }
  
  
  
  
function createChatBoxElement(user) {
    
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
    
    return chatBox;
  
  }
  
  
  
  
  
function attachEventListeners(chatBox, userName, status) {
    
    const imgBoxDiv = chatBox.querySelector('.img-box');
    imgBoxDiv.addEventListener('click', () => {
      console.log('Clicked on img-box');
      showChatDetails(userName, status);
    });
  
  
    const chatDetailsDiv = chatBox.querySelector('.chat-details');
    chatDetailsDiv.addEventListener('click', () => {
      console.log('Clicked on chat-details');
      showChatDetails(userName, status);
    });
  
  
    const userStatusDiv = chatBox.querySelector('.user-status');
    userStatusDiv.addEventListener('click', () => {
      console.log('Clicked on user-status');
      showChatDetails(userName, status);
    });
    
}
  
  
  
  
async function showChatDetails(userName, status) {
    
    const rightContainer = document.querySelector('.right-container');
    rightContainer.innerHTML = '';
  
    const header = createHeader(userName, status);
    rightContainer.appendChild(header);
   
    const chatContainer = createChatContainer();
    const resp = await fetchMessages();

    populateMessages(chatContainer, resp);
    rightContainer.appendChild(chatContainer);
  
    const chatboxinput = createChatInput();
    attachSendMessageEvent(chatboxinput, userName);
    rightContainer.appendChild(chatboxinput);
  
}




async function fetchMessages() {

  try {

    const apiURL = `${getAPIURL()}/chat/fetch-messages`;
    console.log(`URL : ${apiURL}`);

    const response = await axios.get(apiURL, getHeaders());
    console.log('Messages ==================> ', response);
    
    return response;

    } catch(err) {
      console.log("error in fetching report from server. ",err)
      document.querySelector('.error-textMsg').innerText=`Server error- ${err.message} ,in Downloading report. Please Retry after sometime.`;
      document.querySelector('#error-alert').classList.toggle("hidden")
    }
    
}

  
  
  
  
function createHeader(userName, status) {
    
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
    
    return header;
}
  
  
  
  
  
function createChatContainer() {
  
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chatContainer');
    
    return chatContainer;
  
}
  
  
  
  
  
function populateMessages(chatContainer, messageData) {
 
  messageData.data.forEach(message => {
    const messageBox = createMessageBox(message, message.currentUser);
    chatContainer.appendChild(messageBox);
  });
  
}
  
  
  
  
  
function createMessageBox(message, userName) {
   
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.classList.add(message.senderName === userName ? 'my-message' : 'friend-message');
    messageBox.innerHTML = `
        <p>${message.message}<br><span>${userName}</span></p>
    `;
    
    return messageBox;
  
}
  
  
  
  
  
function createChatInput() {
    
    const chatboxinput = document.createElement('div');
    chatboxinput.classList.add('chatbox-input');
    
    chatboxinput.innerHTML = `
      <i class="fa-regular fa-face-grin"></i>
      <i class="fa-sharp fa-solid fa-paperclip"></i>
      <input type="text" placeholder="Type a message">
      <i class="fa fa-send-o"></i>
    `;
    
    return chatboxinput;
  
}
  
  
  
  
  
function attachSendMessageEvent(chatboxinput, userName) {
    
    const sendButton = chatboxinput.querySelector('.fa-send-o');
    
    sendButton.addEventListener('click', () => {
      const inputField = chatboxinput.querySelector('input[type="text"]');
      const message = inputField.value.trim(); 
      
      if (message) {
        inputField.value = '';
        sendMessage(userName, message);
      } else {
        console.log('Please type a message before sending.');
      }
      
    });
  
}
  
  
  
  
async function sendMessage(uName, msg) {
  
    try {
  
      console.log('User : ', uName);
      console.log('Sending message: ', msg);
  
      const apiURL = `${getAPIURL()}/chat/send-message`;
      console.log(`URL : ${apiURL}`);
  
      const uObj = {
        name: uName,
        message: msg
      };
  
      const response = await axios.post(apiURL, uObj, getHeaders());
  
      Object.entries(response.data.chatMessage)
      .forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
  
    } catch (err) {
      document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
      alertAwakeSleep();
      throw new Error(err);
    }
  
} 
  
  
  
  
  
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
  
  

async function fetchAndUpdateMessages() {
  try {
      const chatContainer = document.querySelector('.chatContainer');
      const resp = await fetchMessages();
      populateMessages(chatContainer, resp);
  } catch (err) {
      console.error("Error fetching and updating messages:", err);
  }
}

document.addEventListener("DOMContentLoaded", function() {
    
  displayUserStatus();

});
  