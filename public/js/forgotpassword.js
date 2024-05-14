

let resetBtn = document.getElementById('resetBtn');



async function forgetPasswordLink(e) {
    e.preventDefault();

    try {
      
        const email = document.getElementById('i_email').value;
      
        if(!email.trim()) { 
            return alert('Please enter your correct email')
        }

        console.log(`Email : ${email}`);
        const result = await axios.post(`${getAPIURL()}/password/forgotpassword`, {email})
        document.getElementById('i_email').value = '';
        document.body.innerHTML += `<div style="color:green;">${result.data.message}<div>`
    
    } catch(err) {
        console.log(err)
        document.body.innerHTML += '<div style="color:red;">${err} <div>'
    }

}




resetBtn.addEventListener('click', function(event) {
    event.preventDefault();
    forgetPasswordLink(event);
});