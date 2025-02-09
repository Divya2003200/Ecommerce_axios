document.getElementById("login-btn").addEventListener("click", async function (e) {
    e.preventDefault();
    alert("you can either login using admin or user....all users from API are valid and can login ")
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        if (username === "admin" && password === "admin123") {
            alert("Admin login successful!");
            window.location.href = "admin.html";
            return;
        }

        // Fetch all users from Fake Store API
        let response = await axios.get("https://fakestoreapi.com/users");
        let users = response.data;

        // Check if the entered user exists
        let user = users.find(u => u.username === username);

        if (!user) {
            alert("User not found!");
            return;
        }

        // Authenticate using Fake Store API
        let loginResponse = await axios.post("https://fakestoreapi.com/auth/login", {
            username,
            password
        });

        if (loginResponse.data.token) {
            alert("Login successful!");
            window.location.href = username === "admin" ? "admin.html" : "Home.html";
        } else {
            alert("Invalid password!");
        }
     
    } catch (error) {
        console.error("Error:", error.message);
    }
});
window.onload = function () {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};
