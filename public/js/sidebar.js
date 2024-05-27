const logoutBtn = document.getElementById("logoutBtn");
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");



//todo - toggle sidebar state.
toggle.addEventListener("click" , () => {
    sidebar.classList.toggle("close");
})



//todo - open sidebar
searchBtn.addEventListener("click" , () => {
    sidebar.classList.remove("close");
})



//todo - toggle light-dark mode.
modeSwitch.addEventListener("click" , () => {
    
    body.classList.toggle("dark"); 
    
    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }

});




//todo - logout user.
async function logout() {

    try {

        let apiURL = `${getAPIURL()}/user/logout`;
        console.log(`URL : ${apiURL}`);
      
        const response = await axios.get(apiURL, getHeaders());
      
        if (response.status === 200 || response == '') {
            if (typeof socket !== 'undefined' && socket.emit) {
                console.log('Socket is defined:', socket);
                socket.emit('userActivity');
            } else {
                console.log('Socket is not defined or does not have an emit method');
            }
           
            console.log('Logging out...');
            localStorage.removeItem('token');
            localStorage.clear();

            return window.location.href = '/';  
        } else {
          throw new Error("Still user logged in user logged out not succcessful");
        }
      
      } catch (err) {
        document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
        alertAwakeSleep();
        throw new Error(err);
      }

}




//todo - logout button event listener
logoutBtn.addEventListener("click", function(event) {
    event.preventDefault();
    logout();
});