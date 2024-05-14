let imgInput = document.querySelector(".img");
let file = document.getElementById("imgInput");
let lastMessageId = null;
let currentEmoji = '';


const chatTypeOptions = {
  User: 'user',
  Group: 'group'
};







const emoList = `
<div class="parentConatiner elevated" id="pContainer">
                    
  <div class="childContainer" id="cContainer">
    <div class="childSubContainer reaction" onclick="appendEmoji('😊')">😊</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😄')">😄</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('🙂')">🙂</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😍')">😍</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😂')">😂</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😎')">😎</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😜')">😜</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😇')">😇</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('🤬')"> 🤬</div>
    <div class="childSubContainer reaction" onclick="appendEmoji('😭')">😭</div>
  </div>

  <div class="childContainer" id="cContainer">
    <div class="childSubContainer animal" onclick="appendEmoji('🐶')">🐶</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐱')">🐱</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐭')">🐭</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐰')">🐰</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐼')">🐼</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐨')">🐨</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐻')">🐻</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐷')">🐷</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐮')">🐮</div>
    <div class="childSubContainer animal" onclick="appendEmoji('🐸')">🐸</div>
  </div>
     
  <div class="childContainer" id="cContainer">
    <div class="childSubContainer food" onclick="appendEmoji('🍔')">🍔</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍕')">🍕</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍟')">🍟</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌭')">🌭</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍿')">🍿</div>
    <div class="childSubContainer food" onclick="appendEmoji('🥪')">🥪</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍣')">🍣</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍦')">🍦</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍩')">🍩</div>
    <div class="childSubContainer food" onclick="appendEmoji('🍰')">🍰</div>
  </div>
  
  <div class="childContainer" id="cContainer">
  <div class="childSubContainer sport" onclick="appendEmoji('🏋️‍♂️')">🏋️‍♂️</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏋️‍♀️')">🏋️‍♀️</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏀')">🏀</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏈')">🏈</div>
  <div class="childSubContainer sport" onclick="appendEmoji('⚽')">⚽</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🎾')">🎾</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏓')">🏓</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏸')">🏸</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏊‍♂️')">🏊‍♂️</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏊‍♀️')">🏊‍♀️</div>
  </div>
  
  <div class="childContainer" id="cContainer">
    <div class="childSubContainer" onclick="appendEmoji('💡')">💡</div>
    <div class="childSubContainer" onclick="appendEmoji('🎉')">🎉</div>
    <div class="childSubContainer" onclick="appendEmoji('🔥')">🔥</div>
    <div class="childSubContainer" onclick="appendEmoji('💰')">💰</div>
    <div class="childSubContainer" onclick="appendEmoji('🛍️')">🛍️</div>
    <div class="childSubContainer" onclick="appendEmoji('🎈')">🎈</div>
    <div class="childSubContainer" onclick="appendEmoji('⌛')">⌛</div>
    <div class="childSubContainer" onclick="appendEmoji('🔔')">🔔</div>
    <div class="childSubContainer" onclick="appendEmoji('📚')">📚</div>
    <div class="childSubContainer" onclick="appendEmoji('🎵')">🎵</div>
  </div>
  
  <div class="childContainer" id="cContainer">
    <div class="childSubContainer food" onclick="appendEmoji('☀️')">☀️</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌤️')">🌤️</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌧️')">🌧️</div>
    <div class="childSubContainer food" onclick="appendEmoji('❄️')">❄️</div>
    <div class="childSubContainer food" onclick="appendEmoji('⛅')">⛅</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌩️')">🌩️</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌪️')">🌪️</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌈')">🌈</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌊')">🌊</div>
    <div class="childSubContainer food" onclick="appendEmoji('🌫️')">🌫️</div>
  </div>   
    
  </div>
`;






file.onchange = function(){
  if(file.files[0].size < 1000000){  // 1MB = 1000000
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
        <img class="dp" src="${profilePic}" alt="" width="50" height="50">
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
  
  return messageBox;
  
}
  
  
  
  
  
function createChatInput() {
    
  const chatboxinput = document.createElement('div');
  chatboxinput.classList.add('chatbox-input');
  
  chatboxinput.innerHTML = `
    <i class="fa-regular fa-face-grin" id="emojiInitiator" onclick="toggleEmoji()"></i>
    ${emoList}
    <i class="fa-sharp fa-solid fa-paperclip"></i>
    <input type="text" placeholder="Type a message">
    <i class="fa fa-send-o"></i>
  `;

  return chatboxinput;
  
}





function toggleEmoji() {
  
  let emojiIcon = document.getElementById('emojiInitiator');
  
  emojiIcon.addEventListener('click', ()=> {
    let pContainer = document.getElementById('pContainer');
    pContainer.style.display = (pContainer.style.display === 'flex') ? 'none' : 'flex';
  });

}

  


function appendEmoji(emoji) {

  const inputField = document.querySelector('.chatbox-input input[type="text"]');
  
  if (inputField) {
    inputField.value += emoji;
  }
  
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
    console.log('Message sent successfully:', response.data.chatMessage);

    lastMessageId = response.data.chatMessage.id;
    fetchNewMessages(lastMessageId);
  
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

}
  
  



 async function fetchNewMessages (recentMsgId) {
  
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






document.addEventListener("DOMContentLoaded", async function() {

  const response = await displayUserStatus();
  if(response.data.data.length > 0) {
    createChatBoxes(response);
  }
  
});




// form.addEventListener('submit', async(e) => {
//   e.preventDefault();
  
//   await uploadProfilePicture(imgInput.src);

// });
