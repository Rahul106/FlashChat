
const logoutBtn = document.getElementById("logoutBtn");
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");




toggle.addEventListener("click" , () => {
    sidebar.classList.toggle("close");
})




searchBtn.addEventListener("click" , () => {
    sidebar.classList.remove("close");
})




modeSwitch.addEventListener("click" , () => {
    
    body.classList.toggle("dark"); 
    
    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }

});


async function logout() {

    try {
  
        let apiURL = `${getAPIURL()}/user/logout`;
        console.log(`URL : ${apiURL}`);
      
        const response = await axios.get(apiURL, getHeaders());
      
        if (response.status === 200) {
    
            console.log("Logging out...");
            localStorage.removeItem('token');
            localStorage.clear();
            return window.location.href = '/logout';  
    
        } else {
          throw new Error("Still user logged in user logged out not succcessful");
        }
      
      } catch (err) {
        document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
        alertAwakeSleep();
        throw new Error(err);
      }
      
    

   

}



logoutBtn.addEventListener("click", function(event) {
    event.preventDefault();
    logout();
});
  
  