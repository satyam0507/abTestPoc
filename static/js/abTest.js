firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {

        // User is signed in.
        showMsg('hide', '');
        addIframe('iframe-hook', 'js-iframe', 'http://localhost:3000/?check=1');

    } else {
        console.log('You have to login to view this page');
        showMsg('warning', 'You are not <strong>loggedin</strong>');
        hideEl('js-iframe');
        // No user is signed in.
    }
});

function addIframe(hook, selector, source) {
    return new Promise((resolve, reject) => {
        const hookEl = document.querySelector('.' + hook);
        if (hookEl) {
            showEl(selector)
            var iframeEl = document.createElement('iframe');
            iframeEl.setAttribute('class', selector);
            iframeEl.classList.add('css-iframe');
            iframeEl.setAttribute('src', source);
            iframeEl.onload = function (evt) {
                // addCustomClass();
                // do something
                // const iframeEl = document.getElementsByTagName("iframe")[0];
                // const ifameDOM = iframeEl.contentWindow;
                // ifameDOM.open();
                // ifameDOM.appendChild("<script> (function (){console.log('hahaahaha')})()</script>");
                // ifameDOM.close();
                // console.log(evt);
            }
            hookEl.appendChild(iframeEl);
        }

    })
}

// function addCustomClass() {
//     return new Promise((resolve, reject) => {
//         const iframeEl = document.getElementsByTagName("iframe")[0];
//         const ifameDOM = iframeEl.contentWindow;
//         const el = ifameDOM.body.getElementsByTagName('*');
//         for (var i = 0; i < el.length; i++) {
//             el[i].classList.add('nv-hover');
//         }
//     })
// }

function showEl(selector) {
    var el = document.querySelectorAll('.' + selector);
    if (el) {
        el.forEach(function (element) {
            element.classList.remove('hide');
        }, this);
    }
}

function hideEl(selector) {
    var el = document.querySelectorAll('.' + selector);
    if (el) {
        el.forEach(function (element) {
            element.classList.add('hide');
        }, this);
    }
}