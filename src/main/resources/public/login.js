const URL = 'http://localhost:8081';
let bearerKey = "";

//Erlaubt einen Login
const openPunch = () => {

    fetch(`${URL}/index.html`, {
        method: 'GET',
        headers: {
            'Authorization': bearerKey,
            'Content-Type': 'application/json'
        },

    })
};

//Erstellt einen neuen Benutzer
const createUser = () => {

    const credentials = {};
    credentials['username'] = document.getElementById("usernameField").value;
    credentials['password'] = document.getElementById("passwordField").value;

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)

    }).then((result) => {

    });
};

function initXMLHttpRequest(method, url, jwtoken) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.setRequestHeader('Authorization', jwtoken);
    xmlHttpRequest.send();
    window.location.href = url;
    return xmlHttpRequest;
}

//Erlaubt einen Login
const loginUser = () => {

    const credentialsLogin = {};
    credentialsLogin['username'] = document.getElementById("usernameField").value;
    credentialsLogin['password'] = document.getElementById("passwordField").value;

    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentialsLogin)

    }).then((result) => {


        localStorage.setItem("JWT", result.headers.get("Authorization"));
        bearerKey = localStorage.getItem("JWT");
        // alert(localStorage.getItem("JWT"));

        //TODO Open index.html
        // initXMLHttpRequest('GET', 'http://localhost:8081/index.html', bearerKey);
        //openPunch();
        location.href = 'http://localhost:8081/index.html';
    });

};


//Erstellt den Login-Button
const loginActions = () => {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener('click', () => loginUser())
};

//Erstellt den SignUp-Button
const signActions = () => {
    const deleteButton = document.getElementById("signButton");
    deleteButton.addEventListener('click', () => createUser())
};

//Event-Listener bei Laden vom Dokument
document.addEventListener('DOMContentLoaded', function () {
    loginActions();
    signActions();
});