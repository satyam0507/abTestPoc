firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {

        // User is signed in.
        showMsg('hide', '');
        addIframe('.js-iframe', 'https://trailblazerhrsolutions.herokuapp.com');

    } else {
        console.log('You have to login to view this page');
        showMsg('warning', 'You are not <strong>loggedin</strong>');
        addIframe('.js-iframe','');
        // No user is signed in.
    }
});

function addIframe(selector, source) {
    return new Promise((resolve, reject) => {
        const iframeEl = document.querySelectorAll(selector);
        if (iframeEl) {
            iframeEl.forEach(function (element) {
                element.setAttribute('src', source);
            }, this);
            resolve(true);
        }
    })
}
