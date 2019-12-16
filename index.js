const host = 'https://optisourceproject.azurewebsites.net/users/';
async function logIn() {
    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;

    if (!emailAddress) {
        alert("Email Address is required!");
        return;
    }
    if (!password) {
        alert("Password is required!");
        return;
    }

    const request = {
        password: password,
        emailAddress: emailAddress,
    };

    logInAsync(request);
}

async function logInAsync(opts) {
    response = fetch(host + '/authenticate', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    }).then(function (response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }).then(function (myJson) {
        console.log("Redirecting....");
        window.localStorage.setItem('firstName', myJson.firstName);
        window.localStorage.setItem('lastName', myJson.lastName);
        window.location.replace("details.html");
    }
    ).catch(function (error) {
        alert("Username or password is incorret!");
        console.log(error);
    });
}

function loadResults() {
    console.log('here');
    const firstName = window.localStorage.getItem('firstName');
    const lastName = window.localStorage.getItem('lastName');

    console.log(typeof lastName);

    if (lastName === 'undefined' || firstName === 'undefined') {
        alert("You must log in first!");
        window.location.replace("login.html");
    }

    console.log(firstName);
    console.log(lastName);

    const firstNameModel = document.getElementById('firstName');
    firstNameModel.setAttribute('value', firstName);

    const lastNameModel = document.getElementById('lastName');
    lastNameModel.setAttribute('value', lastName);
}

function logOut() {
    window.localStorage.clear();
    alert("Logging You Out!");
    window.location.replace("login.html");
}

function register(form) {
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const emailAddress = form.elements.emailAddress.value;
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;

    const request = {
        "firstName": firstName,
        "lastName": lastName,
        "userName": username,
        "password": password,
        "address": address,
        "emailAddress": emailAddress
    };

    console.log(request);

    requestAsync(request);
}

async function requestAsync(opts) {
    response = fetch(host + '/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    }).then(function (response) {
        if (response.status >= 200 && response.status <= 299) {
            return "";
        } else {
            throw Error(response.statusText);
        }
    }).then(function () {
        alert("Registration Successful! Please Log In!")
        console.log("Redirecting to login....");
        window.location.replace("login.html");
    }
    ).catch(function (error) {
        alert("Username already taken!");
        console.log(error);
    });
}