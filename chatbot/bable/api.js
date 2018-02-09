/************************************************************************/
/******* CONVENIENCE METHODS AVAILABLE FOR ES6 BUILD ENVIRONMENTS *******/
/************************************************************************/

// the URL of where you've installed the component; you may need to change this:
import { Bubbles, prepHTML } from "../node_modules/chat-bubble/component/Bubbles.js"

// this is a convenience script that builds all necessary HTML,
// imports all scripts and stylesheets; your container DIV will
// have a default `id="chat"`;
// you can specify a different ID with:
// `container: "my_chatbox_id"` option
prepHTML({relative_path: "../node_modules/chat-bubble/"})


/************************************************************************/
/************************ SAMPLE IMPLEMENTATION *************************/
/************************************************************************/

// initialize by constructing a named function...
const chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
  // the one that we care about is inputCallbackFn()
  // this function returns an object with some data that we can process from user input
  // and understand the context of it
  // this is an example function that matches the text user typed to one of the answer bubbles
  // this function does no natural language processing
  // this is where you may want to connect this script to NLC backend.
  inputCallbackFn: function(o) {
    // add error conversation block & recall it if no answer matched
    var miss = function() {
      chatWindow.talk(
        {
          "i-dont-get-it": {
            says: [
              "Sorry, I don't get it 😕. Pls repeat? Or you can just click below 👇"
            ],
            reply: o.convo[o.standingAnswer].reply
          }
        },
        "i-dont-get-it"
      )
    }
    // do this if answer found
    var match = function(key) {
      setTimeout(function() {
        chatWindow.talk(convo, key) // restart current convo from point found in the answer
      }, 600)
    }
    // sanitize text for search function
    var strip = function(text) {
      return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
    }
    // search function
    var found = false
    o.convo[o.standingAnswer].reply.forEach(function(e, i) {
      strip(e.question).includes(strip(o.input)) && o.input.length > 0
        ? (found = e.answer)
        : found ? null : (found = false)
    })
    found ? match(found) : miss()
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
      "says": [ "Hey!", "Can I have a banana?" ],

      // "reply" is an array of possible options the user can pick from
      // as a reply
      "reply" : [
        {
          "question" : "🍌",  // label for the reply option
          "answer" : "banana",  // key for the next conversation object
        }
      ]
    }, // end required "ice" conversation object

    // another conversation object that can be queued from within
    // any other conversation object, including itself
    "banana" : {
      "says" : [ "Thank you!", "Can I have another banana?"],
      "reply": [
        {
          "question": "🍌🍌",
          "answer": "banana"
        }
      ]
    } // end conversation object
  } // end conversation object
);