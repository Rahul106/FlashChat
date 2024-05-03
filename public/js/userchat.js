let lastMessageId = null;

const chatTypeOptions = {
  User: 'user',
  Group: 'group'
};





async function displayUserStatus() {

    try {
  
      let apiURL = `${getAPIURL()}/user/users-status`;
      console.log(`URL : ${apiURL}`);
    
      const response = await axios.get(apiURL, getHeaders());
      console.log('User status : ' , response.data.data);

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
      chatList.innerHTML = '';

      resp.data.forEach(user => {
        const chatBox = createChatBoxElement(user);
        attachEventListeners(chatBox, user.id, user.name, user.status, chatTypeOptions.User)
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
        <div class="hidden-id" style="display: none;">${user.id}</div>     
      </div>
      <div class="chat-details">
        <div class="text-head">
          <h4>${user.name}</h4>
        </div>
        <div class="hidden-id" style="display: none;">${user.id}</div>     
      </div>

      <div class="user-status ${user.status === 'online' ? 'online' : 'offline'}">
      <div class="hidden-id" style="display: none;">${user.id}</div>     
      </div>     
    `;
    
    return chatBox;
  
}
  
  
  
  
  
function attachEventListeners(chatBox, receiverId, userName, status, uType) {
    
  const imgBoxDiv = chatBox.querySelector('.img-box');
  imgBoxDiv.addEventListener('click', () => {
    console.log('Clicked on img-box');
    showChatDetails(receiverId, userName, status, uType);
  });


  const chatDetailsDiv = chatBox.querySelector('.chat-details');
  chatDetailsDiv.addEventListener('click', () => {
    console.log('Clicked on chat-details');
    showChatDetails(receiverId, userName, status, uType);
  });


  const userStatusDiv = chatBox.querySelector('.user-status');
  userStatusDiv.addEventListener('click', () => {
    console.log('Clicked on user-status');
    showChatDetails(receiverId, userName, status, uType);
  });
    
}
  
  
  
  
async function showChatDetails(receiverId, userName, status, uType) {
  
    const rightContainer = document.querySelector('.right-container');
    rightContainer.innerHTML = '';
  
    const header = createHeader(userName, status);
    rightContainer.appendChild(header);
   
    const chatContainer = createChatContainer();
    const resp = await fetchMessages(receiverId, uType);

    populateMessages(chatContainer, resp);
    rightContainer.appendChild(chatContainer);
  
    const chatboxinput = createChatInput();
    attachSendMessageEvent(chatboxinput, receiverId, userName, uType);
    rightContainer.appendChild(chatboxinput);
  
}




async function fetchMessages(receiverId, uType) {

  try {
    
    const apiURL = `${getAPIURL()}/chat/fetch-messages/${receiverId}?uType=${uType}`;
    console.log(`URL : ${apiURL}`);

    const response = await axios.get(apiURL, getHeaders());
    console.log('Fetched messages:', response);
    
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

  if (Array.isArray(messageData.data)) {
    messageData.data.forEach(message => {
      const messageBox = createMessageBox(message, message.currentId);
      chatContainer.appendChild(messageBox);
    });
  } else {
    const messageBox = createMessageBox(messageData.data, messageData.data.currentId);
    chatContainer.appendChild(messageBox);
  }
  
}
  
  
  
  
  
function createMessageBox(message, currentId) {
  
  const messageBox = document.createElement('div');
  messageBox.classList.add('message-box');
  messageBox.classList.add(message.senderId === currentId ? 'my-message' : 'friend-message');
  messageBox.innerHTML = `
  <p><strong>${message.senderName}</strong><br>
  <span>${message.message}</span></p>
`;

  // messageBox.innerHTML = `
  //     <p>${message.message}<br><span>${message.currentUser}</span><span>${message.createdAt}</span></p>
  // `;
  
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
  
  
  
  
  
function attachSendMessageEvent(chatboxinput, receiverId, userName, uType) {
    
  const sendButton = chatboxinput.querySelector('.fa-send-o');
  
  sendButton.addEventListener('click', () => {
    const inputField = chatboxinput.querySelector('input[type="text"]');
    const message = inputField.value.trim(); 
    
    if (message) {
      inputField.value = '';
      sendMessage(userName, receiverId, message, uType);
    } else {
      console.log('Please type a message before sending.');
    }
    
  });
  
}
  
  
  
  
async function sendMessage(uName, recId, msg, uType) {
  
  try {

    console.log('User : ', uName);
    console.log('Sending message: ', msg);
    console.log('Receiver-Id : ', recId);

    const uObj = {
      name: uName,
      message: msg,
      userType: uType
    };

    console.log('User-Object : ', uObj);

    const apiURL = `${getAPIURL()}/chat/send-message/${recId}`;
    console.log(`URL : ${apiURL}`);

    const response = await axios.post(apiURL, uObj, getHeaders());
    console.log('Message sent successfully:', +response.data.chatMessage);

    lastMessageId = response.data.chatMessage.id;
    fetchNewMessages(lastMessageId);
  
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

} 
  
  


async function fetchNewMessages(recentMsgId) {
  
  try {
    
    const chatContainer = document.querySelector('.chatContainer');
    const response = await recentMessage(recentMsgId);

    if (response.data.length > 0) {
      lastMessageId = response.data[response.data.length - 1].id;
    } else {
      console.log('No recent messages found.');
    }

    populateMessages(chatContainer, response);

  } catch (err) {
      console.error("Error fetching and updating messages:", err);
  }

}




async function recentMessage(recMsgId = null) {
  
  try {

    const apiURL = `${getAPIURL()}/chat/recent-message/${recMsgId}`;
    console.log(`URL : ${apiURL}`);

    const response = await axios.get(apiURL, getHeaders());
    console.log('Recent messages:', response);

    return response;
  
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }

}























  
  
// function alertAwakeSleep() {
      
//     document.querySelector("#errorAlert").classList.toggle("hidden");
    
//     setTimeout(function () {
//       document.getElementById("errorAlert").classList.toggle("hidden");
//     }, 1500);
  
// }
  
  
  
  
  
// function  successAlertAwakeSleep() {
  
//     document.querySelector("#successAlert").classList.toggle("hidden");
    
//     setTimeout(function () {
//       document.getElementById("successAlert").classList.toggle("hidden");
//     }, 2000);
  
// }
  
  


document.addEventListener("DOMContentLoaded", async function() {

  displayUserStatus();
  //fetchCurrentUserGroups();

});
