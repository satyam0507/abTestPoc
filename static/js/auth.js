// Initialize Firebase
var config = {
    apiKey: "AIzaSyAYAvzNQuijJmJhC59Iv_Hi3RyRiSm3fVw",
    authDomain: "abtest-f32c5.firebaseapp.com",
    databaseURL: "https://abtest-f32c5.firebaseio.com",
    projectId: "abtest-f32c5"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
var logedIn;


const signUpEl = document.querySelectorAll('.signUp');
const logBtnEl = document.getElementById('js-userInfo');
if (logBtnEl) {
    logBtnEl.addEventListener('click', function (evt) {
        evt.preventDefault();
        const logModelEl = document.querySelector('.model-userInfo');
        if (logModelEl) {
            logModelEl.classList.toggle('hidden');
        }
    })

}

function changeAuthText(logedIn) {
    if (signUpEl) {
        if (logedIn) {
            signUpEl.forEach(function (element) {
                element.innerText = 'logout';
            }, this);
            loggedIn();
        } else {
            signUpEl.forEach(function (element) {
                element.innerText = 'login';
            }, this);
            loggedOut();
        }
    }
}

function loggedIn() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;


    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }
    var userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
        var userIamgeEl = document.querySelectorAll('.js-userImage');
        var userNameEl = document.querySelectorAll('.js-userName');
        var userEmailEl = document.querySelectorAll('.js-userEmail');
        if (userIamgeEl) {
            userIamgeEl.forEach(function (element) {
                element.setAttribute('src', photoUrl);
                element.classList.remove('hidden');
            }, this);
        }
        if (userNameEl) {
            userNameEl.forEach(function (element) {
                element.innerText = name;
            }, this);
        }
        if (userEmailEl) {
            userEmailEl.forEach(function (element) {
                element.innerText = email;
            }, this);
        }
    }

}

function loggedOut() {
    var userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
        var userIamgeEl = document.querySelectorAll('.js-userImage');
        var userNameEl = document.querySelectorAll('.js-userName');
        var userEmailEl = document.querySelectorAll('.js-userEmail');
        if (userIamgeEl) {
            userIamgeEl.forEach(function (element) {
                element.setAttribute('src', '');
                element.classList.add('hidden');
            }, this);
        }
        if (userNameEl) {
            userNameEl.forEach(function (element) {
                element.innerText = '';
            }, this);
        }
        if (userEmailEl) {
            userEmailEl.forEach(function (element) {
                element.innerText = '';
            }, this);
        }
    }
}

function signInHandler(evt) {

    evt.preventDefault();
    if (!logedIn) {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            showMsg('error', errorMessage);
            // ...
        });
    } else {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

}

if (signUpEl) {
    signUpEl.forEach(function (element) {
        element.addEventListener('click', signInHandler)
    }, this);

}

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        logedIn = true;
        changeAuthText(logedIn);
        var name, email, photoUrl, emailVerified;
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        // User is signed in.
    } else {
        logedIn = false;
        changeAuthText(logedIn);

        // No user is signed in.
    }
});

function showMsg(type, msg) {
    var msgEl = document.querySelectorAll('.js-alert');
    if (msgEl) {
        const msgType = ['alert-warning', 'alert-success', 'alert-warning', 'alert-info','hide'];
        var msgTypeSelected;
        switch (type) {
            case 'error': msgTypeSelected = msgType[0];
                break;
            case 'success': msgTypeSelected = msgType[1];
                break;
            case 'warning': msgTypeSelected = msgType[2];
                break;
            case 'info': msgTypeSelected = msgType[3];
                break;
            case 'hide': msgTypeSelected = 'hide';
                break;
            default: msgTypeSelected = 'hide';
        }
        msgEl.forEach(function (element) {
            removePreviousClass(element, msgType);
            element.classList.add(msgTypeSelected);
            element.innerHTML = msg;
        }, this);
    }
}

function removePreviousClass(element, classArray) {
    classArray.forEach(function (cl) {
        element.classList.remove(cl);
    }, this);
}