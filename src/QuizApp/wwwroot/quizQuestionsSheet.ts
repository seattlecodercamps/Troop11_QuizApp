interface IQuestion
{
    render(): HTMLElement;
    isCorrect(): boolean;
}

class TrueFalseQuestion implements IQuestion
{
    checkBox: HTMLInputElement;
    constructor(public question: string, public answer: boolean, public id: string) {};
    render()
    {
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.innerHTML = this.question
        div.appendChild(p)
        this.checkBox = document.createElement("input");
        this.checkBox.setAttribute('type', 'checkbox');
        this.checkBox.setAttribute('id', this.id);
        div.appendChild(this.checkBox);
        return div;
    }
    isCorrect()
    {
        return this.checkBox.checked === this.answer;
    }
}

class MultipleChoiceQuestion implements IQuestion{
    radio: HTMLInputElement[];
    correctIndex: number;
    wrongAnswers: string[];
    constructor(public id: string, public question: string, public correctAnswer: string, ...wrongAnswers: string[]) {
        this.wrongAnswers = wrongAnswers;
    };
    render() {
        this.correctIndex = Math.ceil(Math.random()) * (this.wrongAnswers.length - 1);
        this.wrongAnswers.splice(this.correctIndex, 0, this.correctAnswer);
        let div = document.createElement('div');
        div.setAttribute("id", this.id.toString());
        let p = document.createElement('p');
        p.innerHTML = this.question;
        div.appendChild(p);
        for (var i = 0; i < this.wrongAnswers.length; i++) {
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', this.id.toString());
            div.appendChild(input);
            let text = document.createTextNode(this.wrongAnswers[i])
            div.appendChild (text)
            div.appendChild (document.createElement("br"));
        }
        return div;
    };
    isCorrect()
    {
        let inputs = document.querySelectorAll("#" + this.id + " > input")
        let correctInput = <HTMLInputElement>inputs[this.correctIndex]
        return correctInput.checked
    }
}

let questions: IQuestion[] = [];

questions.push(new MultipleChoiceQuestion("a", "What is 2 + 2?", "4", "-90", "Blue", "V"));
questions.push(new TrueFalseQuestion("Is coding?", false, "2"));

let mainList = document.getElementById("mainList")
for (let question of questions) {
    mainList.appendChild(question.render());
}

document.getElementById("mainForm").addEventListener("submit", (e) => {
    e.preventDefault()
    let score = 0;
    for (let question of questions) {
        if (question.isCorrect()) score++;
    }
    console.log(score)
});

