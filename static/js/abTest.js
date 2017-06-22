firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {

        // User is signed in.
        showMsg('hide', '');
        getPageData(user.uid).then(function (res) {
            addIframe('iframe-hook', 'js-iframe', res);
        }).catch(function (err) {
            alert('SomeError');
            console.log(err);
        })

    } else {
        console.log('You have to login to view this page');
        showMsg('warning', 'You are not <strong>loggedin</strong>');
        hideEl('js-iframe');
        // No user is signed in.
    }
});

var userPageDomain = '';

function getPageData(uid) {
    return firebase.database().ref('user/' + uid + '/config').once('value').then(function (res) {
        userPageDomain = res.val().pageUrl;
        return userPageDomain + '?check=1';
    }).catch(function (err) {
        return err;
    })
}

function addIframe(hook, selector, source) {
    return new Promise((resolve, reject) => {
        const hookEl = document.querySelector('.' + hook);
        if (hookEl) {
            showEl(selector)
            var iframeEl = document.createElement('iframe');
            iframeEl.setAttribute('class', selector);
            iframeEl.classList.add('css-iframe');
            iframeEl.setAttribute('src', source);
            iframeEl.onload = function (evt) {}
            hookEl.appendChild(iframeEl);
        }
    })
}

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

window.addEventListener('message', messageListners);

function messageListners(evt) {
    console.log(evt.data);
    if (evt.data.type === 'dataToSave') {
        saveToDataBase(evt.data.nvData).then(function (res) {
            if (res) {
                if (evt.source) {
                    evt.source.postMessage("saved", userPageDomain);
                }
            }
        }).catch(function (err) {

        });
    }
    if (evt.data.type === 'getDataServer') {

        getDataServer(evt.data.nvData).then(function (res) {
            console.log(res);
            if (res && Array.isArray(res) && res.length > 0) {
                if (evt.source) {
                    evt.source.postMessage({
                        type: 'dataFormServer',
                        nvData: res
                    }, userPageDomain);
                }
            }
        }).catch(function (err) {

        })

    }
}

function getDataServer(reqData) {
    var domain = reqData.domain;
    var path = reqData.pathName;
    var uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('user/' + uid + '/pageData').orderByChild('domain').equalTo(domain).once('value').then(function (res) {
        var resArray = [];
        var data = res.val();
        if (data) {
            Object.keys(data).forEach(function (key) {
                var value = data[key];
                if (value.hasOwnProperty('pathName') && value.pathName === path) {
                    resArray.push(value);
                }
            });
        }
        return resArray;

    }).catch(function (err) {
        console.log(err);
        return null;
    })
}

function saveToDataBase(data) {
    var user = firebase.auth().currentUser;
    if (user) {
        return firebase.database().ref('user/' + user.uid + '/pageData').push(data).then(function (res) {
            return true;
        }).catch(function (err) {
            console.log(err);
            return false;
        })
    } else {
        showMsg('warning', 'You are not <strong>loggedin</strong>');
    }
}