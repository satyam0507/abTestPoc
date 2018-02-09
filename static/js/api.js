(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nvChatBot = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _Bubbles = require("../node_modules/chat-bubble/component/Bubbles.js");

// this is a convenience script that builds all necessary HTML,
// imports all scripts and stylesheets; your container DIV will
// have a default `id="chat"`;
// you can specify a different ID with:
// `container: "my_chatbox_id"` option
(0, _Bubbles.prepHTML)({ relative_path: "../node_modules/chat-bubble/" });

/************************************************************************/
/************************ SAMPLE IMPLEMENTATION *************************/
/************************************************************************/

// initialize by constructing a named function...
/************************************************************************/
/******* CONVENIENCE METHODS AVAILABLE FOR ES6 BUILD ENVIRONMENTS *******/
/************************************************************************/

// the URL of where you've installed the component; you may need to change this:
var chatWindow = new _Bubbles.Bubbles(document.getElementById("chat"), "chatWindow", {
  // the one that we care about is inputCallbackFn()
  // this function returns an object with some data that we can process from user input
  // and understand the context of it
  // this is an example function that matches the text user typed to one of the answer bubbles
  // this function does no natural language processing
  // this is where you may want to connect this script to NLC backend.
  inputCallbackFn: function inputCallbackFn(o) {
    // add error conversation block & recall it if no answer matched
    var miss = function miss() {
      chatWindow.talk({
        "i-dont-get-it": {
          says: ["Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"],
          reply: o.convo[o.standingAnswer].reply
        }
      }, "i-dont-get-it");
    };
    // do this if answer found
    var match = function match(key) {
      setTimeout(function () {
        chatWindow.talk(convo, key); // restart current convo from point found in the answer
      }, 600);
    };
    // sanitize text for search function
    var strip = function strip(text) {
      return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "");
    };
    // search function
    var found = false;
    o.convo[o.standingAnswer].reply.forEach(function (e, i) {
      strip(e.question).includes(strip(o.input)) && o.input.length > 0 ? found = e.answer : found ? null : found = false;
    });
    found ? match(found) : miss();
  }
});

// `.talk()` will get your bot to begin the conversation
chatWindow.talk(
// pass your JSON/JavaScript object to `.talk()` function where
// you define how the conversation between the bot and user will go
{
  // "ice" (as in "breaking the ice") is a required conversation object
  // that maps the first thing the bot will say to the user
  "ice": {

    // "says" defines an array of sequential bubbles
    // that the bot will produce
    "says": ["Hey!", "Can I have a banana?"],

    // "reply" is an array of possible options the user can pick from
    // as a reply
    "reply": [{
      "question": "🍌", // label for the reply option
      "answer": "banana" // key for the next conversation object
    }]
  }, // end required "ice" conversation object

  // another conversation object that can be queued from within
  // any other conversation object, including itself
  "banana": {
    "says": ["Thank you!", "Can I have another banana?"],
    "reply": [{
      "question": "🍌🍌",
      "answer": "banana"
    }] // end conversation object
  } // end conversation object
});
},{"../node_modules/chat-bubble/component/Bubbles.js":2}],2:[function(require,module,exports){
// core function
function Bubbles(container, self, options) {
  // options
  options = typeof options !== "undefined" ? options : {}
  animationTime = options.animationTime || 200 // how long it takes to animate chat bubble, also set in CSS
  typeSpeed = options.typeSpeed || 5 // delay per character, to simulate the machine "typing"
  widerBy = options.widerBy || 2 // add a little extra width to bubbles to make sure they don't break
  sidePadding = options.sidePadding || 6 // padding on both sides of chat bubbles
  inputCallbackFn = options.inputCallbackFn || false // should we display an input field?

  var standingAnswer = "ice" // remember where to restart convo if interrupted

  var _convo = {} // local memory for conversation JSON object
  //--> NOTE that this object is only assigned once, per session and does not change for this
  // 		constructor name during open session.

  // set up the stage
  container.classList.add("bubble-container")
  var bubbleWrap = document.createElement("div")
  bubbleWrap.className = "bubble-wrap"
  container.appendChild(bubbleWrap)

  // install user input textfield
  this.typeInput = function(callbackFn) {
    var inputWrap = document.createElement("div")
    inputWrap.className = "input-wrap"
    var inputText = document.createElement("textarea")
    inputText.setAttribute("placeholder", "Ask me anything...")
    inputWrap.appendChild(inputText)
    inputText.addEventListener("keypress", function(e) {
      // register user input
      if (e.keyCode == 13) {
        e.preventDefault()
        typeof bubbleQueue !== false ? clearTimeout(bubbleQueue) : false // allow user to interrupt the bot
        var lastBubble = document.querySelectorAll(".bubble.say")
        lastBubble = lastBubble[lastBubble.length - 1]
        lastBubble.classList.contains("reply") &&
        !lastBubble.classList.contains("reply-freeform")
          ? lastBubble.classList.add("bubble-hidden")
          : false
        addBubble(
          '<span class="bubble-button bubble-pick">' + this.value + "</span>",
          function() {},
          "reply reply-freeform"
        )
        // callback
        typeof callbackFn === "function"
          ? callbackFn({
              input: this.value,
              convo: _convo,
              standingAnswer: standingAnswer
            })
          : false
        this.value = ""
      }
    })
    container.appendChild(inputWrap)
    bubbleWrap.style.paddingBottom = "100px"
    inputText.focus()
  }
  inputCallbackFn ? this.typeInput(inputCallbackFn) : false

  // init typing bubble
  var bubbleTyping = document.createElement("div")
  bubbleTyping.className = "bubble-typing imagine"
  for (dots = 0; dots < 3; dots++) {
    var dot = document.createElement("div")
    dot.className = "dot_" + dots + " dot"
    bubbleTyping.appendChild(dot)
  }
  bubbleWrap.appendChild(bubbleTyping)

  // accept JSON & create bubbles
  this.talk = function(convo, here) {
    // all further .talk() calls will append the conversation with additional blocks defined in convo parameter
    _convo = Object.assign(_convo, convo) // POLYFILL REQUIRED FOR OLDER BROWSERS

    this.reply(_convo[here])
    here ? (standingAnswer = here) : false
  }
  this.reply = function(turn) {
    turn = typeof turn !== "undefined" ? turn : _convo.ice
    questionsHTML = ""
    if (turn.reply !== undefined) {
      turn.reply.reverse()
      for (var i = 0; i < turn.reply.length; i++) {
        ;(function(el, count) {
          questionsHTML +=
            '<span class="bubble-button" style="animation-delay: ' +
            animationTime / 2 * count +
            'ms" onClick="' +
            self +
            ".answer('" +
            el.answer +
            "');this.classList.add('bubble-pick')\">" +
            el.question +
            "</span>"
        })(turn.reply[i], i)
      }
    }
    orderBubbles(turn.says, function() {
      bubbleTyping.classList.remove("imagine")
      questionsHTML !== ""
        ? addBubble(questionsHTML, function() {}, "reply")
        : bubbleTyping.classList.add("imagine")
    })
  }
  // navigate "answers"
  this.answer = function(key) {
    var func = function(key) {
      typeof window[key] === "function" ? window[key]() : false
    }
    _convo[key] !== undefined
      ? (this.reply(_convo[key]), (standingAnswer = key))
      : func(key)
  }

  // api for typing bubble
  this.think = function() {
    bubbleTyping.classList.remove("imagine")
    this.stop = function() {
      bubbleTyping.classList.add("imagine")
    }
  }

  // "type" each message within the group
  var orderBubbles = function(q, callback) {
    var start = function() {
      setTimeout(function() {
        callback()
      }, animationTime)
    }
    var position = 0
    for (
      var nextCallback = position + q.length - 1;
      nextCallback >= position;
      nextCallback--
    ) {
      ;(function(callback, index) {
        start = function() {
          addBubble(q[index], callback)
        }
      })(start, nextCallback)
    }
    start()
  }

  // create a bubble
  var bubbleQueue = false
  var addBubble = function(say, posted, reply) {
    reply = typeof reply !== "undefined" ? reply : ""
    // create bubble element
    var bubble = document.createElement("div")
    var bubbleContent = document.createElement("span")
    bubble.className = "bubble imagine " + reply
    bubbleContent.className = "bubble-content"
    bubbleContent.innerHTML = say
    bubble.appendChild(bubbleContent)
    bubbleWrap.insertBefore(bubble, bubbleTyping)
    // answer picker styles
    if (reply !== "") {
      var bubbleButtons = bubbleContent.querySelectorAll(".bubble-button")

      for (var z = 0; z < bubbleButtons.length; z++) {
        ;(function(el) {
          if (!el.parentNode.parentNode.classList.contains("reply-freeform"))
            el.style.width = el.offsetWidth - sidePadding * 2 + widerBy + "px"
        })(bubbleButtons[z])
      }
      bubble.addEventListener("click", function() {
        for (var i = 0; i < bubbleButtons.length; i++) {
          ;(function(el) {
            el.style.width = 0 + "px"
            el.classList.contains("bubble-pick") ? (el.style.width = "") : false
            el.removeAttribute("onclick")
          })(bubbleButtons[i])
        }
        this.classList.add("bubble-picked")
      })
    }
    // time, size & animate
    wait = animationTime * 2
    minTypingWait = animationTime * 6
    if (say.length * typeSpeed > animationTime && reply == "") {
      wait += typeSpeed * say.length
      wait < minTypingWait ? (wait = minTypingWait) : false
      setTimeout(function() {
        bubbleTyping.classList.remove("imagine")
      }, animationTime)
    }
    setTimeout(function() {
      bubbleTyping.classList.add("imagine")
    }, wait - animationTime * 2)
    bubbleQueue = setTimeout(function() {
      bubble.classList.remove("imagine")
      var bubbleWidthCalc = bubbleContent.offsetWidth + widerBy + "px"
      bubble.style.width = reply == "" ? bubbleWidthCalc : ""
      bubble.style.width = say.includes("<img src=")
        ? "50%"
        : bubble.style.width
      bubble.classList.add("say")
      posted()
      // animate scrolling
      containerHeight = container.offsetHeight
      scrollDifference = bubbleWrap.scrollHeight - bubbleWrap.scrollTop
      scrollHop = scrollDifference / 200
      var scrollBubbles = function() {
        for (var i = 1; i <= scrollDifference / scrollHop; i++) {
          ;(function() {
            setTimeout(function() {
              bubbleWrap.scrollHeight - bubbleWrap.scrollTop > containerHeight
                ? (bubbleWrap.scrollTop = bubbleWrap.scrollTop + scrollHop)
                : false
            }, i * 5)
          })()
        }
      }
      setTimeout(scrollBubbles, animationTime / 2)
    }, wait + animationTime * 2)
  }
}

// below functions are specifically for WebPack-type project that work with import()

// this function automatically adds all HTML and CSS necessary for chat-bubble to function
function prepHTML(options) {
  // options
  var options = typeof options !== "undefined" ? options : {}
  var container = options.container || "chat" // id of the container HTML element
	var relative_path = options.relative_path || "./node_modules/chat-bubble/"

  // make HTML container element
  window[container] = document.createElement("div")
  window[container].setAttribute("id", container)
  document.body.appendChild(window[container])

  // style everything
  var appendCSS = function(file) {
    var link = document.createElement("link")
    link.href = file;
    link.type = "text/css"
    link.rel = "stylesheet"
    link.media = "screen,print"
    document.getElementsByTagName("head")[0].appendChild(link)
  }
	appendCSS(relative_path+ "component/styles/input.css");
	appendCSS(relative_path + "component/styles/reply.css")
	appendCSS(relative_path + "component/styles/says.css")
	appendCSS(relative_path + "component/styles/setup.css")
	appendCSS(relative_path + "component/styles/typing.css")

}

// exports for es6
exports.Bubbles = Bubbles
exports.prepHTML = prepHTML

},{}]},{},[1])(1)
});
//# sourceMappingURL=api.js.map
