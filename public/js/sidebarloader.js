
document.addEventListener("DOMContentLoaded", function() {
    
   
    // Step 2: Fetch sidebar content from sidebar.html
    fetch("/views/sidebar.html")
        .then(response => response.text())
        .then(data => {
            
            // Step 3: Inject sidebar content into sidebarContainer
            document.getElementById("sidebarContainer").innerHTML = data;

            // Step 4: Load JavaScript file
            const scriptElement = document.createElement("script");

            // Step 5: Path to your javaScript file
            //scriptElement.type = "module"; 
            scriptElement.src = "/js/sidebar.js"; 
            document.body.appendChild(scriptElement);
        });

});
