window.nvBootstrap = window.nvBootstrap || function (d) {
    var e = function () {},

        a = document,
        f = a.head || a.getElementsByTagName("head")[0],
        c, b;
    window.nvAB.getParams = window.nvAB.getParams || function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    window.nvAB.inIframe = window.nvAB.inIframe || function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    a.addEventListener && (c = a.createElement("script"),
        c.async = 1,
        c.src = d,
        nvAB.getParams('check') == 1 && nvAB.inIframe ? f.appendChild(c) : true,
        window.nvBootstrap = e)
    // c = ["iframe#_hjRemoteVarsFrame {", 
    // "display: none !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important;", "}"],
    // d = a.createElement("style"),
    // d.type = "text/css",
    // d.styleSheet ? d.styleSheet.cssText = c.join("") : d.appendChild(a.createTextNode(c.join(""))),
    // f.appendChild(d),
    // b = a.createElement("iframe"),
    // b.style.cssText = c[1],
    // b.name = "_hjRemoteVarsFrame",
    // b.title = "_hjRemoteVarsFrame",
    // b.id = "_hjRemoteVarsFrame",
    // b.src = "https://" + (window._hjSettings.varsHost || "vars.hotjar.com") + "/rcj-99d43ead6bdf30da8ed5ffcb4f17100c.html",
    // b.onload = function () {
    //     e.varsLoaded = !0;
    //     "undefined" != typeof hj && hj.event && hj.event.signal("varsLoaded")
    // },
    // e.varsJar = b,
    // a.body ? a.body.appendChild(b) : a.addEventListener("DOMContentLoaded", function () {
    //     a.body.appendChild(b)
    // }),

};

nvBootstrap('//localhost:9090/js/abMain.js');


// window.hjSiteSettings = window.hjSiteSettings || {
//     "testers_widgets": [],
//     "polls": [{
//         "persist_condition": "once",
//         "targeting": [{
//             "negate": false,
//             "pattern": "http:\/\/satyamsingh.herokuapp.com\/",
//             "match_operation": "simple",
//             "component": "url"
//         }, {
//             "negate": false,
//             "pattern": "phone",
//             "match_operation": "exact",
//             "component": "device"
//         }, {
//             "negate": false,
//             "pattern": "tablet",
//             "match_operation": "exact",
//             "component": "device"
//         }, {
//             "negate": false,
//             "pattern": "desktop",
//             "match_operation": "exact",
//             "component": "device"
//         }],
//         "language": "en",
//         "targeting_percentage": 100,
//         "created_epoch_time": 1488261147,
//         "display_condition": "delay",
//         "content": {
//             "thankyou": "Thank you for answering this Poll. Your feedback is highly appreciated!",
//             "questions": [{
//                 "nextByAnswer": [],
//                 "text": "Quick question: How can we improve this page? Is anything missing?",
//                 "labels": null,
//                 "answers": null,
//                 "next": "byOrder",
//                 "type": "single-open-ended-multiple-line",
//                 "randomize_answer_order": false
//             }, {
//                 "nextByAnswer": [],
//                 "text": "Would you like a response to your question or comment?",
//                 "labels": null,
//                 "answers": [{
//                     "text": "Yes (please enter your email address)",
//                     "comments": true
//                 }, {
//                     "text": "No thanks",
//                     "comments": false
//                 }],
//                 "next": "byOrder",
//                 "type": "single-close-ended",
//                 "randomize_answer_order": false
//             }]
//         },
//         "effective_show_branding": true,
//         "background": "#333333",
//         "skin": "dark",
//         "position": "right",
//         "display_delay": 3,
//         "id": 136138
//     }],
//     "features": [],
//     "recording_capture_keystrokes": true,
//     "site_id": 430925,
//     "integrations": {
//         "optimizely": {
//             "tag_recordings": false
//         }
//     },
//     "deferred_page_contents": [{
//         "targeting": [{
//             "negate": false,
//             "pattern": "http:\/\/satyamsingh.herokuapp.com\/",
//             "match_operation": "simple",
//             "component": "url"
//         }, {
//             "negate": false,
//             "pattern": "tablet",
//             "match_operation": "exact",
//             "component": "device"
//         }],
//         "id": 3426969
//     }],
//     "record_targeting_rules": [],
//     "surveys": [],
//     "heatmaps": [{
//         "targeting": [{
//             "negate": false,
//             "pattern": "http:\/\/satyamsingh.herokuapp.com\/",
//             "match_operation": "simple",
//             "component": "url"
//         }],
//         "created_epoch_time": 1488261103,
//         "id": 1197856,
//         "selector_version": 2
//     }],
//     "feedback_widgets": [],
//     "forms": [],
//     "record": true,
//     "r": 1.0,
//     "state_change_listen_mode": "automatic"
// };