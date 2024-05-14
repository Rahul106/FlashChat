const groupUsersIcon = document.getElementById('groupUsersIcon');
const createGroup = document.getElementById('createGroup');
let picInput = document.querySelector(".img");
//let file = document.getElementById("imgInput");
let editId = 0;




const msgTypeOptions = {
  User: 'user',
  Group: 'group'
};


file.onchange = function(){
  if(file.files[0].size < 1000000){  // 1MB = 1000000
      var fileReader = new FileReader();

      fileReader.onload = function(e){
          imgUrl = e.target.result
          picInput.src = imgUrl
      }

      fileReader.readAsDataURL(file.files[0])
  }
  else{
      alert("This file is too large!")
  }
}



async function fetchGroupMembers(groupId) {
  
  let apiURL = `${getAPIURL()}/group/get-groupmembers/${groupId}`;

  try {
    
    const response = await axios.get(apiURL, getHeaders());
    return response; 
    
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
  
}





 const editGroupListener = async (header, grpId, grpName) => {

  const editButton = header.querySelector('.fa-edit');
 
  editButton.addEventListener('click', async function() {

    const response = await fetchAllUsers();

    const groupMembersResponse = await fetchGroupMembers(grpId);
    const groupMembers = groupMembersResponse.data;

    const modalTitle = document.getElementById('exampleModalCenterTitle');
    modalTitle.textContent = 'Edit Group';

    const groupName = document.getElementById('groupName');
    groupName.value = grpName;

    const createGroupButton = document.getElementById('createGroup');
    createGroupButton.textContent = modalTitle.textContent.trim() === 'Edit Group' ? 'Save Change' : 'Create Group';
    populateUserSelection(response, groupMembers.groupMembers);
    editId = grpId;

    $('#exampleModalCenter').on('hidden.bs.modal', function () {
      modalTitle.textContent = 'Create Group';
      createGroupButton.textContent = 'Create Group';

      const formInputs = document.querySelectorAll('#exampleModalCenter input');
      formInputs.forEach(input => {
          input.value = '';
      });

      const checkboxes = document.querySelectorAll('.user-selection input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.checked = false;
      });
    });
    
  });

};





function initiateGroup(isEdit) {

  const groupName = document.getElementById('groupName').value;
  const groupImage = picInput.src;

  const selectedUsers = [];
  const checkboxes = document.querySelectorAll('.user-selection input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      const userId = checkbox.id.replace(/user|adminUser/, '');
      const username = label.textContent.trim(); 
      
      selectedUsers.push({
        checkboxId: checkbox.id,
        userId: userId,
        username: username
      });
    }
  });

  formGroup(groupName, groupImage, selectedUsers, isEdit);
  
};
  
  
  


  
async function formGroup(gName, gImage, sUsers, isEdit) {
  
  console.log('Group Name:', gName);
  console.log('Group Image:', gImage);
  console.log('Selected Users:', sUsers);
 
  const groupInfo = {
    groupName: gName,
    groupImage: gImage,
    selectedUsers: sUsers
  };
  
  try {
    
    const apiURL = (!isEdit) ? `${getAPIURL()}/group/create-group` : `${getAPIURL()}/group/edit-group/${editId}`; 
    console.log(`URL : ${apiURL}`);

    const response = await axios.post(apiURL, groupInfo, getHeaders());
    console.log('Message sent successfully:', response.data);

    console.log('<---Group-Name---> : ', response.data.group.groupName);
    console.log('<---Group-Id-----> : ', response.data.group.id);
    console.log('<---Group-User---> : ', response.data.group.adminId);

    const resp = await displayUserStatus();
    createChatBoxes(resp);
    fetchCurrentUserGroups();

    $('#exampleModalCenter').on('hidden.bs.modal', function () {
      const formInputs = document.querySelectorAll('#exampleModalCenter input');
      formInputs.forEach(input => {
        input.value = '';
      });
    });

  } catch(err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

}
  




function renderGroups(chatList, groupsArr, userId) {
  
  groupsArr.forEach(group => {
    console.log(group);
    console.log(group.groupmembers);
    const isAdmin = group.groupmembers.isAdmin;
    const chatBox = renderGroupOnScreen(group.groupName, group.id, group.imgpath, isAdmin);
    attachEventListeners(chatBox, group, msgTypeOptions.Group, isAdmin);
    chatList.appendChild(chatBox);
  });

}
  
  
  
  
  
  function renderGroupOnScreen(groupName, groupId, groupDp, isAdmin) {
   
    const newGroup = document.createElement('div');
    newGroup.classList.add('chat-box');
  
    newGroup.id = `group${groupId}`
    newGroup.textContent = groupName;
  
    newGroup.innerHTML = `
        <div class="img-box">
          <img class="img-cover" src="${groupDp}" alt="profileImg" width="50" height="50">
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
    //chatList.innerHTML = '';
  
    try {
    
      let apiURL = `${getAPIURL()}/group/get-mygroups`;
      console.log('URL : ', apiURL);
      
      const response = await Promise.all([
        fetchCurrentUser(), 
        axios.get(apiURL, getHeaders())
      ]);
      console.log('======', response);
      console.log('User-Details : ', response[0].data.data.userId);
      console.log('Groups-Details : ', response[1].data.groups);
  
      const userId = response[0].data.data.userId;
      const groupsArr = response[1].data.groups;
  
      renderGroups(chatList, groupsArr, userId);
      
    } catch (err) {
        alert(err.message);
    }

}
  
  



async function fetchAllUsers() {
  
  let apiURL = `${getAPIURL()}/user/users-status`;

  try {

    const response = await axios.get(apiURL, getHeaders());
    return response; 
    
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
  
}







function populateUserSelection(resp, groupMembers = []) {
  
  const userSelectionDiv = document.querySelector('.user-selection');
  userSelectionDiv.innerHTML = ''; 

  resp.data.data.forEach(user => {
    
    const { id, name } = user;
    console.log('User-Id', user.id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `user${user.id}`;
    checkbox.name = `user${user.id}`;
    checkbox.style.marginLeft = '17px'; 
    checkbox.checked = groupMembers.some(member => member.id === user.id);

    const label = document.createElement('label');
    label.htmlFor = `user${user.id}`;
    label.textContent = user.name;
    label.style.marginLeft = '8px';
    label.style.color = '#007bff'; 

    const adminCheckbox = document.createElement("input");
    adminCheckbox.type = "checkbox";
    adminCheckbox.id = `adminUser${user.id}`;
    adminCheckbox.name = `adminUser${user.id}`;
    adminCheckbox.style.marginLeft = "17px";

    const adminLabel = document.createElement("label");
    adminLabel.htmlFor = `adminUser${user.id}`;
    adminLabel.textContent = "admin";
    adminLabel.style.marginLeft = "8px";
    adminLabel.style.color = "#FF0000";
    
    const isAdmin = groupMembers.some(m => m.id === id && m.groupmembers.isAdmin);
    adminCheckbox.checked = isAdmin;
    adminCheckbox.disabled = !checkbox.checked;

    checkbox.addEventListener('change', function() {
      adminCheckbox.disabled = !this.checked;
    });

    userSelectionDiv.appendChild(checkbox);
    userSelectionDiv.appendChild(label);
    userSelectionDiv.appendChild(adminCheckbox);
    userSelectionDiv.appendChild(adminLabel);
    userSelectionDiv.appendChild(document.createElement("br")); 

  });

}
  




createGroup.addEventListener("click", function() {

  const createGroupButton = document.getElementById('createGroup');
  
  if (createGroupButton) {
    const createGroupButtonText = createGroupButton.textContent.trim();
  
    if (createGroupButtonText === 'Create Group') {
      initiateGroup(false);
    } else if (createGroupButtonText === 'Save Change') {
      initiateGroup(true);
    } else {
      alert('Unexpected button text: ' + createGroupButtonText);
    }
  } else {
    alert('Button not found');
  }

});






groupUsersIcon.addEventListener('click', async function() {

  const response = await fetchAllUsers();
  populateUserSelection(response);
  
});





document.addEventListener("DOMContentLoaded", async function() {
  
  fetchCurrentUserGroups();
  
});



