window.nvBootstrap = window.nvBootstrap || function (d) {

    window.nvAB.getParams = window.nvAB.getParams || function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    window.nvAB.inIframe = window.nvAB.inIframe || function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    window.nvAB.scriptLoader = window.nvAB.scriptLoader || function (d) {
        var e = function () {},
            a = document,
            f = a.head || a.getElementsByTagName("head")[0],
            c, b;
        a.addEventListener && (c = a.createElement("script"),
            // c.async = 1,
            c.src = d,
            f.appendChild(c),
            window.nvBootstrap = e)
    };

    window.nvAB.caller = window.nvAB.caller || function (d) {
        d.forEach(function (element) {
            nvAB.scriptLoader(element)
        }, this);
    }

    nvAB.getParams('check') == 1 && nvAB.inIframe ? nvAB.caller(d) : true;

};

nvBootstrap([
    // '//localhost:9090/static/js/timeMe.js',
    // '//localhost:9090/static/js/cssSelector.js',
    '//localhost:9090/static/js/selectorQuery.js',
    '//localhost:9090/static/js/abMain.js'
]);