console.log("%c JavaScript","color:steelblue; font-size: 24px; text-shadow: 2px 2px black");

const API_BASE = "http://localhost:3001";

let login = true;

// log/signup elements
let logBox = document.getElementById("log");
let header = document.getElementById("header");

let switchBox = document.getElementById("switch");
let switchP = document.getElementById("switchP");
let switchButton = document.getElementById("switchButton");

// inputelements
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let submitButton = document.getElementById("submit");


// LOGIN VS. SIGNUP
function logInDisplay(){
    header.innerHTML = "Log In"
    switchP.innerHTML = "Don't have an account?"
    switchButton.innerHTML = "Sign Up";
}
function signUpDisplay(){
    header.innerHTML = "Sign Up"
    switchP.innerHTML = "Already have an account?"
    switchButton.innerHTML = "Log In";
}

// Switch!
switchBox.addEventListener("click", () => {
    login = !login;
    login ? logInDisplay() : signUpDisplay();
});


async function logIn(){
    console.log("Validating LogIn");
    let currUser = usernameInput.value;
    let currPass = passwordInput.value;
    let userID;
    let validated = false;

    const data = await fetch(API_BASE+"/users")
        .then(res => res.json());
    for(var i = 0; i < data.length; i++){
        if(data[i].username === currUser && data[i].password === currPass){
                validated = true;
                userID = data[i]._id;
            }
    }

    if(validated){
        console.log("%c * Valid Credentials","color:green; font-weight:bold");
        console.log(userID);
    }
    else{
        console.log("%c * Invalid Credentials","color:red; font-weight:bold");
    }
}

async function signUp(){
    console.log("Creating User");
    let newUsername = usernameInput.value;
    let newPassword = passwordInput.value;
    const data = await fetch(API_BASE+"/users/new",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword
        })
    }).then(res => res.json())
    .then(data => {
        console.log("%c * Complete","color:green; font-weight:bold");
        console.log(data._id);
    });
}

// Submit Button Clicked
submitButton.addEventListener("click", async () => {
    login ? logIn() : signUp();
});