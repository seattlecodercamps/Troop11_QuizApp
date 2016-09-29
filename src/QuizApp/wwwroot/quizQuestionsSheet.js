var TrueFalseQuestion = (function () {
    function TrueFalseQuestion(question, answer, id) {
        this.question = question;
        this.answer = answer;
        this.id = id;
    }
    ;
    TrueFalseQuestion.prototype.render = function () {
        var div = document.createElement("div");
        var p = document.createElement("p");
        p.innerHTML = this.question;
        div.appendChild(p);
        this.checkBox = document.createElement("input");
        this.checkBox.setAttribute('type', 'checkbox');
        this.checkBox.setAttribute('id', this.id);
        div.appendChild(this.checkBox);
        return div;
    };
    TrueFalseQuestion.prototype.isCorrect = function () {
        return this.checkBox.checked === this.answer;
    };
    return TrueFalseQuestion;
}());
var MultipleChoiceQuestion = (function () {
    function MultipleChoiceQuestion(id, question, correctAnswer) {
        var wrongAnswers = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            wrongAnswers[_i - 3] = arguments[_i];
        }
        this.id = id;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.wrongAnswers = wrongAnswers;
    }
    ;
    MultipleChoiceQuestion.prototype.render = function () {
        this.correctIndex = Math.ceil(Math.random()) * (this.wrongAnswers.length - 1);
        this.wrongAnswers.splice(this.correctIndex, 0, this.correctAnswer);
        var div = document.createElement('div');
        div.setAttribute("id", this.id.toString());
        var p = document.createElement('p');
        p.innerHTML = this.question;
        div.appendChild(p);
        for (var i = 0; i < this.wrongAnswers.length; i++) {
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', this.id.toString());
            div.appendChild(input);
            var text = document.createTextNode(this.wrongAnswers[i]);
            div.appendChild(text);
            div.appendChild(document.createElement("br"));
        }
        return div;
    };
    ;
    MultipleChoiceQuestion.prototype.isCorrect = function () {
        var inputs = document.querySelectorAll("#" + this.id + " > input");
        var correctInput = inputs[this.correctIndex];
        return correctInput.checked;
    };
    return MultipleChoiceQuestion;
}());
var questions = [];
questions.push(new MultipleChoiceQuestion("a", "What is 2 + 2?", "4", "-90", "Blue", "V"));
questions.push(new TrueFalseQuestion("Is coding?", false, "2"));
var mainList = document.getElementById("mainList");
for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
    var question = questions_1[_i];
    mainList.appendChild(question.render());
}
document.getElementById("mainForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var score = 0;
    for (var _i = 0, questions_2 = questions; _i < questions_2.length; _i++) {
        var question = questions_2[_i];
        if (question.isCorrect())
            score++;
    }
    console.log(score);
});
