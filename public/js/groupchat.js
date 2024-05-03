const groupUsersIcon = document.getElementById('groupUsersIcon');
const createGroup = document.getElementById('createGroup');





createGroup.addEventListener("click", async function() {

    const groupName = document.getElementById('groupName').value;
    const groupImage = document.getElementById('groupImage').value;
  
    const selectedUsers = [];
    const checkboxes = document.querySelectorAll('.user-selection input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
      
      if (checkbox.checked) {
        
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        const userId = checkbox.id.replace('user', ''); 
        const username = label.textContent.trim(); 
        
        selectedUsers.push({
            checkboxId: checkbox.id,
            userId: userId,
            username: username
        });
        
      }
  
    });
  
    formGroup(groupName, groupImage, selectedUsers);
  
});
  
  
  


  
async function formGroup(gName, gImage, sUsers) {
  
    console.log('Group Name:', gName);
    console.log('Group Image:', gImage);
    console.log('Selected Users:', sUsers);
  
    const groupInfo = {
      groupName: gName,
      groupImage: gImage,
      selectedUsers: sUsers
    };
  
    try {
  
      const apiURL = `${getAPIURL()}/group/create-group`;
      console.log(`URL : ${apiURL}`);
  
      const response = await axios.post(apiURL, groupInfo, getHeaders());
      console.log('Message sent successfully:', response.data);
  
      console.log('<---Group-Name---> : ' +response.data.group.groupName);
      console.log('<---Group-Id-----> : ' +response.data.group.id);
      console.log('<---Group-User---> : ' +response.data.group.adminId);
  
      displayUserStatus();
      fetchCurrentUserGroups();
  
    } catch(err) {
      document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
      alertAwakeSleep();
      throw new Error(err);
    }
  
}
  




function renderGroups(chatList, groupsArr, userId) {
  
    groupsArr.forEach(group => {
      const isAdmin = group.adminId === userId;
      const chatBox = renderGroupOnScreen(group.groupName, group.id, isAdmin);
      attachEventListeners(chatBox, group.id, group.groupName, '', chatTypeOptions.Group);
      chatList.appendChild(chatBox);
    });
  
  }
  
  
  
  
  
  function renderGroupOnScreen(groupName, groupId, isAdmin) {
    
    const newGroup = document.createElement('div');
    newGroup.classList.add('chat-box');
  
    newGroup.id = `group${groupId}`
    newGroup.textContent = groupName;
  
    newGroup.innerHTML = `
        <div class="img-box">
          <img class="img-cover" src="/images/profile/profile1.webp" alt="profileImg">
          <div class="hidden-id" style="display: none;">${newGroup.id}</div>     
        </div>
        <div class="chat-details">
          <div class="text-head">
            <h4>${newGroup.textContent}</h4>
          </div>
          <div class="hidden-id" style="display: none;">${newGroup.id}</div>     
        </div>
        <div class="user-status">
        <div class="hidden-id" style="display: none;">${newGroup.id}</div>     
        </div>       
      `;
      
      // if (isAdmin) {
    //     createEditButton(groupId);
    // }
    
     // newGroup.addEventListener('click', () => {
    //     newGroupHandler(groupId);
    // });
  
  
    return newGroup;
   
  }






async function fetchCurrentUserGroups() {

    const chatList = document.querySelector('.chat-list');  
    chatList.innerHTML = '';
  
    try {
  
      let apiURL = `${getAPIURL()}/group/get-mygroups`;
      console.log('URL : ', apiURL);
  
      const response = await Promise.all([
        fetchCurrentUser(), 
        axios.get(apiURL, getHeaders())
      ]);
  
      console.log('User-Details : ', response[0].data.data.userId);
      console.log('Groups-Details : ', response[1].data.groups);
  
      const userId = response[0].data.data.userId;
      const groupsArr = response[1].data.groups;
  
      renderGroups(chatList, groupsArr, userId);
      
    } catch (err) {
        alert(err.message);
    }

}
  
  




async function populateUserSelection() {
  
    const userSelectionDiv = document.querySelector('.user-selection');
    userSelectionDiv.innerHTML = ''; 
  
    let apiURL = `${getAPIURL()}/user/users-status`;
 
    try {
  
      const response = await axios.get(apiURL, getHeaders());
      const users = response.data.data;
      
      users.forEach(user => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `user${user.id}`;
        checkbox.name = `user${user.id}`;
        
        const label = document.createElement('label');
        label.htmlFor = `user${user.id}`;
        label.textContent = user.name;
        
        label.style.marginRight = '10px'; 
        label.style.color = '#007bff'; 
        userSelectionDiv.appendChild(checkbox);
        userSelectionDiv.appendChild(label);
        userSelectionDiv.appendChild(document.createElement('br')); 
      });
  
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  
}
  




groupUsersIcon.addEventListener('click', function() {

    populateUserSelection();
  
});





document.addEventListener("DOMContentLoaded", async function() {

    //displayUserStatus();
    fetchCurrentUserGroups();
  
  });