const environment = "Local";
//const environment = "Production";


const LOCAL_AWS_APIURL = 'http://44.212.45.234:4000';
const LOCAL_WINDOWS_APIURL =  'http://localhost:3000';



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
  <div class="childSubContainer reaction" onclick="appendEmoji('🤬')">🤬</div>
  <div class="childSubContainer reaction" onclick="appendEmoji('😭')">😭</div>
  <div class="childSubContainer reaction" onclick="appendEmoji('😡')">😡</div>
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
  <div class="childSubContainer animal" onclick="appendEmoji('🐵')">🐵</div>
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
  <div class="childSubContainer food" onclick="appendEmoji('🍫')">🍫</div> 
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
  <div class="childSubContainer sport" onclick="appendEmoji('🎱')">🎱</div>
  <div class="childSubContainer sport" onclick="appendEmoji('🏊‍♂️')">🏊‍♂️</div>
  <div class="childSubContainer sport" onclick="appendEmoji('⛹️‍♂️')">⛹️‍♂️</div> 
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
  <div class="childSubContainer" onclick="appendEmoji('📌')">📌</div> 
</div>


<div class="childContainer" id="cContainer">
  <div class="childSubContainer weather" onclick="appendEmoji('☀️')">☀️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌤️')">🌤️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌧️')">🌧️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('❄️')">❄️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('⛅')">⛅</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌩️')">🌩️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌪️')">🌪️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌈')">🌈</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌊')">🌊</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌫️')">🌫️</div>
  <div class="childSubContainer weather" onclick="appendEmoji('🌙')">🌙</div> 
</div>

</div>
`;



//todo - common function used by group and user
const displayUsers = async() => {
  const response = await displayUserStatus();
  if(response.data.data.length > 0) {
    createChatBoxes(response);
  }
} 




//todo - set headers and token
const getHeaders = () => {

  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };

  return headers;

};
  
  


//todo - check local/production
const getAPIURL = () => {
  
  if (environment.toUpperCase() === 'LOCAL') {
    return LOCAL_WINDOWS_APIURL;
  } else if (environment.toUpperCase() === 'PRODUCTION') {
    return LOCAL_AWS_APIURL;
  } else {
    throw new Error('Invalid environment specified');
  }
  
};



  
//todo - show error alert   
function alertAwakeSleep() {
    
  document.querySelector("#errorAlert").classList.toggle("hidden");
  
  setTimeout(function () {
    document.getElementById("errorAlert").classList.toggle("hidden");
  }, 1500);

}

  
  

//todo - show success alert
function successAlertAwakeSleep() {

  document.querySelector("#successAlert").classList.toggle("hidden");
  
  setTimeout(function () {
    document.getElementById("successAlert").classList.toggle("hidden");
  }, 2000);

}
