const socket = io();

let imgInput = document.querySelector(".img");
let file = document.getElementById("imgInput");
let lastMessageId = ''
let currentEmoji = '';

const chatTypeOptions = {
  User: 'user',
  Group: 'group'
};




//todo - handle new message event
socket.on('newMessage', (lastMessageId) => {
  fetchNewMessages(lastMessageId);
})




//todo - handle new message event
socket.on('userActivity', async() => {
  await displayUsers();
  fetchCurrentUserGroups();
});  




//todo - handle file input change
file.onchange = function() {

  if(file.files[0].size < 1000000) {  // 1MB = 1000000
    
    var fileReader = new FileReader();
    fileReader.onload = function(e){
      imgUrl = e.target.result
      imgInput.src = imgUrl
    }

    fileReader.readAsDataURL(file.files[0])
  } else {
      alert("This file is too large!")
  }

}




//todo - fetches messages & send message to display
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

};



//todo - fetches latest/recent message
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




//todo - display user status
async function displayUserStatus() {

  try {

    let apiURL = `${getAPIURL()}/user/users-status`;
    console.log(`URL : ${apiURL}`);
  
    const response = await axios.get(apiURL, getHeaders());
    console.log('User status : ' , response.data.data);
    
    return response;
    
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }
  
}
  
  

//todo - create chat boxes
async function createChatBoxes(resp) {
  
  try {

    const chatList = document.querySelector('.chat-list');  
    chatList.innerHTML = '';
    
    resp.data.data.forEach(user => {
      const chatBox = createChatBoxElement(user);
      attachEventListeners(chatBox, user, chatTypeOptions.User)
      chatList.appendChild(chatBox);
    });

  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

}
  
  


//todo - create chat box element
function createChatBoxElement(user) {
    
  const chatBox = document.createElement('div');
  chatBox.classList.add('chat-box');
  
  chatBox.innerHTML = `
    <div class="img-box">
      <img class="img-cover" src="${user.imgpath}" alt="profileImg" width="50" height="50">
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
  
  


//todo - attach event listeners
function attachEventListeners(chatBox, user, uType, isAdmin) {
 
  if(uType === 'group') {
    user.name = user.groupName,
    user.imgpath = user.imgpath,
    user.status = '';
  }

  const imgBoxDiv = chatBox.querySelector('.img-box');
  imgBoxDiv.addEventListener('click', () => {
    console.log('Clicked on img-box');
    showChatDetails(user.id, user.name, user.imgpath, user.status, uType, isAdmin);
  });

  const chatDetailsDiv = chatBox.querySelector('.chat-details');
  chatDetailsDiv.addEventListener('click', () => {
    console.log('Clicked on chat-details');
    showChatDetails(user.id, user.name, user.imgpath, user.status, uType, isAdmin);
  });

  const userStatusDiv = chatBox.querySelector('.user-status');
  userStatusDiv.addEventListener('click', () => {
    console.log('Clicked on user-status');
    showChatDetails(user.id, user.name, user.imgpath, user.status, uType, isAdmin);
  });
   
} 
 
  
  

//todo - show chat details
async function showChatDetails(receiverId, userName, profilePic, status, uType, isAdmin) {
    
  const rightContainer = document.querySelector('.right-container');
  rightContainer.innerHTML = '';

  const header = createHeader(userName, status, profilePic, isAdmin);
  if(isAdmin) {
    editGroupListener(header, receiverId, userName);
  }
  rightContainer.appendChild(header);
  
  const chatContainer = createChatContainer();
  const resp = await fetchMessages(receiverId, uType);
  populateMessages(chatContainer, resp);
  rightContainer.appendChild(chatContainer);

  const chatboxinput = createChatInput();
  attachSendMessageEvent(chatboxinput, receiverId, userName, uType);
  rightContainer.appendChild(chatboxinput);
  
}




//todo - fetch messages
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

    
  

//todo - create header
function createHeader(userName, status, profilePic, isAdmin) {
 
  const header = document.createElement('div');
  header.classList.add('header');
  
  let editIconHTML = '';
  if (isAdmin) {  
    editIconHTML = '<li><i class="fa-solid fa-edit" id="groupUsersIcon" data-toggle="modal" data-target="#exampleModalCenter"></i></li>';
  }

  header.innerHTML = `
    <div class="img-text">
      <div class="user-img">
        <img class="dp" src="${profilePic}" alt="profileImg" width="50" height="50">
      </div>
      <h5 class="user-name">${userName}<br><span>${status}</span></h5>
    </div>
    <div class="nav-icons">
      ${editIconHTML}
      <li><i class="fa-solid fa-magnifying-glass"></i></li>
      <li><i class="fa-solid fa-ellipsis-vertical"></i></li>
    </div>
  `;
  
  return header;

}
  
  
  

//todo - create chat container
function createChatContainer() {
  
  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chatContainer');
  
  return chatContainer;
  
}
    
  
  

//todo - populate messages  
function populateMessages(chatContainer, messageData) {

  if (Array.isArray(messageData.data.messages)) {
      messageData.data.messages.forEach(message => {
      const messageBox = createMessageBox(message, message.currentId);
      chatContainer.appendChild(messageBox);
    });
  } else {
    const messageBox = createMessageBox(messageData.data.recentMessage, messageData.data.recentMessage.currentId);
    chatContainer.appendChild(messageBox);
  }
  
}
  
  


//todo - create message box
function createMessageBox(message, currentId) {
 
  console.log(message.message);

  const messageBox = document.createElement('div');
  messageBox.classList.add('message-box');
  messageBox.classList.add(message.senderId === currentId ? 'my-message' : 'friend-message');

  let content = `<p><strong>${message.senderName}</strong><br>`;

  if (message.fileUrl !== 'no-image' && message.message !== 'no-message') {
    content += `<img src="${message.fileUrl}" alt="Image"><br><span>${message.message}</span>`;
  } else if (message.fileUrl !== 'no-image') {
    content += `<img src="${message.fileUrl}" alt="Image">`;
  } else if (message.message !== 'no-message') {
    content += `<span>${message.message}</span>`;
  }

  content += `</p>`;
  messageBox.innerHTML = content;
  
  return messageBox;
}


  

//todo - create chat footer input
function createChatInput() {
    
  const chatboxinput = document.createElement('div');
  chatboxinput.classList.add('chatbox-input');
 
  chatboxinput.innerHTML = `
    <i class="fa-regular fa-face-grin" id="emojiInitiator" onclick="toggleEmoji()"></i>
    ${emoList}
    <i class="fa-solid fa-bolt" style="color: #74C0FC; margin-right: 15px; id="gifInitiator" onclick="toggleGif()"></i>
    <i class="fa-sharp fa-solid fa-paperclip" id="paperClipInitiator" onclick="attachFiles()"></i>
    <input type="text" placeholder="Type a message">
    <div class="preview-container" id="previewContainer">
      <img id="selectedFilePreview" src="" alt="Preview">
    </div>
    <i class="fa fa-send-o"></i>
`;

  return chatboxinput;
  
}




//todo - invoke send message button event/message manipulation
function attachSendMessageEvent(chatboxinput, receiverId, userName, uType) {

  const sendButton = chatboxinput.querySelector('.fa-send-o');

  sendButton.addEventListener('click', () => {

    const inputField = chatboxinput.querySelector('input[type="text"]');
    const message = inputField.value.trim();

    const processedMessage = message ? message : 'no-message';
    inputField.value = '';
    sendMessage(userName, receiverId, processedMessage, uType);
    
  });
  
}
  
  
  

//todo - sends chat messages
async function sendMessage(uName, recId, msg, uType) {
 
  try {
      
    let srcValueForDatabase = '';
    const previewElement = document.getElementById('selectedFilePreview');
    
    if (previewElement.src === window.location.origin + '/chat' || !previewElement.src) {
      srcValueForDatabase = 'no-image';
    } else {
      srcValueForDatabase = previewElement.src;
    }
    
    console.log('User : ', uName);
    console.log('Sending message: ', msg);
    console.log('Receiver-Id : ', recId);

    const uObj = {
      name: uName,
      message: msg,
      imageUrl: srcValueForDatabase,
      userType: uType
    };

    console.log('User-Object : ', uObj);

    const apiURL = `${getAPIURL()}/chat/send-message/${recId}`;
    console.log(`URL : ${apiURL}`);

    const response = await axios.post(apiURL, uObj, getHeaders());
    console.log('Message sent successfully:', response.data.chatMessage);

    lastMessageId = response.data.messages.id;
    socket.emit('newMessage', lastMessageId);

    srcValueForDatabase = '';

  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

}




//todo - attaches files for sending.
function attachFiles() {

  const inputField = document.querySelector('.chatbox-input input[type="text"]');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*,video/*';  
  fileInput.style.display = 'none'; 

  fileInput.onchange = function () {

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      if (file.size < 10000000) { 
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
          const fileUrl = e.target.result;
          const previewElement = document.getElementById('selectedFilePreview');
          const previewContainer = document.getElementById('previewContainer');
          previewElement.src = fileUrl;
          previewContainer.style.display = 'flex'; 
          
          if (!previewContainer.querySelector('.closeButton')) {
      
            const closeButton = document.createElement('button');
            closeButton.textContent = '×'; 
            closeButton.className = 'closeButton'; 
            closeButton.onclick = function() {
              inputField.value = ''; 
              previewContainer.style.display = 'none';
            };

            previewContainer.appendChild(closeButton);
          }
        };

        fileReader.readAsDataURL(file);
       
      } else {
        alert("This file is too large!");
      }

    }
  };

  fileInput.click();
 
}



//todo - activates/deactivates emoji picker
function toggleEmoji() {
  
  let emojiIcon = document.getElementById('emojiInitiator');
  
  emojiIcon.addEventListener('click', ()=> {
    let pContainer = document.getElementById('pContainer');
    pContainer.style.display = (pContainer.style.display === 'flex') ? 'none' : 'flex';
  });

}



//todo - appends selected emoji to the input field
function appendEmoji(emoji) {

  const inputField = document.querySelector('.chatbox-input input[type="text"]');
  
  if (inputField) {
    inputField.value += emoji;
  }
  
}




//todo - activates/deactivates GIF picker
function toggleGif() {
  
  let gifContainer = document.getElementById('gifContainer');
  gifContainer.style.display = (gifContainer.style.display === 'flex') ? 'none' : 'flex';

  if (gifContainer.style.display === 'flex') {
    loadGifs();
  }

}




//todo - loads GIFs for selection.
async function loadGifs() {
  
  const gifContainer = document.getElementById('gifGrid');
  gifContainer.innerHTML = '';

  const gifPaths = [
    'images/GIF/gif1.gif',
    'images/GIF/gif2.gif',
    'images/GIF/gif3.gif',
    'images/GIF/gif4.gif',
    'images/GIF/gif5.gif',
    'images/GIF/gif6.gif',
    'images/GIF/gif7.gif',
    'images/GIF/gif8.gif',
    'images/GIF/gif9.gif',
    'images/GIF/gif10.gif'
  ];

  gifPaths.forEach(path => {
    const gifElement = document.createElement('img');
    gifElement.src = path;
    gifElement.classList.add('gif-item');
    gifElement.addEventListener('click', () => {
      selectGif(path);
    });

    gifContainer.appendChild(gifElement);
  });
  
}




//todo - selects a GIF.
function selectGif(gifUrl) {
 
  const inputField = document.querySelector('.chatbox-input input[type="text"]');
  const previewElement = document.getElementById('selectedFilePreview');
  previewElement.src = gifUrl;
  previewElement.style.display = 'block';

  const gifContainer = document.getElementById('gifContainer');
  gifContainer.style.display = 'none';

}



//todo - initializes user activity.
document.addEventListener("DOMContentLoaded", function() {

  socket.emit('userActivity');
  
});