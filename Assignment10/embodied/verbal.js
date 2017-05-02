/* verbal part */
var state = "initial"
var slowBreathInc = 0.1
var fastBreathInc = 0.6
var slowTimeBetweenBlinks = 4000
var fastTimeBetweenBlinks = 1000

function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    /* Nonverbal actions at the start of listening */
    setTimeBetweenBlinks(fastTimeBetweenBlinks);
    setBreathInc(slowBreathInc);
    // 1.3 setting eye color when the character is listening
    setEyeColor("red");

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();


    recognition.onresult = function(e) {
      document.getElementById('transcript').value
                               = e.results[0][0].transcript;
      var user_said = e.results[0][0].transcript;
      recognition.stop();

      /* Nonverbal actions at the end of listening */
      // 1.3 change eye color back
      setEyeColor("black");
      setTimeBetweenBlinks(slowTimeBetweenBlinks);
      jump(); //perform a nonverbal action from nonverbal.js

      var bot_response = decide_response(user_said)
      speak(bot_response)

      //`document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      setEyeColor("black");
      recognition.stop();
    }

  }
}

/* decide what to say.
 * input: transcription of what user said
 * output: what bot should say
 */
function decide_response(user_said) {
  var response;
  var fact_re = /fact/i;  // creating a regular expression
  var fact_parse_array = user_said.match(fact_re) // parsing the input string with the regular expression
  
  console.log(fact_parse_array) // let's print the array content to the console log so we understand 
                                // what's inside the array.

  if (user_said.toLowerCase().includes("hello") && state === "initial") {
    response = "Hello! Would you like a science fact? ";
    state = "fact0";
  } else if (user_said.toLowerCase().includes("yes") && state === "fact0") {
    response = "Okay, here is a fact. There are more underwater living organisms than organisms on land";
    state = "fact1";
  } else if (fact_parse_array && state === "fact1") {
    response = "The adult human skeleton has 206 bones. The smallest is the stapes or stirrup, the innermost of three bones in the middle ear; the femur (thighbone) is the longest and strongest, and the tibia in the lower leg is the second largest in the human skeleton.";
    state = "fact2";
  } else if (fact_parse_array && state === "fact2") {
    response = "Female sharks have thicker skins than males. Scientists think it's because males have this odd tendency to bite females while mating. Would you like to know another one?";
    state = "fact3";
  } else if (user_said.toLowerCase().includes("yes") && state === "fact3") {
    response = "The ocean is 12,080.7 feet (3,682.2 meters) deep on average. That's about eight Empire State Buildings, stacked one on top of the other.";
    state = "fact0";
  } else if (user_said.toLowerCase().includes("no") && state === "fact3") {
    response = "Bye";
    state = "initial";
  } else if (user_said.toLowerCase().includes("cool") && state != "initial") {
    response = "Glad you appreciate it";
  } else {
    response = "i don't get it";
  }
  return response;
}

/* Load and print voices */
function printVoices() {
  // Fetch the available voices.
  var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
        console.log(voice.name)
  });
}

printVoices();

/* 
 *speak out some text 
 */
function speak(text, callback) {

  /* Nonverbal actions at the start of robot's speaking */
  setBreathInc(fastBreathInc); 

  console.log("Voices: ")
  printVoices();

  var u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = 'en-US';
  u.volume = 0.5 //between 0.1
  u.pitch = 2.0 //between 0 and 2
  u.rate = 1.0 //between 0.1 and 5-ish
  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google UK English Female"; })[0]; //pick a voice
/* 
 *speak out some text 
 */
  u.onend = function () {
      
      /* Nonverbal actions at the end of robot's speaking */
      setBreathInc(slowBreathInc); 

      if (callback) {
          callback();
      }
  };

  u.onerror = function (e) {
      if (callback) {
          callback(e);
      }
  };

  speechSynthesis.speak(u);
}