var randomChoices;
var questionHTML = "";
var incorrectAnswers = 0;
var correctAnswers = 0;
var unansweredQuestions = 0;
var rightanswer;

var randomizeArray = arr => arr.sort(() => Math.random() - 0.5);

var trivia = [{
        question: "In Disney's 'The Little Mermaid' who does Ariel fall in love with?",
        choices: ["Prince Eric",
            "Prince Phillip",
            "Prince Charming",
            "Prince Joseph"
        ],
        answer: "Prince Eric"
    },

    {
        question: "What was the name of the monkey in the Disney movie 'Aladdin'?",
        choices: ["Abu",
            "Donkey Kong",
            "Rafiki",
            "Jack"
        ],
        answer: "Abu"
    },

    {
        question: "What is the name of Mickey Mouse´s dog?",
        choices: ["Pluto",
            "Donald",
            "Bolt",
            "Oliver"
        ],
        answer: "Pluto"
    },

    {
        question: "What are the names of the 7 dwarfs from the Disney movie 'Snow White and the Seven Dwarfs'?",
        choices: ["Happy, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc",
            "Joyful, Lazy, Sneezy, Dopey, Grumpy, Bashful and Doc",
            "Happy, Sleepy, Sneezy, Dopey, Moody, Bashful and Doc",
            "Joyful, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc"
        ],
        answer: "Happy, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc"
    },

    {
        question: "In which Disney film will you find the villain, Cruella De Vil?",
        choices: ["Dalmatians",
            "Cinderella",
            "Sleeping Beauty",
            "Lion King"
        ],
        answer: "Dalmatians"
    },

    {
        question: "What animals portray surfer dudes in Finding Nemo?",
        choices: ["Turtles",
            "Sharks",
            "Seals",
            "Dolphins"
        ],
        answer: "Turtles"
    },

    {
        question: "What is the name of Woody's owner in Toy Story?",
        choices: ["Andy",
            "Ryan",
            "Sid",
            "Lenny"
        ],
        answer: "Andy"
    },

    {
        question: "What puts Snow White into a deep sleep?",
        choices: ["A poisoned apple",
            "A needle",
            "A car accident",
            "A lost slipper"
        ],
        answer: "A poisoned apple"
    }
]

$(".time").html("10 seconds");

for (i = 0; i < trivia.length; i++) {
    randomChoices = randomizeArray(trivia[i].choices);
    questionHTML +=
        `<div id="question_${i}" class="questions-group">
				<div id="question">
				${trivia[i].question}
				</div>
				<div class="buttons" data-answer="${trivia[i].answer}" data-question-num="${i}"> 
					<button class="choiceButton">${trivia[i].choices[0]}</button>
					<button class="choiceButton">${trivia[i].choices[1]}</button>
					<button class="choiceButton">${trivia[i].choices[2]}</button>
					<button class="choiceButton">${trivia[i].choices[3]}</button>
				</div>
			</div>`
}

$(".triviaPage").append(questionHTML);

var number = 10;
var intervalId;
var questionNumber = 0;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $(".time").html(number + " seconds");
    $(".questions-group").on("click", stop);
    if (number === 1) {
        $(".time").html(number + " second")
    }
	if (number === 0) {
        stop();
        timerEnd();
    }
}

function stop() {
    clearInterval(intervalId);
}

function reset() {
    number = 10;
    $(".time").html(number);
}

$("#startButton").on("click", function() {
    $(".startPage").css("display", "none");
    $(".triviaPage").css("display", "block");
    $("#question_0").show();
    run();
});

$('.questions-group').on('click', 'button', function() {
    var userPickedAnswer = $(this).text();
    rightanswer = $(this).closest("div").attr("data-answer");
    questionNumber = $(this).closest("div").attr("data-question-num");

    if (userPickedAnswer === rightanswer) {
        correctAnswers++;
        $(".triviaPage").css("display", "none");
        $(".rightAnswerPage").css("display", "block");
        setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 1);
    }

    if (userPickedAnswer != rightanswer) {
        incorrectAnswers++;
        $(".triviaPage").css("display", "none");
        $(".wrongAnswerPage").css("display", "block");
        $(".correctAnswer").html(rightanswer);
        setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 1);
    }
});

intervalId;

function nextQuestion(number) {
    if (number != 7) {
        var nextNum = parseInt(number) + 1;
        questionNumber = nextNum;
        var currNumber = parseInt(number);
        $("#question_" + currNumber).hide();
        $("#question_" + nextNum).show();
        $(".triviaPage").css("display", "block");
        $(".timeOutPage").css("display", "none");
        $(".wrongAnswerPage").css("display", "none");
        $(".rightAnswerPage").css("display", "none");
        $(".endPage").css("display", "none");
        reset();
        run();
    } else {
        $(".wrongAnswerPage").css("display", "none");
        $(".rightAnswerPage").css("display", "none");
        $(".endPage").css("display", "block");
    }

    $(".numCorrectAnswers").html(correctAnswers);
    $(".numIncorrectAnswers").html(incorrectAnswers);
    $(".numUnanswered").html(unansweredQuestions);
};

function timerEnd() {
    unansweredQuestions++;
    var questionNum = $('#question_' + questionNumber);
    rightanswer = questionNum.find('div[data-answer]').attr('data-answer');
    $(".triviaPage").css("display", "none");
    $(".timeOutPage").css("display", "block");
    $(".correctAnswer").html(rightanswer);
    setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 1);
} 
