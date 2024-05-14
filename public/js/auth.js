
let signIn = document.getElementById("i_signInForm");
let signUp = document.getElementById('si_userForm');




//todo - userLogin
async function userLogin(e) {
   
  const email = e.target.n_email.value;
  const password = e.target.n_password.value;
  
  try {
  
    if(!email.trim()) {
      document.querySelector("#errorAlert").innerText = `Kindly fill email field.!!!`;
      return alertAwakeSleep();
    }
  
    if(!password.trim()) {
      document.querySelector("#errorAlert").innerText = `Kindly fill password field.!!!`;
      return alertAwakeSleep();
    }
    
    const loginObj = { email, password };
   
    let apiURL = `${getAPIURL()}/user/login`;
    console.log(`URL : ${apiURL}`);
    
    const response = await axios.post(apiURL, loginObj);

    if (response.status === 200) {

      localStorage.setItem('token', response.data.token)
      alert(response.data.message);
      window.location.href = "/dashboard";
      e.target.n_email.value = '';
      e.target.n_password.value = '';
    
    } else {
      throw new Error("Error in credentials");
    }
  
  } catch (err) {
    document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
    alertAwakeSleep();
    throw new Error(err);
  }

}





//todo - add new user in flash chat app
async function addNewUser(uObj) {

  console.log(`user-object : ${uObj}`);

  let apiURL = `${getAPIURL()}/user/signup`;
  console.log(`URL : ${apiURL}`);

  try {

    const response = await axios.post(apiURL, uObj);
    console.log("user created : ", response.data);

    if (response.status === 201) {
      document.querySelector("#successAlert").innerText = `${response.data.userAddedResponse}`;
      successAlertAwakeSleep();
      
      setTimeout(function() {
        window.location.href = '/';
      }, 3000);
      
    } else {
      throw new Error("Error creating user");
    }

  } catch (error) {
    console.log(`error in adding user :  ${error}`);
    document.querySelector("#errorAlert").innerText = `${error.response.data.message}`;
    alertAwakeSleep();
  }

}




//TODO - user-registration process
function userRegistration(e) {

  const name = e.target.sn_name.value;
  const email = e.target.sn_email.value;
  const phone = e.target.sn_phone.value;
  const password = e.target.sn_password.value;

  if (!name) {
    document.querySelector("#errorAlert").innerText = 'Please fill name field.';
    return alertAwakeSleep();
  } else if (!email) {
    document.querySelector("#errorAlert").innerText = 'Please fill email field.';
    return alertAwakeSleep();
  } else if (!phone) {
    document.querySelector("#errorAlert").innerText = 'Please fill phone field.';
    return alertAwakeSleep();
  } else if (!password) {
    document.querySelector("#errorAlert").innerText = 'Please fill password field.';
    return alertAwakeSleep();
  }

  console.log("name : ", name);
  console.log("email : ", email);
  console.log('phone : ', phone);

  const userObject = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };

  addNewUser(userObject);

}
  


function alertAwakeSleep() {
  document.querySelector("#errorAlert").classList.toggle("hidden");
  setTimeout(function () {
    document.getElementById("errorAlert").classList.toggle("hidden");
  }, 1500);
}




function successAlertAwakeSleep() {
  document.querySelector("#successAlert").classList.toggle("hidden");
  setTimeout(function () {
    document.getElementById("successAlert").classList.toggle("hidden");
  }, 5000);
}




//todo - add eventlistener on signin butoon for form submission
signIn.addEventListener('submit', function(event) {
  event.preventDefault();
  
  userLogin(event);
});




//todo - add eventlistener on signup butoon for form submission
signUp.addEventListener('submit', function(event) {
  event.preventDefault();
  userRegistration(event);
});


