//todo - loading/injecting sidebar content
document.addEventListener("DOMContentLoaded", function() {
    
    fetch("/views/sidebar.html")
        .then(response => response.text())
        .then(data => {
            
            document.getElementById("sidebarContainer").innerHTML = data;
            const scriptElement = document.createElement("script");
            scriptElement.src = "/js/sidebar.js"; 
            document.body.appendChild(scriptElement);

        });

});
