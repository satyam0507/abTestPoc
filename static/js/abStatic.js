window.nvBootstrap = window.nvBootstrap || function (d) {
    window.nvAB = window.nvAB || {};
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

        var a = document,
            f = a.head || a.getElementsByTagName("head")[0],
            c, b;
        a.addEventListener && (c = a.createElement("script"),
            // c.async = 1,
            c.src = d,
            c.setAttribute('type', 'text/javascript'),
            f.appendChild(c)
        )
    };
    window.nvAB.cssLoader = window.nvAB.cssLoader || function (d) {
        var a = document,
            f = a.head || a.getElementsByTagName("head")[0],
            c, b;
        a.addEventListener && (c = a.createElement("link"),
            // c.async = 1,
            c.href = d,
            c.setAttribute('type', 'text/css'),
            c.setAttribute('rel', 'stylesheet'),
            f.appendChild(c)
        )
    }
    window.nvAB.caller = window.nvAB.caller || function (d) {

        d.css.forEach(function (element) {
            nvAB.cssLoader(element)
        }, this);
        d.js.forEach(function (element) {
            nvAB.scriptLoader(element)
        }, this);
        var e = function () {};
        window.nvBootstrap = e;
    }

    nvAB.getParams('check') == 1 && nvAB.inIframe ? nvAB.caller(d) : true;

};
// window.addEventListener('DOMContentLoaded', function (evt) {
    nvBootstrap({
        js: [
            // '//localhost:9090/static/js/timeMe.js',
            // '//localhost:9090/static/js/cssSelector.js',
            '//localhost:9090/static/js/selectorQuery.js',
            '//cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1//js/froala_editor.pkgd.min.js',
            '//localhost:9090/static/js/abMain-0.1.js'
        ],
        css: [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1/css/froala_editor.pkgd.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.1/css/froala_style.min.css'
        ]
    });

// })