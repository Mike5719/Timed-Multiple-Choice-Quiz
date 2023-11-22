var body = document.body;
var startButton = document.querySelector("#start-button");
var timerElement = document.querySelector("#timer-display");
var multipleChoice = document.querySelector(".multiple-choice");
var buttonEl1 = document.querySelector("#one");
var buttonEl2 = document.querySelector("#two");
var buttonEl3 = document.querySelector("#three");
var buttonEl4 = document.querySelector("#four");
var highscore = document.getElementById("saved-score");
var initials = document.getElementById("initial");
var saveButton = document.getElementById("save");

//var h1Element = document.createElement("h1");
var correct = 0;
var incorrect = 0;
var isCorrect = false;
var timer;
var timerCount;
var questionNumber = 0;
var optionCounter = 0;
var h2Element = document.createElement("h2");

// create ordered list element
var listElement = document.createElement("ol");

// create ordered list items
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

// Quiz title
//h1Element.textContent = "JavaScript Fundamentals Multiple Choice Quiz";
//body.appendChild(h1Element);
//h1Element.setAttribute("style", "text-align:center;");

// questions, answer options and question answers to be used in quiz
var q1 = "Inside which HTML element do we put the Javascript?";
var q2 = "How do you write 'Hello World' in an alert box?";
var q3 = "How do you create a function in JavaScript?";
var q4 = "How to write an IF statement in JavaScript?";
var q5 = "How does a FOR loop start?";

var questions = [q1, q2, q3, q4, q5];

var options1 = {
    a: "<js>",
    b: "<script>",
    c: "<javascript>",
    d: "<scripting>",
    Answer: "<script>"
};

var options2 = {
    a: "msgBox('Hello World');",
    b: "msg('Hello World');",
    c: "alert('Hello World');",
    d: "alertBox('Hello World');",
    Answer: "alert('Hello World');"
};

var options3 = {
    a: "function = myFunction()",
    b: "function myFunction()",
    c: "function:myFunction()",
    d: "function::myFunction()",
    Answer: "function myFunction()"
};

var options4 = {
    a: "if(i==5)",
    b: "if(i==5 then",
    c: "if i = 5 then",
    d: "if i = 5",
    Answer:"if(i==5)"
}

var options5 = {
    a: "for (i = 0; i <= 5; i++)",
    b: "for (i <= 5, i++)",
    c: "for (i =0; i <= 5)",
    d: "for i = 1 to 5",
    Answer: "for (i = 0; i <= 5; i++)"
};

var options = [options1, options2, options3, options4, options5];

var a1 = options1["b"];
var a2 = options2["c"];
var a3 = options3["b"];
var a4 = options4["a"];
var a5 = options5["a"];

var answers = [a1, a2, a3, a4, a5];

//The init function is called when page loads
//function init() {
 //   getScore();
//}

//The startQuiz function is called when the user clicks the start button
function startQuiz() {
    console.log(answers);
  timerCount = 50;
  isCorrect = false;
    showQuestions()
    startTimer()
   }

   function answerCorrect() {
    if (questionNumber <= 3) {
    correct++;
    isCorrect = true;
    questionNumber++;
    optionCounter++;
    showQuestions()
    } else {
        document.querySelector("#QuestionSelected").setAttribute("class", "hidden");
        document.querySelector("#QuizOver").setAttribute("class", "show");
        clearInterval(timer);
        document.querySelector("#timer-display").setAttribute("class", "hidden");
        saveResults()
        renderResults()
    }
}

   function answerIncorrect() {
    if (questionNumber <= 3) {
    incorrect++;
    questionNumber++;
    optionCounter++;
    isCorrect = false;
    //timerCount = timerCount - 5; 
    showQuestions()
    } else {
        document.querySelector("#QuestionSelected").setAttribute("class", "hidden");
        document.querySelector("#QuizOver").setAttribute("class", "show");
        clearInterval(timer);
        document.querySelector("#timer-display").setAttribute("class", "hidden");
        saveResults()
        renderResults()
    }
   }

   function saveResults() {
    var results = {
        highscore: correct,
        initials: initials.value.trim(),
    };

    localStorage.setItem('results', JSON.stringify(results));
}

   function renderResults() {
    results = JSON.parse(localStorage.getItem('results'));

    if (results !== null){
        document.getElementById('saved-initials').innerHTML = results.initials;
        document.getElementById('saved-score').innerHTML = results.highscore;
    }
   }

   saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveResults();
    renderResults();
   });

   function checkAnswer() {
    if (buttonEl1 === options.Answer) {
        answerCorrect();
    }   else if (buttonEl2 === options.Answer) {
        answerCorrect();
    }   else if (buttonEl3 === options.Answer) {
        answerCorrect();
    }   else if (buttonEl4 === options.Answer) {
        answerCorrect();
    }   else {
       answerIncorrect();
    }
    }



   

   function startTimer() {
    timer = setInterval(function() {
        document.querySelector("#timer-display").setAttribute("class", "show");
        timerCount--;
        timerElement.textContent = `${timerCount} seconds remaining`;
        if (timerCount >= 0) {
            if (isCorrect && timerCount > 0) {
                clearInterval(timer);
                document.querySelector("#timer-display").setAttribute("class", "hidden");
                } 
        }
        if (timerCount === 0) {
            clearInterval(timer);
            document.querySelector("#timer-display").setAttribute("class", "hidden");
           
            
            answerIncorrect();
        }
    }, 1000);    
   }


    
    function showQuestions() {
        document.querySelector("#QuestionSelected").setAttribute("class", "show");
        document.querySelector("#start-button").setAttribute("class", "hidden");
        document.querySelector(".question").textContent = questions[questionNumber];
        buttonEl1.textContent = options[optionCounter].a;
        buttonEl2.textContent = options[optionCounter].b;
        buttonEl3.textContent = options[optionCounter].c;
        buttonEl4.textContent = options[optionCounter].d;
    }

        buttonEl1.addEventListener("click", checkAnswer);
        buttonEl2.addEventListener("click", checkAnswer);
        buttonEl3.addEventListener("click", checkAnswer);
        buttonEl4.addEventListener("click", checkAnswer);
       

    



//starts quiz when start button clicked
startButton.addEventListener("click", startQuiz);



//init();



